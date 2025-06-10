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
        <div>
            <h3>Agregar o seleccionar persona</h3>
            <div>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombreInput}
                    onChange={(e) => setNombreInput(e.target.value)}
                />
                <button onClick={handleAgregar}>Agregar</button>
            </div>

            <div>
                <p>Agregar productos a ... {personaSeleccionada}</p>
                {personas.map((persona) => (
                    <div key={persona}>
                        <button onClick={() => setPersonaSeleccionada(persona)}>
                            {persona}
                        </button>
                        <button onClick={() => eliminarPersona(persona)}>
                           Pagó
                        </button>
                    </div>
                ))}

                <div>
                    <button onClick={() => navigate("/extra")}>
                      Agregar Items
                    </button>
                  
                </div>
            </div>
        </div>
    )
}

export default SelectorPersona
