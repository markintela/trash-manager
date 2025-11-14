"use client";

import { useEffect, useState } from "react";
import {
  getRoommates,
  Roommate,
  getNextRomomMate,
  updateRoommate,
} from "@/app/services/RoomMateService";

import {
  createNotification,
  CreateNotification,
} from "@/app/services/NotificationService";

export default function RoommatesPage() {
  const [data, setData] = useState<Roommate[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightId, setHighlightId] = useState<number | null>(null);

  const fallbackColors = ["F59E0B", "3B82F6", "10B981", "8B5CF6", "EC4899"];

  // 🔹 Fetch geral
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

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Toggle de ativo/inativo
  const handleToggleActive = async (person: Roommate) => {
    try {
      await updateRoommate(person.id, {
        ...person,
        isActive: !person.isActive, // alterna estado
      });

      // Atualiza lista
      await fetchData();
    } catch (error) {
      console.error("Erro ao atualizar roommate:", error);
      alert("❌ Erro ao alterar estado.");
    }
  };

  // 🔹 Coletar lixo
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
              className={`flex justify-between items-center transition-all ${
                isHighlighted ? "py-10 scale-[1.02] rounded-xl" : "py-5"
              }`}
            >
              {/* LEFT SIDE */}
              <div className="flex min-w-0 gap-x-4">
                {/* Avatar */}
                <img
                  src={`https://ui-avatars.com/api/?name=${person.name}&background=${
                    fallbackColors[index % fallbackColors.length]
                  }&color=ffffff`}
                  alt={person.name}
                  className={`flex-none rounded-full shadow-sm transition-all h-10 w-10
                  
                    ${
                      !person.isActive
                        ? "opacity-40 grayscale"
                        : "opacity-100"
                    }
                  `}
                />

                {/* Name + Status */}
                <div className="min-w-0 flex-auto">
                  <p
                    className={`font-semibold transition-all ${
                      isHighlighted ? "text-xl" : "text-sm"
                    } ${!person.isActive ? "text-gray-400" : "text-gray-900"}`}
                  >
                    {person.name}
                  </p>

                  <p
                    className={`mt-1 truncate text-xs transition-all ${
                      person.isActive
                        ? "text-green-600"
                        : "text-gray-400 italic"
                    }`}
                  >
                    {person.isActive ? "Active" : "Out"}
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE → Toggle + Collect button */}
              <div className="flex flex-col items-end gap-3">
                {/* Toggle */}
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={person.isActive}
                    onChange={() => handleToggleActive(person)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full 
                    peer peer-checked:bg-green-500 transition"
                  ></div>
                  <div
                    className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow 
                    peer-checked:translate-x-5 transition"
                  ></div>
                </label>

      
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
