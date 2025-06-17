import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

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

    const productosPorCategoria = productos.reduce((acc, producto) => {
        const categoria = producto.categoria || "Otros"
        if (!acc[categoria]) acc[categoria] = []
        acc[categoria].push(producto)
        return acc
    }, {})

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Productos
            </Typography>

            {Object.entries(productosPorCategoria).map(([categoria, items]) => (
                <Accordion key={categoria}  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">
                            {categoria.toUpperCase()}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            {items.map((producto) => (
                                <Grid
                                    item
                                    xs={6}
                                    sm={4}
                                    md={3}
                                    key={producto.id}
                                >
                                    <Card>
                                        <CardContent>
                                            <Typography variant="subtitle1">
                                                {producto.nombre}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                ${producto.precio}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={() =>
                                                    handleAgregar(producto)
                                                }
                                                fullWidth
                                            >
                                                Agregar
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

export default ListaProductos
