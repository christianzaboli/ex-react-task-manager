import { useDefaultContext } from "../Contexts/DefaultContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
export default function TaskDetail() {
  const { tasks, removeTask, updateTask } = useDefaultContext();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const detailTaskNum = useParams();
  const detailedTask = tasks.find((t) => t.id == detailTaskNum.id);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    removeTask(id);
    alert("Task eliminato");
    navigate(-1);
  };
  const handleUpdate = (id, updatedTask) => {
    updateTask(detailedTask.id, updatedTask);
    alert("Task aggiornato");
    setShowEdit(false);
  };
  return (
    <div className="modal-confirm">
      <h1>{detailedTask?.title}</h1>
      <p>{detailedTask?.description}</p>
      <strong
        className={
          detailedTask?.status === "To do"
            ? "to-do-task"
            : detailedTask?.status === "Doing"
            ? "doing-task"
            : "done-task"
        }
      >
        {detailedTask?.status}
      </strong>
      <p>{dayjs(detailedTask?.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
      <div className="detail-buttons">
        <button onClick={() => setShow(true)}>Elimina Task</button>
        <button onClick={() => setShowEdit(true)}>Modifica Task</button>
      </div>
      <Modal
        title={`Vuoi eliminare il task: ${detailedTask?.title}?`}
        content={"Questa azione è irreversibile."}
        show={show}
        onClose={() => setShow(false)}
        onConfirm={() => handleDelete(detailedTask.id)}
      />
      <EditTaskModal
        show={showEdit}
        task={detailedTask}
        onClose={() => setShowEdit(false)}
        onSave={(updatedTask) => handleUpdate(detailedTask.id, updatedTask)}
      />
    </div>
  );
}
