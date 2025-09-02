"use client";
import Modal from "@/components/modals/Modal";
import { ITaskFormModal, TASK_COLUMNS } from "@/types";
import React from "react";

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
      title="Task Form"
      onClose={() => setIsOpen(false)}
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!TASK_COLUMNS.includes(status as any)}
            title={!TASK_COLUMNS.includes(status as any) ? "Please select a valid status" : undefined}
          >
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
        {!TASK_COLUMNS.includes(status as any) && (
          <small className="text-danger">Please choose a valid status</small>
        )}
      </div>
    </Modal>
  );
};

export default TaskFormModal;
