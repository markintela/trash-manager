"use client";

import { useEffect, useState } from "react";
import Header from "./app/components/Header";
import Navbar from "./app/components/Navbar";
import Roommates from "./app/components/Roommates";

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

  useEffect(() => {
    const initPushye = async () => {
      if (typeof window === "undefined") return;
      try {
        const res = await fetch("https://pushye.com/api/{endpoint}", {
          method: "GET",
          headers: { Authorization: "Bearer 9de47333d53195642730b5089f0ce36a" },
        });
        if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
        const data = await res.json();
        console.log("✅ Pushye:", data);
      } catch (err) {
        console.error("❌ Erro Pushye:", err);
      }
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
    <> 
    <Navbar/>
      {/* Hero Section */}
      <div className="relative bg-white isolate px-6 pt-2 lg:px-8">
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-300 to-green-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 72.5% 32.5%, 60.2% 62.4%, 47.5% 58.3%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="mx-auto max-w-2xl py-22 sm:py-22 lg:py-18 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Trash Manager{" "}
            {/* <br/>
            <span className="text-green-500 text-3xl sm:text-2x1">trash smarter</span> */}
          </h1>
          <p className="mt-4 text-lg font-medium text-gray-600 sm:text-xl">
            Organize collection schedules, roommates, and pending tasks — all
            in one clean and efficient dashboard.
          </p>
          {/* <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Get Started
            </a>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div> */}
        </div>

        <Roommates />

        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 bg-gradient-to-tr from-green-300 to-green-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 72.5% 32.5%, 60.2% 62.4%, 47.5% 58.3%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </>
  );
}
