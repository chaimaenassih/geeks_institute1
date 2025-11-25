import React, { useRef, useState } from "react";

export default function CharacterCounter() {
  const inputRef = useRef(null);        // référence vers l'input
  const [count, setCount] = useState(0); // compteur de caractères

  const handleInput = () => {
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      setCount(length);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Compteur de caractères</h2>

      <input
        ref={inputRef}              // useRef sur l'input
        type="text"
        placeholder="Tape ton texte ici..."
        onInput={handleInput}       // écoute les changements
      />

      <p>Nombre de caractères : {count}</p>
    </div>
  );
}
