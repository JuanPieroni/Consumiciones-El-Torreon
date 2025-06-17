import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Stack,
    Divider,
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

            <Typography variant="subtitle1" gutterBottom>
                {personaSeleccionada
                    ? `Agregando productos a: ${personaSeleccionada}`
                    : "Seleccioná una persona"}
            </Typography>

            <Stack
                spacing={1}
                mb={3}
                direction={{ xs: "row", sm: "row" }}
                justifyContent="center"
                alignContent={"center"}
                useFlexGap={true}
                flexWrap="wrap"
                alignSelf={"center"}
                sx={{
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {personas.map((persona) => {
                    const isSelected = persona === personaSeleccionada
                    return (
                        <Card
                            key={persona}
                            sx={{
                                borderRadius: 1,
                                boxShadow: isSelected ? 4 : 1,
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
                            }}
                        >
                            <CardContent
                                onClick={() => setPersonaSeleccionada(persona)}
                            >
                                <Typography
                                    variant={"outlined"}
                                    mb={1}
                                    textAlign={"center"}
                                >
                                    {persona}
                                </Typography>
                                <Stack
                                    direction="column"
                                    spacing={10}
                                    justifyContent="center"
                                ></Stack>
                            </CardContent>
                        </Card>
                    )
                })}
            </Stack>

            <Box textAlign="center"></Box>
        </Box>
    )
}

export default SelectorPersona
