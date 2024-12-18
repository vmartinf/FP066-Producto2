// ===============================================================================================================
// FUNCIONES DE JAVASCRIPT PROYECTO FP066
// ===============================================================================================================

// ===============================================================================================================
// Crear nuevas tareas y guardarlas en LocalStorage (Interfaz 2)
// ===============================================================================================================

document.addEventListener('DOMContentLoaded', function() {
   // Verifica si el cuerpo del documento contiene la clase 'interfaz-2', indicando que está en la interfaz de creación de tareas. 
    if (document.body.classList.contains('interfaz-2')) {  // Solo para interfaz 2
        // Obtiene el botón para crear tareas por su ID.
        var crearTareaBtn = document.getElementById('crearTareaBtn');
        // Añade un evento de clic al botón de crear tarea.
        crearTareaBtn.addEventListener('click', function() {
            // Recoge los valores Introducidos en los campos del formulario.
            var titulo = document.getElementById('titulo').value;
            var descripcion = document.getElementById('descripcion').value;
            var prioridad = document.getElementById('prioridad').value;
            // Crea un objeto que representa la nueva tarea con los datos introducidos.
            var nuevaTarjeta = { titulo: titulo, descripcion: descripcion, prioridad: prioridad, estado: 'pendientes' };
             // Recupera las tareas almacenadas en LocalStorage o inicializa un array vacío si no hay ninguna.
            var tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
            // Añade la nueva tarea al array de tareas.
            tarjetas.push(nuevaTarjeta);
            // Guarda el array de tareas actualizado en LocalStorage.
            localStorage.setItem('tarjetas', JSON.stringify(tarjetas));
            // Resetea el formulario después de crear la tarea.
            document.getElementById('taskForm').reset();  // Limpia el formulario
        });
    }
});

// ===============================================================================================================
// Funciones de Drag and Drop (Interfaz 3)
// ===============================================================================================================

// Función que permite soltar elementos arrastrados en zonas que lo permitan.
function allowDrop(event) {
    event.preventDefault();  // Permitir soltar el elemento
}
// Función que se llama al comenzar a arrastrar un elemento.
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);  // Definir el ID del elemento arrastrado
}
// Función que se llama cuando un elemento arrastrado se suelta sobre un área permitida.
function drop(event) {
    event.preventDefault();  // Evitar la acción predeterminada
    var data = event.dataTransfer.getData("text");  // Obtener el ID del elemento arrastrado
    var tarjeta = document.getElementById(data);  // Recupera el elemento arrastrado por su ID
    if (event.target.classList.contains("column")) {  // Verifica si el área donde se suelta es una columna válida.
        event.target.appendChild(tarjeta);  // Añade el elemento arrastrado a la columna.
        actualizarEstadoTarjeta(data, event.target.id);  // Actualiza el estado en LocalStorage
    }
}

// ===============================================================================================================
// Cargar tarjetas desde LocalStorage y asignarlas a las columnas correspondientes (Interfaz 3)
// ===============================================================================================================

// Este evento asegura que el código se ejecute solo después de que toda la estructura del DOM haya sido completamente cargada.
document.addEventListener('DOMContentLoaded', function() {
    // Verifica si el cuerpo del documento contiene la clase 'interfaz-3'
    if (document.body.classList.contains('interfaz-3')) {  // Solo para interfaz 3
        // Recupera las tarjetas almacenadas en LocalStorage o inicializa un array vacío si no existe nada almacenado.
        var tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
        // Itera sobre el array de tarjetas recuperado de LocalStorage.
        tarjetas.forEach(function(tarjeta, index) {
            // Crea un elemento HTML para cada tarjeta que incluye información y atributos necesarios para arrastrar y soltar.
            var cardHtml = `
                <div class="card mb-2" id="tarjeta-${index}" draggable="true" ondragstart="drag(event)">
                    <div class="card-header bg-primary text-white">${tarjeta.titulo}</div>
                    <div class="card-body">
                        <p>${tarjeta.descripcion}</p>
                        <p><strong>Prioridad: </strong>${tarjeta.prioridad}</p>
                    </div>
                </div>`;
            // Encuentra el elemento del DOM correspondiente al estado de la tarjeta, donde se deberá insertar el HTML.
            var column = document.getElementById(tarjeta.estado);
            // Inserta el HTML de la tarjeta en la columna correspondiente usando 'insertAdjacentHTML', que permite agregar el HTML directamente.
            column.insertAdjacentHTML('beforeend', cardHtml);
        });
    }
});

// ===============================================================================================================
// Actualizar el estado de una tarjeta en LocalStorage
// ===============================================================================================================

function actualizarEstadoTarjeta(tarjetaId, nuevoEstado) {
     // Recupera el array de tarjetas desde LocalStorage. Si no hay datos, inicializa un array vacío.
    var tarjetas = JSON.parse(localStorage.getItem('tarjetas')) || [];
    // Extrae el índice numérico de la tarjeta desde su ID, que se espera que tenga un formato como 'tarjeta-0', 'tarjeta-1', etc.
    var tarjetaIndex = parseInt(tarjetaId.split('-')[1]);  // Extraer el índice de la tarjeta
    // Actualiza el estado de la tarjeta específica en el array, usando el índice extraído anteriormente, al nuevo estado proporcionado.
    tarjetas[tarjetaIndex].estado = nuevoEstado;
    // Guarda de nuevo el array de tarjetas en LocalStorage, convertido a una cadena JSON para su almacenamiento adecuado.
    localStorage.setItem('tarjetas', JSON.stringify(tarjetas));
}
