# Estancia La Paz — Sitio Web
## Guía de ejecución local y personalización

---

## Estructura de archivos

```
estancia-la-paz/
├── index.html          ← Página de inicio
├── sobre.html          ← Sobre la estancia
├── alojamiento.html    ← Habitaciones y cocina
├── servicios.html      ← Servicios y actividades
├── eventos.html        ← Salón de fiestas y eventos
├── galeria.html        ← Galería de fotos con filtros
├── ubicacion.html      ← Mapa y cómo llegar
├── reservas.html       ← Formulario de contacto y reservas
├── css/
│   └── style.css       ← Estilos completos del sitio
├── js/
│   └── main.js         ← Comportamiento interactivo
├── img/                ← Carpeta para tus fotos (vacía)
└── README.md           ← Este archivo
```

---

## ¿Se necesita un servidor para probarlo localmente?

**Para la mayoría de las funcionalidades: NO.**
Podés abrir directamente `index.html` en cualquier navegador moderno (Chrome, Firefox, Edge, Safari) y el sitio funciona completamente, incluyendo:
- Navegación entre páginas
- Menú hamburguesa en móvil
- Animaciones de scroll
- Galería con filtros por categoría
- Formulario de reservas (con simulación de envío)

**Excepción — Fuentes de Google:**
El sitio carga las tipografías *Playfair Display* y *Lato* desde Google Fonts. Si no tenés conexión a internet al probar localmente, el navegador usará las fuentes de respaldo (Georgia y Helvetica), lo que es visualmente aceptable pero distinto al diseño final.

---

## Pasos para probar localmente

### Opción A — Sin servidor (más simple)
1. Descomprimí el ZIP en una carpeta de tu PC.
2. Abrí la carpeta `estancia-la-paz/`.
3. Hacé doble clic en `index.html`.
4. El sitio se abrirá en tu navegador predeterminado.
5. Navegá por las páginas usando el menú.

### Opción B — Con servidor local (recomendado para desarrollo)
Si tenés Python instalado:
```bash
# Python 3
cd estancia-la-paz
python -m http.server 8000
# Luego abrí: http://localhost:8000
```

Si tenés Node.js instalado:
```bash
# Instalar live-server una vez
npm install -g live-server

# Ejecutar desde la carpeta del proyecto
cd estancia-la-paz
live-server
# Se abre automáticamente en el navegador con recarga en vivo
```

Si tenés VS Code:
- Instalá la extensión **Live Server** (Ritwick Dey).
- Clic derecho sobre `index.html` → "Open with Live Server".

---

## Cómo reemplazar las fotos

Cada sección del sitio tiene marcadores con instrucciones. Buscá bloques como este en el HTML:

```html
<!--
  ╔════════════════════════════════════════════════╗
  ║  FOTO — NOMBRE DE LA FOTO                      ║
  ║  Reemplazar por: img/nombre-foto.jpg           ║
  ║  Tamaño recomendado: 800×500px                 ║
  ╚════════════════════════════════════════════════╝
-->
<div class="img-placeholder">
  <span class="icon">🏡</span>
  <span>Descripción</span>
</div>
```

### Pasos para insertar una foto:
1. Copiá tu imagen a la carpeta `/img/`.
2. Usá nombres de archivo sin espacios ni acentos (ej: `piscina-principal.jpg`).
3. En el HTML, reemplazá el bloque `<div class="img-placeholder">...</div>` por:
   ```html
   <img src="img/nombre-foto.jpg" alt="Descripción de la foto">
   ```

### Lista de fotos sugeridas para el sitio

| Archivo sugerido            | Dónde usarla                | Tamaño ideal   |
|-----------------------------|-----------------------------|--------------------|
| `hero-principal.jpg`        | Hero de inicio              | 1920×1080px        |
| `sobre-estancia.jpg`        | Sección "Sobre" (inicio)    | 800×1000px (vertical) |
| `sobre-historia.jpg`        | Página sobre.html           | 900×675px          |
| `sobre-exteriores.jpg`      | Página sobre.html           | 900×675px          |
| `hab-doble.jpg`             | Habitación doble            | 800×500px          |
| `hab-multiple.jpg`          | Habitación múltiple         | 800×500px          |
| `hab-completo.jpg`          | Alquiler completo           | 800×500px          |
| `cocina.jpg`                | Cocina equipada             | 700×700px          |
| `piscina.jpg`               | Piscina                     | 900×675px          |
| `parrillero.jpg`            | Parrillero                  | 900×675px          |
| `cabalgatas.jpg`            | Cabalgatas                  | 900×675px          |
| `salon-interior.jpg`        | Salón (página eventos)      | 900×660px          |
| `salon-exterior.jpg`        | Exterior salón              | 900×562px          |
| `salon-decoracion.jpg`      | Decoración salón            | 900×562px          |
| `eventos-boda.jpg`          | Card de bodas               | 800×500px          |
| `eventos-15.jpg`            | Card quinceañeros           | 800×500px          |
| `eventos-reunion.jpg`       | Card reuniones              | 800×500px          |
| `galeria-*.jpg`             | Fotos de galería (múltiples)| 800×600px mínimo   |

### Formato recomendado para las fotos
- **Formato:** JPG (mejor compresión para fotos)
- **Calidad:** 80-85% (equilibrio calidad/peso)
- **Peso máximo:** 300KB por imagen para carga rápida
- **Herramientas de optimización gratuitas:** squoosh.app, tinyjpg.com

---

## Cómo activar el formulario de contacto (producción)

El formulario actualmente simula el envío. Para que funcione de verdad en producción:

### Opción recomendada: Formspree (gratuito, sin backend)
1. Creá una cuenta en [formspree.io](https://formspree.io)
2. Creá un nuevo formulario y copiá tu endpoint (ej: `https://formspree.io/f/xabc1234`)
3. En `reservas.html`, cambiá la etiqueta `<form>`:
   ```html
   <form id="form-reserva" action="https://formspree.io/f/TU_ID" method="POST">
   ```
4. En `js/main.js`, eliminá la línea `e.preventDefault();` dentro del listener del formulario.

---

## Cómo insertar el mapa real (Google Maps)

En `ubicacion.html`, buscá el comentario sobre el mapa y seguí estos pasos:
1. Ir a [Google Maps](https://maps.google.com) y buscar: `Ruta 24 km 86500 Paysandú Uruguay`
2. Ajustar la ubicación exacta si es necesario.
3. Hacer clic en "Compartir" → "Insertar un mapa".
4. Copiar el código `<iframe>` que Google genera.
5. Reemplazar el `<iframe>` existente en `ubicacion.html`.

---

## Cómo actualizar el contenido textual

Todos los textos están directamente en los archivos HTML. Para editarlos:
1. Abrí el archivo HTML correspondiente con cualquier editor de texto (VS Code, Notepad++, etc.).
2. Buscá el texto que querés cambiar (Ctrl+F).
3. Modificalo y guardá.

---

## Paleta de colores (para referencia)

| Variable          | Color     | Uso principal                    |
|-------------------|-----------|----------------------------------|
| `--verde`         | `#2C4A2E` | Color primario, fondo nav, botones|
| `--verde-med`     | `#3D6B40` | Hover, gradientes                |
| `--tierra`        | `#8B5E3C` | Acentos, CTA secundario          |
| `--crema`         | `#F5EFE0` | Fondos claros, texto sobre verde |
| `--dorado`        | `#C9A84C` | Separadores, detalles, botón CTA |
| `--gris`          | `#6B6B60` | Cuerpo de texto                  |

Para cambiar la paleta completa, editá las variables en la sección `:root` al inicio de `css/style.css`.

---

## Tipografías

- **Títulos:** Playfair Display (Google Fonts)
- **Cuerpo:** Lato (Google Fonts)

Para cambiarlas, modificá el `@import` al inicio de `css/style.css` y las variables `--fuente-titulo` y `--fuente-cuerpo`.

---

## Requisitos para el deploy (publicar en internet)

El sitio es **100% estático** — solo HTML, CSS y JS. No necesita PHP, bases de datos ni ningún backend.

Para publicarlo necesitás:
- Un servicio de hosting estático. Opciones gratuitas: **Netlify**, **GitHub Pages**, **Vercel**.
- Un dominio (ej: `estancialapaz.com.uy`) — a contratar por separado.

### Deploy con Netlify (opción más sencilla):
1. Crear cuenta en [netlify.com](https://netlify.com)
2. Arrastrar la carpeta `estancia-la-paz/` a la zona de deploy de Netlify.
3. El sitio estará online en segundos con una URL temporal.
4. Luego conectás tu dominio propio desde el panel de Netlify.

---

## Soporte y consultas

Para cualquier duda sobre la personalización o el deploy del sitio, podés consultar la documentación de los servicios mencionados o buscar asistencia técnica.

---

*Sitio desarrollado para Estancia La Paz · Paysandú, Uruguay · 2025*
