document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const searchButton = document.getElementById('searchButton');
    const logoutButton = document.getElementById('logoutButton');

    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    if (searchButton && logoutButton) {
        searchButton.addEventListener('click', buscarPersonaje);
        logoutButton.addEventListener('click', logout);
    }
});

async function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Por favor ingresa usuario y contraseña');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/search';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

async function buscarPersonaje() {
    const name = document.getElementById('searchInput').value.trim();
    if (!name) {
        alert('Por favor ingresa un nombre');
        return;
    }

    try {
        const response = await fetch(`/characters/${name}`);
        const data = await response.json();

        if (response.ok) {
            mostrarPersonaje(data);
        } else {
            document.getElementById('characterInfo').innerHTML = `<p>${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

function mostrarPersonaje(personaje) {
    const infoDiv = document.getElementById('characterInfo');
    infoDiv.innerHTML = `
        <h2>${personaje.name}</h2>
        <p>Status: ${personaje.status}</p>
        <p>Species: ${personaje.species}</p>
        <p>Gender: ${personaje.gender}</p>
        <p>Origin: ${personaje.origin.name}</p>
        <img src="${personaje.image}" alt="${personaje.name}">
    `;
}

function logout() {
    fetch('/logout', { method: 'POST' }).then(() => {
        window.location.href = '/';
    });
}
