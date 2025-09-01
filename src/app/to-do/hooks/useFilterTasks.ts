"use client";

import { ITask } from "@/types";

const useFilterTasks = ({
  allTasks,
  limit,
  column,
  keyword,
  page,
}: {
  allTasks: ITask[];
  limit: number;
  column: string;
  keyword: string | undefined;
  page: number;
}) => {
  const allColumnFiltered = allTasks.filter((t) => t.column === column);
  const keywords = keyword?.trim().toLowerCase();
  let filtered = allTasks
    .filter((t) => t.column === column)
    .slice((page - 1) * limit, page * limit);
  let totalPages = Math.ceil(allColumnFiltered.length / limit) || 1;

  if (keywords) {
    filtered = allColumnFiltered.filter(
      (t) =>
        t.title.toLowerCase().includes(keywords) ||
        t.description.toLowerCase().includes(keywords)
    );
    totalPages = Math.ceil(filtered.length / limit) || 1;
  }
  return { tasksColumn: filtered, totalPages };
};

export default useFilterTasks;
