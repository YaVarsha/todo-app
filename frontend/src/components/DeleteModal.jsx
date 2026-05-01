import React from "react";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">

        <div className="modalHeader">
          <h2>Delete Task</h2>
          <button className="closeBtn" onClick={onClose}>✕</button>
        </div>

        <div className="modalBody">
          <p>Are you sure you want to delete this task?</p>
        </div>

        <div className="modalActions">
          <button className="deleteConfirmBtn" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="cancelBtn" onClick={onClose}>
            No
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeleteModal;