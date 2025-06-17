const HistorialPagos = ({ pagos, productos }) => {
    if (pagos.length === 0) return null

    return (
        <>
            <div
                style={{
                    border: "2px dashed #888",
                    padding: "10px",
                    margin: "10px",
                    backgroundColor: "#f0f0f0",
                }}
            >
                <h3>Historial de pagos</h3>
                <ul>
                    {pagos.map(({ nombre, total }, idx) => (
                        <li key={idx}>
                            {nombre} abonó ${total}
                        </li>
                    ))}
                </ul>

                <div>
                    Total de pagos: $
                    {pagos.reduce((acc, { total }) => acc + total, 0)}
                </div>

                <button onClick={() => navigate("/")}>Volver al inicio</button>
                {/* boton para eliminar el hitorial de pagos  */}
                <button
                    onClick={() => {
                        {
                            setPagos([])
                            localStorage.removeItem("pagos")
                        }
                    }}
                >
                    Eliminar historial de pagos
                </button>
            </div>
        </>
    )
}

export default HistorialPagos
