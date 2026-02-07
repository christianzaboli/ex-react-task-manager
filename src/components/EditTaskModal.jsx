import { createPortal } from "react-dom";
import Modal from "./Modal.jsx";
import { useState, useRef } from "react";
export default function EditTaskModal({ show, task, onClose, onSave }) {
  if (!show) return null;
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To do");
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, status });
  };
  return createPortal(
    <Modal
      show={show}
      title={"Modifica Task"}
      content={
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Nome Task"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </form>
      }
      confirmText={"Salva"}
      onConfirm={() => {
        formRef.current.requestSubmit();
      }}
      onClose={onClose}
    />,
    document.body,
  );
}
