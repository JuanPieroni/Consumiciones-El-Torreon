import React from "react"
import { useProductos } from "../context/ProductosContext.jsx"
import { Box, Typography, Grid, Button, Paper } from "@mui/material"

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
        <Paper
            elevation={3}
            sx={{
                
                p: 2,
                m: 2,
                bgcolor: "#f0f0f0",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Lista de Productos
            </Typography>
            <Grid container spacing={2}>
                {productos.map((producto) => (
                    <Grid item xs={6} sm={4} md={3} key={producto.id}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => handleAgregar(producto)}
                            sx={{
                                textTransform: "none",
                                bgcolor: "#1976d2",
                                ":hover": {
                                    bgcolor: "#1565c0",
                                },
                            }}
                        >
                            {producto.nombre}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}

export default ListaProductos
