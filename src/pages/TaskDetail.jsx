import { useDefaultContext } from "../Contexts/DefaultContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
export default function TaskDetail() {
  const { tasks, removeTask, updateTask } = useDefaultContext();
  const detailTaskNum = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const detailedTask = tasks.find(
    (t) => Number(t.id) === Number(detailTaskNum.id),
  );

  const handleDelete = (id) => {
    try {
      setShow(false);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  const goodbye = (id) => {
    navigate("/");
    removeTask(id);
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
      {/* alerting modal */}
      <Modal
        title={`Task eliminato`}
        content={"Avanti prossima"}
        show={showAlert}
        confirmText={"Torna alla lista"}
        onConfirm={() => goodbye(detailedTask.id)}
      />
      {/* conferma eliminazione */}
      <Modal
        title={`Vuoi eliminare il task: ${detailedTask?.title}?`}
        content={"Questa azione è irreversibile."}
        show={show}
        onClose={() => setShow(false)}
        onConfirm={() => handleDelete()}
      />
      {/* editing modal */}
      <EditTaskModal
        show={showEdit}
        task={detailedTask}
        onClose={() => setShowEdit(false)}
        onSave={(updatedTask) => handleUpdate(detailedTask.id, updatedTask)}
      />
    </div>
  );
}
