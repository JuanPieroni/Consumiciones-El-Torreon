import React from "react"
import {
    Box,
    Typography,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import FastfoodIcon from "@mui/icons-material/Fastfood"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import DeleteIcon from "@mui/icons-material/Delete"
import HomeIcon from "@mui/icons-material/Home"
import { useNavigate } from "react-router-dom"

const HistorialPagos = ({ pagos, consumos, productos, limpiarLocalStorage }) => {
    const navigate = useNavigate()

    const totalPagado = pagos?.reduce((acc, { total }) => acc + total, 0) || 0

    // Render condicional: si no hay pagos, mostramos mensaje y botón
    if (!pagos || pagos.length === 0) {
        return (
            <Box p={4} textAlign="center">
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Aún no hay pagos registrados.
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </Button>
            </Box>
        )
    }

    const handleBorrarHistorial = () => {
        localStorage.removeItem("pagos")
        limpiarLocalStorage()
        navigate(0)
    }

    return (
        <Box p={2}>
            <Typography variant="h5" mb={2}>
                Historial de pagos
            </Typography>

            {pagos.map(({ nombre, total, consumos: items = [] }, idx) => (
                <Card key={idx} sx={{ mb: 2, borderRadius: 3, boxShadow: 4 }}>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                            <PersonIcon color="primary" />
                            <Typography variant="h6">{nombre}</Typography>
                        </Box>

                        <Typography variant="subtitle2" gutterBottom>
                            Detalle de consumos:
                        </Typography>

                        <List dense>
                            {items.map((item, i) => {
                                const prod = productos.find(
                                    (p) => p.nombre === item.nombre
                                )
                                const precio = prod ? prod.precio : item.precio
                                return (
                                    <ListItem key={i}>
                                        <ListItemIcon>
                                            <FastfoodIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.nombre}
                                            secondary={`$${precio}`}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>

                        <Divider sx={{ my: 1 }} />

                        <Box display="flex" alignItems="center" gap={1}>
                            <AttachMoneyIcon color="success" />
                            <Typography variant="subtitle1" fontWeight="bold">
                                Total abonado: ${total}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" mb={2}>
                Total de pagos: ${totalPagado}
            </Typography>

            <Box mt={2} display="flex" gap={2}>
                <Button
                    variant="outlined"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleBorrarHistorial}
                >
                    Eliminar historial de pagos
                </Button>
            </Box>
        </Box>
    )
}

export default HistorialPagos

