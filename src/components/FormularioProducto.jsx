import React, { useState } from "react"
import { supabase } from "../supabaseClient"
import { Container, Paper, Typography } from "@mui/material"

const FormularioProducto = () => {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!nombre || !precio || !categoria) {
            alert("Todos los campos son obligatorios")
            return
        }

        const { data, error } = await supabase
            .from("productos")
            .upsert([{ nombre, precio: parseFloat(precio), categoria }])

        if (error) {
            console.error("Error al agregar producto:", error.message)
            alert("Hubo un error. Revisá la consola.")
            return
        }

        alert("Producto agregado con éxito!")
        setNombre("")
        setPrecio("")
        setCategoria("")
    }

    return (
        <>
            <Container
                maxWidth="md"
                sx={{ mt: 4, mb: 4, bgcolor: "#212121", p: 4, borderRadius: 2 }}
            >
                <Typography variant="h4" color="white" gutterBottom>
                    Panel de Administración
                </Typography>

                <Paper
                    elevation={4}
                    sx={{ p: 3, bgcolor: "#424242", color: "white" }}
                >
                    <Typography variant="h6">Agregar nuevo producto</Typography>
                    <form onSubmit={handleSubmit}>
                        <h3>Agregar nuevo producto</h3>

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

                        <input
                            type="text"
                            placeholder="Categoría (ej: Bebidas, Postres)"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        />

                        <button type="submit">Agregar</button>
                    </form>
                </Paper>
            </Container>
        </>
    )
}

export default FormularioProducto
