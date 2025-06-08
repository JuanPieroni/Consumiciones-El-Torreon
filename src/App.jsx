// App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import SelectorPersona from "./components/SelectorPersona"
import ListaProductos from "./components/ListaProductos"
import ResumenConsumo from "./components/ResumenConsumo"
import ProductoExtra from "./components/ProductoExtra"
import HistorialPagos from "./components/HistorialPagos"
import productosData from "./data/productos"
import { useEffect, useState } from "react"

 

const App = () => {
  const [personas, setPersonas] = useState(() => {
    const personasGuardadas = localStorage.getItem("personas")
    return personasGuardadas ? JSON.parse(personasGuardadas) : []
  })

  const [consumos, setConsumos] = useState(() => {
    const consumosGuardados = localStorage.getItem("consumos")
    return consumosGuardados ? JSON.parse(consumosGuardados) : {}
  })

  const [pagos, setPagos] = useState(() => {
    return JSON.parse(localStorage.getItem("pagos")) || []
  })

  const [productos, setProductos] = useState(() => {
    return JSON.parse(localStorage.getItem("productos")) || productosData
  })

  const [personaSeleccionada, setPersonaSeleccionada] = useState()

  useEffect(() => {
    localStorage.setItem("personas", JSON.stringify(personas))
    localStorage.setItem("consumos", JSON.stringify(consumos))
    localStorage.setItem("pagos", JSON.stringify(pagos))
    localStorage.setItem("productos", JSON.stringify(productos))
  }, [personas, consumos, pagos, productos])

  const agregarPersona = (nombre) => {
    if (!personas.includes(nombre)) {
      setPersonas([...personas, nombre])
    }
    setPersonaSeleccionada(nombre)
  }

  const eliminarPersona = (nombre) => {
    const total = consumos[nombre]?.reduce((acc, prod) => acc + prod.precio, 0) || 0
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

    const yaExiste = productos.some(p => p.nombre === producto.nombre)
    if (!yaExiste) {
      const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1
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
    if (window.confirm("¿Seguro que querés borrar personas, consumos y pagos?")) {
      setPersonas([])
      setConsumos({})
      setPagos([])
      setPersonaSeleccionada(undefined)
    }
  }

  return (
    <Router>
      <nav  >
        <Link to="/">Inicio</Link> | {" "}
        <Link to="/extra">Producto fuera de carta</Link> | {" "}
        <Link to="/historial">Historial</Link>
<button onClick={resetParcial} className="ml-4">
  Resetear App (excepto productos)
</button>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Vos Que Tenes Forro??</h1>
              <SelectorPersona
                personas={personas}
                agregarPersona={agregarPersona}
                personaSeleccionada={personaSeleccionada}
                setPersonaSeleccionada={setPersonaSeleccionada}
                eliminarPersona={eliminarPersona}
              />
              <ListaProductos
                productos={productos}
                personaSeleccionada={personaSeleccionada}
                agregarProducto={agregarProducto}
              />
              <ResumenConsumo
                consumos={consumos}
                eliminarProducto={eliminarProducto}
              />
              <HistorialPagos pagos={pagos} />
            </>
          }
        />
        <Route
          path="/extra"
          element={
            <ProductoExtra
              personaSeleccionada={personaSeleccionada}
              agregarProducto={agregarProducto}
            />
          }
        />
        <Route
          path="/historial"
          element={<HistorialPagos pagos={pagos} />}
        />
      </Routes>
    </Router>
  )
}

export default App
