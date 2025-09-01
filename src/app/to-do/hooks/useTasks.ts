import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks.api";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks:all"],
    queryFn: async () => await getTasks(), // returns ALL tasks once
    staleTime: 60_000,
  });
};
