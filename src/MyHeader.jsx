import { NavLink } from "react-router-dom";
export default function MyHeader() {
  return (
    <header>
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/">Task List</NavLink>
          </li>
          <li>
            <NavLink to="/add-task">Add Task</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
