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
  const [isOver, setIsOver] = React.useState(false);
  const dragCounter = React.useRef(0);

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const droppedTaskId = event.dataTransfer.getData("text/plain");
    const sourceColumn = event.dataTransfer.getData("application/x-source-column");
    if (!droppedTaskId) return;
    const task = allTasks.find((t) => String(t.id) === droppedTaskId);
    if (!task) return;
    if (sourceColumn === column.id || task.column === column.id) {
      setIsOver(false);
      dragCounter.current = 0;
      return; // no-op if same column
    }

    const updatedTask: ITask = { ...task, column: column.id };
    updateTaskMutation.mutate(updatedTask);
    setIsOver(false);
    dragCounter.current = 0;
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const sourceColumn = event.dataTransfer.getData("application/x-source-column");
    setIsOver(sourceColumn !== column.id);
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (event) => {
    dragCounter.current += 1;
    const sourceColumn = event.dataTransfer.getData("application/x-source-column");
    setIsOver(sourceColumn !== column.id);
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = () => {
    dragCounter.current = Math.max(0, dragCounter.current - 1);
    if (dragCounter.current === 0) {
      setIsOver(false);
    }
  };

  React.useEffect(() => {
    // If current page has no items but there are previous pages, go back one page
    if (page > 1 && tasksColumn.length === 0) {
      setPage(page - 1);
    }
  }, [tasksColumn.length, page]);

  return (
    <div style={{ minHeight: "100%" }}>
      <div className="d-flex align-items-center p-3 gap-2">
        <h5 className="card-title fw-bold mb-0">{column.title}</h5>
      </div>

      <div
        className="card-body p-4 position-relative"
        style={{
          minHeight: "850px"  ,
          overflowY: "auto",
          transition: "background-color 120ms ease, border-color 120ms ease",
          border: isOver
            ? "2px dashed rgba(13,110,253,.4)"
            : "2px dashed transparent",
          borderRadius: 12,
          background: isOver ? "rgba(13,110,253,.03)" : undefined,
        }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isOver && (
          <span
            className="position-absolute top-0 start-50 translate-middle-x badge rounded-pill text-bg-primary"
            style={{ opacity: 0.9 }}
          >
            Drop to move
          </span>
        )}
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
