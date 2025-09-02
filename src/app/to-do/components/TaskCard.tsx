"use client";
import { Edit, GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import ConfirmModal from "./ConfirmModal";
import { ITaskCardProps } from "@/types";
import { useDeleteTask, useUpdateTask } from "../hooks/useTasks";

const TaskCard: React.FC<ITaskCardProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.column || "");

  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const handleSave = () => {
    updateTaskMutation.mutate({
      ...task,
      title,
      description,
      column: status,
    });
    setIsEditing(false);
  };
  const handleDeleteTask = async () => {
    deleteTaskMutation.mutate(task.id.toString());
  };
  return (
    <>
      <div
        className="card mb-3 task-card"
        style={{
          cursor: "move",
          transition: "transform 120ms ease, box-shadow 120ms ease",
          transform: isDragging ? "scale(0.98) rotate(3deg) translateY(-2px) translateX(2px)" : "none",
          boxShadow: isDragging ? "0 0.75rem 1.5rem rgba(0,0,0,.1)" : undefined,
        }}
        draggable
        onDragStart={(event) => {
          event.dataTransfer.setData("text/plain", String(task.id));
          event.dataTransfer.setData("application/x-source-column", task.column);
          // Optional: customize drag effect
          event.dataTransfer.effectAllowed = "move";
          setIsDragging(true);
        }}
        onDragEnd={() => setIsDragging(false)}
      >
        <div className="card-body flex-grow-1 p-3">
          <div className="d-flex justify-content-between">
            <h6 className="card-title fw-bold mb-1 small">{task.title} </h6>
            <GripVertical size={16} className="text-muted mt-1 drag-handle" />
          </div>
          <p className="card-text text-muted small mb-3">{task.description}</p>
          <div className="d-flex justify-content-end gap-1 task-actions ">
            <button onClick={() => setIsEditing(true)} className="btn ">
              <Edit size={15} />
            </button>
            <button onClick={() => setIsOpen(true)} className="btn ">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal for edit */}
      <TaskFormModal
        isOpen={isEditing}
        setIsOpen={setIsEditing}
        handleSave={handleSave}
        setTitle={setTitle}
        setDescription={setDescription}
        setStatus={setStatus}
        title={title}
        description={description}
        status={status}
      />
      {/* Modal for confirm delete */}
      <ConfirmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleConfirmDelete={handleDeleteTask}
      />
    </>
  );
};

export default TaskCard;
