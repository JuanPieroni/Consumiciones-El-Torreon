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
    const [mensaje, setMensaje] = useState("")
    const [open, setOpen] = useState(false)
    const [tipo, setTipo] = useState("success")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!nombre.trim() || !precio || !categoria.trim()) {
            setMensaje("Todos los campos son obligatorios")
            setTipo("error")
            setOpen(true)
            return
        }

        const { error } = await supabase
            .from("productos")
            .upsert([
                {
                    nombre: nombre.trim(),
                    precio: parseFloat(precio),
                    categoria: categoria.trim(),
                },
            ])

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
            <Typography
                variant="h4"
                gutterBottom
                color="primary"
                align="center"
            >
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
                <Typography
                    variant="h6"
                    gutterBottom
                    color="text.primary"
                    align="center"
                >
                    Agregar nuevo producto
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        mt: 2,
                    }}
                >
                    <TextField
                        fullWidth
                        label="Nombre del producto"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        autoFocus
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Precio"
                        variant="outlined"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        inputProps={{ min: 0, step: 0.01 }}
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
                                mt: 1,
                                background:
                                    "linear-gradient(135deg, #00bcd4 0%, #8bc34a 100%)",
                                color: "#fff",
                                fontWeight: "bold",
                                px: 5,
                                py: 1.2,
                                borderRadius: 2,
                                textTransform: "none",
                                boxShadow:
                                    "0px 4px 8px rgba(0, 188, 212, 0.4), 0px 0px 10px rgba(139, 195, 74, 0.4)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #2196f3 0%, #4caf50 100%)",
                                    transform: "scale(1.05)",
                                    boxShadow:
                                        "0px 6px 12px rgba(33, 150, 243, 0.6), 0px 0px 15px rgba(76, 175, 80, 0.6)",
                                },
                            }}
                        >
                            Agregar
                        </Button>
                    </Stack>
                </Box>
            </Paper>

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
