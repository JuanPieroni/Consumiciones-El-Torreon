import React from "react"
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button,
    Divider,
    Grid,
    Box,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import DeleteIcon from "@mui/icons-material/Delete"
import PaidIcon from "@mui/icons-material/Paid"

import TotalAPagar from "./TotalAPagar"
import { CenterFocusStrong } from "@mui/icons-material"

const ResumenConsumo = ({ consumos, eliminarProducto, eliminarPersona }) => {
    const granTotal = Object.values(consumos).reduce(
        (acc, productos) =>
            acc + productos.reduce((sum, item) => sum + item.precio, 0),
        0
    )

    return (
        <div>
            <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={{
                    mt: 5,
                    mb: 3,
                    fontWeight: "bold",
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    flexWrap: "wrap",
                }}
            >
               ♦ Resumen de Consumos ♦
            </Typography>
            {Object.keys(consumos).length === 0 ? (
                <Typography
                    color="text.secondary"
                    variant="body1"
                    align="center"
                >
                    No hay consumos aún
                </Typography>
            ) : (
                <div>
                    {Object.entries(consumos).map(([persona, productos]) => {
                        const total = productos.reduce(
                            (acc, item) => acc + item.precio,
                            0
                        )

                        return (
                            <Accordion
                                key={persona}
                                defaultExpanded={false}
                                sx={{ marginBottom: 2 }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography
                                        sx={{
                                            flexShrink: 0,

                                            fontSize: "1.2rem",

                                            letterSpacing: "0.05em",
                                            textShadow:
                                                "1px 1px 2px rgba(0,0,0,0.1)",
                                            marginRight: "10px",
                                            marginLeft: "10px",
                                            padding: "5px",
                                            border: "1px solid black",
                                            borderRadius: "5px",
                                            backgroundColor:
                                                " rgb(237, 236, 217)", // color de fondo claro
                                        }}
                                        variant="h6"
                                    >
                                        {persona} - ${total}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {productos.length === 0 ? (
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            No consumió nada
                                        </Typography>
                                    ) : (
                                        <>
                                            <List dense>
                                                {productos.map(
                                                    (
                                                        { id, nombre, precio },
                                                        idx
                                                    ) => (
                                                        <ListItem
                                                            key={`${id}-${idx}`}
                                                            secondaryAction={
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="delete"
                                                                    onClick={() =>
                                                                        eliminarProducto(
                                                                            persona,
                                                                            idx
                                                                        )
                                                                    }
                                                                >
                                                                    <DeleteIcon color="error" />
                                                                </IconButton>
                                                            }
                                                        >
                                                            <ListItemText
                                                                primary={
                                                                    <Box
                                                                        sx={{
                                                                            display:
                                                                                "flex",
                                                                            justifyContent:
                                                                                "space-between",
                                                                            alignItems:
                                                                                "center",
                                                                            width: "100%",
                                                                            fontFamily:
                                                                                "Playfair Display, serif", // o la fuente de carta
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant="body1"
                                                                            sx={{
                                                                                whiteSpace:
                                                                                    "nowrap",
                                                                                overflow:
                                                                                    "hidden",
                                                                                textOverflow:
                                                                                    "clip",
                                                                            }}
                                                                        >
                                                                            {
                                                                                nombre
                                                                            }
                                                                        </Typography>

                                                                        <Box
                                                                            component="span"
                                                                            sx={{
                                                                                flexGrow: 1,
                                                                                borderBottom:
                                                                                    "1px dotted #ccc",
                                                                                mx: 2,
                                                                                height: "0.8em",
                                                                            }}
                                                                        />

                                                                        <Typography
                                                                            variant="body1"
                                                                            sx={{
                                                                                whiteSpace:
                                                                                    "nowrap",
                                                                            }}
                                                                        >
                                                                            $
                                                                            {
                                                                                precio
                                                                            }
                                                                        </Typography>
                                                                    </Box>
                                                                }
                                                            />
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>

                                            <Divider sx={{ my: 1 }} />

                                            <Grid
                                                container
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Button
                                                        endIcon={<PaidIcon />}
                                                        variant="contained"
                                                       
                                                        onClick={() =>
                                                            eliminarPersona(
                                                                persona
                                                            )
                                                        }
                                                        sx={{
                                                            mt: 1,
                                                            px: 1.5,
                                                            py: 0.8,
                                                            fontWeight: "bold",
                                                            borderRadius: 3,
                                                            textTransform:
                                                                "none",
                                                            fontSize: "0.8rem",
                                                            boxShadow: 2,
                                                            backgroundColor:"hsla(145, 91%, 42%, 0.51)",
                                                        }}
                                                    >
                                                        Pagó
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontSize: "1.2rem",
                                                            fontWeight: "bold",
                                                            color: "text.secondary",
                                                        }}
                                                    >
                                                        Total: $ {total}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </div>
            )}
            <Divider sx={{ my: 2 }} />
            <TotalAPagar granTotal={granTotal} />
        </div>
    )
}

export default ResumenConsumo
