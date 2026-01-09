import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout.jsx";
import DefaultProvider from "./Contexts/DefaultContext.jsx";
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";
import TaskDetail from "./pages/TaskDetail.jsx";
function App() {
  return (
    <DefaultProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/add-task" element={<AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DefaultProvider>
  );
}
export default App;
