import React from "react";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        <div onClick={handleClose}>
        </div>
      </div>
    </div>
  );
};

export default Modal;
// <span className="modal-close" onClick={handleClose}>X</span>