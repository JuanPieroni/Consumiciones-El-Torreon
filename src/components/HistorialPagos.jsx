 

const HistorialPagos = ({ pagos }) => {
    if (pagos.length === 0) return null

    return (
        <>
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
                {/* boton para eliminar el hitorial de pagos  */}
                <button
                    onClick={() => {
                       {setPagos([]); localStorage.removeItem("pagos")}
                    }}
                >
                    Eliminar historial de pagos
                </button>
            </div>
        </>
    )
}

export default HistorialPagos
