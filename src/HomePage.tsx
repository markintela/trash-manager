"use client";

import { useEffect, useState } from "react";
import { Circle, Check, Trash2 } from "lucide-react";

// ✅ Tipagem correta para Pushye
declare global {
  interface Window {
    Pushye?: {
      isSubscribed: () => Promise<boolean>;
      subscribe: () => Promise<void>;
    };
  }
}

type TrashItem = {
  id: number;
  name: string;
  dateThrowOut: string;
  isPending: boolean;
};

export default function HomePage() {
  const [data] = useState<TrashItem[]>([
    { id: 1, name: "Marcus", dateThrowOut: "2025-10-10", isPending: true },
    { id: 2, name: "Alonso", dateThrowOut: "2025-10-12", isPending: false },
    { id: 3, name: "Hanna", dateThrowOut: "2025-10-13", isPending: false },
    { id: 4, name: "Jidenna", dateThrowOut: "2025-10-13", isPending: false },
    { id: 5, name: "Kristina", dateThrowOut: "2025-10-13", isPending: false },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TrashItem | null>(null);
  const [trashTypes, setTrashTypes] = useState<string[]>([]);

  // ✅ Inicializa Pushye com boas práticas
  useEffect(() => {
    const initPushye = async () => {
      if (typeof window === "undefined") return;

      const checkPushye = async () => {
        if (!window.Pushye) return false;
        try {
          const subscribed = await window.Pushye.isSubscribed();
          if (!subscribed) {
            console.log("🔔 Solicitando permissão de notificações...");
            await window.Pushye.subscribe();
            console.log("✅ Notificações ativadas com sucesso!");
          } else {
            console.log("✅ Usuário já inscrito no Pushye");
          }
          return true;
        } catch (error) {
          console.error("❌ Erro ao inicializar Pushye:", error);
          return false;
        }
      };

      // Se o script já foi carregado
      if (await checkPushye()) return;

      // Caso o script ainda não tenha carregado, aguarda dinamicamente
      const observer = new MutationObserver(async () => {
        if (window.Pushye) {
          observer.disconnect();
          await checkPushye();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };

    initPushye();
  }, []);

  const handleOpenModal = (item: TrashItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setTrashTypes([]);
  };

  const handleToggleType = (type: string) => {
    setTrashTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleConfirm = () => {
    console.log(`Selected types for ${selectedItem?.name}:`, trashTypes);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
        Trash Collection
      </h1>

      {/* Queue Section */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-600 text-center sm:text-left">
        Queue
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full text-xs sm:text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">
                Is Pending
              </th>
              <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 sm:px-4 py-2 sm:py-3 font-medium">
                  {item.name}
                </td>
                <td className="px-6 sm:px-4 py-2 sm:py-3">
                  <Circle
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      item.isPending ? "text-green-500" : "text-yellow-500"
                    }`}
                    fill={item.isPending ? "green" : "yellow"}
                  />
                </td>
                <td className="px-3 sm:px-4 py-2 sm:py-3">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Historic Section */}
      <div className="mt-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-600 text-center sm:text-left">
          Historic
        </h2>
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full text-xs sm:text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">
                  Date Throw Out
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">
                  Type Trash
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-3 sm:px-4 py-2 sm:py-3 font-medium">
                    {item.name}
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">
                    {item.dateThrowOut}
                  </td>
                  <td className="px-3 sm:px-4 py-2 sm:py-3">Normal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Select Trash Type
            </h2>

            <div className="space-y-2 sm:space-y-3">
              {["Food", "Normal", "Glasses", "Paper"].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 sm:space-x-3 cursor-pointer text-sm sm:text-base"
                >
                  <input
                    type="checkbox"
                    checked={trashTypes.includes(type)}
                    onChange={() => handleToggleType(type)}
                    className="accent-[#b849c7] h-4 w-4 sm:h-5 sm:w-5"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={handleCloseModal}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base"
              >
                <Check className="h-4 w-4" /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
