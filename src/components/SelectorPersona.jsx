import React, { useState } from "react";

const SelectorPersona = ({ personas, agregarPersona, personaSeleccionada, setPersonaSeleccionada }) => {
  const [nombreInput, setNombreInput] = useState("");

  const handleAgregar = () => {
    if (nombreInput.trim() !== "") {
      agregarPersona(nombreInput.trim());
      setNombreInput("");
    }
  };

  return (
    <div>
      <h3>Agregar o seleccionar persona</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombreInput}
        onChange={(e) => setNombreInput(e.target.value)}
      />
      <button onClick={handleAgregar}>Agregar</button>

      <div>
        <p>Personas:</p>
        {personas.map((persona) => (
          <button
            key={persona}
            style={{
              margin: "0 5px",
              backgroundColor: persona === personaSeleccionada ? "#aaf" : "#eee",
            }}
            onClick={() => setPersonaSeleccionada(persona)}
          >
            {persona}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectorPersona;

