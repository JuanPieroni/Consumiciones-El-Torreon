import React from 'react'

const TotalAPagarVanilla = ({ granTotal }) => {
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
                marginBottom: '8px',
                fontSize: '1.5rem'
            }}>
                💰 Gran Total
            </h3>
            <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
                ${granTotal}
            </div>
        </div>
    )
}

export default TotalAPagarVanilla