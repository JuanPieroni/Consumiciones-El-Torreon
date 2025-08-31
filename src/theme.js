// theme.js
import { createTheme } from "@mui/material/styles"
import "@fontsource/cinzel"
import "@fontsource/playfair-display"
import "@fontsource/cormorant-garamond"
import "@fontsource/libre-baskerville"

const theme = createTheme({
    typography: {
        fontFamily: `"Cinzel",   serif`,
        h4: {
            fontWeight: 700,
            letterSpacing: "0.5px",
        },
        body1: {
            fontSize: "1rem",
        },
        button: {
            textTransform: "none",
            fontWeight: "bold",
        },
    },
    palette: {
        primary: {
            main: "#1976d2", // Celeste principal
        },
        secondary: {
            main: "#90a4ae", // Gris azulado suave
        },
        background: {
            default: "#f5f7fa", // Gris muy claro con tinte azul
            paper: "#ffffff",
        },
        text: {
            primary: "#37474f", // Gris oscuro azulado
            secondary: "#546e7a", // Gris medio azulado
        },
        warning: {
            main: "#b0bec5", // Gris claro azulado
        },
    },
})
export default theme
