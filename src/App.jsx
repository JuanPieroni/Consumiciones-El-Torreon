// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import SelectorPersona from "./components/SelectorPersona"
import ListaProductos from "./components/ListaProductos"
import ResumenConsumo from "./components/ResumenConsumo"

import HistorialPagos from "./components/HistorialPagos"
import { supabase } from "./supabaseClient"
import { useEffect, useState } from "react"
import ContainerPaper from "./components/ContainerPaper"
import { Typography } from "@mui/material"
import FormularioProducto from "./components/FormularioProducto"
import Navbar from "./components/NavBar"

const App = () => {
    const [personas, setPersonas] = useState(() => {
        const personasGuardadas = localStorage.getItem("personas")
        return personasGuardadas ? JSON.parse(personasGuardadas) : []
    })

    const [consumos, setConsumos] = useState({})

    const [pagos, setPagos] = useState(() => {
        return JSON.parse(localStorage.getItem("pagos")) || []
    })

    const [productos, setProductos] = useState([])

    const [personaSeleccionada, setPersonaSeleccionada] = useState()

    useEffect(() => {
        const fetchProductos = async () => {
            const { data, error } = await supabase.from("productos").select("*")

            if (error) {
                console.error("Error al obtener productos:", error.message)
            } else {
                setProductos(data)
            }
        }

        fetchProductos()
    }, []) // solo se ejecuta una vez al inicio

    const agregarPersona = (nombre) => {
        if (!personas.includes(nombre)) {
            setPersonas([...personas, nombre])
        }
        setPersonaSeleccionada(nombre)
    }

    const eliminarPersona = (nombre) => {
        const total =
            consumos[nombre]?.reduce((acc, prod) => acc + prod.precio, 0) || 0
        alert(`${nombre} ya abonó la suma de $${total}`)
        setPagos((prev) => [...prev, { nombre, total }])
        setPersonas((prev) => prev.filter((p) => p !== nombre))
        setConsumos((prev) => {
            const { [nombre]: _, ...resto } = prev
            return resto
        })
        if (personaSeleccionada === nombre) {
            setPersonaSeleccionada(undefined)
        }
    }

    const agregarProducto = (producto) => {
        if (!personaSeleccionada) return
        setConsumos((prev) => {
            const prevPersona = prev[personaSeleccionada] || []
            return {
                ...prev,
                [personaSeleccionada]: [...prevPersona, producto],
            }
        })

        const yaExiste = productos.some((p) => p.nombre === producto.nombre)
        if (!yaExiste) {
            const nuevoId =
                productos.length > 0
                    ? Math.max(...productos.map((p) => p.id)) + 1
                    : 1
            const nuevoProducto = { ...producto, id: nuevoId }
            setProductos((prev) => [...prev, nuevoProducto])
        }
    }

    const eliminarProducto = (persona, index) => {
        setConsumos((prev) => {
            const nuevos = [...(prev[persona] || [])]
            nuevos.splice(index, 1)
            return {
                ...prev,
                [persona]: nuevos,
            }
        })
    }

    const resetParcial = () => {
        if (
            window.confirm(
                "¿Seguro que querés borrar personas, consumos y pagos?"
            )
        ) {
            setPersonas([])
            setConsumos({})
            setPagos([])
            setPersonaSeleccionada(undefined)
        }
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <section>
                                <SelectorPersona
                                    personas={personas}
                                    agregarPersona={agregarPersona}
                                    personaSeleccionada={personaSeleccionada}
                                    setPersonaSeleccionada={
                                        setPersonaSeleccionada
                                    }
                                    eliminarPersona={eliminarPersona}
                                />
                            </section>
                            <section>
                                <ListaProductos
                                    productos={productos}
                                    personaSeleccionada={personaSeleccionada}
                                    agregarProducto={agregarProducto}
                                />
                            </section>
                            <section>
                                <ResumenConsumo
                                    consumos={consumos}
                                    eliminarProducto={eliminarProducto}
                                />
                            </section>
                        </>
                    }
                />

                <Route
                    path="/historial"
                    element={
                        <section>
                            <HistorialPagos
                                pagos={pagos}
                                consumos={consumos}
                                productos={productos}
                            />
                        </section>
                    }
                />
                <Route path="/admin" element={<FormularioProducto />} />
            </Routes>
            <button onClick={resetParcial}>Reset</button>
        </>
    )
}

export default App
