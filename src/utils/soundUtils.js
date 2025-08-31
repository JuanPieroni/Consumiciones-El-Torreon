// Utilidad para sonidos ligeros
export const playSuccessSound = () => {
    try {
        // Web Audio API - genera sonido sin archivos
        const audioContext = new (window.AudioContext || window.AudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        // Configurar sonido: tono agudo y corto
        oscillator.frequency.setValueAtTime(500, audioContext.currentTime)
        oscillator.type = "triangle"

        // Volumen suave
        gainNode.gain.setValueAtTime(0.04, audioContext.currentTime)
       

        oscillator.start()
        oscillator.stop(audioContext.currentTime + 0.08)

        // Backup: vibración para móvil
        if (navigator.vibrate) {
            navigator.vibrate(100)
        }
    } catch (error) {
        // Fallback silencioso si falla el audio
        if (navigator.vibrate) {
            navigator.vibrate(150)
        }
    }
}
