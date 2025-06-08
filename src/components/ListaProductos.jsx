import React from "react"
import styles from "./ListaProdutos.module.css"

const ListaProductos = ({ productos, personaSeleccionada, agregarProducto }) => {
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

