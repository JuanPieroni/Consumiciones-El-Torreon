import React, { useMemo } from "react"
import { useProductos } from "../context/ProductosContext"
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
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu"
import LocalDiningIcon from "@mui/icons-material/LocalDining"
import Swal from "sweetalert2"

const ListaProductos = React.memo(({ personaSeleccionada, agregarProducto }) => {
    const { productos } = useProductos()
    const [expanded, setExpanded] = React.useState(false)

    const handleAgregar = (producto) => {
        if (!personaSeleccionada) {
            Swal.fire({
                //c¿como hacer para que este title se vea en minuscula ?
                icon: "warning",
                title: "Selecciona una persona",
                text: "Por favor, selecciona una persona antes de agregar productos.",
                confirmButtonText: "Aceptar",
                customClass: {
                    title: "text-lowercase", // clase personalizada para el título
                },
            })
            return
        }
        agregarProducto(producto)
    }

    // Agrupar productos por categoría y subcategoría (memoizado)
    const productosPorCategoria = useMemo(() => {
        return productos.reduce((acc, producto) => {
            const categoria = producto.categoria || "Otros"

            if (!acc[categoria])
                acc[categoria] = { productos: [], subcategorias: {} }

            if (producto.subcategoria) {
                if (!acc[categoria].subcategorias[producto.subcategoria]) {
                    acc[categoria].subcategorias[producto.subcategoria] = []
                }
                acc[categoria].subcategorias[producto.subcategoria].push(producto)
            } else {
                acc[categoria].productos.push(producto)
            }

            return acc
        }, {})
    }, [productos])

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
        <div style={{ padding: "0.5rem" }}>
            <Typography 
                variant="h5" 
                gutterBottom 
                align="center" 
                sx={{ 
                    mt: 5,
                    mb: 3,
                    fontWeight: 'bold',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    flexWrap: 'wrap'
                }}
            >
                <RestaurantMenuIcon sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' }, color: 'secondary.main' }} />
              CARTA 
                <LocalDiningIcon sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem' }, color: 'secondary.main' }} />
            </Typography>
            {Object.entries(productosPorCategoria).map(
                ([categoria, subcategorias]) => (
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
                        <AccordionDetails
                            onClick={(e) => {
                                setExpanded(false)
                            }}
                            sx={{ p: 0 }}
                        >
                            {/* Productos sin subcategoría - directo en la categoría */}
                            {subcategorias.productos.length > 0 && (
                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    {subcategorias.productos.map((producto) => (
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
                                                    justifyContent:
                                                        "space-between",
                                                    textAlign: "center",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        transform:
                                                            "scale(1.03)",
                                                        backgroundColor:
                                                            "#f0f0f0",
                                                    },
                                                    "&:active": {
                                                        backgroundColor:
                                                            "#e0f7fa",
                                                    },
                                                    minHeight: 100,
                                                    maxHeight: 130,
                                                }}
                                            >
                                                <CardContent
                                                    sx={{
                                                        flexGrow: 1,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        px: 1,
                                                        py: 2,
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleAgregar(producto)
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: "1rem",
                                                            mb: 0.8,
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
                                                            color: "info.main",
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
                            )}

                            {/* Subcategorías */}
                            {Object.entries(subcategorias.subcategorias).map(
                                ([subcategoria, items]) => (
                                    <Accordion
                                        key={`${categoria}-${subcategoria}`}
                                        sx={{
                                            boxShadow: "none",
                                            "&:before": { display: "none" },
                                            backgroundColor: "#f9f9f9",
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            onClick={(e) => e.stopPropagation()}
                                            sx={{ minHeight: 48 }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{
                                                    color: "info.main",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {subcategoria}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                // Cerrar subcategoría al hacer click en cualquier lado
                                                const accordion =
                                                    e.currentTarget.closest(
                                                        ".MuiAccordion-root"
                                                    )
                                                if (accordion) {
                                                    const summary =
                                                        accordion.querySelector(
                                                            ".MuiAccordionSummary-root"
                                                        )
                                                    if (summary) summary.click()
                                                }
                                            }}
                                        >
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
                                                                flexDirection:
                                                                    "column",
                                                                justifyContent:
                                                                    "space-between",
                                                                textAlign:
                                                                    "center",
                                                                cursor: "pointer",
                                                                "&:hover": {
                                                                    transform:
                                                                        "scale(1.03)",
                                                                    backgroundColor:
                                                                        "#f0f0f0",
                                                                },
                                                                "&:active": {
                                                                    backgroundColor:
                                                                        "#e0f7fa",
                                                                },
                                                                minHeight: 100,
                                                                maxHeight: 130,
                                                            }}
                                                        >
                                                            <CardContent
                                                                sx={{
                                                                    flexGrow: 1,
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    alignItems:
                                                                        "center",
                                                                    justifyContent:
                                                                        "center",
                                                                    px: 1,
                                                                    py: 2,
                                                                }}
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation()
                                                                    handleAgregar(
                                                                        producto
                                                                    )
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{
                                                                        fontWeight: 600,
                                                                        fontSize:
                                                                            "0.75rem",
                                                                        mb: 0.5,
                                                                        color: "text.primary",
                                                                        textAlign:
                                                                            "center",
                                                                        lineHeight: 1.2,
                                                                        bold: true,
                                                                    }}
                                                                >
                                                                    {
                                                                        producto.nombre
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    variant="h6"
                                                                    sx={{
                                                                        color: "info.main",
                                                                        fontWeight:
                                                                            "bold",
                                                                        fontSize:
                                                                            "1rem",
                                                                    }}
                                                                >
                                                                    $
                                                                    {
                                                                        producto.precio
                                                                    }
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            )}
                        </AccordionDetails>
                    </Accordion>
                )
            )}
        </div>
    )
})

export default ListaProductos
