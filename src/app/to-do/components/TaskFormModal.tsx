import Modal from "@/components/modals/Modal";
import { ITaskFormModal } from "@/types";
import React, { useState } from "react";

const TaskFormModal = ({
  isOpen,
  title,
  description,
  status,
  setIsOpen,
  handleSave,
  setTitle,
  setDescription,
  setStatus,
}: ITaskFormModal) => {
  return (
    <Modal
      show={isOpen}
      title="Edit Task"
      onClose={() => setIsOpen(false)}
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="backlog">Backlog</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>
    </Modal>
  );
};

export default TaskFormModal;
