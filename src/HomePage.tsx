"use client";

import { useEffect, useState } from "react";
import Header from "./app/components/Header";
import Navbar from "./app/components/Navbar";
import Roommates from "./app/components/Roommates";
import Notification from "./app/components/Notification";
import Footer from "./app/components/Footer";

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
      <Navbar />
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

        {/* Conteúdo */}
        <Roommates />
        <Notification  />

        {/* Bottom gradient */}
       <Footer />
      </div>
      
    </>
  );
}
