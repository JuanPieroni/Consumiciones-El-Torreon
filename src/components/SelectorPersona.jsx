import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./SelectorPersona.module.css";

const SelectorPersona = ({
  personas,
  agregarPersona,
  personaSeleccionada,
  setPersonaSeleccionada,
  eliminarPersona,
}) => {
  const [nombreInput, setNombreInput] = useState("");
  const navigate = useNavigate();

  const handleAgregar = () => {
    if (nombreInput.trim() !== "") {
      agregarPersona(nombreInput.trim());
      setNombreInput("");
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}>Agregar o seleccionar persona</h3>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombreInput}
          onChange={(e) => setNombreInput(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAgregar} className={styles.btnAgregar}>
          Agregar
        </button>
      </div>

      <div className={styles.personasContainer}>
        <p className={styles.subtitulo}>Personas:</p>
        {personas.map((persona) => (
          <div key={persona} className={styles.personaItem}>
            <button
              onClick={() => setPersonaSeleccionada(persona)}
              className={clsx(
                styles.btnPersona,
                persona === personaSeleccionada && styles.seleccionada
              )}
            >
              {persona}
            </button>
            <button
              onClick={() => eliminarPersona(persona)}
              className={styles.btnEliminar}
            >
              Eliminar Persona
            </button>
          </div>
        ))}

        <div className={styles.navegacion}>
          <button
            onClick={() => navigate("/extra")}
            className={styles.btnNav}
          >
            Agregar producto fuera de carta
          </button>
          <button
            onClick={() => navigate("/historial")}
            className={styles.btnNav}
          >
            Ver historial de pagos
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectorPersona;
