import Modal from "@/components/modals/Modal";
import React from "react";

const EditModal = ({
  isEditing,
  setIsEditing,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  handleSave,
}: any) => {
  return (
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
  );
};

export default EditModal;
