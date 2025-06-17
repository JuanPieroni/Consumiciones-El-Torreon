import React, { useState } from "react"
import { Grid, Paper, Stack, Typography, TextField, Button } from "@mui/material"

const SelectorPersona = ({
    personas,
    agregarPersona,
    personaSeleccionada,
    setPersonaSeleccionada,
    eliminarPersona,
}) => {
    const [nombreInput, setNombreInput] = useState("")

    const handleAgregar = () => {
        if (nombreInput.trim() !== "") {
            agregarPersona(nombreInput.trim())
            setNombreInput("")
        }
    }

    return (
        <Paper elevation={3} sx={{ p: 4, m: 2, bgcolor: "#f9f9f9" }}>
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

            <Typography variant="subtitle1" gutterBottom>
                {personaSeleccionada
                    ? `Agregando productos a: ${personaSeleccionada}`
                    : "Seleccioná una persona"}
            </Typography>

            <Grid container spacing={2}>
                {personas.map((persona) => {
                    const isSelected = persona === personaSeleccionada
                    return (
                        <Grid item xs={12} sm={6} md={4} key={persona}>
                            <Paper
                                sx={{
                                    p: 2,
                                    textAlign: "center",
                                    bgcolor: isSelected
                                        ? "primary.light"
                                        : "background.paper",
                                    color: isSelected
                                        ? "primary.contrastText"
                                        : "text.primary",
                                    border: isSelected
                                        ? "2px solid"
                                        : "1px solid #ccc",
                                    borderColor: isSelected
                                        ? "primary.main"
                                        : "#ccc",
                                    transition:
                                        "background-color 0.3s, border-color 0.3s",
                                    elevation: isSelected ? 3 : 1,
                                }}
                            >
                                <Typography variant="h6">{persona}</Typography>
                                <Stack
                                    spacing={1}
                                    mt={1}
                                    direction="row"
                                    justifyContent="center"
                                >
                                    <Button
                                        variant={
                                            isSelected ? "contained" : "outlined"
                                        }
                                        color="primary"
                                        onClick={() =>
                                            setPersonaSeleccionada(persona)
                                        }
                                    >
                                        Seleccionar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => eliminarPersona(persona)}
                                    >
                                        Pagó
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Paper>
    )
}

export default SelectorPersona
