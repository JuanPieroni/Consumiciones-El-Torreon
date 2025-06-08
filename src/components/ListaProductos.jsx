import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import styles from "./ListaProdutos.module.css"

const ListaProductos = ({ personaSeleccionada, agregarProducto }) => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    const cargarProductos = async () => {
      const { data, error } = await supabase.from("productos").select("*")
      if (error) {
        console.error("Error al cargar productos:", error.message)
        return
      }
      setProductos(data)
    }

    cargarProductos()
  }, [])

  const handleAgregar = (producto) => {
    if (!personaSeleccionada) {
      alert("Seleccioná una persona primero")
      return
    }
    agregarProducto(producto)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}>Productos</h3>
      <div className={styles.lista}>
        {productos.map((producto) => (
          <button
            key={producto.id}
            className={styles.boton}
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

