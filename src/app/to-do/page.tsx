"use client";
import { useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  fetchBacklogTasks,
  fetchDoneTasks,
  fetchInProgressTasks,
  fetchReviewTasks,
} from "./api/toDoApi";
import { KanbanColumn, SearchBar } from "./components";

type Q<T> = UseQueryResult<T[], unknown>;

const HomePage = () => {
  const columns = [
    { id: "backlog", title: "Backlog" },
    { id: "in-progress", title: "In Progress" },
    { id: "review", title: "Review" },
    { id: "done", title: "Done" },
  ];

  const [doneQ, backlogQ, inProgressQ, reviewQ] = useQueries({
    queries: [
      {
        queryKey: ["done", 1, 5],
        queryFn: () => fetchDoneTasks({ page: 1, limit: 5 }),
        staleTime: 10_000,
      },
      {
        queryKey: ["backlog", 1, 5],
        queryFn: () => fetchBacklogTasks({ page: 1, limit: 5 }),
        staleTime: 10_000,
      },
      {
        queryKey: ["in-progress", 1, 5],
        queryFn: () => fetchInProgressTasks({ page: 1, limit: 5 }),
        staleTime: 10_000,
      },
      {
        queryKey: ["review", 1, 5],
        queryFn: () => fetchReviewTasks({ page: 1, limit: 5 }),
        staleTime: 10_000,
      },
    ],
  }) as [Q<Task>, Q<Task>, Q<Task>, Q<Task>];

  if (
    doneQ.isLoading ||
    backlogQ.isLoading ||
    inProgressQ.isLoading ||
    reviewQ.isLoading
  )
    return <p>Loading…</p>;

  if (
    doneQ.isError ||
    backlogQ.isError ||
    inProgressQ.isError ||
    reviewQ.isError
  )
    return <p>Error loading data</p>;

  const dataByColumn: Record<string, Task[]> = {
    backlog: backlogQ.data ?? [],
    "in-progress": inProgressQ.data ?? [],
    review: reviewQ.data ?? [],
    done: doneQ.data ?? [],
  };
  return (
    <div className=" bg-white p-4 d-flex  flex-column gap-3 rounded-3 ">
      {/* Search Bar */}
      <div className="row justify-content-between gap-3 align-items-center border-bottom pb-3">
        <SearchBar searchTerm="" setSearchTerm={() => {}} />
        <div className="col-5 col-md-2 col-lg-1 ">
          <button type="button" className="btn btn-primary text-nowrap ">
            Add Task
          </button>
        </div>
      </div>
      {/* Kanban Board */}
      <div
        className="row g-3 mb-4  d-flex flex-nowrap overflow-x-auto"
        style={{
          width: "100%",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x proximity",
        }}
      >
        {columns.map((column, index) => (
          <div
            key={column.id}
            className={`col-12 col-md-6 col-lg-3 ${
              index !== columns.length - 1 ? "border-end" : ""
            }`}
          >
            <KanbanColumn
              column={column}
              tasks={dataByColumn[column.id]}
              onEdit={() => {}}
              onDelete={() => {}}
              searchTerm=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
