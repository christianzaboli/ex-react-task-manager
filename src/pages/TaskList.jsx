import { useDefaultContext } from "../Contexts/DefaultContext";
import { useState, useMemo, useCallback } from "react";
import TaskRow from "../components/TaskRow";
import Modal from "../components/Modal";

// funzione di debounce
function debounce(fn, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
}

export default function TaskList() {
  const { tasks, removeMultipleTasks } = useDefaultContext();

  // campo di ricerca
  const [searchQuery, setSearchQuery] = useState("");
  // utilizzo di callback debounce
  const debouncedSetQuery = useCallback(debounce(setSearchQuery, 300), []);

  // campi di ordinamento
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState(1);
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  // task selezionate
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const toggleSelection = (taskId) => {
    if (selectedTaskIds.includes(taskId)) {
      setSelectedTaskIds((prev) => prev.filter((t) => t !== taskId));
    } else {
      setSelectedTaskIds((prev) => [...prev, taskId]);
    }
  };

  // task showate
  const sortedTasks = useMemo(() => {
    const filteredtasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (sortBy === "title") {
      return filteredtasks.sort(
        (a, b) => a.title.localeCompare(b.title) * sortOrder,
      );
    }
    if (sortBy === "status") {
      const statusOrder = { "To do": 3, Doing: 2, Done: 1 };
      return filteredtasks.sort(
        (a, b) => (statusOrder[a.status] - statusOrder[b.status]) * sortOrder,
      );
    }
    if (sortBy === "createdAt") {
      return filteredtasks.sort(
        (a, b) =>
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          sortOrder,
      );
    }
    return filteredtasks;
  }, [tasks, sortBy, sortOrder, searchQuery]);

  // Handling multiple delete
  const [showAlert, setShowAlert] = useState(false);
  const handleMultipleDelete = () => {
    removeMultipleTasks(selectedTaskIds);
    setShowAlert(false);
    setSelectedTaskIds([]);
  };
  return (
    <>
      <h1 className="tasks-title">Tasks manager avanzato</h1>
      <input
        type="text"
        placeholder="Ricerca task..."
        onChange={(e) => debouncedSetQuery(e.target.value)}
        className="input-search"
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("")}></th>
            <th
              onClick={() => handleSort("title")}
              className={sortBy === "title" ? "th-active" : null}
            >
              Nome
            </th>
            <th
              onClick={() => handleSort("status")}
              className={sortBy === "status" ? "th-active" : null}
            >
              Stato
            </th>
            <th
              onClick={() => handleSort("createdAt")}
              className={sortBy === "createdAt" ? "th-active" : null}
            >
              Data di Creazione
            </th>
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
        <button onClick={() => setShowAlert(true)} className="btn-margin-top">
          Elimina selezionate
        </button>
      )}
      <Modal
        title={`Eliminare queste task?`}
        content={"Questa azione é irreversible"}
        show={showAlert}
        onConfirm={() => {
          handleMultipleDelete();
        }}
        onClose={() => setShowAlert(false)}
      />
    </>
  );
}
