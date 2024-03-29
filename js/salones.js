
const listaSalones = [];

const loadSalones = async () => {
    try {
        listaSalones.length = 0;
        const respuesta = await fetch('http://localhost:3000/salones');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Salones. Estado: ' + respuesta.status);
        }
        const Salon = await respuesta.json();
        listaSalones.push(...Salon);

    } catch (error) {
        console.error("Error al cargar Salon", error.message);
    }
}

const guardarSalon = async (nuevoSalon) => {
    try {

        const respuesta = await fetch('http://localhost:3000/salones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoSalon),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el salon. Estado: ' + respuesta.status);
        }
        const SalonCreado = await respuesta.json();


        console.log('Salon creado:', SalonCreado);

    } catch (error) {
        console.error("Error al cargar Salon", error.message);
    }
}
const botonesSalones = async () => {
    const contenedorSalones = document.getElementById('contenidoContenedor');
    contenedorSalones.innerHTML = `
      <form>
          <button class="botonsSalones" id="botoncrearSalon" type="button" onclick="formularioCrearSalon()">Crear Salones</button>
          <button class="botonsSalones" id="botonmodificarSalon" type="button" onclick="modificarSalon()">Modificar Salones</button>
          <button class="botonsSalones" id="mostrarListadoSalones" type="button" onclick="mostrarListadoSaloness()">Ver Listado de Salones</button>
      
          <div id="crearSalon"></div>
          <button id="atras1" class="atras" onclick="volverInicio()">atras</button>
      </form>`;

    stylesContenedorNuevo(contenedorSalones);
}

const formularioCrearSalon = async () => {
  const boton1 = document.getElementById('botoncrearSalon');
  const boton2 = document.getElementById('botonmodificarSalon');
  const boton3 = document.getElementById('mostrarListadoSalones');
  const contenedorSalones = document.getElementById('crearSalon');
  contenedorSalones.innerHTML = `
    <form id="MenuCrearSalon">
      <h3>Menu Crear Salones</h3>
      <label for="numeroIdentificacionSalon">Número de Identificación del Salón:</label>
      <input type="text" id="numeroIdentificacionSalon" required>
      <label for="capacidadSalon">Capacidad de Alumnos:</label>
      <input type="number" id="capacidadSalon" required>
      <label for="edificioSalon">Edificio:</label>
      <input type="text" id="edificioSalon" required>
      <label for="pisoSalon">Piso:</label>
      <input type="number" id="pisoSalon" required>
      <button id="atras" class="atras" onclick="botonesSalones()">Atrás</button>
    </form>
`;
  const atras = document.getElementById('atras1');
  atras.style.display = 'none';
  boton1.style.display = 'none';
  boton2.style.display = 'none';
  boton3.style.display = 'none';
}

const crearSalones = async () => {
  const numeroIdentificacionInput = document.getElementById('numeroIdentificacionSalon');
  const capacidadInput = document.getElementById('capacidadSalon');
  const edificioInput = document.getElementById('edificioSalon');
  const pisoInput = document.getElementById('pisoSalon');

  const numeroIdentificacion = numeroIdentificacionInput.value;
  const capacidad = capacidadInput.value;
  const edificio = edificioInput.value;
  const piso = pisoInput.value;

  const nuevoSalon = {
      id: listaSalones.length + 1,
      numero_identificacion: numeroIdentificacion,
      capacidad_alumnos: capacidad,
      edificio: edificio,
      piso: piso
  };


  numeroIdentificacionInput.value = '';
  capacidadInput.value = '';
  edificioInput.value = '';
  pisoInput.value = '';

  alert('Salón creado con éxito!');

  return nuevoSalon;
}

const modificarSalon = async () => {
  const boton1 = document.getElementById('botoncrearSalon');
  const boton2 = document.getElementById('botonmodificarSalon');
  const boton3 = document.getElementById('botonmostrarListado');
  const contenedorSalones = document.getElementById('crearSalon');
  boton1.style.display = 'none';
  boton2.style.display = 'none';
  boton3.style.display = 'none';

  verificarSalones();
  if (Estado === 'Encontrado') {
      contenedorSalones.innerHTML = `
    <form id="MenuModificarSalon">
      <h3>Menu Modificar Salones</h3>
      <h3>Seleccione el item que desea modificar</h3>
      <button for="numeroIdentificacionSalon" onclick="modificarNumeroIdentificacionSalon()">Número de Identificación del Salón:</button>
      <button for="capacidadSalon" onclick="modificarCapacidadSalon()">Capacidad de Alumnos:</button>
      <button for="edificioSalon" onclick="modificarEdificioSalon()">Edificio:</button>
      <button for="pisoSalon" onclick="modificarPisoSalon()">Piso:</button>
      <button id="atras" class="atras" onclick="botonesSalones()">Atrás</button>
    </form>`;
  }
}

const verificarSalones = async () => {
  const Estado = '';
  const numeroIdentificacion = document.getElementById('numeroIdentificacionSalon');
  const contenedorSalones = document.getElementById('crearSalon');
  contenedorSalones.innerHTML = `
    <form id="MenuModificarSalon">
      <h3>Menu Modificar Salón</h3>
      <label for="numeroIdentificacionSalon">Número de Identificación del Salón:</label>
      <input type="text" id="numeroIdentificacionSalon" required>
    </form>
`;
  for (const salon of listaSalones) {
      if (salon.numero_identificacion === numeroIdentificacion) {
          alert('Salón Encontrado!');
          Estado = 'Encontrado';
      } else {
          alert('No se encontró el salón!');
      }
  }

  return [Estado, Salones];
}

const modificarNumeroIdentificacionSalon = () => {
  const contenedorSalones = document.getElementById('Salones');
  contenedorSalones.innerHTML = `
  <form id="MenuModificarSalon">
  <h3>Menu Modificar Número de Identificación</h3>
  <label for="numeroIdentificacionSalon">Número de Identificación del Salón:</label>
  <input type="text" id="numeroIdentificacionSalon" required>
  <button type="button" onclick="guardarModificacionSalon()">Guardar Modificación Salón</button>
  </form>`;
}

const modificarCapacidadSalon = () => {
  const contenedorSalones = document.getElementById('crearSalon');
  contenedorSalones.innerHTML = `
  <form id="MenuModificarSalon">
  <h3>Menu Modificar Capacidad de Alumnos</h3>
  <label for="capacidadSalon">Capacidad de Alumnos:</label>
  <input type="number" id="capacidadSalon" required>
  <button type="button" onclick="guardarModificacionSalon()">Guardar Modificación Salón</button>
  </form>`;
}

const modificarEdificioSalon = () => {
  const contenedorSalones = document.getElementById('crearSalon');
  contenedorSalones.innerHTML = `
  <form id="MenuModificarSalon">
  <h3>Menu Modificar Edificio</h3>
  <label for="edificioSalon">Edificio:</label>
  <input type="text" id="edificioSalon" required>
  <button type="button" onclick="guardarModificacionSalon()">Guardar Modificación Salón</button>
  </form>`;
}

const modificarPisoSalon = () => {
  const contenedorSalones = document.getElementById('crearSalon');
  contenedorSalones.innerHTML = `
  <form id="MenuModificarSalon">
  <h3>Menu Modificar Piso</h3>
  <label for="pisoSalon">Piso:</label>
  <input type="number" id="pisoSalon" required>
  <button type="button" onclick="guardarModificacionSalon()">Guardar Modificación Salón</button>
  </form>`;
}

const mostrarListadoSaloness = async () => {
  await loadSalones();
  const boton1 = document.getElementById('botoncrearSalon');
  const boton2 = document.getElementById('botonmodificarSalon');
  const boton3 = document.getElementById('mostrarListadoSalones');
  const atras1 = document.getElementById('atras1');
  atras1.style.display = 'none';
  boton1.style.display = 'none';
  boton2.style.display = 'none';
  boton3.style.display = 'none';

  const listadoSalones = document.getElementById('crearSalon');
  listadoSalones.style.display = 'flex';
  listadoSalones.innerHTML = '';

  for (const salon of listaSalones) {
    const salonDiv = document.createElement('div');
    salonDiv.classList.add('salon-item'); 
    const idElement = document.createElement('span');
    idElement.textContent = `ID: ${salon.id}, `;
    salonDiv.appendChild(idElement);

    const tipoDocumentoElement = document.createElement('span');
    tipoDocumentoElement.textContent = `Tipo de documento: ${salon.tipo_documento}, `;
    salonDiv.appendChild(tipoDocumentoElement);

    const numeroDocumentoElement = document.createElement('span');
    numeroDocumentoElement.textContent = `Número de documento: ${salon.numero_documento}, `;
    salonDiv.appendChild(numeroDocumentoElement);

    const nombreElement = document.createElement('span');
    nombreElement.textContent = `Nombre: ${salon.nombre}, `;
    salonDiv.appendChild(nombreElement);

    const apellidoElement = document.createElement('span');
    apellidoElement.textContent = `Apellido: ${salon.apellido}, `;
    salonDiv.appendChild(apellidoElement);

    const departamentoIdElement = document.createElement('span');
    departamentoIdElement.textContent = `ID del departamento: ${salon.departamento_id}`;
    salonDiv.appendChild(departamentoIdElement);

    listadoSalones.appendChild(salonDiv);
  }

 
  const volverButton = document.createElement('button');
  volverButton.textContent = 'Volver al Formulario';
  volverButton.addEventListener('click', botonesSalones);
  listadoSalones.appendChild(volverButton);
}




