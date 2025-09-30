import React from 'react'

const TotalAPagarVanilla = ({ granTotal }) => {
    const totalConDescuento = granTotal * 0.9 // 10% descuento

    return (
        <div style={{
            textAlign: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
            borderRadius: '12px',
            border: '2px solid #424242',
            margin: '16px 0'
        }}>
            <h3 style={{
                color: '#424242',
                marginBottom: '16px',
                fontSize: '1.5rem'
            }}>
                💰 Total con Propina
            </h3>
            <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                marginBottom: '16px'
            }}>
                ${granTotal}
            </div>
            
            <div style={{
                borderTop: '1px solid #ccc',
                paddingTop: '16px'
            }}>
                <h4 style={{
                    color: '#424242',
                    marginBottom: '8px',
                    fontSize: '1.2rem'
                }}>
                    🎯 Total con Descuento (10%)
                </h4>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#ef4444',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                }}>
                    ${totalConDescuento.toFixed(2)}
                </div>
            </div>
        </div>
        
    )
}

export default TotalAPagarVanilla