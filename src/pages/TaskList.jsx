import { useDefaultContext } from "../Contexts/DefaultContext";
import TaskRow from "../components/TaskRow";
import { useState, useMemo, useCallback } from "react";

// funzione di debounce
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function TaskList() {
  const { tasks, removeMultipleTasks } = useDefaultContext();

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
    const filteredtasks = [...tasks].filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
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

  // task selezionate
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const toggleSelection = (taskId) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds((prev) => prev.filter((t) => t !== taskId));
    } else {
      setSelectedTaskIds((prev) => [...prev, taskId]);
    }
  };

  const handleMultipleDelete = async () => {
    try {
      await removeMultipleTasks(selectedTaskIds);
      alert("Tasks eliminate con successo");
      setSelectedTaskIds([]);
    } catch (error) {
      console.error(error);
    }
  };
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
            <th></th>
            <th onClick={() => handleSort("title")}>Nome</th>
            <th onClick={() => handleSort("status")}>Stato</th>
            <th onClick={() => handleSort("createdAt")}>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks?.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              checked={selectedTaskIds.includes(task.id)}
              onToggle={toggleSelection}
            />
          ))}
        </tbody>
      </table>
      {selectedTaskIds.length > 0 && (
        <button onClick={handleMultipleDelete}>Elimina selezionate</button>
      )}
    </>
  );
}
