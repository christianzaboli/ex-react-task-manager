import { useReducer, useEffect } from "react";
import taskReducer from "../reducers/taskReducer";
const apiUrl = import.meta.env.VITE_API_URL;

export default function useTasks() {
  const [tasks, dispatchTasks] = useReducer(taskReducer, []);
  useEffect(() => {
    fetch(`${apiUrl}/tasks`)
      .then((res) => res.json())
      .then((tasks) => dispatchTasks({ type: "LOAD_TASK", payload: tasks }))
      .catch((err) => console.error(err));
  }, []);

  // AGGIUNGI
  async function addTask(data) {
    if (tasks.some((t) => t.title.toLowerCase() === data.title.toLowerCase())) {
      throw new Error("Task gia' presente in lista");
    }
    const response = await fetch(apiUrl + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const obj = await response.json();
    if (!obj.success) {
      alert('Errore nell"aggiunta della nuova task');
    }
    dispatchTasks({ type: "ADD_TASK", payload: obj.task });
    alert("Task aggiunta con successo");
  }

  // RIMUOVI
  async function removeTask(id) {
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
      method: "DELETE",
    });
    const obj = await response.json();
    if (!obj.success) throw new Error(obj.message);
    dispatchTasks({ type: "REMOVE_TASK", payload: id });
  }

  // AGGIORNA
  async function updateTask(id, updatedTask) {
    const taskWithSameTitle = tasks.find(
      (t) => t.title.toLowerCase() === updatedTask.title.toLowerCase(),
    );
    if (taskWithSameTitle && taskWithSameTitle.id !== id) {
      throw new Error("Task gia' presente in lista");
    }
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const obj = await response.json();
    if (!obj.success) {
      throw new Error(obj.message);
    }
    dispatchTasks({ type: "UPDATE_TASK", payload: obj.task });
  }

  // RIMUOVI MULTIPLO
  const removeMultipleTasks = async (taskIds) => {
    const requests = taskIds.map((id) => {
      fetch(`${apiUrl}/tasks/${id}`, { method: "DELETE" }).then((res) =>
        res.json(),
      );
    });

    const results = await Promise.allSettled(requests);
    const fullfilled = [];
    const rejected = [];

    results.forEach((result, index) => {
      const taskId = taskIds[index];
      if (result.status === "fulfilled") {
        fullfilled.push(taskId);
      } else {
        rejected.push(taskId);
      }
    });

    if (fullfilled.length > 0) {
      dispatchTasks({ type: "REMOVE_MULTIPLE_TASK", payload: fullfilled });
    }

    if (rejected.length > 0) {
      throw new Error(
        `Errore nell'eliminazione delle task di id ${rejected.join(", ")}`,
      );
    }
  };

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}
