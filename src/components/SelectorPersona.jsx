import React, { useState } from "react"
import { showToast } from "./Toast"

const SelectorPersona = ({
    personas,
    agregarPersona,
    personaSeleccionada,
    setPersonaSeleccionada,
    eliminarPersona,
}) => {
    const [nombreInput, setNombreInput] = useState("")

    const handleAgregar = () => {
        // uppercase all letters
        const nombre = nombreInput.trim().toUpperCase()
        console.log(nombre)
        if (nombre && !personas.includes(nombre)) {
            agregarPersona(nombre)
            setNombreInput("")
        } else if (nombre && personas.includes(nombre)) {
            setPersonaSeleccionada(nombre)
        } else {
            showToast("Ingresa un nombre válido", "error")
        }
    }

    return (
        <div className={`paper ${!personaSeleccionada ? 'pulse-attention' : ''}`}>
            <h2 className="flex items-center justify-center gap-4 mb-4" style={{
                fontWeight: "bold",
                color: "#424242",
                textAlign: "center"
            }}>
                <img
                    src="/icons/dice.svg"
                    style={{
                        width: window.innerWidth < 600 ? 35 : 45,
                        height: window.innerWidth < 600 ? 35 : 45,
                    }}
                />
                <span style={{
                    fontSize: window.innerWidth < 600 ? "1.2rem" : "1.5rem",
                }}>
                    Agregar Persona
                </span>
                <img
                    src="/icons/dice.svg"
                    style={{
                        width: window.innerWidth < 600 ? 35 : 45,
                        height: window.innerWidth < 600 ? 35 : 45,
                    }}
                />
            </h2>
            
            {!personaSeleccionada && (
                <div className="warning-message">
                    ⚠️ SELECCIONA UNA PERSONA PRIMERO
                </div>
            )}

            <div className="flex gap-2 mb-4" style={{ flexDirection: window.innerWidth < 600 ? "column" : "row" }}>
                <input
                    className="input"
                    placeholder="Nombre"
                    value={nombreInput}
                    onChange={(e) => setNombreInput(e.target.value)}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleAgregar}
                >
                    Agregar
                </button>
            </div>
            {personaSeleccionada && (
                <p style={{ 
                    textAlign: "center", 
                    marginBottom: "16px",
                    background: "#dcfce7",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "2px solid #10b981"
                }}>
                    ✅ Agregando consumos a:{" "}
                    <span style={{
                        fontWeight: "bolder",
                        color: "#065f46",
                        fontSize: "1.1rem"
                    }}>
                        {personaSeleccionada}
                    </span>
                </p>
            )}

            <div className="grid grid-cols-4 gap-2" style={{ justifyContent: "center" }}>
                {personas.map((persona) => {
                    const isSelected = persona === personaSeleccionada
                    return (
                        <div
                            key={persona}
                            className={`card ${isSelected ? 'persona-selected' : ''}`}
                            onClick={() => setPersonaSeleccionada(persona)}
                            style={{
                                backgroundColor: isSelected 
                                    ? "#dcfce7" 
                                    : "white",
                                border: isSelected ? "2px solid #10b981" : "1px solid #ddd",
                                transition: "all 0.3s",
                                height: "40px",
                                minWidth: "60px",
                                padding: "4px 8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: isSelected ? "bold" : "normal"
                            }}
                        >
                            {isSelected ? `✓ ${persona}` : persona}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SelectorPersona
