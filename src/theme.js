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
            main: "#424242", // Gris oscuro vibrante
        },
        secondary: {
            main: "#757575", // Gris medio
        },
        background: {
            default: "#fafafa", // Gris muy claro
            paper: "#ffffff",
        },
        text: {
            primary: "#212121", // Gris muy oscuro
            secondary: "#616161", // Gris medio oscuro
        },
        warning: {
            main: "#9e9e9e", // Gris claro
        },
        info: {
            main: "#5e72e4", // Azul vibrante pero no muy fuerte
        },
    },
})
export default theme
