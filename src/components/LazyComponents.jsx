import { lazy } from 'react'

// Solo lazy para rutas
export const HistorialPagosVanilla = lazy(() => import('./HistorialPagosVanilla'))
export const AdminVanilla = lazy(() => import('./AdminVanilla'))

// Preload functions
export const preloadHistorial = () => import('./HistorialPagosVanilla')
export const preloadAdmin = () => import('./AdminVanilla')