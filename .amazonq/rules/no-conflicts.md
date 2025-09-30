# Reglas Anti-Conflictos

## Análisis Previo Obligatorio
- SIEMPRE escanea TODO el proyecto antes de crear nuevos archivos o funciones
- Busca funcionalidad similar existente antes de implementar
- Verifica nombres de componentes, funciones y variables para evitar duplicados

## Detección de Duplicados
- Si existe funcionalidad similar, PREGUNTA si extender/modificar la existente o crear nueva
- Nunca crees componentes con nombres similares (ej: Button y CustomButton)
- Revisa imports existentes para evitar conflictos de nombres

## Reutilización Primero
- Prioriza reutilizar y extender código existente
- Si hay utilidades similares, consolida en una sola función
- Usa composición antes que duplicación

## Validación de Conflictos
- Verifica que nuevos archivos no sobrescriban existentes
- Confirma que nuevas funciones no colisionen con las actuales
- Revisa que los imports no generen ambigüedad

## Comunicación de Conflictos
- Si detectas duplicación potencial, INFORMA al usuario antes de proceder
- Explica qué funcionalidad similar existe y sugiere alternativas
- Pide confirmación antes de crear código que pueda generar conflictos