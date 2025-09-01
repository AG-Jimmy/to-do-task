import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getTasks } from "../api/tasks.api";

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
