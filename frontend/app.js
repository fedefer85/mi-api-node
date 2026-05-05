const API_URL = "https://mi-api-node-xdfn.onrender.com/usuarios";

// esto permite que si refrescás la página, siga logueado
let token = localStorage.getItem("token") || "";

async function cargarUsuarios() {

  // CHECK DE LOGIN:
  if (!token) {
    alert("Tenés que loguearte primero");
    return;
  }

  try {
    // const res = await fetch(API_URL);
    // reemplazado lo anterior para etapa de AUTH:
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();

    const lista = document.getElementById("lista-usuarios");
    lista.innerHTML = "";

    // esto queda pisado por lo siguiente
    // data.forEach(usuario => {
    //   const li = document.createElement("li");
    //   li.textContent = `${usuario.id} - ${usuario.nombre}`;
    //   lista.appendChild(li);
    // });

    data.forEach(usuario => {
      const li = document.createElement("li");

      // 🧾 ID
      const spanId = document.createElement("span");
      spanId.textContent = usuario.id;

      // ✏️ INPUT editable
      const input = document.createElement("input");
      input.value = usuario.nombre;

      // 💾 BOTÓN GUARDAR
      const btnGuardar = document.createElement("button");
      btnGuardar.textContent = "Guardar";
      // agregeado para estilo
      btnGuardar.className = "btn-guardar"
      btnGuardar.onclick = () => editarUsuario(usuario.id, input.value, input);

      // 🗑️ BOTÓN ELIMINAR
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      // agregeado para estilo
      btnEliminar.className = "btn-eliminar"
      btnEliminar.onclick = () => eliminarUsuario(usuario.id);

      li.appendChild(spanId);
      li.appendChild(input);
      
      // li.appendChild(btnGuardar);
      // li.appendChild(btnEliminar);
      
      // modificado para mejor visibilidad en celular
      const acciones = document.createElement("div");
      acciones.className = "acciones";

      acciones.appendChild(btnGuardar);
      acciones.appendChild(btnEliminar);

      li.appendChild(acciones);

      lista.appendChild(li);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

cargarUsuarios();

async function crearUsuario() {
  const input = document.getElementById("nombre");
  const nombre = input.value;
  const passwordInput = document.getElementById("password");
  const password = document.getElementById("password").value;
  
  if (!nombre) {
    alert("Ingresá un nombre");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // 👈 ESTA ES LA CLAVE
      },
      body: JSON.stringify({ nombre, password })
    });

    // limpiar inputs
    input.value = "";
    passwordInput.value = "";

    cargarUsuarios(); // 🔥 recarga la lista

  } catch (error) {
    console.error("Error:", error);
  }
}

async function eliminarUsuario(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}` // 👈 AGREGAR
    }
    });

    cargarUsuarios(); // 🔥 refresca lista

  } catch (error) {
    console.error("Error:", error);
  }
}

//  pisado para no tener PROMPTs:
// async function editarUsuario(id, nombreActual) {
//   const nuevoNombre = prompt("Nuevo nombre:", nombreActual);

//   if (!nuevoNombre) return;

//   try {
//     await fetch(`${API_URL}/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ nombre: nuevoNombre })
//     });

//     cargarUsuarios(); // 🔥 refresca lista

//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

async function editarUsuario(id, nuevoNombre, inputElement) {
  if (!nuevoNombre) {
    alert("El nombre no puede estar vacío");
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // 👈 AGREGAR
      },
      body: JSON.stringify({ nombre: nuevoNombre })
    });

    // 🔥 feedback visual
    inputElement.classList.add("guardado");

    setTimeout(() => {
      inputElement.classList.remove("guardado");
    }, 1000);

  } catch (error) {
    console.error("Error:", error);
  }
}

async function login(event) {
  event.preventDefault(); // 🔥 evita recargar la página

  const inputNombre = document.getElementById("login-nombre");
  const inputPassword = document.getElementById("login-password");

  const nombre = inputNombre.value;
  const password = inputPassword.value;

  try {
    const res = await fetch("https://mi-api-node-xdfn.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, password })
    });

    const data = await res.json();

    if (data.token) {
      token = data.token;
      localStorage.setItem("token", token);

      inputNombre.value = "";
      inputPassword.value = "";

      actualizarUI();
      cargarUsuarios();

    } else {
      alert(data.error || "Error en login");
    }

  } catch (error) {
    console.error("Error login:", error);
  }
}

function logout() {
  localStorage.removeItem("token");
  token = "";

  actualizarUI();

  alert("Sesión cerrada");

  const lista = document.getElementById("lista-usuarios");
  lista.innerHTML = "";

  // limpiar inputs de login
  document.getElementById("login-nombre").value = "";
  document.getElementById("login-password").value = "";
}

function actualizarUI() {
  const loginSection = document.getElementById("login-section");
  const appSection = document.getElementById("app-section");

  if (token) {
    loginSection.style.display = "none";
    appSection.style.display = "block";
  } else {
    loginSection.style.display = "block";
    appSection.style.display = "none";
  }
}

actualizarUI();

if (token) {
  cargarUsuarios();
}