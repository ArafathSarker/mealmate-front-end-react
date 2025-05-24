import React from 'react';
import '../style/confirmmodal.css';

export default function LeaveGroup({ onCancel, onConfirm }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <p>This action will remove you from the Group.</p>
        <button onClick={onConfirm} className="confirm-btn">Yes, Confirm</button>
        <button onClick={onCancel} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
}