"use client";
import { Edit, GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import EditModal from "./EditModal";
import ConfirmModal from "./ConfirmModal";
import { ITaskCardProps } from "@/types";

const TaskCard: React.FC<ITaskCardProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };
  const handleDeleteTask = async () => {};
  return (
    <>
      <div className="card mb-3 task-card" style={{ cursor: "move" }}>
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
      <EditModal
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        handleSave={handleSave}
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
