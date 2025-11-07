"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bell,
} from "lucide-react";
import {
  getNotifications,
  Notification as NotificationModel,
} from "@/app/services/NotificationService";

export default function Notification() {
  const [data, setData] = useState<NotificationModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await getNotifications();
        setData(result);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-6 mt-10 text-center text-gray-500 border border-gray-200">
        Carregando notificações...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-6 mt-10 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
      </div>

      <ul role="list" className="space-y-6">
        {data.map((item, index) => {
          const isPending = !item.isCollected && !item.isAbsence;
          const Icon = isPending ? AlertTriangle : CheckCircle2;
          const iconColor = isPending
            ? "text-amber-600 bg-amber-50 ring-amber-100"
            : "text-emerald-600 bg-emerald-50 ring-emerald-100";

          return (
            <li key={item.id} className="relative flex items-start">
              {index !== data.length - 1 && (
                <span
                  className="absolute left-5 top-6 h-full w-px bg-gray-200"
                  aria-hidden="true"
                />
              )}

              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ring-2 ${iconColor}`}
              >
                <Icon className="h-5 w-5" />
              </span>

              <div className="ml-6 flex justify-between w-full">
                <div>
                  <p className="text-sm text-gray-700 font-medium">
                    {isPending ? (
                      <>
                        <span className="text-amber-700 font-semibold">
                          {item.roomMateName}
                        </span>{" "}
                        ainda não jogou o lixo.
                      </>
                    ) : (
                      <>
                        <span className="text-emerald-700 font-semibold">
                          {item.roomMateName}
                        </span>{" "}
                        completou a tarefa de lixo.
                      </>
                    )}
                  </p>

                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {item.dateCollection
                      ? new Date(item.dateCollection).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Sem data"}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
