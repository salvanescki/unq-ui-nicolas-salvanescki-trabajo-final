# Palabras Encadenadas

"Palabras Encadenadas" es un juego web desarrollado en React y TypeScript donde los jugadores deben encadenar palabras haciendo coincidir la última letra de la palabra anterior con la primera letra de la palabra ingresada.

## Requisitos Previos

- **Node.js**: Versión 20 o superior
- **npm**: Versión 10 o superior

## Instalación

1. Clona el repositorio en tu máquina local:
   ```bash
   git clone https://github.com/salvanescki/unq-ui-nicolas-salvanescki-trabajo-final.git
   cd unq-ui-nicolas-salvanescki-trabajo-final
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo local y correr la aplicación:

```bash
npm run dev
```

Una vez iniciado, abre [http://localhost:5173/](http://localhost:5173/) en tu navegador para interactuar con el juego.

## Compilación

Para compilar el proyecto y preparar los archivos optimizados para producción:

```bash
npm run build
```

Puedes previsualizar el bundle de producción localmente ejecutando:

```bash
npm run preview
```

## Validación de Código (Linter)

Para ejecutar las pruebas de análisis estático de código:

```bash
npm run lint
```

## Características Implementadas

- **Flujo de Juego Completo**: 
  - Pantalla de inicio con validación de nombre de usuario y visualización de reglas.
  - Tablero de juego interactivo para el ingreso y validación en tiempo real.
  - Pantalla de fin de partida (Game Over) con resumen de palabras encadenadas, puntaje obtenido y accesos directos de reinicio.
- **Validación del Encadenado**:
  - Validación local de caracteres.
  - Detección de duplicados para evitar el reuso de palabras en la misma sesión.
  - Verificación estricta de la regla de cadena (letra final con letra inicial).
  - Consulta asíncrona a API remota de diccionario para validar la existencia real de la palabra.
- **Sistema de Puntuación**: Suma de 1 punto por cada carácter de la palabra válida ingresada.
- **Sistema de Temporizador**: Límite de 15 segundos por turno que, al agotarse, da por terminada la partida. Cuenta con una advertencia visual pulsante cuando restan $\le 3$ segundos.
- **Tabla de Clasificación (Leaderboard)**:
  - Registro de los mejores 10 puntajes persistido localmente (`localStorage`).
  - Resaltado visual preciso de la partida actual en la tabla mediante un identificador de sesión único (`sessionId`).
- **Diseño Adaptativo y Accesibilidad**:
  - Layout totalmente responsivo adaptado para móviles, tablets y desktops.
  - Enfoque visual de navegación mejorado por teclado (`:focus-visible`).
