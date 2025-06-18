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

const ResumenConsumo = ({ consumos, eliminarProducto, eliminarPersona }) => {
    const granTotal = Object.values(consumos).reduce(
        (acc, productos) =>
            acc + productos.reduce((sum, item) => sum + item.precio, 0),
        0
    )

    return (
        <div style={{ padding: "1rem" }}>
            <Typography variant="h5" gutterBottom align="center">
                Resumen de consumos
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
                                    <Typography variant="h6">
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
                                                                                    "ellipsis",
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
                                                            mt: 2,
                                                            px: 2,
                                                            py: 0.4,
                                                            fontWeight: "bold",
                                                            background:
                                                                "linear-gradient(45deg, #43cea2 30%, #185a9d 90%)",
                                                            color: "#fff",
                                                            borderRadius: 2,
                                                            boxShadow:
                                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                                            textTransform:
                                                                "none",
                                                            transition:
                                                                "all 0.3s ease",
                                                            "&:hover": {
                                                                background:
                                                                    "linear-gradient(45deg, #2bc0e4 30%, #eaecc6 90%)",
                                                                transform:
                                                                    "scale(1.05)",
                                                                boxShadow:
                                                                    "0px 6px 25px rgba(0, 0, 0, 0.3)",
                                                            },
                                                        }}
                                                    >
                                                        Pagó
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            fontWeight: "bold",
                                                            color: "text.secondary",
                                                        }}
                                                    >
                                                        Total: ${total}
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

            <Typography
                variant="h6"
                align="left"
                sx={{ mt: 3, fontWeight: "bold" }}
            >
                Total: ${granTotal} - 10% ${granTotal * 0.1}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
                variant="h8"
                align="left"
                sx={{ mt: 3, fontWeight: "bold" }}
            >
                A pagar : ${granTotal - granTotal * 0.1}
            </Typography>
        </div>
    )
}

export default ResumenConsumo
