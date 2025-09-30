import { lazy } from 'react'

// Lazy loading ultra granular
export const BuscarProducto = lazy(() => import('./BuscarProducto'))
export const SelectorPersona = lazy(() => import('./SelectorPersona'))
export const ResumenConsumoMemo = lazy(() => import('./ResumenConsumoMemo'))
export const ListaProductosVanilla = lazy(() => import('./ListaProductosVanilla'))

// Admin components
export const AdminVanilla = lazy(() => import('./AdminVanilla'))
export const HistorialPagosVanilla = lazy(() => import('./HistorialPagosVanilla'))

// Preload functions
export const preloadBuscarProducto = () => import('./BuscarProducto')
export const preloadSelectorPersona = () => import('./SelectorPersona')
export const preloadResumenConsumo = () => import('./ResumenConsumoMemo')
export const preloadListaProductos = () => import('./ListaProductosVanilla')
export const preloadAdmin = () => import('./AdminVanilla')
export const preloadHistorial = () => import('./HistorialPagosVanilla')