import { useDefaultContext } from "../Contexts/DefaultContext";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
export default function TaskDetail() {
  const { tasks, removeTask } = useDefaultContext();
  const detailTaskNum = useParams();
  const detailedTask = tasks.find((t) => t.id == detailTaskNum.id);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    removeTask(id);
    alert("Task eliminato");
    navigate(-1);
  };
  return (
    <div>
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
      <button onClick={() => handleDelete(detailedTask.id)}>
        Elimina Task
      </button>
    </div>
  );
}
