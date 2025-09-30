import React from "react"
import TotalAPagarVanilla from "./TotalAPagarVanilla"
import { capitalize } from "../utils/textUtils"

const ResumenConsumoVanilla = ({ consumos, eliminarProducto, eliminarPersona }) => {
    const granTotal = Object.values(consumos).reduce(
        (acc, productos) =>
            acc + productos.reduce((sum, item) => sum + item.precio, 0),
        0
    )

    return (
        <div style={{ padding: '16px' }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '24px',
                color: '#424242',
                fontWeight: 'bold'
            }}>
                ♦ Resumen de Consumos ♦
            </h2>
            
            {Object.keys(consumos).length === 0 ? (
                <p style={{ textAlign: 'center', color: '#616161' }}>
                    No hay consumos aún
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {Object.entries(consumos).map(([persona, productos]) => {
                        const total = productos.reduce((acc, item) => acc + item.precio, 0)

                        return (
                            <details key={persona} className="card">
                                <summary style={{
                                    cursor: 'pointer',
                                    padding: '12px',
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    background: 'rgb(237, 236, 217)',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    margin: '0 0 12px 0'
                                }}>
                                    {persona} - ${total}
                                </summary>
                                
                                <div style={{ padding: '0 12px' }}>
                                    {productos.length === 0 ? (
                                        <p style={{ color: '#616161' }}>No consumió nada</p>
                                    ) : (
                                        <>
                                            <div style={{ marginBottom: '16px' }}>
                                                {productos.map(({ id, nombre, precio }, idx) => (
                                                    <div key={`${id}-${idx}`} style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '8px 0',
                                                        borderBottom: idx < productos.length - 1 ? '1px dotted #ccc' : 'none'
                                                    }}>
                                                        <span>{capitalize(nombre)}</span>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                            <span style={{ color: '#5e72e4', fontWeight: 'bold' }}>
                                                                ${precio}
                                                            </span>
                                                            <button
                                                                onClick={() => eliminarProducto(persona, idx)}
                                                                style={{
                                                                    background: '#ef4444',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '4px',
                                                                    padding: '4px 8px',
                                                                    cursor: 'pointer',
                                                                    fontSize: '12px'
                                                                }}
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                paddingTop: '12px',
                                                borderTop: '1px solid #e0e0e0'
                                            }}>
                                                <button
                                                    onClick={() => eliminarPersona(persona)}
                                                    className="btn"
                                                    style={{
                                                        background: 'hsla(145, 91%, 42%, 0.51)',
                                                        color: 'white',
                                                        fontWeight: 'bold',
                                                        padding: '8px 16px'
                                                    }}
                                                >
                                                    💰 Pagó
                                                </button>
                                                <span style={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    color: '#424242'
                                                }}>
                                                    Total: ${total}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </details>
                        )
                    })}
                </div>
            )}
            
            <div style={{ borderTop: '2px solid #e0e0e0', marginTop: '24px', paddingTop: '16px' }}>
                <TotalAPagarVanilla granTotal={granTotal} />
            </div>
        </div>
    )
}

export default ResumenConsumoVanilla