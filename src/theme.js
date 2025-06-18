// theme.js
import { createTheme } from "@mui/material/styles"
import "@fontsource/cinzel"

const theme = createTheme({
    typography: {
        fontFamily: `"Cinzel", serif`,
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
            main: "#8bc34a",
        },
        secondary: {
            main: "#00bcd4",
        },
    },
})
export default theme
