# Auditoria de movimiento de Castas

Referencia: https://castas.framer.website/
Replica: http://localhost:4321/castas/

Comparacion realizada en navegador real a 1440 x 1000 y 390 x 844. Los textos en espanol tienen otra longitud, por lo que se calibra el movimiento respecto de la posicion de cada elemento, no con posiciones absolutas de scroll.

## Diferencias corregidas

| Elemento | Comportamiento observado | Implementacion local |
| --- | --- | --- |
| Propiedad del hero | Foto pasa de escala 1 a 1.1 al hacer hover; linea inferior se completa desde la izquierda | Zoom de 900 ms y linea de 600 ms; tambien responde al foco de teclado |
| Hero a presentacion | Foto permanece fija; cuatro barras oscuras de 25%, 50%, 75% y 100% avanzan desde la derecha | Barras originales conectadas al scroll, reversibles |
| Presentacion a servicios | Cuatro barras claras avanzan desde la izquierda y forman el escalonado inverso | Barras originales conectadas al scroll, reversibles |
| Contenido del hero | Se desplaza ligeramente hacia arriba al abandonar la seccion | Desplazamiento gradual de hasta 178 px |
| Servicios 01 a 04 | Cada fila pasa de -150 px a 0; su titulo pasa de opacidad .5 a 1 al aproximarse al centro | Progreso independiente por fila, entre el 50% y el 34% de la altura de pantalla |
| Servicios en movil | Filas apiladas, sin desplazamiento lateral | Conservado el comportamiento de la variante movil |
| Imagenes de servicios | Documentacion, vista aerea, reunion y apreton de manos, en gris | Recuperados los cuatro originales a 512 px; dos archivos anteriores no decodificaban correctamente |
| Lineas de seccion | Se dibujan al entrar en pantalla | Revelado desde la izquierda de los elementos marcados Animated |
| Texto de presentacion | Contraste progresivo por palabras durante el scroll | Revelado por palabras, conservando texto seleccionable |
| Navbar | Se oculta al bajar y reaparece al subir | Restaurado en la pagina inicial |
| Entradas con opacidad | Elementos marcados para aparecer al entrar en pantalla | Restaurados los fades identificados en el HTML exportado |

Los hovers de zoom que se habian agregado a las fotos de servicios se retiraron: en la referencia inspeccionada no cambiaban al pasar el cursor.

## Diferencias pendientes de una calibracion especifica

La inspeccion general incluyo Destacadas, Por que elegirnos, Como trabajamos, Testimonios, Ideas, Newsletter, FAQ y el cierre. No se considera que estas secciones tengan todavia paridad completa de interaccion.

- Destacadas: ajustar el hover y la composicion de las tarjetas, y revisar cada imagen original.
- Como trabajamos y testimonios: comparar sus apariciones internas y el ritmo con scroll lento; el restaurado general de opacidad no garantiza sus tiempos exactos.
- Newsletter: el original usa una animacion de letras; la replica todavia conserva el texto estatico.
- FAQ: la apertura local es inmediata; falta calibrar la expansion y contraccion contra el original.
- Contacto y footer: falta una comparacion detallada del movimiento final y los hovers. Los dos escalonados confirmados pertenecen a la entrada y salida del bloque oscuro inicial.
- Navegacion entre paginas: no se ha afirmado equivalencia de transiciones entre rutas; esta pasada se centro en las transiciones entre secciones de Inicio.

## Verificacion

`node scripts/check-castas-motion.mjs`: zoom del hero, subrayado, posicion del escalonado, progreso y reversibilidad de servicios, decodificacion de imagenes, ancho movil y movimiento reducido.

`node scripts/check-castas-nav.mjs`: apertura y cierre del menu, foco, teclado, navegacion y movimiento reducido.

`node scripts/audit-castas-motion.mjs reference` y `local`: capturas y medidas en scripts/castas-cache/motion (ignorado por Git).
