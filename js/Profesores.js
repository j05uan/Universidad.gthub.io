

const listaProfesores = [];

const loadProfesores = async () => {
    try {
        listaProfesores.length = 0;
        const respuesta = await fetch('http://localhost:3000/profesores');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Profesores. Estado: ' + respuesta.status);
        }
        const Profesor = await respuesta.json();
        listaProfesores.push(...Profesor);

    } catch (error) {
        console.error("Error al cargar Profesor", error.message);
    }
}

const guardarProfesor = async (nuevoProfesor) => {
    try {

        const respuesta = await fetch('http://localhost:3000/profesores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProfesor),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el profesor. Estado: ' + respuesta.status);
        }
        const ProfesorCreado = await respuesta.json();


        console.log('Profesor creado:', ProfesorCreado);

    } catch (error) {
        console.error("Error al cargar Profesor", error.message);
    }
}

const botonesProfesor=async()=>{
    
    const contenedor4 =document.getElementById('contenidoContenedor');
    contenedor4.innerHTML = `
      <form>
          <button class="botonsProfesor" id="botoncrearProfesor" type="button" onclick="formularioCrearProfesor()">Crear Profesores</button>
          <button class="botonsProfesor" id="botonmodificarProfesor" type="button" onclick="modificarProfesor()">Modificar Profesores</button>
          <button class="botonsProfesor" id="botonmostrarListado" type="button" onclick="mostrarListadoProfesores()">Ver Listado de Profesores</button>
          <div id="crearProfesor"></div>
          <div id="listadoProfesores"></div>
          <button id="atras1" class="atras" onclick="volverInicio()">atras</button>
          
      </form>
  `;

  stylesContenedorNuevo(contenedor4);
    
}

const formularioCrearProfesor = async () => {
    const boton1 = document.getElementById('botoncrearProfesor');
    const boton2 = document.getElementById('botonmodificarProfesor');
    const boton3 = document.getElementById('botonmostrarListado');
    const contenedorProfesores = document.getElementById('crearProfesor');
    contenedorProfesores.innerHTML = `
      <form id="MenuCrearProfesor">
        <h3>Menu Crear Profesores</h3>
        <label for="tipoDocumento">Tipo de Documento:</label>
        <input type="text" id="tipoDocumento" required>
        <label for="numeroDocumento">Número de Documento:</label>
        <input type="number" id="numeroDocumento" required>
        <label for="nombreProfesor">Nombre del Profesor:</label>
        <input type="text" id="nombreProfesor" required>
        <label for="apellidoProfesor">Apellido del Profesor:</label>
        <input type="text" id="apellidoProfesor" required>
        <label for="departamentoId">ID del Departamento:</label>
        <input type="number" id="departamentoId" required>
        <button type="button" onclick="crearProfesores()">Crear Profesor</button>
        <button id="atrasprofes" class="atras" onclick="botonesProfesor()">atras</button>
      </form>
  `;
    const atras = document.getElementById('atras');
    atras.style.display = 'none';
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';
}

const crearProfesores = async () => {
    const tipoDocumentoInput = document.getElementById('tipoDocumento');
    const numeroDocumentoInput = document.getElementById('numeroDocumento');
    const nombreInput = document.getElementById('nombreProfesor');
    const apellidoInput = document.getElementById('apellidoProfesor');
    const departamentoIdInput = document.getElementById('departamentoId');

    const tipoDocumento = tipoDocumentoInput.value;
    const numeroDocumento = numeroDocumentoInput.value;
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const departamentoId = departamentoIdInput.value;

    const nuevo = {
        id: listaProfesores.length + 1,
        tipo_documento: tipoDocumento,
        numero_documento: numeroDocumento,
        nombre: nombre,
        apellido: apellido,
        departamento_id: departamentoId,
    }

    await guardarProfesor(nuevo);
    await loadProfesores();

    tipoDocumentoInput.value = '';
    numeroDocumentoInput.value = '';
    nombreInput.value = '';
    apellidoInput.value = '';
    departamentoIdInput.value = '';

    alert('Profesor creado con éxito!');

    return nuevo;
}

const modificarProfesor = async () => {
    const boton1 = document.getElementById('botoncrearProfesor');
    const boton2 = document.getElementById('botonmodificarProfesor');
    const boton3 = document.getElementById('botonmostrarListado');
    const contenedorProfesores = document.getElementById('crearProfesor');
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';

    await verificarProfesores();

    if (Estado === 'Encontrado') {
        contenedorProfesores.innerHTML = `
      <form id="MenuModificarEProfesor">
        <h3>Menu Modificar EProfesores</h3>
        <h3>Seleccione el ítem que desea modificar</h3>
        <button for="tipoDocumento" onclick="modificarTipoDocumento()">Tipo de Documento:</button>
        <button for="numeroDocumento" onclick="modificarNumeroDocumento()">Número de Documento:</button>
        <button for="nombreProfesor" onclick="modificarNombreProfesor()">Nombre del Profesor:</button>
        <button for="apellidoProfesor" onclick="modificarApellidoProfesor()">Apellido del Profesor:</button>
        <button for="departamentoId" onclick="modificarDepartamentoId()">ID del Departamento:</button>
        <button id="atras" class="atras" onclick="botonesProfesor()">atras</button>
      </form>`;
    }
}

const verificarProfesores = async () => {
    const Estado = '';
    const nombre = document.getElementById('nombreProfesor').value;
    for (const profesor of listaProfesores) {
        if (profesor.nombre === nombre) {
            alert('Profesor Encontrado!');
            Estado = 'Encontrado';
            break;
        }
    }

    if (Estado !== 'Encontrado') {
        alert('No se encontró el Profesor!');
    }

    return Estado;
}

const modificarTipoDocumento = () => {
    const contenedorProfesores = document.getElementById('crearProfesor');
    contenedorProfesores.innerHTML = `
    <form id="MenuModificarProfesor">
    <h3>Menu modificar Tipo de Documento</h3>
    <label for="tipoDocumento">Tipo de Documento:</label>
    <input type="text" id="tipoDocumento" required>
    <button type="button" onclick="GuardarModificionProfesor()">Guardar Modificación Profesor</button>
    <button id="atras" class="atras" onclick="modificarProfesor()">atras</button>
    </form>`;
}

const modificarNumeroDocumento = () => {
    const contenedorProfesores = document.getElementById('crearProfesor');
    contenedorProfesores.innerHTML = `
    <form id="MenuModificarProfesor">
    <h3>Menu modificar Número de Documento</h3>
    <label for="numeroDocumento">Número de Documento:</label>
    <input type="number" id="numeroDocumento" required>
    <button type="button" onclick="GuardarModificionProfesor()">Guardar Modificación Profesor</button>
    <button id="atras" class="atras" onclick="modificarProfesor()">atras</button>
    </form>`;
}

const modificarNombreProfesor = () => {
    const contenedorProfesores = document.getElementById('crearProfesor');
    contenedorProfesores.innerHTML = `
    <form id="MenuModificarProfesor">
    <h3>Menu modificar Nombre</h3>
    <label for="nombreProfesor">Nombre del Profesor:</label>
    <input type="text" id="nombreProfesor" required>
    <button type="button" onclick="GuardarModificionProfesor()">Guardar Modificación Profesor</button>
    <button id="atras" class="atras" onclick="modificarProfesor()">atras</button>
    </form>`;
}

const modificarApellidoProfesor = () => {
    const contenedorProfesores = document.getElementById('crearProfesor');
    contenedorProfesores.innerHTML = `
    <form id="MenuModificarProfesor">
    <h3>Menu modificar Apellido</h3>
    <label for="apellidoProfesor">Apellido del Profesor:</label>
    <input type="text" id="apellidoProfesor" required>
    <button type="button" onclick="GuardarModificionProfesor()">Guardar Modificación Profesor</button>
    <button id="atras" class="atras" onclick="modificarProfesor()">atras</button>
    </form>`;
}

const modificarDepartamentoId = () => {
    const contenedorProfesores = document.getElementById('crearProfesor');
    contenedorProfesores.innerHTML = `
    <form id="MenuModificarProfesor">
    <h3>Menu modificar ID del Departamento</h3>
    <label for="departamentoId">ID del Departamento:</label>
    <input type="number" id="departamentoId" required>
    <button type="button" onclick="GuardarModificionProfesor()">Guardar Modificación Profesor</button>
    <button id="atras" class="atras" onclick="modificarProfesor()">atras</button>
    </form>`;
}

const mostrarListadoProfesores = async () => {
    await loadProfesores();
    const boton1 = document.getElementById('botoncrearProfesor');
    const boton2 = document.getElementById('botonmodificarProfesor');
    const boton3 = document.getElementById('botonmostrarListado');
    const atras1 = document.getElementById('atras1');
    atras1.style.display = 'none';
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';
    const contenedor2 = document.getElementById('crearProfesor');
    stylesContenedorNuevo(contenedor2);
    const listadoProfesores = document.getElementById('crearProfesor');
    listadoProfesores.style.display = 'flex';
    const ul = document.createElement("ul");

    
    for (const Profesor of listaProfesores) {
        const li = document.createElement('li');
        li.textContent = `ID: ${Profesor.id}, tipo_documento: ${Profesor.tipo_documento}, numero_documento: ${Profesor.numero_documento}, nombre: ${Profesor.nombre}, apellido: ${Profesor.apellido}, departamento_id: ${Profesor.departamento_id}`;
        ul.appendChild(li);
    }
    listadoProfesores.innerHTML = '';
    listadoProfesores.appendChild(ul);

    const volverButton = document.createElement('button');
    volverButton.textContent = 'Volver al Formulario';
    volverButton.addEventListener('click', botonesProfesor);
    listadoProfesores.appendChild(volverButton);
}


