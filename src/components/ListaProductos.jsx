import React from "react";

const ListaProductos = ({ productos, agregarProducto, personaSeleccionada }) => {
  return (
    <div>
      <h3>Agregar productos a {personaSeleccionada || "..."}</h3>
      {!personaSeleccionada && <p>Seleccioná primero una persona</p>}
      {productos.map(({ id, nombre, precio }) => (
        <button
          key={id}
          disabled={!personaSeleccionada}
          onClick={() => agregarProducto({ id, nombre, precio })}
          style={{ margin: "5px" }}
        >
          {nombre} (${precio})
        </button>
      ))}
    </div>
  );
};

export default ListaProductos;
