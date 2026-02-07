import { memo } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
const TaskRow = memo(({ task, checked, onToggle }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(task.id)}
        />
      </td>
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
      <td>{dayjs(task.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
    </tr>
  );
});
export default TaskRow;
