import { useDefaultContext } from "../Contexts/DefaultContext";
import TaskRow from "../components/TaskRow";
import { useState, useMemo, useCallback, useEffect } from "react";

// funzione di debounce
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function TaskList() {
  const { tasks } = useDefaultContext();

  // campo di ricerca
  const [searchQuery, setSearchQuery] = useState("");
  // utilizzo di callback debounce
  const debouncedSetQuery = useCallback(debounce(setSearchQuery, 300), []);

  // campi di ordinamento
  const [sortBy, setSortBy] = useState("title");
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
    const filteredtasks = [...tasks].filter((tasks) =>
      tasks.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    switch (sortBy) {
      case "title":
        return filteredtasks.sort(
          (a, b) => a.title.localeCompare(b.title) * sortOrder,
        );
      case "status":
        const statusOrder = { "To do": 3, Doing: 2, Done: 1 };
        return filteredtasks.sort(
          (a, b) => (statusOrder[a.status] - statusOrder[b.status]) * sortOrder,
        );
      case "createdAt":
        return filteredtasks.sort(
          (a, b) =>
            (new Date(a.createdAt).getTime() -
              new Date(b.createdAt).getTime()) *
            sortOrder,
        );
      default:
        return filteredtasks;
    }
  }, [tasks, sortBy, sortOrder, searchQuery]);
  return (
    <>
      <h1 className="tasks-title">Tasks</h1>
      <input
        type="text"
        placeholder="Ricerca task..."
        onChange={(e) => debouncedSetQuery(e.target.value)}
        className="input-search"
      />
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
