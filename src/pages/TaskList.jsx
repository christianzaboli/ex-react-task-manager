import { useDefaultContext } from "../Contexts/DefaultContext";
import TaskRow from "../components/TaskRow";
export default function TaskList() {
  const { tasks } = useDefaultContext();

  return (
    <>
      <h1 className="tasks-title">Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
}
