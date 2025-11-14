"use client";

import { useEffect, useState } from "react";
import Header from "./app/components/Header";
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

      

        {/* Conteúdo */}
        <Roommates />
        <Notification  />

        {/* Bottom gradient */}
       <Footer />
      
      
    </>
  );
}
