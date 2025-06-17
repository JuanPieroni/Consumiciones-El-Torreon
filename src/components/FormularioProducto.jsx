import React, { useState } from "react"
import { supabase } from "../supabaseClient"
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material"

const FormularioProducto = () => {
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")
    const [mensaje, setMensaje] = useState("") // Texto del mensaje
    const [open, setOpen] = useState(false) // Controla visibilidad
    const [tipo, setTipo] = useState("success") // success | error

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!nombre || !precio || !categoria) {
            setMensaje("Todos los campos son obligatorios")
            setTipo("error")
            setOpen(true)
            return
        }

        const { error } = await supabase
            .from("productos")
            .upsert([{ nombre, precio: parseFloat(precio), categoria }])

        if (error) {
            console.error("Error al agregar producto:", error.message)
            setMensaje("Error al agregar el producto")
            setTipo("error")
            setOpen(true)
            return
        }

        setMensaje("Producto agregado con éxito!")
        setTipo("success")
        setOpen(true)
        setNombre("")
        setPrecio("")
        setCategoria("")
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                mt: 5,
                mb: 5,
                bgcolor: "#f5f5f5",
                p: 3,
                borderRadius: 3,
            }}
        >
            <Typography variant="h4" gutterBottom color="primary">
                Panel de Administración
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    bgcolor: "#ffffff",
                    borderRadius: 3,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="h6" gutterBottom color="text.primary">
                    Agregar nuevo producto
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Nombre del producto"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Precio"
                        variant="outlined"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Categoría (ej: Bebidas, Postres)"
                        variant="outlined"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    />

                    <Stack direction="row" justifyContent="flex-end">
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                background:
                                    "linear-gradient(135deg, #00bcd4 0%, #8bc34a 100%)",
                                color: "#fff",
                                fontWeight: "bold",
                                px: 4,
                                py: 1,
                                borderRadius: 2,
                                textTransform: "none",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #2196f3 0%, #4caf50 100%)",
                                    transform: "scale(1.03)",
                                },
                            }}
                        >
                            Agregar
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            {/* Snackbar con alerta visual */}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity={tipo}
                    onClose={() => setOpen(false)}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {mensaje}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default FormularioProducto
