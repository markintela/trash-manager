"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import {
  getRoommates,
  getNextRomomMate,
  Roommate,
} from "@/app/services/RoomMateService";

import {
  getNotifications,
  Notification as NotificationModel,
} from "@/app/services/NotificationService";

import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

// Registrar Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  // ---- TIPAGEM CORRETA PARA OS ESTADOS ----
  const [roommates, setRoommates] = useState<Roommate[]>([]);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [nextRoommate, setNextRoommate] = useState<Roommate | null>(null);
  const [loading, setLoading] = useState(true);

  // ---- CARREGAR DADOS ----
  useEffect(() => {
    const load = async () => {
      try {
        const [rms, nots, next] = await Promise.all([
          getRoommates(),
          getNotifications(),
          getNextRomomMate(),
        ]);

        setRoommates(rms);
        setNotifications(nots);
        setNextRoommate(next);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10 text-gray-600">
        Loading dashboard...
      </div>
    );
  }

  // ---- ANALYTICS ----
  const totalCollected = notifications.filter((n) => n.isCollected).length;

  const totalPending = notifications.filter(
    (n) => !n.isCollected && !n.isAbsence
  ).length;

  const chartData = {
    labels: roommates.map((r) => r.name),
    datasets: [
      {
        label: "Completed tasks",
        data: roommates.map(
          (r) =>
            notifications.filter(
              (n) => n.roomMateName === r.name && n.isCollected
            ).length
        ),
        backgroundColor: "rgba(34,197,94,0.6)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next in Queue */}
        <div className="p-6 bg-white shadow rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <Clock className="text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-700">
              Next in Queue
            </h2>
          </div>
          <p className="text-2xl font-bold mt-2">
            {nextRoommate?.name || "Unknown"}
          </p>
        </div>

        {/* Pending */}
        <div className="p-6 bg-white shadow rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-700">
              Pending
            </h2>
          </div>
          <p className="text-2xl font-bold mt-2">{totalPending}</p>
        </div>

        {/* Completed */}
        <div className="p-6 bg-white shadow rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-500" />
            <h2 className="text-lg font-semibold text-gray-700">
              Completed
            </h2>
          </div>
          <p className="text-2xl font-bold mt-2">{totalCollected}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 bg-white shadow rounded-2xl border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
          Performance Overview
        </h2>
        <Bar data={chartData} height={200} />
      </div>

      {/* Recent Notifications */}
      <div className="p-6 bg-white shadow rounded-2xl border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
    
          <h2 className="text-xl font-semibold">
            Recent Notifications
          </h2>
        </div>

        <ul className="space-y-4">
          {notifications.slice(0, 5).map((item) => {
            const isPending = !item.isCollected && !item.isAbsence;
            const Icon = isPending ? AlertTriangle : CheckCircle2;

            return (
              <li key={item.id} className="flex items-start gap-3">
                <Icon
                  className={`h-5 w-5 ${
                    isPending ? "text-amber-600" : "text-green-600"
                  }`}
                />

                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>{item.roomMateName}</strong>{" "}
                    {isPending
                      ? "still hasn’t taken out the trash."
                      : "took out the trash."}
                  </p>

                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.dateCollection
                      ? new Date(item.dateCollection).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )
                      : "No date"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
