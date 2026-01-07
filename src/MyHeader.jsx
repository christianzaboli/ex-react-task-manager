import { NavLink } from "react-router-dom";
export default function MyHeader() {
  return (
    <header>
      <nav>
        <NavLink to="/">Task List</NavLink>
        <NavLink to="/add-task">Add Task</NavLink>
      </nav>
    </header>
  );
}
