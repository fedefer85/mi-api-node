# App de Usuarios

Aplicación fullstack con autenticación JWT que permite gestionar usuarios (crear, editar y eliminar) con persistencia en base de datos.

---

## 🔗 Demo

Frontend: https://cheerful-platypus-c888c3.netlify.app/
Backend: https://mi-api-node-xdfn.onrender.com

---

## 🚀 Funcionalidades

- Login con autenticación JWT
- Persistencia de sesión en el navegador (localStorage)
- CRUD completo de usuarios
- Edición inline de usuarios
- Protección de rutas en backend
- Interfaz responsive (mobile friendly)

---

## 🛠️ Tecnologías

### Frontend
- HTML
- CSS
- JavaScript (Vanilla)

### Backend
- Node.js
- Express

### Base de datos
- PostgreSQL

### Deploy
- Backend: Render
- Frontend: Netlify

---

## 🔐 Autenticación

- Uso de JSON Web Tokens (JWT)
- Middleware de protección de rutas
- Validación de credenciales con bcrypt
- Token almacenado en localStorage

---

## 📡 API Endpoints

- POST /login → login de usuario
- GET /usuarios → obtener usuarios (requiere token)
- POST /usuarios → crear usuario (requiere token)
- PUT /usuarios/:id → actualizar usuario (requiere token)
- DELETE /usuarios/:id → eliminar usuario (requiere token)

---

## ▶️ Cómo usar la app

1. Ingresar nombre y contraseña en el login
2. Acceder a la lista de usuarios
3. Crear nuevos usuarios
4. Editar directamente desde la lista
5. Eliminar usuarios
6. Cerrar sesión


---

## 📁 Estructura del proyecto

/frontend
  ├── index.html
  ├── styles.css
  └── app.js

/backend
  ├── app.js
  ├── routes/
  ├── controllers/
  └── db.js

---

## Contacto

LinkedIn: https://www.linkedin.com/in/ffscudeller/
