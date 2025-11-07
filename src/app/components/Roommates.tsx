"use client";

import { useEffect, useState } from "react";
import {
  getRoommates,
  Roommate,
  getNextRomomMate,
} from "@/app/services/RoomMateService";
import { createNotification } from "@/app/services/NotificationService";

export default function Roommates() {
  const [data, setData] = useState<Roommate[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightId, setHighlightId] = useState<number | null>(null);

  // 🎨 Cores fixas
  const fallbackColors = ["F59E0B", "3B82F6", "10B981", "8B5CF6", "EC4899"];

  // 🔹 Buscar roommates + próximo roommate (highlight)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roommates, lastNotification] = await Promise.all([
          getRoommates(),
          getNextRomomMate(),
        ]);

        setData(roommates);
        setHighlightId(lastNotification.id); // ID do roommate atual
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Ação de coleta
  const handleCollect = async (person: Roommate) => {
    try {
      const notification = {
        queueOrder: 0,
        roomMateName: "person.name",
        isCollected: true,
        isAbsence: false,
      };

      await createNotification(notification);
      alert(`✅ Coleta registrada para ${person.name}`);
    } catch (error) {
      console.error("Erro ao criar notificação:", error);
      alert("❌ Falha ao registrar coleta.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-6 mt-10 text-center text-gray-500 border border-gray-200">
        Carregando roommates...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-6 mt-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Roommates</h2>

      <ul role="list" className="divide-y divide-gray-100">
        {data.map((person, index) => {
          const isHighlighted = person.id === highlightId;

          return (
            <li
              key={person.id}
              className={`flex justify-between gap-x-6 transition-all ${
                isHighlighted ? "py-10 scale-[1.02] rounded-xl" : "py-5"
              }`}
            >
              <div className="flex min-w-0 gap-x-4">
                {/* Avatar com cor fixa baseada no índice */}
                <img
                  src={`https://ui-avatars.com/api/?name=${
                    person.name
                  }&background=${
                    fallbackColors[index % fallbackColors.length]
                  }&color=ffffff`}
                  alt={person.name}
                  className={`flex-none rounded-full bg-gray-100 shadow-sm ${
                    isHighlighted ? "h-36 w-36" : "h-12 w-12"
                  }`}
                />
                <div className="min-w-0 flex-auto">
                  <p
                    className={`font-semibold text-gray-900 ${
                      isHighlighted ? "text-2xl" : "text-sm"
                    }`}
                  >
                    {person.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-gray-500">
                    {person.isActive ? "Active" : "Out"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end sm:flex-row sm:items-center mt-2 sm:mt-0 gap-2 sm:gap-4">
                <div className="flex items-center gap-x-1.5">
                  <div
                    className={`flex-none rounded-full p-1 ${
                      isHighlighted ? "bg-green-600/20" : "bg-gray-300/20"
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${
                        isHighlighted ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  </div>

                  <p
                    className={`text-xs font-semibold ${
                      isHighlighted ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {isHighlighted ? "Pending task" : "Waiting"}
                  </p>
                </div>

                {isHighlighted && (
                  <button
                    onClick={() => handleCollect(person)}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-medium rounded-full shadow transition"
                  >
                    Collect
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
