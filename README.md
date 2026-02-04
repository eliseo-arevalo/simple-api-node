# simple-api-node

API simple desarrollada con Express y Node.js

## Descripción

Esta es una API REST simple construida con Express.js que proporciona operaciones CRUD básicas para gestionar usuarios.

## Requisitos

- Node.js (versión 14 o superior)
- npm (Node Package Manager)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/eliseo-arevalo/simple-api-node.git
cd simple-api-node
```

2. Instalar dependencias:
```bash
npm install
```

## Uso

Para iniciar el servidor:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000` por defecto.

## Endpoints Disponibles

### Root
- `GET /` - Muestra mensaje de bienvenida y lista de endpoints disponibles

### Health Check
- `GET /health` - Verifica el estado del servidor

### Usuarios
- `GET /api/users` - Obtiene todos los usuarios
- `GET /api/users/:id` - Obtiene un usuario por ID
- `POST /api/users` - Crea un nuevo usuario (requiere `name` y `email` en el body)
- `PUT /api/users/:id` - Actualiza un usuario existente
- `DELETE /api/users/:id` - Elimina un usuario

## Ejemplos de Uso

### Obtener todos los usuarios
```bash
curl http://localhost:3000/api/users
```

### Obtener un usuario específico
```bash
curl http://localhost:3000/api/users/1
```

### Crear un nuevo usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Carlos","email":"carlos@example.com"}'
```

### Actualizar un usuario
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Actualizado"}'
```

### Eliminar un usuario
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## Estructura del Proyecto

```
simple-api-node/
├── index.js          # Archivo principal del servidor
├── package.json      # Configuración del proyecto y dependencias
├── .gitignore       # Archivos ignorados por git
└── README.md        # Documentación del proyecto
```

## Licencia

ISC