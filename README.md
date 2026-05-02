# Astrobooking — API demo de reservas para lanzamientos

API REST de demostración en **TypeScript** para gestionar cohetes y reservas de lanzamientos espaciales ficticios. Incluye validación de datos, registro de operaciones y **pruebas end-to-end con Playwright** (el servidor se levanta solo al correr los tests gracias a `webServer` en la config).

**Autora del repositorio:** [@Juli21v](https://github.com/Juli21v)

## Por qué sirve como carta de presentación

- Código tipado en **TypeScript** y capas claras (`validation`, `service`, rutas).
- **Playwright** prueba la API de punta a punta sin UI.
- Listo para conectar **GitHub Actions** en tu cuenta: hace falta un token/PAT con permiso `workflow` si subes el YAML desde la CLI (o créalo desde la web en *Actions*).

### CI sugerida (opcional)

En *Actions* → *New workflow* puedes usar un job estándar `ubuntu-latest` con `npm ci`, `npx playwright install --with-deps chromium` y `npm test`. Si `git push` rechaza archivos bajo `.github/workflows/`, ejecuta `gh auth refresh -s workflow` o usa un PAT con alcance **workflow**.

## Stack

- Node.js, TypeScript, Express
- Playwright (tests E2E)

## Características principales

### Cohetes (CRUD)

- Crear, listar, obtener por id, actualizar y eliminar cohetes
- Validación: nombre no vacío, rango (`suborbital`, `orbital`, `moon`, `mars`), capacidad 1–10 pasajeros
- Endpoints REST bajo convenciones HTTP habituales
- `GET /health` para comprobar que el servicio está vivo

### Sistema de reservas (modelo de dominio)

- Lanzamientos asociados a cohetes, precios y cupos
- Estados del lanzamiento: programado → confirmado → exitoso (y caminos de cancelación)
- Clientes identificados por email; límites de asientos por reserva
- Pagos simulados mediante un gateway de prueba

## Estructura del repositorio

```
demo-viajes-espacio-api-y-tests/
├── src/
│   ├── index.ts           # Punto de entrada del servidor
│   ├── rockets.service.ts # Lógica de cohetes
│   ├── validation.ts      # Reglas de validación
│   ├── types.ts           # Tipos TypeScript
│   └── logger.ts          # Logging
├── tests/                 # Pruebas Playwright
├── package.json
├── tsconfig.json
└── playwright.config.ts
```

## Requisitos

- Node.js 18+ (recomendado)

## Instalación y uso

```bash
npm install
npm run dev
```

Servidor por defecto: `http://localhost:3000`

### Pruebas

```bash
npm test
```

### Build producción

```bash
npm run build
npm start
```

## Nota

Proyecto con fines de **aprendizaje y demostración**, no pensado para producción (sin persistencia ni endurecimiento de seguridad en la primera versión).
