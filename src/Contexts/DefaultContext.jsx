import { createContext, useContext } from "react";
import useTasks from "../customHooks/useTasks";

export const DefaultContext = createContext();

export function useDefaultContext() {
  return useContext(DefaultContext);
}

export default function DefaultProvider({ children }) {
  const { tasks, addTask, removeTask, updateTask } = useTasks();

  return (
    <DefaultContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </DefaultContext.Provider>
  );
}
