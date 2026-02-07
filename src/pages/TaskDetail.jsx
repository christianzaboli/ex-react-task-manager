import { useDefaultContext } from "../Contexts/DefaultContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
export default function TaskDetail() {
  const { tasks, removeTask, updateTask } = useDefaultContext();
  const detailTaskNum = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const detailedTask = tasks.find(
    (t) => Number(t.id) === Number(detailTaskNum.id),
  );

  const handleDelete = (id) => {
    try {
      removeTask(id);
      alert("Task eliminato");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  const handleUpdate = (taskToUpdate, updatedTask) => {
    updateTask(taskToUpdate, updatedTask);
    setShowEdit(false);
  };
  return (
    <div className="modal-confirm">
      <h1>{detailedTask?.title}</h1>
      <p className="detail-bio">{detailedTask?.description}</p>
      <p
        className={
          detailedTask?.status === "To do"
            ? "to-do-task"
            : detailedTask?.status === "Doing"
              ? "doing-task"
              : "done-task"
        }
      >
        {detailedTask?.status}
      </p>
      <p className="detailed-task-date">
        {dayjs(detailedTask?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
      </p>
      <div className="detail-buttons">
        <button onClick={() => setShow(true)} className="red">
          Elimina Task
        </button>
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
