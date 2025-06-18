import React, { useState, useEffect } from "react"
import { TextField, Button, Paper, Typography, Box } from "@mui/material"
import FormularioProducto from "./FormularioProducto"

const CLAVE_CORRECTA = "torreon123"

const Admin = () => {
    const [clave, setClave] = useState("")
    const [autorizado, setAutorizado] = useState(false)

    // Revisar si ya está logueado antes (por localStorage)
    useEffect(() => {
        const autorizadoAntes = localStorage.getItem("adminAutorizado")
        if (autorizadoAntes === "true") {
            setAutorizado(true)
        }
    }, [])

    const handleLogin = () => {
        if (clave === CLAVE_CORRECTA) {
            setAutorizado(true)
            localStorage.setItem("adminAutorizado", "true")
        } else {
            alert("Clave incorrecta")
        }
    }

    const handleLogout = () => {
        setAutorizado(false)
        localStorage.removeItem("adminAutorizado")
    }

    if (!autorizado) {
        return (
            <Paper elevation={3} sx={{ p: 4, m: 4, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Acceso restringido
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 300, margin: "0 auto" }}>
                    <TextField
                        type="password"
                        label="Ingresá la clave"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Ingresar
                    </Button>
                </Box>
            </Paper>
        )
    }

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="outlined" color="error" onClick={handleLogout}>
                    Cerrar sesión admin
                </Button>
            </Box>
            <FormularioProducto />
        </Box>
    )
}

export default Admin

