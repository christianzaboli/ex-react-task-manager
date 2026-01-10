import { createPortal } from "react-dom";
export default function Modal({
  title,
  content,
  show = true,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  if (!show) return null;

  return createPortal(
    <div className="modal-delete">
      <div className="modal-content">
        <h1>{title}</h1>
        <div className="modal-inner">{content}</div>
        <div>
          <button onClick={onConfirm}>{confirmText}</button>
          <button onClick={onClose}>Annulla</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
