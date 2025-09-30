import React, { useMemo } from 'react'
import ResumenConsumoVanilla from './ResumenConsumoVanilla'

const ResumenConsumoMemo = React.memo(({ 
    consumos, 
    eliminarProducto, 
    eliminarPersona, 
    personaSeleccionada, 
    pagos 
}) => {
    // Memoizar cálculos pesados
    const totalGeneral = useMemo(() => {
        return Object.values(consumos).reduce((total, productos) => {
            return total + productos.reduce((acc, prod) => acc + prod.precio, 0)
        }, 0)
    }, [consumos])

    const consumosPersonaSeleccionada = useMemo(() => {
        return personaSeleccionada ? consumos[personaSeleccionada] || [] : []
    }, [consumos, personaSeleccionada])

    return (
        <ResumenConsumoVanilla
            consumos={consumos}
            eliminarProducto={eliminarProducto}
            eliminarPersona={eliminarPersona}
            personaSeleccionada={personaSeleccionada}
            pagos={pagos}
            totalGeneral={totalGeneral}
            consumosPersonaSeleccionada={consumosPersonaSeleccionada}
        />
    )
})

export default ResumenConsumoMemo