const listaPeriodos = [];

const loadPeriodos = async () => {
    try {
        listaPeriodos.length = 0;
        const respuesta = await fetch('http://localhost:3000/periodos');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Periodos. Estado: ', respuesta.status);
        }
        const periodos = await respuesta.json();
        listaPeriodos.push(...periodos);

    } catch (error) {
        console.error("Error al cargar periodos", error.message);
    }
}

const guardarPeriodo = async (nuevoPeriodo) => {
    try {

        const respuesta = await fetch('http://localhost:3000/periodos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPeriodo),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el periodo. Estado: ', respuesta.status);
        }
        const periodoCreado = await respuesta.json();


        console.log('Periodo creado:', periodoCreado);

    } catch (error) {
        console.error("Error al cargar periodo", error.message);
    }
}

const botonesPeriodos = async () => {
    const contenedorPeriodos = document.getElementById('contenidoContenedor');
    contenedorPeriodos.innerHTML = `
      <form>
          <button class="botonsPeriodos" id="botoncrearPeriodo" type="button" onclick="formularioCrearPeriodo()">Crear Periodos</button>
          <button class="botonsPeriodos" id="botonmodificarPeriodo" type="button" onclick="modificarPeriodo()">Modificar Periodos</button>
          <button class="botonsPeriodos" id="botonmostrarListado" type="button" onclick="mostrarListadoPeriodos()">Ver Listado de Periodos</button>
          <div id="crearPeriodo"></div>

          <button id="atras1" class="atras" onclick="volverInicio()">atras</button>
      </form>`;

    stylesContenedorNuevo(contenedorPeriodos);
}

const formularioCrearPeriodo = async () => {
    const boton1 = document.getElementById('botoncrearPeriodo');
    const boton2 = document.getElementById('botonmodificarPeriodo');
    const boton3 = document.getElementById('botonmostrarListado');
    const contenedorPeriodos = document.getElementById('crearPeriodo');
    contenedorPeriodos.innerHTML = `
      <form id="MenuCrearPeriodo">
        <h3>Menu Crear Periodos</h3>
        <label for="codigoPeriodo">Código del Periodo:</label>
        <input type="text" id="codigoPeriodo" required>
        <label for="anoPeriodo">Año del Periodo:</label>
        <input type="number" id="anoPeriodo" required>
        <label for="semestrePeriodo">Semestre del Periodo:</label>
        <input type="number" id="semestrePeriodo" required>
        <button type="button" onclick="crearPeriodos()">Crear Periodo</button>    
        <button id="atras" class="atras" onclick="botonesPeriodos()">Atrás</button>
      </form>
  `;
    const atras = document.getElementById('atras1');
    atras.style.display = 'none';
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';
}


const crearPeriodos = async () => {
    const codigoInput = document.getElementById('codigoPeriodo');
    const anoInput = document.getElementById('anoPeriodo');
    const semestreInput = document.getElementById('semestrePeriodo');

    const codigo = codigoInput.value;
    const ano = parseInt(anoInput.value); // Parseamos a entero
    const semestre = parseInt(semestreInput.value); // Parseamos a entero

    const nuevoPeriodo = {
        id: listaPeriodos.length + 1,
        codigo: codigo,
        ano: ano,
        semestre: semestre
    };

    await guardarPeriodo(nuevoPeriodo);
    await loadPeriodos();

    codigoInput.value = '';
    anoInput.value = '';
    semestreInput.value = '';

    alert('Periodo creado con éxito!');

    return nuevoPeriodo;
}

const modificarPeriodo = async () => {
    const boton1 = document.getElementById('botoncrearPeriodo');
    const boton2 = document.getElementById('botonmodificarPeriodo');
    const boton3 = document.getElementById('botonmostrarListado');
    const contenedorPeriodos = document.getElementById('crearPeriodo');
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';

    const Estado = await verificarPeriodos();
    if (Estado === 'Encontrado') {
        contenedorPeriodos.innerHTML = `
      <form id="MenuModificarPeriodo">
        <h3>Menu Modificar Periodos</h3>
        <h3>Seleccione el item que desea modificar</h3>
        <button for="codigoPeriodo" onclick="modificarCodigoPeriodo()">Código del Periodo:</button>
        <button for="anoPeriodo" onclick="modificarAnoPeriodo()">Año del Periodo:</button>
        <button for="semestrePeriodo" onclick="modificarSemestrePeriodo()">Semestre del Periodo:</button>
        <button id="atras" class="atras" onclick="botonesPeriodos()">Atrás</button>
      </form>`;
    }
}

const verificarPeriodos = async () => {
    let Estado = '';
    const codigo = document.getElementById('codigoPeriodo').value;
    const contenedorEstudiantes = document.getElementById('crearEstudiante');

    contenedorEstudiantes.innerHTML = `
      <form id="MenuModificarEstudiante">
        <h3>Menu Modificar Periodo</h3>
        <label for="codigoPeriodo">Código del Periodo:</label>
        <input type="text" id="codigoPeriodo" required>
        <label for="anoPeriodo">Año del Periodo:</label>
        <input type="number" id="anoPeriodo" required>
        <label for="semestrePeriodo">Semestre del Periodo:</label>
        <input type="number" id="semestrePeriodo" required>
      </form>`;

    for (const periodo of periodos) {
        if (periodo.codigo === codigo) {
            alert('Periodo Encontrado!');
            Estado = 'Encontrado';
            break;
        } else {
            alert('No se encontró el Periodo!');
        }
    }

    return Estado;
}

const modificarCodigoPeriodo = () => {
    const contenedorPeriodos = document.getElementById('crearPeriodo');
    contenedorPeriodos.innerHTML = `
    <form id="MenuModificarPeriodo">
    <h3>Menu modificar Código</h3>
    <label for="codigoPeriodo">Código del Periodo:</label>
    <input type="text" id="codigoPeriodo" required>
    <button type="button" onclick="GuardarModificionPeriodo()">Guardar Modificación del Código del Periodo</button>
    <button id="atras" class="atras" onclick="modificarPeriodo()">Atrás</button>
    </form>`;
}

const modificarAnoPeriodo = () => {
    const contenedorEstudiantes = document.getElementById('crearPeriodo');
    contenedorEstudiantes.innerHTML = `
    <form id="MenuModificarPeriodo">
    <h3>Menu modificar Año</h3>
    <label for="anoPeriodo">Año del Periodo:</label>
    <input type="number" id="anoPeriodo" required>
    <button type="button" onclick="GuardarModificionPeriodo()">Guardar Modificación del Año del Periodo</button>
    <button id="atras" class="atras" onclick="modificarPeriodo()">Atrás</button>
    </form>`;
}

const modificarSemestrePeriodo = () => {
    const contenedorEstudiantes = document.getElementById('crearPeriodo');
    contenedorEstudiantes.innerHTML = `
    <form id="MenuModificarPeriodo">
    <h3>Menu modificar Semestre</h3>
    <label for="semestrePeriodo">Semestre del Periodo:</label>
    <input type="number" id="semestrePeriodo" required>
    <button type="button" onclick="GuardarModificionPeriodo()">Guardar Modificación del Semestre del Periodo</button>
    <button id="atras" class="atras" onclick="modificarPeriodo()">Atrás</button>
    </form>`;
}

const mostrarListadoPeriodos = async () => {
  await loadPeriodos();
  const boton1 = document.getElementById('botoncrearPeriodo');
    const boton2 = document.getElementById('botonmodificarPeriodo');
    const boton3 = document.getElementById('botonmostrarListado');
    const atras1 = document.getElementById('atras1');
    atras1.style.display = 'none';
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';  
    const contenedor2 = document.getElementById('crearPeriodo');
    stylesContenedorNuevo(contenedor2);
  const listadoPeriodos = document.getElementById('crearPeriodo');
  listadoPeriodos.style.display = 'flex';
  const ul = document.createElement("ul");
  
  for (const Periodo of listaPeriodos) {
      const li = document.createElement('li');
      li.textContent = `codigo: ${Periodo.codigo}, ano: ${Periodo.ano}, semestre: ${Periodo.semestre}`;
      ul.appendChild(li);
  }
  listadoPeriodos.innerHTML = '';
  listadoPeriodos.appendChild(ul);

  const volverButton = document.createElement('button');
  volverButton.textContent = 'Volver al Formulario';
  volverButton.addEventListener('click', botonesPeriodos);
  listadoPeriodos.appendChild(volverButton);
}



