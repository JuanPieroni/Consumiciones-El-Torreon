# Reglas Específicas para React + Vite

## Estructura del Proyecto
- Mantén la estructura estándar de Vite
- Usa ES modules y sintaxis moderna
- Respeta las convenciones de React Hooks

## Dependencias
- Usa npm/yarn según el proyecto existente
- Actualiza package.json cuando agregues dependencias
- Prefiere dependencias ligeras y bien mantenidas

## Componentes React
- Componentes funcionales con hooks
- Props tipadas cuando sea posible
- Nombres descriptivos para componentes y funciones

## Vite Específico
- Usa import.meta.env para variables de entorno
- Respeta la configuración de vite.config.js existente
- Aprovecha el HMR para desarrollo rápido

## Performance
- Lazy loading para rutas cuando sea apropiado
- Evita re-renders innecesarios
- Usa React.memo solo cuando sea necesario