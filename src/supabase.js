import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://nspibnlurmlccaxmfyyp.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcGlibmx1cm1sY2NheG1meXlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzOTcyMjEsImV4cCI6MjA2NDk3MzIyMX0.Gk5w0Pe_K85BmTLHaU0O6GqIOcvPSu6NnyaI6E6hnQM" // usamos la anon key

export const supabase = createClient(supabaseUrl, supabaseKey)
