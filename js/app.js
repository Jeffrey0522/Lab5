
const API_URL = 'http://localhost/Lab5/api_rest.php';
let pokemonEnEdicion = null;
let allPokemons = [];

const pokemonForm = document.getElementById('pokemonForm');
const pokemonIdInput = document.getElementById('pokemonId');
const nombreInput = document.getElementById('nombre');
const tipoInput = document.getElementById('tipo');
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');
const pokemonList = document.getElementById('pokemonList');
const loadingMessage = document.getElementById('loadingMessage');
const emptyMessage = document.getElementById('emptyMessage');
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const deleteMessage = document.getElementById('deleteMessage');
const notification = document.getElementById('notification');


function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function clearForm() {
    pokemonForm.reset();
    pokemonIdInput.value = '';
    pokemonEnEdicion = null;
    submitBtn.textContent = '➕ Crear Pokémon';
    cancelBtn.style.display = 'none';
    nombreInput.focus();
}


function getTipoClass(tipo) {
    return `type-${tipo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`;
}

function renderPokemonCard(pokemon) {
    const tipoClass = getTipoClass(pokemon.tipo);
    
    return `
        <div class="pokemon-card ${tipoClass}">
            <div class="pokemon-info">
                <div class="pokemon-id">#${pokemon.id}</div>
                <div class="pokemon-name">${pokemon.nombre}</div>
                <div class="pokemon-type">${pokemon.tipo}</div>
                <div class="pokemon-stats">
                    <div class="stat"><strong>Peso:</strong> ${pokemon.peso} kg</div>
                    <div class="stat"><strong>Altura:</strong> ${pokemon.altura} m</div>
                </div>
            </div>
            <div class="pokemon-actions">
                <button class="edit-btn" onclick="editPokemon(${pokemon.id})"> Editar</button>
                <button class="delete-btn" onclick="confirmDelete(${pokemon.id}, '${pokemon.nombre}')"> Eliminar</button>
            </div>
        </div>
    `;
}


function displayPokemons(pokemons) {
    pokemonList.innerHTML = '';
    
    if (pokemons.length === 0) {
        emptyMessage.style.display = 'block';
        loadingMessage.style.display = 'none';
        return;
    }
    
    emptyMessage.style.display = 'none';
    loadingMessage.style.display = 'none';
    
    pokemons.forEach(pokemon => {
        pokemonList.innerHTML += renderPokemonCard(pokemon);
    });
}

async function getAllPokemons() {
    try {
        loadingMessage.style.display = 'block';
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.success) {
            allPokemons = data.data;
            displayPokemons(allPokemons);
        } else {
            showNotification('Error al obtener pokémon', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión con la API', 'error');
    }
}


async function createPokemon(nombre, tipo, peso, altura) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, tipo, peso, altura })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Pokémon creado con éxito', 'success');
            clearForm();
            getAllPokemons();
        } else {
            showNotification(` ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión con la API', 'error');
    }
}


async function updatePokemon(id, nombre, tipo, peso, altura) {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, nombre, tipo, peso, altura })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Pokémon actualizado con éxito', 'success');
            clearForm();
            getAllPokemons();
        } else {
            showNotification(` ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión con la API', 'error');
    }
}

async function deletePokemon(id) {
    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Pokémon eliminado con éxito', 'success');
            deleteModal.style.display = 'none';
            getAllPokemons();
        } else {
            showNotification(` ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión con la API', 'error');
    }
}


async function searchPokemon(nombre) {
    if (!nombre.trim()) {
        getAllPokemons();
        return;
    }
    
    try {
        loadingMessage.style.display = 'block';
        const response = await fetch(`${API_URL}?buscar=${encodeURIComponent(nombre)}`);
        const data = await response.json();
        
        if (data.success) {
            displayPokemons(data.data);
        } else {
            showNotification('Error en la búsqueda', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión con la API', 'error');
    }
}


async function editPokemon(id) {
    try {
        const response = await fetch(`${API_URL}?id=${id}`);
        const data = await response.json();
        
        if (data.success && data.data) {
            const pokemon = data.data;
            pokemonIdInput.value = pokemon.id;
            nombreInput.value = pokemon.nombre;
            tipoInput.value = pokemon.tipo;
            pesoInput.value = pokemon.peso;
            alturaInput.value = pokemon.altura;
            
            submitBtn.textContent = ' Actualizar Pokémon';
            cancelBtn.style.display = 'block';
            pokemonEnEdicion = pokemon.id;
            
            nombreInput.focus();
            document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
        } else {
            showNotification('Error al cargar pokémon', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error de conexión con la API', 'error');
    }
}

function confirmDelete(id, nombre) {
    deleteMessage.textContent = `¿Estás seguro de que deseas eliminar a ${nombre}?`;
    confirmDeleteBtn.onclick = () => deletePokemon(id);
    deleteModal.style.display = 'flex';
}

// Enviar formulario
pokemonForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = nombreInput.value.trim();
    const tipo = tipoInput.value;
    const peso = parseFloat(pesoInput.value);
    const altura = parseFloat(alturaInput.value);
    
    if (!nombre || !tipo || !peso || !altura) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    if (pokemonEnEdicion) {
        updatePokemon(pokemonEnEdicion, nombre, tipo, peso, altura);
    } else {
        createPokemon(nombre, tipo, peso, altura);
    }
});

// Botón Cancelar
cancelBtn.addEventListener('click', () => {
    clearForm();
});

// Botón Buscar
searchBtn.addEventListener('click', () => {
    const search = searchInput.value.trim();
    searchPokemon(search);
});

// Búsqueda en tiempo real 
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const search = searchInput.value.trim();
        searchPokemon(search);
    }
});

// Botón Resetear búsqueda
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    getAllPokemons();
});

// Modal de eliminación
cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});

// Cerrar modal al hacer click fuera
deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.style.display = 'none';
    }
});

// Inicialización

document.addEventListener('DOMContentLoaded', () => {
    getAllPokemons();
    nombreInput.focus();
});
