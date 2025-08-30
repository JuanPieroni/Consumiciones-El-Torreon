import React from "react"
import { Typography, Divider, Paper } from "@mui/material"
 
 

const TotalAPagar = ({ granTotal }) => {
    return (
        <Paper sx={{ p: 2, mt: 2, backgroundColor: "#f5f5f5" }}>
            <Typography variant="body1" sx={{ mb: 1, color: "black" }}>
                Total: $ {granTotal - granTotal * 0.1} - Dcto 10%: - $
                {granTotal * 0.1}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography
                variant="h6"
                sx={{ fontFamily: '"cormorant garamond", serif' }}
                fontSize={27}

            >
                Total c/propi: $ {granTotal}
            </Typography>
        </Paper>
    )
}

export default TotalAPagar
