// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://nspibnlurmlccaxmfyyp.supabase.co" // <-- reemplazá con tu URL
const SUPABASE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcGlibmx1cm1sY2NheG1meXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzOTcyMjEsImV4cCI6MjA2NDk3MzIyMX0.Gk5w0Pe_K85BmTLHaU0O6GqIOcvPSu6NnyaI6E6hnQM" // <-- tu clave pública de anon

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)

// función para hacer peticiones fetch
export async function insertarProducto(nombre, precio) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/productos`, {
        method: "POST",
        headers: {
            apikey: SUPABASE_API_KEY,
            Authorization: `Bearer ${SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
        },
        body: JSON.stringify([{ nombre, precio }]),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Error al insertar producto")
    return data
}
