# Fantasy Draft Tracker 

Una aplicación web interactiva y moderna diseñada como herramienta de apoyo (*companion app*) para el día del Draft de Fantasy Football. Personalizada para ligas de 8 equipos, sistema Snake, 15 rondas y formato PPR completo.

## Características Principales

* **Tablero de Control en Vivo:** Visualiza en todo momento la ronda actual, el número global del pick, qué equipo está en turno y un indicador especial cuando sea tu turno de elegir.
* **Recomendaciones Inteligentes (Coach):** Analiza automáticamente tu plantilla actual (Roster) para sugerirte las mejores opciones disponibles según las posiciones que más necesitas cubrir (QB, RB, WR, TE, FLEX, DST, K).
* **Búsqueda Rápida y Atajo de Teclado:** Encuentra jugadores al instante filtrando por posición o escribiendo su nombre. Presiona la tecla **Enter** para seleccionar automáticamente al primer resultado y agilizar el ritmo del draft.
* **Gestión de Roster Dinámica:** Clasifica automáticamente a tus jugadores en titulares y banca respetando los límites de posición oficiales.
* **Persistencia Local (`localStorage`):** Tus selecciones se guardan de forma segura en la memoria de tu navegador, evitando cualquier pérdida de datos ante una recarga accidental de la página.

---

##  Tecnologías Utilizadas

* **Frontend:** React, Vite, Lucide React (iconos), Estilos en línea optimizados.
* **Almacenamiento:** Navegador Web (`localStorage`).

---
¡Exactamente! Estás en lo correcto. Como la API HTTP de ESPN no expone los datos del draft en tiempo real, **ya no necesitas el servidor backend (`backend/server.js`)**.

Al haber transformado tu proyecto en una herramienta interactiva respaldada por la memoria local de tu navegador (`localStorage`), la aplicación se ha convertido en una solución **100% Frontend**. Esto simplifica muchísimo la arquitectura de tu proyecto: ya no requieres mantener dos terminales abiertas ni configurar servidores proxy.

---

### Resumen de la solución

* **Qué haremos:** Limpiaremos la estructura de tu proyecto eliminando el código innecesario del backend para dejar una aplicación de React limpia, ligera y directa.
* **Pasos de desarrollo:**
1. Eliminar la carpeta `backend` de tu computadora.
2. Actualizar el archivo `README.md` de tu repositorio de GitHub para que refleje que ahora es una aplicación puramente de frontend.



---

### Pasos de limpieza del proyecto

1. **Elimina el servidor:** Puedes borrar por completo la carpeta `backend` (y el archivo `server.js` que estaba dentro) desde el explorador de archivos de tu computadora o desde tu editor de código, ya que no se volverá a utilizar.
2. **Simplifica tu repositorio:** Tu proyecto principal ahora reside íntegramente en la carpeta raíz con `App.jsx`, tus dependencias en `package.json` y los archivos de configuración de Vite.

---

### Archivo `README.md` actualizado (Solo Frontend)

Dado que ya no requerimos Node.js para el servidor proxy, actualiza tu archivo **`README.md`** con esta versión limpia y directa:

```markdown
# Fantasy Draft Tracker 

Una aplicación web interactiva y moderna diseñada como herramienta de apoyo (*companion app*) para el día del Draft de Fantasy Football. Personalizada para ligas de 8 equipos, sistema Snake, 15 rondas y formato PPR completo.

##  Características Principales

* **Tablero de Control en Vivo:** Visualiza en todo momento la ronda actual, el número global del pick, qué equipo está en turno y un indicador especial cuando sea tu turno de elegir.
* **Recomendaciones Inteligentes (Coach):** Analiza automáticamente tu plantilla actual (Roster) para sugerirte las mejores opciones disponibles según las posiciones que más necesitas cubrir (QB, RB, WR, TE, FLEX, DST, K).
* **Búsqueda Rápida y Atajo de Teclado:** Encuentra jugadores al instante filtrando por posición o escribiendo su nombre. Presiona la tecla **Enter** para seleccionar automáticamente al primer resultado y agilizar el ritmo del draft.
* **Gestión de Roster Dinámica:** Clasifica automáticamente a tus jugadores en titulares y banca respetando los límites de posición oficiales.
* **Persistencia Local (`localStorage`):** Tus selecciones se guardan de forma segura en la memoria de tu navegador, evitando cualquier pérdida de datos ante una recarga accidental de la página.

---

##  Tecnologías Utilizadas

* **Frontend:** React, Vite, Lucide React (iconos), Estilos en línea optimizados.
* **Almacenamiento:** Navegador Web (`localStorage`).

---

##  Instrucciones de Instalación y Uso

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/TU_USUARIO/fantasy-draft-tracker.git](https://github.com/TU_USUARIO/fantasy-draft-tracker.git)
cd fantasy-draft-tracker

```

### 2. Instalar dependencias

```bash
npm install

```

### 3. Iniciar la Aplicación

Ejecuta el servidor de desarrollo:

```bash
npm run dev

```

*Abre la URL local que aparece en tu terminal (generalmente `http://localhost:5173/`) en tu navegador web.*

---

##  Cómo Funciona el Día del Draft

1. Selecciona tu **posición en el orden del draft** (del 1 al 8).
2. Conforme avancen las selecciones en tu plataforma oficial de Fantasy, busca al jugador en la aplicación y presiona **Enter** o el botón de selección para registrarlo al instante.
3. Consulta el panel de recomendaciones de la IA para tomar las mejores decisiones estratégicas en cada ronda.


##  Instrucciones de Instalación y Uso

Sigue estos pasos para clonar y ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/TU_USUARIO/fantasy-draft-tracker.git](https://github.com/TU_USUARIO/fantasy-draft-tracker.git)
cd fantasy-draft-tracker
