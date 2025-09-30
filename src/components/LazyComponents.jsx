import { lazy } from 'react'

// Lazy loading optimizado con preload
export const HistorialPagos = lazy(() => 
  import('./HistorialPagosVanilla').then(module => ({ default: module.default }))
)

export const Admin = lazy(() => 
  import('./AdminVanilla').then(module => ({ default: module.default }))
)

// Preload components on hover
export const preloadHistorial = () => import('./HistorialPagosVanilla')
export const preloadAdmin = () => import('./AdminVanilla')