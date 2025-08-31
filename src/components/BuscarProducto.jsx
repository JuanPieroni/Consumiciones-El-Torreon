import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import {
    Paper,
    Typography,
    TextField,
    Stack,
    Card,
    CardContent,
    Button,
} from "@mui/material"

const BuscarProducto = ({ personaSeleccionada, agregarProducto }) => {
    const [productos, setProductos] = useState([])
    const [filtro, setFiltro] = useState("")

    useEffect(() => {
        const fetchProductos = async () => {
            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .order("nombre", { ascending: true })

            if (!error) {
                setProductos(data)
            }
        }

        fetchProductos()
    }, [])

    const productosFiltrados = productos.filter(
        (prod) =>
            prod.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            (prod.categoria || "")
                .toLowerCase()
                .includes(filtro.toLowerCase()) ||
            (prod.subcategoria || "")
                .toLowerCase()
                .includes(filtro.toLowerCase()) ||
            (prod.precio || "").toString().includes(filtro)
    )

    return (
        <Paper
            sx={{
                p: 2,
                m: 2,
                bgcolor: "#bcbcbccd",
                borderRadius: 3,
                boxShadow: "0 2px 3px hsla(10, 5%, 46%, 0.51)",
                border: "2px solid #a6a6a6ff",
            }}
        >
            <TextField
                label="Buscar producto o categoria"
                variant="outlined"
                fullWidth
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            {filtro.trim() && productosFiltrados.length > 0 ? (
                <Stack spacing={1} sx={{ mt: 2 }}>
                    {productosFiltrados.map((prod) => (
                        <Card
                            key={prod.id}
                            sx={{
                                backgroundColor:" hsla(90, 29%, 95%, 0.87)",
                                border: "1px solid #e0e0e0",
                                borderRadius: 3,
                                boxShadow: "0 2px 3px hsla(10, 5%, 46%, 0.51)",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    
                                    variant="h7"
                                    sx={{   fontWeight: "bold" }}>
                                        
                                    {prod.nombre}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "info.main",
                                        fontWeight: "bold",
                                        fontSize: "0.8rem",
                                    }}
                                >
                                    ${prod.precio}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontWeight: "bold"}}
                                   
                                >
                                    {prod.categoria}
                                </Typography>
                                {prod.subcategoria && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "text.secondary",
                                            
                                        }}
                                    >
                                        {prod.subcategoria}
                                    </Typography>
                                )}

                                {personaSeleccionada && (
                                    <Button
                                        variant="text"
                                        sx={{
                                            mt: 1,
                                            color: "hsla(8, 86%, 46%, 0.51)",
                                            border:"1px solid black"
                                        }}
                                        onClick={() => agregarProducto(prod)}
                                    >
                                        Agregar a {personaSeleccionada}
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            ) : filtro.trim() ? (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >
                    No se encontraron productos que coincidan.
                </Typography>
            ) : null}
        </Paper>
    )
}

export default BuscarProducto
