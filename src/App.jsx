import React, { useState, useEffect } from "react";
import SelectorPersona from "./components/SelectorPersona";
import ListaProductos from "./components/ListaProductos";
import ResumenConsumo from "./components/ResumenConsumo";
import  productos  from "./data/productos";

const App = () => {
  const [personas, setPersonas] = useState(() => {
    const personasGuardadas = localStorage.getItem("personas");
    return personasGuardadas ? JSON.parse(personasGuardadas) : [];
  });

  const [consumos, setConsumos] = useState(() => {
    const consumosGuardados = localStorage.getItem("consumos");
    return consumosGuardados ? JSON.parse(consumosGuardados) : {};
  });

  const [personaSeleccionada, setPersonaSeleccionada] = useState("");

  useEffect(() => {
    localStorage.setItem("personas", JSON.stringify(personas));
    localStorage.setItem("consumos", JSON.stringify(consumos));
  }, [personas, consumos]);

  const agregarPersona = (nombre) => {
    if (!personas.includes(nombre)) {
      setPersonas([...personas, nombre]);
    }
    setPersonaSeleccionada(nombre);
  };

  const agregarProducto = (producto) => {
    if (!personaSeleccionada) return;

    setConsumos((prev) => {
      const consumosPersona = prev[personaSeleccionada] || [];
      return {
        ...prev,
        [personaSeleccionada]: [...consumosPersona, producto],
      };
    });
  };

  const eliminarProducto = (persona, indice) => {
    setConsumos((prev) => {
      const consumosPersona = prev[persona] || [];
      const nuevosConsumidos = consumosPersona.filter((_, idx) => idx !== indice);
      return {
        ...prev,
        [persona]: nuevosConsumidos,
      };
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Vos Que Tenes Forro??</h1>

      <SelectorPersona
        personas={personas}
        agregarPersona={agregarPersona}
        personaSeleccionada={personaSeleccionada}
        setPersonaSeleccionada={setPersonaSeleccionada}
      />

      <hr />

      <ListaProductos
        productos={productos}
        agregarProducto={agregarProducto}
        personaSeleccionada={personaSeleccionada}
      />

      <hr />

      <ResumenConsumo consumos={consumos} eliminarProducto={eliminarProducto} />
    </div>
  );
};

export default App;

