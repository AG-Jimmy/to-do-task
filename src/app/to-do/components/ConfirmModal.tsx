import Modal from "@/components/modals/Modal";
import React from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleConfirmDelete: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, setIsOpen, handleConfirmDelete }) => {
  return (
    <Modal
      show={isOpen}
      title="Confirm Delete"
      onClose={() => setIsOpen(false)}
      footer={
        <>
          <button
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirmDelete}>
            Delete
          </button>
        </>
      }
    >
      <p>Are you sure you want to delete this task?</p>
    </Modal>
  );
};

export default ConfirmModal;
