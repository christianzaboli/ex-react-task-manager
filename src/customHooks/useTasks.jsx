import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`${apiUrl}/tasks`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  function addTask() {}
  function removeTask() {}
  function updateTask() {}
  return { tasks, addTask, removeTask, updateTask };
}
