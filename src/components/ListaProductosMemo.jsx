import React, { memo } from "react"
import ListaProductos from "./ListaProductos"

// Memoizar el componente más pesado
const ListaProductosMemo = memo(ListaProductos, (prevProps, nextProps) => {
    return (
        prevProps.personaSeleccionada === nextProps.personaSeleccionada &&
        prevProps.productos?.length === nextProps.productos?.length
    )
})

export default ListaProductosMemo