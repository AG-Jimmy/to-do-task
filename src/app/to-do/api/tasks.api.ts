import { ITask } from "@/types";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const api = axios.create({ baseURL });

export const getTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const deleteTask = async (id: string) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
export const createTask = async (task: Omit<ITask, "id">): Promise<ITask> => {
  const { data } = await api.post(`/tasks`, task);
  return data;
};

export const updateTask = async (task: ITask): Promise<ITask> => {
  const { data } = await api.put(`/tasks/${task.id}`, task);
  return data;
};
