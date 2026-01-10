import { useDefaultContext } from "../Contexts/DefaultContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

import Modal from "../components/Modal";
export default function TaskDetail() {
  const { tasks, removeTask } = useDefaultContext();
  const [show, setShow] = useState(false);
  const detailTaskNum = useParams();
  const detailedTask = tasks.find((t) => t.id == detailTaskNum.id);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    removeTask(id);
    alert("Task eliminato");
    navigate(-1);
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
      <button onClick={() => setShow(true)}>Elimina Task</button>
      <Modal
        title={`Vuoi eliminare il task: ${detailedTask?.title}?`}
        content={"Questa azione è irreversibile."}
        show={show}
        onClose={() => setShow(false)}
        onConfirm={() => handleDelete(detailedTask.id)}
      />
    </div>
  );
}
