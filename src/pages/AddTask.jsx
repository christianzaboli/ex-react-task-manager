import { useState, useRef } from "react";
import { useDefaultContext } from "../Contexts/DefaultContext";
import { useNavigate } from "react-router-dom";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {
  const { addTask } = useDefaultContext();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const descRef = useRef();
  const statusRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      console.error("Compila il campo Nome del task");
      return;
    }
    if ([...title].some((char) => symbols.includes(char))) {
      console.error("Il campo Nome del task contiene caratteri non validi");
      return;
    }
    const data = {
      title,
      description: descRef.current.value,
      status: statusRef.current.value,
    };
    addTask(data);
    setTitle("");
    descRef.current.value = "";
    statusRef.current.value = "";
    navigate("/");
  };

  return (
    <div>
      <form className="tasks-form">
        <label>Nome del task:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <label>Descrizione:</label>
        <textarea name="Descrizione" ref={descRef}></textarea>
        <label>
          Stato:
          <select name="status" ref={statusRef}>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </label>
      </form>
      <button type="submit" onClick={handleSubmit}>
        Aggiungi Task
      </button>
    </div>
  );
}
