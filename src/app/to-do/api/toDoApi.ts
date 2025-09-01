import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const api = axios.create({ baseURL });

type PageParams = {
  limit?: number;
  page?: number;
  params?: Record<string, any>;
};

export const fetchReviewTasks = async ({
  limit = 5,
  page = 1,
  params = {},
}: PageParams) => {
  const { data } = await api.get("/tasks", {
    params: { column: "review", _limit: limit, _page: page, ...params },
  });
  return data;
};

export const fetchBacklogTasks = async ({
  limit = 5,
  page = 1,
  params = {},
}: PageParams) => {
  const { data } = await api.get("/tasks", {
    params: { column: "backlog", _limit: limit, _page: page, ...params },
  });
  return data;
};

export const fetchInProgressTasks = async ({
  limit = 5,
  page = 1,
  params = {},
}: PageParams) => {
  const { data } = await api.get("/tasks", {
    params: { column: "in-progress", _limit: limit, _page: page, ...params },
  });
  return data;
};

export const fetchDoneTasks = async ({
  limit = 5,
  page = 1,
  params = {},
}: PageParams) => {
  const { data } = await api.get("/tasks", {
    params: { column: "done", _limit: limit, _page: page, ...params },
  });
  return data;
};

export const deleteTask = async (id: string) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};

// export const updateTask = async (id: number, updates: Partial<Task>) => {
//   const { data } = await api.put(`/tasks/${id}`, updates);
//   return data;
// };

// export const createTask = async (task: Partial<Task>) => {
//   const { data } = await api.post("/tasks", task);
//   return data;
// };
