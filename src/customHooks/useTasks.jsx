import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  async function fetchTasks() {
    try {
      const response = await fetch(`${apiUrl}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }
  useEffect(() => {
    fetchTasks();
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
    alert("Task aggiunta con successo");
    setTasks((prev) => [...prev, obj.task]);
  }

  // RIMUOVI
  async function removeTask(id) {
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
      method: "DELETE",
    });
    const obj = await response.json();
    if (obj.success) {
      setTasks((curr) => curr.filter((t) => t.id !== id));
    } else throw new Error(obj.message);
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
    setTasks((prev) => prev.map((t) => (t.id === obj.task.id ? obj.task : t)));
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
      if (fullfilled.length > 0) {
        setTasks((prev) => prev.filter((t) => !fullfilled.includes(t.id)));
      }
      if (rejected.length > 0) {
        throw new Error(
          `Errore nell'eliminazione delle task di id ${rejected.join(", ")}`,
        );
      }
    });
  };

  return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}
