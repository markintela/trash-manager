"use client";

import { useEffect, useState } from "react";
import {
  getRoommates,
  Roommate,
  getNextRomomMate,
} from "@/app/services/RoomMateService";
import {
  createNotification,
  CreateNotification,
} from "@/app/services/NotificationService";

export default function Roommates() {
  const [data, setData] = useState<Roommate[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightId, setHighlightId] = useState<number | null>(null);

  const fallbackColors = ["F59E0B", "3B82F6", "10B981", "8B5CF6", "EC4899"];

  // 🔹 Função que busca os dados (reutilizável)
  const fetchData = async () => {
    try {
      const [roommates, nextRoommate] = await Promise.all([
        getRoommates(),
        getNextRomomMate(),
      ]);

      setData(roommates);
      setHighlightId(nextRoommate.id);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Buscar dados na montagem
  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Ação de coleta
  const handleCollect = async (person: Roommate) => {
    try {
      const notification: CreateNotification = {
        queueOrder: person.id,
        roomMateName: person.name,
        isCollected: true,
        isAbsence: false,
      };

      await createNotification(notification);
      alert(`✅ Coleta registrada para ${person.name}`);

      // 🔁 Atualiza a lista sem recarregar a página
      await fetchData();
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
                <img
                  src={`https://ui-avatars.com/api/?name=${person.name}&background=${
                    fallbackColors[index % fallbackColors.length]
                  }&color=ffffff`}
                  alt={person.name}
                  className={`flex-none rounded-full bg-gray-100 shadow-sm ${
                    isHighlighted ? "h-20 w-20 sm:h-28 sm:w-28" : "h-10 w-10"
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

              {/* 🔹 Indicador + Botão Responsivo */}
              <div
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-end mt-3 sm:mt-0 ${
                  isHighlighted ? "gap-3 sm:gap-4" : "gap-2 sm:gap-3"
                }`}
              >
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <div
                    className={`flex-none rounded-full p-1.5 ${
                      isHighlighted ? "bg-green-100" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isHighlighted ? "bg-green-600" : "bg-gray-400"
                      }`}
                    />
                  </div>

                  <p
                    className={`text-xs sm:text-sm font-medium ${
                      isHighlighted ? "text-green-700" : "text-gray-500"
                    }`}
                  >
                    {isHighlighted ? "Pending task" : "Waiting"}
                  </p>
                </div>

                {isHighlighted && (
                  <button
                    onClick={() => handleCollect(person)}
                    className="mt-2 sm:mt-0 px-4 py-1.5 sm:px-5 sm:py-2 bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm font-medium rounded-full shadow-sm transition-all active:scale-95"
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
