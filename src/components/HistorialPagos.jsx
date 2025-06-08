const HistorialPagos = ({ pagos }) => {
    if (pagos.length === 0) return null

    return (
        <div>
            <h3>Historial de pagos</h3>
            <ul>
                {pagos.map(({ nombre, total }, idx) => (
                    <li key={idx}>
                        {nombre} abonó ${total}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
    )
}

export default HistorialPagos
