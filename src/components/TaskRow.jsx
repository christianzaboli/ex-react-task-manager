import { memo } from "react";

const TaskRow = memo(function TaskRow({ task }) {
  return (
    <tr>
      <td>{task.title}</td>
      <td
        className={
          task.status === "To-do"
            ? "to-do-task"
            : task.status === "Doing"
            ? "doing-task"
            : "done-task"
        }
      >
        {task.status}
      </td>
      <td>{task.createdAt}</td>
    </tr>
  );
});
export default TaskRow;
