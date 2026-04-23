const API_URL = "https://mi-api-node-xdfn.onrender.com/usuarios";

async function cargarUsuarios() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const lista = document.getElementById("lista-usuarios");
    lista.innerHTML = "";

    data.forEach(usuario => {
      const li = document.createElement("li");
      li.textContent = `${usuario.id} - ${usuario.nombre}`;
      lista.appendChild(li);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

cargarUsuarios();