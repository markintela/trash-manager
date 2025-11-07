import axios from "axios";

// URL base da API
const API_URL = "https://localhost:7221/api/notification";

// Define o modelo Notification conforme o backend
export interface Notification {
  id: number;
  queueOrder: number;
  roomMateName: string;
  typeTrash?: string;
  dateCollection?: string;
  isCollected: boolean;
  isAbsence: boolean;
}

// Buscar todas as notificações
export const getNotifications = async (): Promise<Notification[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Buscar uma notificação por ID
export const getNotificationById = async (id: number): Promise<Notification> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Criar nova notificação
export const createNotification = async (notification: Partial<Notification>) => {
  const response = await axios.post(API_URL, notification);
  return response.data;
};

// Atualizar notificação existente
export const updateNotification = async (notification: Notification) => {
  const response = await axios.put(`${API_URL}/${notification.id}`, notification);
  return response.data;
};

// Deletar notificação
export const deleteNotification = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Buscar a última notificação (GET /last)
export const getLastNotification = async (): Promise<Notification> => {
  const response = await axios.get(`${API_URL}/last`);
  return response.data;
};
