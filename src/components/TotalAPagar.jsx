import React from "react"
import { Typography, Divider } from "@mui/material"

const TotalAPagar = ({ granTotal }) => {
    return (
        <>
            <div>
                <Typography
                    variant="h8"
                    align="left"
                    sx={{ mt: 3, fontWeight: "bold", margin: "5px" }}
                >
                    Total: ${granTotal} - 10% ${granTotal * 0.1}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography
                    variant="h6"
                    align="left"
                    sx={{ mt: 3, fontWeight: "bold", margin: "5px" }}
                >
                    A pagar : ${granTotal - granTotal * 0.1}
                </Typography>
            </div>
        </>
    )
}

export default TotalAPagar
