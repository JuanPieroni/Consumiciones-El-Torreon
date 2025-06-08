import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const SelectorPersona = ({
    personas,
    agregarPersona,
    personaSeleccionada,
    setPersonaSeleccionada,
    eliminarPersona,
}) => {
    const [nombreInput, setNombreInput] = useState("")
    const navigate = useNavigate()
    const handleAgregar = () => {
        if (nombreInput.trim() !== "") {
            agregarPersona(nombreInput.trim())
            setNombreInput("")
        }
    }

    return (
        <>
            <div>
                <h3>Agregar o seleccionar persona</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombreInput}
                    onChange={(e) => setNombreInput(e.target.value)}
                />
                <button onClick={handleAgregar}>Agregar</button>

                <div>
                    <p>Personas:</p>
                    {personas.map((persona) => (
                        <div key={persona}>
                            <button
                                onClick={() => setPersonaSeleccionada(persona)}
                            >
                                {persona}
                            </button>
                            <button onClick={() => eliminarPersona(persona)}>
                                Eliminar Persona
                            </button>
                        </div>
                    ))}
                    {/* Navegación a otras páginas */}
                    <div>
                        <button onClick={() => navigate("/extra")}>
                            Agregar producto fuera de carta
                        </button>
                        <button onClick={() => navigate("/historial")}>
                            Ver historial de pagos
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectorPersona
