import React from "react"
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Menu,
    MenuItem,
    Box,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Título o logo */}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Consumos El Torreon III
                </Typography>

                {/* Botones visibles en pantallas grandes */}
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/admin">
                        Admin
                    </Button>
                    <Button color="inherit" component={Link} to="/historial">
                        Historial
                    </Button>
                </Box>

                {/* Menú hamburguesa para móviles */}
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem
                            component={Link}
                            to="/"
                            onClick={handleMenuClose}
                        >
                            Home
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/admin"
                            onClick={handleMenuClose}
                        >
                            Admin
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/historial"
                            onClick={handleMenuClose}
                        >
                            Historial
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
