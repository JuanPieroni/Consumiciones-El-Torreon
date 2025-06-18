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

const HistorialPagos = ({ pagos, setPagos, resetParcial }) => {
    const navigate = useNavigate()

    if (pagos.length === 0) return null

    const totalPagado = pagos.reduce((acc, { total }) => acc + total, 0)

    return (
        <Box p={2}>
            <Typography variant="h5" mb={2}>
                Historial de pagos
            </Typography>

            {pagos.map(({ nombre, total, consumos = [] }, idx) => (
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
                            {consumos.map((item, i) => (
                                <ListItem key={i}>
                                    <ListItemIcon>
                                        <FastfoodIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.nombre}
                                        secondary={`$${item.precio}`}
                                    />
                                </ListItem>
                            ))}
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

            <Typography variant="h6">Total de pagos: ${totalPagado}</Typography>

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
                    onClick={() => {
                        setPagos([])
                        localStorage.removeItem("pagos")
                    }}
                >
                    Eliminar historial de pagos
                </Button>
                <button onClick={resetParcial}>Reset</button>
            </Box>
        </Box>
    )
}

export default HistorialPagos
