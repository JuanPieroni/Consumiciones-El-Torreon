// components/ContainerPaper.jsx
import React from "react"
import { Paper } from "@mui/material"

const ContainerPaper = ({ children, sx = {}, elevation = 6 }) => {
    return (
        <Paper
            elevation={elevation}
            sx={{
                borderRadius: 3,
              
                p: 4,
                m: 3,
                bgcolor: "#fafafa",
                boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                ...sx, // para que puedas pasar estilos adicionales si querés
            }}
        >
            {children}
        </Paper>
    )
}

export default ContainerPaper
