import { useDefaultContext } from "../Contexts/DefaultContext";
import TaskRow from "../components/TaskRow";
import { useState, useMemo } from "react";
export default function TaskList() {
  const { tasks } = useDefaultContext();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };
  const sortedTasks = useMemo(() => {
    if (!tasks) return [];
    switch (sortBy) {
      case "title":
        return [...tasks].sort(
          (a, b) => a.title.localeCompare(b.title) * sortOrder
        );
      case "status":
        const statusOrder = { "To do": 3, Doing: 2, Done: 1 };
        return [...tasks].sort(
          (a, b) => (statusOrder[a.status] - statusOrder[b.status]) * sortOrder
        );
      case "createdAt":
        return [...tasks].sort(
          (a, b) => (new Date(a.createdAt) - new Date(b.createdAt)) * sortOrder
        );
      default:
        return [...tasks];
    }
  }, [tasks, sortBy, sortOrder]);
  return (
    <>
      <h1 className="tasks-title">Tasks</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Nome</th>
            <th onClick={() => handleSort("status")}>Stato</th>
            <th onClick={() => handleSort("createdAt")}>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks?.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
}
