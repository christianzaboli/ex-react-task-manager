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

  function addTask(data) {
    fetch(apiUrl + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("Task aggiunta con successo");
        } else {
          alert(res.message);
        }
      })
      .then(() => fetchTasks())
      .catch((err) => console.error(err));
  }

  function removeTask(id) {
    fetch(`${apiUrl}/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setTasks((curr) => curr.filter((t) => t.id !== id));
        } else {
          throw new Error(res.message);
        }
      });
  }
  function updateTask() {}
  return { tasks, addTask, removeTask, updateTask };
}
