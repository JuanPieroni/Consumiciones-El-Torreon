import React from "react"
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Grid,
    Divider,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

const ResumenConsumo = ({ consumos, eliminarProducto }) => {
    const granTotal = Object.values(consumos).reduce(
        (acc, productos) =>
            acc + productos.reduce((sum, item) => sum + item.precio, 0),
        0
    )

    return (
        <div style={{ padding: "1rem" }}>
            <Typography variant="h5" gutterBottom>
                Resumen de consumos
            </Typography>

            {Object.keys(consumos).length === 0 ? (
                <Typography color="text.secondary">
                    No hay consumos aún
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {Object.entries(consumos).map(([persona, productos]) => {
                        const total = productos.reduce(
                            (acc, item) => acc + item.precio,
                            0
                        )

                        return (
                            <Grid item xs={12} sm={6} md={4} key={persona}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {persona}
                                        </Typography>

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
                                                            {
                                                                id,
                                                                nombre,
                                                                precio,
                                                            },
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
                                                                    primary={`${nombre} - $${precio}`}
                                                                />
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>

                                                <Divider sx={{ my: 1 }} />

                                                <Typography
                                                    variant="subtitle2"
                                                    align="right"
                                                >
                                                    Total: ${total}
                                                </Typography>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            )}

            <Typography
                variant="h6"
                align="right"
                sx={{ mt: 3, fontWeight: "bold" }}
            >
                Gran Total: ${granTotal}
            </Typography>
        </div>
    )
}

export default ResumenConsumo
