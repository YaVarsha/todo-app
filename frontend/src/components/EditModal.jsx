import React, { useEffect, useState } from "react";

function EditModal({ isOpen, onClose, onSave, currentTask }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (currentTask) {
      setValue(currentTask.task);
    }
  }, [currentTask]);

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modal">

        <div className="modalHeader">
          <h2>Edit Task</h2>
          <button className="closeBtn" onClick={onClose}>✕</button>
        </div>

        <div className="modalBody">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="modalActions">
          <button className="saveBtn" onClick={() => onSave(value)}>
            Save
          </button>
          <button className="cancelBtn" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditModal;