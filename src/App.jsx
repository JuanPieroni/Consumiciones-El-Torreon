// App.jsx
import { Routes, Route } from "react-router-dom"
import { useEffect, useState, Suspense, useCallback } from "react"
import { playSuccessSound } from "./utils/soundUtils"
import NavBar from "./components/NavBarVanilla"
import { useProductos } from "./context/ProductosContext"
import Toast, { showToast } from "./components/Toast"
import "./styles/global.css"

// Lazy loading granular
import {
    BuscarProducto,
    SelectorPersona,
    ResumenConsumoMemo,
    ListaProductosVanilla,
    AdminVanilla,
    HistorialPagosVanilla,
    preloadBuscarProducto,
    preloadSelectorPersona,
    preloadResumenConsumo,
    preloadListaProductos,
    preloadAdmin,
    preloadHistorial
} from "./components/LazyComponentsAdvanced"

const App = () => {
    const [personas, setPersonas] = useState(() => {
        const personasGuardadas = localStorage.getItem("personas")
        return personasGuardadas ? JSON.parse(personasGuardadas) : []
    })

    const [consumos, setConsumos] = useState(() => {
        const consumosGuardados = localStorage.getItem("consumos")
        return consumosGuardados ? JSON.parse(consumosGuardados) : []
    })

    const [pagos, setPagos] = useState(() => {
        return JSON.parse(localStorage.getItem("pagos")) || []
    })
    
    const [personaSeleccionada, setPersonaSeleccionada] = useState()
    const { productos } = useProductos()

    // Guardar personas en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("personas", JSON.stringify(personas))
    }, [personas])

    // Guardar consumos en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("consumos", JSON.stringify(consumos))
    }, [consumos])

    const agregarPersona = useCallback((nombre) => {
        if (!personas.includes(nombre)) {
            setPersonas([...personas, nombre])
        }
        setPersonaSeleccionada(nombre)
    }, [personas])

    const eliminarPersona = (nombre) => {
        const total =
            consumos[nombre]?.reduce((acc, prod) => acc + prod.precio, 0) || 0
        showToast(`${nombre} ya abonó la suma de $${total}`, 'success')

        setPagos((prev) => [
            ...prev,
            { nombre, total, consumos: consumos[nombre] || [] },
        ])

        setPersonas((prev) => prev.filter((p) => p !== nombre))
        setConsumos((prev) => {
            const { [nombre]: _, ...resto } = prev
            return resto
        })
        if (personaSeleccionada === nombre) {
            setPersonaSeleccionada(undefined)
        }
    }

    const agregarProducto = useCallback((producto) => {
        if (!personaSeleccionada) return
        setConsumos((prev) => {
            const prevPersona = prev[personaSeleccionada] || []
            return {
                ...prev,
                [personaSeleccionada]: [...prevPersona, producto],
            }
        })

        // El contexto maneja la persistencia de productos

        // Sonido de confirmación
        playSuccessSound()
    }, [personaSeleccionada, productos])

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
    const limpiarLocalStorage = () => {
        const claveProductos = "productos" // poné la clave que usás para los productos en localStorage
        const temp = {}

        // Guardar solo lo que quieras conservar
        Object.keys(localStorage).forEach((key) => {
            if (key === claveProductos) {
                temp[key] = localStorage.getItem(key)
            }
        })

        localStorage.clear() // borra todo

        // Restaurar lo que querés conservar
        Object.entries(temp).forEach(([key, value]) => {
            localStorage.setItem(key, value)
        })
    }

    return (
        <>
            <Toast />
            <NavBar 
                onHistorialHover={preloadHistorial}
                onAdminHover={preloadAdmin}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Suspense fallback={<div className="loading">Cargando selector...</div>}>
                                <SelectorPersona
                                    personas={personas}
                                    agregarPersona={agregarPersona}
                                    personaSeleccionada={personaSeleccionada}
                                    setPersonaSeleccionada={setPersonaSeleccionada}
                                    eliminarPersona={eliminarPersona}
                                />
                            </Suspense>
                            
                            <Suspense fallback={<div className="loading">Cargando búsqueda...</div>}>
                                <BuscarProducto
                                    personaSeleccionada={personaSeleccionada}
                                    agregarProducto={agregarProducto}
                                />
                            </Suspense>
                            
                            <Suspense fallback={<div className="loading">Cargando resumen...</div>}>
                                <ResumenConsumoMemo
                                    consumos={consumos}
                                    eliminarProducto={eliminarProducto}
                                    eliminarPersona={eliminarPersona}
                                    personaSeleccionada={personaSeleccionada}
                                    pagos={pagos}
                                />
                            </Suspense>
                            
                            <Suspense fallback={<div className="loading">Cargando productos...</div>}>
                                <ListaProductosVanilla
                                    productos={productos}
                                    personaSeleccionada={personaSeleccionada}
                                    agregarProducto={agregarProducto}
                                />
                            </Suspense>
                        </>
                    }
                />

                <Route
                    path="/historial"
                    element={
                        <Suspense fallback={<div className="loading">Cargando historial...</div>}>
                            <HistorialPagosVanilla
                                pagos={pagos}
                                productos={productos}
                                limpiarLocalStorage={limpiarLocalStorage}
                            />
                        </Suspense>
                    }
                />
                <Route 
                    path="/admin" 
                    element={
                        <Suspense fallback={<div className="loading">Cargando admin...</div>}>
                            <AdminVanilla />
                        </Suspense>
                    } 
                />
            </Routes>
        </>
    )
}

export default App
