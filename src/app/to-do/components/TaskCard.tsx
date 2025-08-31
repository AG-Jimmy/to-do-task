"use client";
import Modal from "@/components/modals/Modal";
import { Edit3, GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    onEdit(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  return (
    <>
      <div className="card mb-3 task-card" style={{ cursor: "move" }}>
        <div className="card-body p-3">
          <div className="d-flex align-items-start gap-2">
            <GripVertical size={16} className="text-muted mt-1 drag-handle" />
            <div className="flex-grow-1">
              <h6 className="card-title fw-bold mb-1 small">{task.title}</h6>
              <p className="card-text text-muted small mb-3">
                {task.description}
              </p>
              <div className="d-flex gap-2 task-actions">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                >
                  <Edit3 size={12} /> Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for edit */}
      <Modal
        show={isEditing}
        title="Edit Task"
        onClose={() => setIsEditing(false)}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </>
        }
      >
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={3}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default TaskCard;
