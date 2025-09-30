import React from 'react'
import { showToast } from './Toast'

const HistorialPagosVanilla = ({ pagos, limpiarLocalStorage }) => {
    const handleLimpiar = () => {
        if (window.confirm('¿Estás seguro de que quieres limpiar el historial?')) {
            limpiarLocalStorage()
            showToast('Historial limpiado', 'success')
        }
    }

    const totalGeneral = pagos.reduce((sum, pago) => sum + pago.total, 0)

    return (
        <div className="container" style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ color: '#424242' }}>📊 Historial de Pagos</h1>
                <p style={{ color: '#616161' }}>Total recaudado: <strong>${totalGeneral}</strong></p>
            </div>

            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <button 
                    className="btn btn-secondary"
                    onClick={handleLimpiar}
                    style={{ background: '#ef4444', color: 'white' }}
                >
                    🗑️ Limpiar Historial
                </button>
            </div>

            <div style={{ display: 'grid', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
                {pagos.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                        <p style={{ color: '#616161', fontSize: '18px' }}>No hay pagos registrados</p>
                    </div>
                ) : (
                    pagos.map((pago, index) => (
                        <div key={index} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h3 style={{ color: '#424242', margin: 0 }}>👤 {pago.nombre}</h3>
                                <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '18px' }}>
                                    💰 ${pago.total}
                                </span>
                            </div>
                            
                            {pago.consumos && pago.consumos.length > 0 && (
                                <details style={{ marginTop: '12px' }}>
                                    <summary style={{ cursor: 'pointer', color: '#5e72e4', fontWeight: 'bold' }}>
                                        🍽️ Ver consumos ({pago.consumos.length} items)
                                    </summary>
                                    <div style={{ marginTop: '8px', paddingLeft: '16px' }}>
                                        {pago.consumos.map((consumo, i) => (
                                            <div key={i} style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                padding: '4px 0',
                                                borderBottom: i < pago.consumos.length - 1 ? '1px solid #f0f0f0' : 'none'
                                            }}>
                                                <span>{consumo.nombre}</span>
                                                <span style={{ color: '#5e72e4', fontWeight: 'bold' }}>${consumo.precio}</span>
                                            </div>
                                        ))}
                                    </div>
                                </details>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default HistorialPagosVanilla