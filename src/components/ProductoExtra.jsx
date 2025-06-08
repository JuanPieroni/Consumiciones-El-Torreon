import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductoExtra = ({ personaSeleccionada, agregarProducto }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();

  const handleAgregar = () => {
    if (!personaSeleccionada) {
      alert("Primero seleccioná una persona para agregar el producto.");
      return;
    }
    if (nombre.trim() === "" || precio === "" || isNaN(precio) || Number(precio) <= 0) {
      alert("Por favor ingresá un nombre y un precio válido.");
      return;
    }
    agregarProducto({ id: Date.now(), nombre: nombre.trim(), precio: Number(precio) });
    setNombre("");
    setPrecio("");
    alert(`Producto "${nombre}" agregado a ${personaSeleccionada}.`);
    navigate("/"); // Volver al home después de agregar
  };

  return (
    <div  >
      <h2>Agregar producto fuera de carta</h2>
      <p>Persona seleccionada: <b>{personaSeleccionada || "Ninguna"}</b></p>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
         
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
         
      />
      <button onClick={handleAgregar}>Agregar producto</button>
    </div>
  );
};

export default ProductoExtra;
