import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
 
import { useProductos } from "../context/ProductosContext.jsx"

const ListaProductos = ({ personaSeleccionada, agregarProducto }) => {
  const { productos } = useProductos()

  const handleAgregar = (producto) => {
    if (!personaSeleccionada) {
      alert("Seleccioná una persona primero")
      return
    }
    agregarProducto(producto)
  }

  return (
    <div  >
      <h3 >Productos</h3>
      <div >
        {productos.map((producto) => (
          <button
            key={producto.id}
       
            onClick={() => handleAgregar(producto)}
          >
            {producto.nombre} - ${producto.precio}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ListaProductos
