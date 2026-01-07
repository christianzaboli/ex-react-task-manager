import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout.jsx";
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<AddTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
