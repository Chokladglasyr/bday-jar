import jar from "./assets/jar.png";

import "./App.css";
import { useState } from "react";

type Note = {
  text: string;
};
function App() {
  const [randomNote, setRandomNote] = useState<Note | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const colors = ["#A65028", "#A77D26", "#5C754F"];
  const notes = [
    {
      text: "Gråt inte över spilld mjölk.",
    },
    {
      text: "Behandla andra så som de vill bli behandlade.",
    },
    {
      text: "Om du har gjort ditt bästa, så har du gjort ditt bästa.",
    },
  ];
  const drawNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const index = Math.floor(Math.random() * notes.length);
    const color = Math.floor(Math.random() * colors.length);
    setBackgroundColor(colors[color]);
    setRandomNote(notes[index]);
  };

  return (
    <>
      <div>
        <h1>Grattis på 18 års dagen Benjamin!</h1>
        <p className="description">Här är en digital burk fylld med lappar från din familj!</p>
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

export default App;
