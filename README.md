# 🎮 Pokédex - CRUD API REST

Sistema completo de gestión de Pokémon con API REST en PHP y interfaz web moderna.

## 📋 Características

- ✅ **CRUD Completo**: Crear, Leer, Actualizar y Eliminar Pokémon
- 🎨 **Interfaz Moderna**: Diseño responsivo con CSS personalizado
- ⚡ **API REST**: Backend en PHP con métodos GET, POST, PUT, DELETE
- 🔍 **Búsqueda**: Buscar Pokémon por nombre en tiempo real
- 🎯 **Validaciones**: Validaciones en frontend y backend
- 📱 **Responsive**: Funciona en desktop, tablet y móvil

## 🛠️ Instalación

### 1. Crear la Base de Datos

Ejecuta el archivo SQL para crear la base de datos y la tabla:

```bash
mysql -u root -p < db_pokemon.sql
```

O importa el archivo `db_pokemon.sql` desde phpMyAdmin.

### 2. Verificar Configuración

El archivo `libs/configuration.php` ya está configurado para usar:
- **Host**: localhost
- **Base de datos**: db_pokemon
- **Usuario**: root
- **Contraseña**: (vacía)

Si tu configuración es diferente, modifica el archivo `libs/configuration.php`.

### 3. Acceder a la Aplicación

Abre tu navegador e ingresa a:

```
http://localhost/Lab5/
```

## 📂 Estructura del Proyecto

```
Lab5/
├── index.html              # Interfaz web principal
├── api_rest.php            # API REST (endpoint principal)
├── api.php                 # API de ejemplo (sin usar)
├── db_pokemon.sql          # Script SQL para crear BD
├── css/
│   └── styles.css          # Estilos CSS
├── js/
│   └── app.js              # Lógica JavaScript del CRUD
├── libs/
│   ├── Config.php          # Clase de configuración
│   ├── configuration.php   # Datos de conexión a BD
│   ├── SPDO.php            # Conexión PDO a la BD
│   └── View.php            # Clase de vista
└── model/
    ├── PokemonModel.php    # Modelo para Pokémon
    └── ProyectoModel.php   # Modelo anterior (sin usar)
```

## 🚀 Cómo Usar

### Agregar Pokémon

1. Completa el formulario con:
   - **Nombre**: Nombre del pokémon
   - **Tipo**: Selecciona de la lista
2. Haz clic en "➕ Crear Pokémon"
3. Se agregará a la lista automáticamente

### Editar Pokémon

1. En la tarjeta del pokémon, haz clic en "✏️ Editar"
2. El formulario se llenará con los datos actuales
3. Realiza los cambios necesarios
4. Haz clic en "💾 Actualizar Pokémon"

### Eliminar Pokémon

1. En la tarjeta del pokémon, haz clic en "🗑️ Eliminar"
2. Confirma la eliminación en el modal
3. Se eliminará de la base de datos

### Buscar Pokémon

1. Escribe el nombre en el campo de búsqueda
2. Haz clic en "🔍 Buscar" o presiona Enter
3. Se mostrarán los resultados coincidentes
4. Haz clic en "🔄 Mostrar Todo" para ver todos nuevamente

## 🔌 API REST - Endpoints

### GET - Obtener todos los pokémon

```bash
GET http://localhost/Lab5/api_rest.php
```

Respuesta:
```json
{
  "success": true,
  "data": [
    {"id": 1, "nombre": "Pikachu", "tipo": "Eléctrico"},
    {"id": 2, "nombre": "Charizard", "tipo": "Fuego"}
  ]
}
```

### GET - Obtener pokémon por ID

```bash
GET http://localhost/Lab5/api_rest.php?id=1
```

### GET - Buscar por nombre

```bash
GET http://localhost/Lab5/api_rest.php?buscar=Pikachu
```

### POST - Crear pokémon

```bash
POST http://localhost/Lab5/api_rest.php
Content-Type: application/json

{
  "nombre": "Raichu",
  "tipo": "Eléctrico"
}
```

Respuesta exitosa:
```json
{
  "success": true,
  "message": "Pokémon creado con éxito"
}
```

### PUT - Actualizar pokémon

```bash
PUT http://localhost/Lab5/api_rest.php
Content-Type: application/json

{
  "id": 1,
  "nombre": "Pikachu",
  "tipo": "Eléctrico"
}
```

### DELETE - Eliminar pokémon

```bash
DELETE http://localhost/Lab5/api_rest.php
Content-Type: application/json

{
  "id": 1
}
```

## 🎨 Tipos de Pokémon Disponibles

- 🔥 Fuego
- 💧 Agua
- 🌿 Planta
- ⚡ Eléctrico
- ❄️ Hielo
- 👊 Lucha
- ☠️ Veneno
- 🏔️ Tierra
- 🦅 Volador
- 👁️ Psíquico
- 🐛 Bigio
- 🪨 Roca
- 👻 Fantasma
- 🐉 Dragón
- 🌑 Siniestro
- ⚙️ Acero
- ✨ Hada
- ⭕ Normal

Cada tipo tiene su propia gradiente de color en las tarjetas.

## 🔧 Requisitos

- PHP 7.4+
- MySQL 5.7+
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- EasyPHP o servidor PHP local

## 📝 Notas Importantes

1. La API está configurada para aceptar requests CORS (desde cualquier origen)
2. Las validaciones se realizan en backend y frontend
3. Los datos se guardan automáticamente en la base de datos
4. Las búsquedas son case-insensitive
5. Los tipos de pokémon tienen colores personalizados

## 🐛 Troubleshooting

### Error de conexión a la BD

Verifica:
- Que MySQL esté en ejecución
- Los datos de conexión en `libs/configuration.php`
- Que la base de datos `db_pokemon` exista

### La API no responde

- Verifica que PHP esté ejecutándose
- Comprueba la URL en `app.js` (debe ser `http://localhost/Lab5/api_rest.php`)
- Revisa la consola del navegador (F12) para errores

### Los estilos no se ven

- Verifica que los archivos CSS estén en la carpeta correcta: `Lab5/css/styles.css`
- Limpia la caché del navegador (Ctrl+Shift+Delete)

## 📱 Características Responsivas

La aplicación se adapta automáticamente a:
- Escritorio (1200px+)
- Tablet (768px - 1199px)
- Móvil (< 768px)

## 🚀 Próximas Mejoras Sugeridas

- Agregar validaciones más estrictas
- Implementar autenticación de usuarios
- Agregar paginación a la lista
- Exportar datos a CSV/PDF
- Subir imágenes de pokémon
- Sistema de ratings o favoritos

## 📧 Contacto

Para dudas o sugerencias, contacta al equipo de desarrollo.

---

**Versión**: 1.0  
**Última actualización**: 2026  
**Estado**: Listo para producción ✅
