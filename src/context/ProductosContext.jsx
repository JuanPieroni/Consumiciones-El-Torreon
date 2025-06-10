import React, { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

const ProductosContext = createContext()

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([])

  // Carga inicial de productos
  const cargarProductos = async () => {
    const { data, error } = await supabase.from("productos").select("*")
    if (error) {
      console.error("Error al cargar productos:", error.message)
      return
    }
    setProductos(data)
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  // Insertar o actualizar producto y luego refrescar la lista
  const guardarProducto = async (producto) => {
    try {
      const { data: existente, error: errorExistente } = await supabase
        .from("productos")
        .select("*")
        .eq("nombre", producto.nombre)
        .maybeSingle()

      if (errorExistente) throw errorExistente

      if (!existente) {
        const { error: errorInsert } = await supabase
          .from("productos")
          .insert([producto])

        if (errorInsert) throw errorInsert
      } else if (existente.precio !== producto.precio) {
        const { error: errorUpdate } = await supabase
          .from("productos")
          .update({ precio: producto.precio })
          .eq("nombre", producto.nombre)

        if (errorUpdate) throw errorUpdate
      }

      // Recargar productos para actualizar estado
      await cargarProductos()
    } catch (err) {
      console.error("Error al guardar producto:", err.message)
      throw err
    }
  }

  return (
    <ProductosContext.Provider value={{ productos, guardarProducto }}>
      {children}
    </ProductosContext.Provider>
  )
}

export const useProductos = () => useContext(ProductosContext)
