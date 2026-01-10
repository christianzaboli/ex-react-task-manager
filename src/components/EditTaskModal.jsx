import { createPortal } from "react-dom";
import Modal from "./Modal.jsx";
import { useState, useRef } from "react";
export default function EditTaskModal({ show, task, onClose, onSave }) {
  if (!show) return null;
  const [title, setTitle] = useState(task?.title || "");
  const [desc, setDesc] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "To do");
  const formRef = useRef();
  return createPortal(
    <Modal
      show={show}
      title={"Modifica Task"}
      content={
        <form ref={formRef}>
          <input
            type="text"
            value={title}
            placeholder="Nome Task"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
      onConfirm={(e) => {
        e.preventDefault();
        formRef.current.requestSubmit();
        onSave({ title, description: desc, status });
      }}
      onClose={onClose}
    />,
    document.body
  );
}
