# API de Usuarios - Node.js + PostgreSQL

API REST desarrollada con Node.js y Express que permite gestionar usuarios (crear, listar, editar y eliminar) conectada a una base de datos PostgreSQL deployada en la nube.

## Demo

🔗 https://mi-api-node-xdfn.onrender.com/usuarios

## Tecnologías utilizadas

* Node.js
* Express
* PostgreSQL
* Render (deploy)
* Git & GitHub

## Instalación

1. Clonar el repositorio:

```
git clone https://github.com/fedefer85/mi-api-node.git
```

2. Instalar dependencias:

```
npm install
```

3. Crear archivo `.env`:

```
DATABASE_URL=tu_database_url
PORT=3000
```

4. Ejecutar el servidor:

```
node app.js
```

---

## Endpoints

### Obtener usuarios

```
GET /usuarios
```

---

### Crear usuario

```
POST /usuarios
```

Body:

```json
{
  "nombre": "Juan"
}
```

---

### Actualizar usuario

```
PUT /usuarios/:id
```

---

### Eliminar usuario

```
DELETE /usuarios/:id
```

---

## Estado del proyecto

✔ API funcional  
✔ Deploy en producción  
🔄 Frontend en desarrollo

## Aprendizajes

* Creación de APIs REST con Express
* Conexión a PostgreSQL
* Uso de variables de entorno
* Deploy de aplicaciones en la nube
* Manejo de errores en backend

---

## Contacto

LinkedIn: https://www.linkedin.com/in/ffscudeller/
