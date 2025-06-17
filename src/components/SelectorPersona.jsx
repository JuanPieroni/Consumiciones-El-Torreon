import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    Grid,
    Stack,
} from "@mui/material"

const SelectorPersona = ({
    personas,
    agregarPersona,
    personaSeleccionada,
    setPersonaSeleccionada,
    eliminarPersona,
}) => {
    const [nombreInput, setNombreInput] = useState("")
    const navigate = useNavigate()

    const handleAgregar = () => {
        if (nombreInput.trim() !== "") {
            agregarPersona(nombreInput.trim())
            setNombreInput("")
        }
    }

    return (
        <Box
            p={2}
            m={2}
            sx={{ bgcolor: "#f9f9f9", borderRadius: 3, boxShadow: 3 }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Agregar o seleccionar persona
            </Typography>

            <Stack spacing={2} direction={{ xs: "column", sm: "row" }} mb={3}>
                <TextField
                    label="Nombre"
                    variant="outlined"
                    value={nombreInput}
                    onChange={(e) => setNombreInput(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAgregar}
                >
                    Agregar
                </Button>
            </Stack>

            <Typography variant="subtitle1" gutterBottom align="center">
                {personaSeleccionada
                    ? `Agregando productos a: ${personaSeleccionada}`
                    : "Seleccioná una persona"}
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {personas.map((persona) => {
                    const isSelected = persona === personaSeleccionada
                    return (
                        <Grid item xs={6} sm={4} md={3} key={persona}>
                            <Card
                                onClick={() => setPersonaSeleccionada(persona)}
                                sx={{
                                    cursor: "pointer",
                                    borderRadius: 2,

                                    bgcolor: isSelected
                                        ? "primary.light"
                                        : "background.paper",

                                    transition: "all 0.3s",
                                    height: "30px", // 🔽 MÁS CHICO
                                    minWidth: "10px", // 🔽 ANCHO MÍNIMO
                                    px: 1, // 🔽 padding horizontal
                                    py: 0.4, // 🔽 padding vertical
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="body2" noWrap>
                                    {persona}
                                </Typography>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default SelectorPersona
