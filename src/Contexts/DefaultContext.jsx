import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const DefaultContext = createContext();

export function useDefaultContext() {
  return useContext(DefaultContext);
}

export default function DefaultProvider({ children }) {
  const apiUrl = import.meta.env.VITE_API_URL;

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

  return (
    <DefaultContext.Provider value={{ tasks, apiUrl }}>
      {children}
    </DefaultContext.Provider>
  );
}
