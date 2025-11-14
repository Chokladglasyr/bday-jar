import jar from "./assets/jar.png";

import "./App.css";
import { useEffect, useState } from "react";

type Note = {
  text: string;
};
function App() {
  // const baseURL = "http://localhost:3000"
  const baseURL = "https://bday-jar.onrender.com"
  const [randomNote, setRandomNote] = useState<Note | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ text: "" });
  const [message, setMessage] = useState<string | null>(null);
  const colors = ["#A65028", "#A77D26", "#5C754F"];

  const drawNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const index = Math.floor(Math.random() * notes.length);
    const color = Math.floor(Math.random() * colors.length);
    setBackgroundColor(colors[color]);
    setRandomNote(notes[index]);
  };
  useEffect(() => {
    if (message) {
      const timerMessage = setTimeout(() => {
        setMessage(null);
      }, 2000);
      return () => {
        clearTimeout(timerMessage);
      };
    }
    async function getNotes() {
      try {
        const res = await fetch(`${baseURL}/notes`);
        if (!res.ok) throw new Error("Error fetching");
        const data = await res.json();
        setNotes(data.notes);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Failed to fetch");
        }
      }
    }
    getNotes();
  }, [message]);
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const createNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/note`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });
      const data = await res.json();
      setMessage(data.message);
      setFormData({ text: "" });
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error creating note: ", err);
      }
    }
  };

  if (window.location.pathname === "/lapp") {
    return (
      <>
        <div>
          <h1>Lägg en lapp i Benjamins burk!</h1>
          <form onSubmit={createNote}>
            <textarea
              name="text"
              id="text"
              rows={8}
              onChange={handleInput}
              value={formData.text}
            ></textarea>
            <button>Spara</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <h1>Grattis på 18 års dagen Benjamin!</h1>
          <p className="description">
            Här är en digital burk fylld med lappar från din familj!
          </p>
          <img src={jar} alt="jar filled with notes" />
          {randomNote && (
            <div
              className="note-container"
              style={{ backgroundColor: backgroundColor }}
            >
              <p className="note">{randomNote.text}</p>
            </div>
          )}

          <button type="button" onClick={drawNote}>
            Dra en lapp
          </button>
        </div>
      </>
    );
  }
}

export default App;
