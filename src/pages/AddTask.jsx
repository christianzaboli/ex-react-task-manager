import { useState, useRef, useEffect } from "react";
import { useDefaultContext } from "../Contexts/DefaultContext";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

export default function AddTask() {
  const { addTask } = useDefaultContext();
  const [title, setTitle] = useState("");
  const descRef = useRef();
  const statusRef = useRef();
  const btnRef = useRef();
  const titleValidation = (title) => {
    if (title.trim() === "") {
      return "Compila il campo Titolo";
    }
    if ([...title].some((char) => symbols.includes(char))) {
      return "Il campo Titolo contiene caratteri non validi";
    }
    return "";
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleValidation(title) === "") {
      const data = {
        title,
        description: descRef.current.value,
        status: statusRef.current.value,
      };
      addTask(data);
      setTitle("");
      descRef.current.value = "";
      statusRef.current.value = "To do";
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       btnRef.current?.click();
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <div>
      <form className="tasks-form" onSubmit={handleSubmit}>
        <label>
          Titolo
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          {titleValidation(title) && (
            <p style={{ color: "red" }}>{titleValidation(title)}</p>
          )}
        </label>
        <label>
          Descrizione:
          <textarea name="Descrizione" ref={descRef}></textarea>
        </label>

        <label>
          Stato:
          <select name="status" ref={statusRef}>
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </label>
      </form>
      <button
        style={{
          backgroundColor: titleValidation(title) ? "gray" : "green",
          cursor: titleValidation(title) ? "not-allowed" : "pointer",
          color: "white",
        }}
        className="btn-margin-top"
        type="submit"
        disabled={titleValidation(title)}
        ref={btnRef}
      >
        Aggiungi Task
      </button>
    </div>
  );
}
