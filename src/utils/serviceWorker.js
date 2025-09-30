// Service Worker registration - ELIMINADO COMPLETAMENTE
export const registerSW = () => {
  // Desregistrar cualquier SW existente
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister()
        console.log('Service Worker desregistrado')
      })
    })
  }
  return
}