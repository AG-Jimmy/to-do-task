"use client";
import React from "react";
import TaskCard from "./TaskCard";

import Pagination from "@/components/Pagination";
import { IKanbanColumnProps } from "@/types";
import useFilterTasks from "../hooks/useFilterTasks";
import { useUpdateTask } from "../hooks/useTasks";
import { ITask } from "@/types";

const KanbanColumn: React.FC<IKanbanColumnProps> = ({
  column,
  allTasks,
  limit,
  keyword,
}) => {
  const [page, setPage] = React.useState(1);
  const { tasksColumn, totalPages } = useFilterTasks({
    allTasks,
    keyword,
    limit,
    column: column.id,
    page: page,
  });

  const updateTaskMutation = useUpdateTask();

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const droppedTaskId = event.dataTransfer.getData("text/plain");
    if (!droppedTaskId) return;
    const task = allTasks.find((t) => String(t.id) === droppedTaskId);
    if (!task) return;
    if (task.column === column.id) return; // no-op if same column

    const updatedTask: ITask = { ...task, column: column.id };
    updateTaskMutation.mutate(updatedTask);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    // Necessary to allow drop
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div style={{ minHeight: "500px" }}>
      <div className="d-flex align-items-center p-3 gap-2">
        <h5 className="card-title fw-bold mb-0">{column.title}</h5>
      </div>

      <div
        className="card-body p-4 position-relative"
        style={{ maxHeight: "400px", overflowY: "auto" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {tasksColumn.length ? (
          tasksColumn.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <p className="mb-0 text-center text-muted pt-5">
            {keyword ? "No matching tasks" : "No tasks in this column"}
          </p>
        )}

        <div
          className="d-flex justify-content-center align-items-center  "
          style={{ bottom: -38 }}
        >
          <Pagination
            total={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
