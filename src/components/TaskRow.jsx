import { memo } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
const TaskRow = memo(({ task }) => {
  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </td>
      <td
        className={
          task.status === "To do"
            ? "to-do-task"
            : task.status === "Doing"
            ? "doing-task"
            : "done-task"
        }
      >
        {task.status}
      </td>
      <td>{dayjs(task.createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
    </tr>
  );
});
export default TaskRow;
