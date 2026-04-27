const API_URL = "https://mi-api-node-xdfn.onrender.com/usuarios";

async function cargarUsuarios() {
  try {
    const res = await fetch(API_URL);
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

  if (!nombre) {
    alert("Ingresá un nombre");
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre })
    });

    input.value = "";
    cargarUsuarios(); // 🔥 recarga la lista

  } catch (error) {
    console.error("Error:", error);
  }
}

async function eliminarUsuario(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
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
        "Content-Type": "application/json"
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