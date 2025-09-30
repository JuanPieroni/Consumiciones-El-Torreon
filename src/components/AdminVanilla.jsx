import React from 'react'
import EditarProductosVanilla from './EditarProductosVanilla'
import FormularioProductoVanilla from './FormularioProductoVanilla'

const AdminVanilla = () => {
    return (
        <div className="container" style={{ padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ color: '#424242', marginBottom: '8px' }}>Panel de Administración</h1>
                <p style={{ color: '#616161' }}>Gestiona productos y configuraciones</p>
            </div>
            
            <div style={{ display: 'grid', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
                <FormularioProductoVanilla />
                <EditarProductosVanilla />
            </div>
        </div>
    )
}

export default AdminVanilla