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
        <Paper sx={{ p: 3, m: 2 }}>
            <TextField
                label="Buscar producto o categoria"
                variant="outlined"
                fullWidth
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            {filtro.trim() && productosFiltrados.length > 0 ? (
                <Stack spacing={0.5}>
                    {productosFiltrados.map((prod) => (
                        <Card key={prod.id}>
                            <CardContent>
                                <Typography variant="h6">
                                    {prod.nombre}
                                </Typography>
                                <Typography variant="body1">
                                    Precio: ${prod.precio}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                   {prod.categoria}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {prod.subcategoria}
                                </Typography>

                                {personaSeleccionada && (
                                    <Button
                                        style={{
                                            backgroundColor:
                                                "hsla(8, 86%, 46%, 0.51)",
                                        }}
                                        variant="outlined"
                                        sx={{ mt: 1 }}
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
                <Typography variant="body1" color="text.secondary">
                    No se encontraron productos que coincidan.
                </Typography>
            ) : (
                <p></p>
            )}
        </Paper>
    )
}

export default BuscarProducto
