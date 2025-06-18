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
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const ListaProductos = ({ personaSeleccionada, agregarProducto }) => {
    const [productos, setProductos] = useState([])
    const [expanded, setExpanded] = useState(false) // cuál está expandido

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

    const handleChange = (categoria) => (event, isExpanded) => {
        setExpanded(isExpanded ? categoria : false)
        if (isExpanded) {
            // espera un poco para que se aplique la animación del Accordion
            setTimeout(() => {
                const element = document.getElementById(
                    `accordion-${categoria}`
                )
                if (element) {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    })
                }
            }, 150)
        }
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Productos
            </Typography>

            {Object.entries(productosPorCategoria).map(([categoria, items]) => (
                <Accordion
                    key={categoria}
                    expanded={expanded === categoria}
                    onChange={handleChange(categoria)}
                    TransitionProps={{ timeout: 600 }}
                    sx={{
                        transition: "box-shadow 0.3s ease",
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                        "&.Mui-expanded": {
                            boxShadow: "0px 6px 16px rgba(0,0,0,0.2)",
                        },
                    }}
                >
                    <AccordionSummary
                        id={`accordion-${categoria}`} // <- id para el scroll
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography variant="h6">
                            {categoria.toUpperCase()}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={2}>
                            {items.map((producto) => (
                                <Grid
                                    item
                                    xs={4}
                                    sm={4}
                                    md={3}
                                    key={producto.id}
                                >
                                    <Card
                                        sx={{
                                            height: "100%",
                                            border: "1px solid #e0e0e0",
                                            borderRadius: 3,
                                            boxShadow:
                                                "0 2px 10px rgba(0,0,0,0.08)",
                                            transition:
                                                "transform 0.2s ease, background-color 0.15s",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            textAlign: "center",
                                            cursor: "pointer",
                                            "&:hover": {
                                                transform: "scale(1.03)",
                                                backgroundColor: "#f0f0f0",
                                            },
                                            "&:active": {
                                                backgroundColor: "#e0f7fa", // feedback táctil para móviles
                                            },
                                            minHeight: 100, // altura mínima
                                            maxHeight: 130, // altura máxima (todas iguales)
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                flexGrow: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                px: 1,
                                                py: 2,
                                            }}
                                            onClick={() =>
                                                handleAgregar(producto)
                                            }
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: "0.75rem",
                                                    mb: 0.5,
                                                    color: "text.primary",
                                                    textAlign: "center",
                                                    lineHeight: 1.2,
                                                    bold: true,
                                                }}
                                            >
                                                {producto.nombre}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: "#43a047", // verde fuerte
                                                    fontWeight: "bold",
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                ${producto.precio}
                                            </Typography>
                                        </CardContent>
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
