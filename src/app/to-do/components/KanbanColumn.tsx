"use client";
import React from "react";
import TaskCard from "./TaskCard";

const KanbanColumn = ({
  column,
  tasks,
  onEdit,
  onDelete,
  searchTerm,
}: KanbanColumnProps) => {
  return (
    <div style={{ minHeight: "500px" }}>
      <div className="d-flex align-items-center p-3 gap-2">
        <h5 className="card-title fw-bold mb-0">{column.title}</h5>
      </div>
      <div
        className="card-body p-4 "
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} onEdit={onEdit} onDelete={onDelete} />
        ))}
        {tasks.length === 0 && (
          <p className="mb-0 text-center text-muted pt-5 ">
            {searchTerm ? "No matching tasks" : "No tasks yet"}
          </p>
        )}
      </div>
    </div>
  );
};
export default KanbanColumn;
