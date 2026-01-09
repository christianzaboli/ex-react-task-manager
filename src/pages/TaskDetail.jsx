import { useDefaultContext } from "../Contexts/DefaultContext";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
export default function TaskDetail() {
  const { tasks } = useDefaultContext();
  const detailTaskNum = useParams();
  const detailedTask = tasks.find((t) => t.id == detailTaskNum.id);
  console.log(detailedTask);

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
      <button onClick={() => console.log("Elimino task")}>Elimina Task</button>
    </div>
  );
}
