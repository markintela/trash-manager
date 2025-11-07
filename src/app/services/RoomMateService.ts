import axios from "axios";

const API_URL = "https://api-yellow-dwl1.onrender.com/api/roommates";

export interface Roommate {
  id: number;
  name: string;
  dateThrowOut: string;
  isPending: boolean;
}

// 🔹 Buscar todos os roommates
export const getRoommates = async (): Promise<Roommate[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔹 Buscar um roommate pelo ID
export const getRoommateById = async (id: number): Promise<Roommate> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// 🔹 Criar um novo roommate
export const createRoommate = async (roommate: Omit<Roommate, "id">): Promise<Roommate> => {
  const response = await axios.post(API_URL, roommate);
  return response.data;
};

// 🔹 Atualizar um roommate existente
export const updateRoommate = async (id: number, roommate: Partial<Roommate>): Promise<Roommate> => {
  const response = await axios.put(`${API_URL}/${id}`, roommate);
  return response.data;
};

// 🔹 Deletar um roommate pelo ID
export const deleteRoommate = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
