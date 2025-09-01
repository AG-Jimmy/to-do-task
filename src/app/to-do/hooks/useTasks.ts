import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, getTasks, updateTask } from "../api/tasks.api";
import { ITask } from "@/types";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks:all"],
    queryFn: async () => await getTasks(), // returns ALL tasks once
    staleTime: 60_000,
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteTask(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks:all"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: ITask) => {
      await updateTask(task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks:all"] });
    },
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: ITask) => {
      await createTask(task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks:all"] });
    },
  });
};
