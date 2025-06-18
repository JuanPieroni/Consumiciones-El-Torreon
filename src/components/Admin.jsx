import React, { useState } from "react"
import FormularioProducto from "./FormularioProducto"
import EditarProductos from "./EditarProductos"
import { useNavigate } from "react-router-dom"
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Stack,
    Divider,
    Box,
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import Swal from "sweetalert2"

const Admin = () => {
    const navigate = useNavigate()
    const [clave, setClave] = useState("")
    const [autorizado, setAutorizado] = useState(false)

    const claveCorrecta = "2736" // Cambiala por la tuya

    const handleLogin = () => {
        if (clave === claveCorrecta) {
            setAutorizado(true)
        } else {
            Swal.fire({
               
                text: "Contraseña incorrecta.",
                icon: "error",
            })
        }
    }

    if (!autorizado) {
        return (
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Acceso restringido
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            type="password"
                            label="Ingresá la clave"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" onClick={handleLogin}>
                            Ingresar
                        </Button>
                    </Stack>
                </Paper>
                <Box p={4} textAlign="center">
                    <Button
                        variant="contained"
                        startIcon={<HomeIcon />}
                        onClick={() => navigate("/")}
                    >
                        Volver al inicio
                    </Button>
                </Box>
            </Container>
        )
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <FormularioProducto />
            <Divider sx={{ my: 4 }} />
            <EditarProductos />
            <Box p={4} textAlign="center">
                <Button
                    variant="contained"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </Button>
            </Box>
        </Container>
    )
}

export default Admin
