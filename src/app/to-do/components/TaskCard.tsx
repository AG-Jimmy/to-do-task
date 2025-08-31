"use client";
import Modal from "@/components/modals/Modal";
import { Edit, Edit3, GripVertical, Trash2 } from "lucide-react";
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
            <button onClick={() => onDelete(task.id)} className="btn ">
              <Trash2 size={15} />
            </button>
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
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select className="form-select">
            <option value="backlog">Backlog</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </Modal>
    </>
  );
};

export default TaskCard;
