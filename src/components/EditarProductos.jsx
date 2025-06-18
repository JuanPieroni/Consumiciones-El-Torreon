import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import {
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    Card,
    CardContent,
} from "@mui/material"
import Swal from "sweetalert2"

const EditarProductos = () => {
    const [productosOriginales, setProductosOriginales] = useState([])
    const [productosEditados, setProductosEditados] = useState([])
    const [filtro, setFiltro] = useState("")

    useEffect(() => {
        const fetchProductos = async () => {
            const { data, error } = await supabase
                .from("productos")
                .select("*")
                .order("nombre", { ascending: true })

            if (!error) {
                setProductosOriginales(data)
                setProductosEditados(data)
            }
        }

        fetchProductos()
    }, [])

    const handleChange = (id, field, value) => {
        const nuevos = productosEditados.map((prod) =>
            prod.id === id ? { ...prod, [field]: value } : prod
        )
        setProductosEditados(nuevos)
    }

    const guardarCambios = async (producto) => {
        const productoOriginal = productosOriginales.find(
            (p) => p.id === producto.id
        )
        const datosActualizados = {
            id: producto.id,
            nombre:
                producto.nombre !== undefined
                    ? producto.nombre
                    : productoOriginal.nombre,
            precio:
                producto.precio !== undefined
                    ? producto.precio
                    : productoOriginal.precio,
            categoria:
                producto.categoria !== undefined
                    ? producto.categoria
                    : productoOriginal.categoria,
        }

        const { error } = await supabase
            .from("productos")
            .upsert([datosActualizados])

        if (error) {
            Swal.fire("Error", "No se pudo guardar el producto.", "error")
        } else {
            Swal.fire(
                "Actualizado",
                "El producto fue actualizado con éxito.",
                "success"
            )
            setProductosOriginales((prev) =>
                prev.map((p) => (p.id === producto.id ? datosActualizados : p))
            )
        }
    }

    const eliminarProducto = async (id) => {
        const confirmacion = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el producto definitivamente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })

        if (confirmacion.isConfirmed) {
            const { error } = await supabase
                .from("productos")
                .delete()
                .eq("id", id)

            if (error) {
                Swal.fire("Error", "No se pudo eliminar el producto.", "error")
            } else {
                setProductosOriginales((prev) =>
                    prev.filter((p) => p.id !== id)
                )
                setProductosEditados((prev) => prev.filter((p) => p.id !== id))
                Swal.fire(
                    "Eliminado",
                    "El producto fue eliminado con éxito.",
                    "success"
                )
            }
        }
    }

    const productosFiltrados = productosEditados.filter(
        (prod) =>
            prod.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
            prod.categoria.toLowerCase().includes(filtro.toLowerCase())
    )

    return (
        <Paper sx={{ p: 3, m: 2 }}>
            <Typography variant="h5" gutterBottom>
                Editar productos
            </Typography>

            <TextField
                label="Buscar producto"
                variant="outlined"
                fullWidth
                sx={{ mb: 3 }}
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            {filtro.trim() && productosFiltrados.length > 0 ? (
                <Stack spacing={2}>
                    {productosFiltrados.map((prod) => (
                        <Card key={prod.id}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <TextField
                                        label="Nombre"
                                        value={prod.nombre}
                                        onChange={(e) =>
                                            handleChange(
                                                prod.id,
                                                "nombre",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <TextField
                                        label="Precio"
                                        type="number"
                                        value={prod.precio}
                                        onChange={(e) =>
                                            handleChange(
                                                prod.id,
                                                "precio",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <TextField
                                        label="Categoría"
                                        value={prod.categoria}
                                        onChange={(e) =>
                                            handleChange(
                                                prod.id,
                                                "categoria",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <Stack direction="row" spacing={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => guardarCambios(prod)}
                                        >
                                            Guardar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() =>
                                                eliminarProducto(prod.id)
                                            }
                                        >
                                            Eliminar
                                        </Button>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            ) : filtro.trim() ? (
                <Typography variant="body1" color="text.secondary">
                    No se encontraron productos que coincidan.
                </Typography>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Ingresá un nombre o categoría para buscar productos.
                </Typography>
            )}
        </Paper>
    )
}

export default EditarProductos
