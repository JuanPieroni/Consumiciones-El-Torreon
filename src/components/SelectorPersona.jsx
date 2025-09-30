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
        <div className="paper">
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
            <p style={{ textAlign: "center", marginBottom: "16px" }}>
                {personaSeleccionada ? (
                    <>
                        Agregando consumos a{" "}
                        <span style={{ fontWeight: "bolder" }}>:</span>{" "}
                        <span style={{
                            padding: "5px",
                            color: "#060606ff",
                            fontWeight: "bolder",
                        }}>
                            {personaSeleccionada}
                        </span>
                    </>
                ) : (
                    "Selecciona una persona"
                )}
            </p>

            <div className="grid grid-cols-4 gap-2" style={{ justifyContent: "center" }}>
                {personas.map((persona) => {
                    const isSelected = persona === personaSeleccionada
                    return (
                        <div
                            key={persona}
                            className="card"
                            onClick={() => setPersonaSeleccionada(persona)}
                            style={{
                                backgroundColor: isSelected 
                                    ? "hsla(8, 86%, 46%, 0.51)" 
                                    : "white",
                                border: isSelected ? "1px solid black" : "1px solid #ddd",
                                transition: "all 0.3s",
                                height: "40px",
                                minWidth: "60px",
                                padding: "4px 8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                fontSize: "0.9rem"
                            }}
                        >
                            {persona}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SelectorPersona
