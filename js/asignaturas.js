const listaAsignaturas=[];

const loadAsignaturas=async()=>{
    try{
        listaAsignaturas.length=0;
        const respuesta=await fetch('http://localhost:3000/asignaturas');

        if(!respuesta.ok){
           throw new Error('Error al cargar Asignaturas. Estado: ',respuesta.status);
        }
        const asignatura=await respuesta.json();
        listaAsignaturas.push(...asignatura);

    }catch(error){
        console.error("Error al cargar asignaturas",error.message);
    }
}



const guardarAsignatura= async(nuevoAsignatura)=>{
    try{

        const respuesta=await fetch('http://localhost:3000/asignaturas',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(nuevoAsignatura),
        });

        if(!respuesta.ok){
           throw new Error('Error al crear la asignatura. Estado: ',respuesta.status);
        }
        const asignaturaCreado=await respuesta.json();
       
        
        console.log('Asignatura creada:', asignaturaCreado);

    }catch(error){
        console.error("Error al cargar asignatura",error.message);
    }
}

const botonesAsignatura = async () => {
    
    const contenedorAsignaturas = document.getElementById('contenidoContenedor');
    contenedorAsignaturas.innerHTML = `
      <form>
          <button class="botonsAsignaturas" id="botoncrearAsignatura" type="button" onclick="formularioCrearAsignatura()">Crear Asignaturas</button>
          <button class="botonsAsignaturas" id="botonmodificarAsignatura" type="button" onclick="modificarAsignatura()">Modificar Asignaturas</button>
          <button class="botonsAsignaturas" id="botonmostrarListado" type="button" onclick="mostrarListadoAsignaturas()">Ver Listado de Asignaturas</button>
          <div id="crearAsignatura"></div>
          <button id="atras" class="atras" onclick="volverInicio()">atras</button>
      </form>`;
    
    stylesContenedorNuevo(contenedorAsignaturas);
    
}

const formularioCrearAsignatura = async () => {
    const boton1 = document.getElementById('botoncrearAsignatura');
    const boton2 = document.getElementById('botonmodificarAsignatura');
    const boton3 = document.getElementById('botonmostrarListado');
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML="";
    const div= document.createElement("div");
    div.classList.add("FormularioCrearAsignaturas");
    div.innerHTML=`
      <form id="MenuCrearAsignatura">
      <h3>Menu Crear Asignaturas</h3>

      <label for="cuposInput">Curso ID</label>
      <select id="cuposInput" class="form-control">
        <option selected>Cursos...</option>
        
        <option>1</option>
        
      </select>

          <label for="creditosInput">Créditos</label>
          <input type="number" class="form-control" id="creditosInput" placeholder="Créditos">

      <label for="profeInput">Profesor</label>
      <select id="profeInput" class="form-control">
        <option selected>Profesores...</option>
        
        <option>1</option>
        
      </select>
      <label for="codigoAsignatura">Codigo de la Asignatura</label>
      <input type="Text" class="form-control" id="codigoAsignatura" placeholder="Codigo">
    <label for="cuposInput">Cupos disponibles</label>
    <input type="number" class="form-control" id="cuposInput" placeholder="Créditos">

      <label for="programaInput">Programas ID</label>
      <select id="programaInput" class="form-control">
        <option selected>Programas</option>
        
        <option>1</option>
        
      </select>

        <button type="button" onclick="agregarAsignaturasAlHorario()">Agregar Horario</button>
        <button id="atras" class="atras" onclick="botonesAsignatura()">Atrás</button>
      </form>
  `;
    contenedorAsignaturas.appendChild(div)
    contenedorAsignaturas.style.gap='2em';
    const atras = document.getElementById('atras');
    atras.style.display = 'none';
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';
}
const opcionesCursos=(cursos) =>{
  
  const cursosINput = document.getElementById("cuposInput");
  cursosINput.innerHTML = "<option selected>Cursos</option>";

  cursos.forEach(curso => {
      const option = document.createElement("option");
      option.value = curso.id;
      option.text = curso.nombre;
      inputIdAsignatura.appendChild(option);
  });
}
const OpcionesProfesores=(profesores)=> {
  
  const profesorInput = document.getElementById("profeInput");
  profesorInput.innerHTML = "<option selected>Profes</option>";

  profesores.forEach(profes => {
    const option = document.createElement("option");
    option.value = profes.id;
    option.text = profes.nombre;
    inputIdprofe.appendChild(option);
  });
}

const opcionesProgramas=(programas)=> {
  
  const inputIdPrograma = document.getElementById("InputidprogramaAsignatura");
  inputIdPrograma.innerHTML = "<option selected>Programas</option>";

  programas.forEach(programa => {
    const option = document.createElement("option");
    option.value = programa.id;
    option.text = programa.nombre;
    inputIdPrograma.appendChild(option);
  });
}

const crearAsignaturas = async () => {
    const codigoInput = document.getElementById('codigoAsignatura');
    const creditosInput = document.getElementById('creditosAsignatura');
    const cuposInput = document.getElementById('cuposAsignatura');
    const profeInput = document.getElementById('profesorAsignatura');
    const programaInput = document.getElementById('programaAsignatura');
    const idcursoInput = document.getElementById('curso_id');

    const idcurso = parseInt(idcursoInput.value);
    const codigo = codigoInput.value;
    const creditos = parseInt(creditosInput.value);
    const cuposDisponibles = parseInt(cuposInput.value);
    const IDprofe = parseInt(profeInput.value);
    const Idprograma = parseInt(programaInput.value);
    
    const nuevaAsignatura = {
        id: listaAsignaturas.length + 1,
        curso_id: idcurso, 
        codigo: codigo,
        creditos: creditos,
        profesor_id: IDprofe, 
        cupos_disponibles: cuposDisponibles,
        programa_id: Idprograma, 
        horario_clases: asignaturaselect 
    };

    await guardarAsignatura(nuevaAsignatura);
    await loadAsignaturas();

    codigoInput.value = '';
    creditosInput.value = '';
    cuposInput.value = '';
    profeInput.value ='';
    programaInput.value ='';
    idcursoInput.value ='';


    alert('Asignatura creada con éxito!');

    return nuevaAsignatura;
}

const modificarAsignatura = async () => {
    const boton1 = document.getElementById('botoncrearAsignatura');
    const boton2 = document.getElementById('botonmodificarAsignatura');
    const boton3 = document.getElementById('botonmostrarListado');
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';

    await verificarAsignaturas();
    if (Estado === 'Encontrado') {
        contenedorAsignaturas.innerHTML = `
      <form id="MenuModificarAsignatura">
        <h3>Menu Modificar Asignaturas</h3>
        <h3>Seleccione el item que desea modificar</h3>
        <button for="codigoAsignatura" onclick="modificarCodigoAsignatura()">Código de la Asignatura:</button>
        <button for="creditosAsignatura" onclick="modificarCreditosAsignatura()">Créditos de la Asignatura:</button>
        <button for="cuposAsignatura" onclick="modificarCuposAsignatura()">Cupos Disponibles:</button>
        <button for="cursoAsignatura" onclick="modificarCursoAsignatura()">Curso de la Asignatura:</button>
        <button for="profesorAsignatura" onclick="modificarProfesorAsignatura()">Profesor de la Asignatura:</button>
        <button for="programaAsignatura" onclick="modificarProgramaAsignatura()">Programa de la Asignatura:</button>
        <button for="horarioAsignatura" onclick="modificarHorarioAsignatura()">Horario de la Asignatura:</button>
        <button id="atras" class="atras" onclick="botonesAsignatura()">Atrás</button>
      
        </form>`;
    }
}

const verificarAsignaturas = async () => {
    let Estado = '';
    const codigo = document.getElementById('codigoAsignatura');
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML = `
      <form id="MenuModificarAsignatura">
        <h3>Menu Modificar Asignatura</h3>
        <label for="codigoAsignatura">Código de la Asignatura:</label>
        <input type="text" id="codigoAsignatura" required>
      </form>`;

    for (const asignatura of listaAsignaturas) {
        if (asignatura.codigo === codigo) {
            alert('Asignatura Encontrada!');
            Estado = 'Encontrado';
            break;
        } else {
            alert('No se encontró la Asignatura!');
        }
    }

    return Estado;
}

const modificarCodigoAsignatura = () => {
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML = `
    <form id="MenuModificarAsignatura">
    <h3>Menu Modificar Código de la Asignatura</h3>
    <label for="codigoAsignatura">Código de la Asignatura:</label>
    <input type="text" id="codigoAsignatura" required>
    <button type="button" onclick="guardarModificacionAsignaturas()">Guardar Modificación del Código de la Asignatura</button>
    <button id="atras" class="atras" onclick="modificarAsignatura()">Atrás</button>
    </form>`;
}

const modificarCreditosAsignatura = () => {
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML = `
    <form id="MenuModificarAsignatura">
    <h3>Menu Modificar Créditos de la Asignatura</h3>
    <label for="creditosAsignatura">Créditos de la Asignatura:</label>
    <input type="number" id="creditosAsignatura" required>
    <button type="button" onclick="guardarModificacionAsignaturas()">Guardar Modificación de Créditos de la Asignatura</button>
    <button id="atras" class="atras" onclick="modificarAsignatura()">Atrás</button>
    </form>`;
}

const modificarCuposAsignatura = () => {
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML = `
    <form id="MenuModificarAsignatura">
    <h3>Menu Modificar Cupos Disponibles de la Asignatura</h3>
    <label for="cuposAsignatura">Cupos Disponibles de la Asignatura:</label>
    <input type="number" id="cuposAsignatura" required>
    <button type="button" onclick="guardarModificacionAsignaturas()">Guardar Modificación de Cupos Disponibles de la Asignatura</button>
    <button id="atras" class="atras" onclick="modificarAsignatura()">Atrás</button>
    </form>`;
}
const modificarCursoAsignatura = () => {
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML = `
    <form id="MenuModificarAsignatura">
    <h3>Menu Modificar Curso de la Asignatura</h3>
    <label for="cursoAsignatura">Curso de la Asignatura:</label>
    <input type="number" id="cursoAsignatura" required>
    <button type="button" onclick="guardarModificacionAsignaturas()">Guardar Modificación del Curso de la Asignatura</button>
    <button id="atras" class="atras" onclick="modificarAsignatura()">Atrás</button>
    </form>`;
}

const modificarProfesorAsignatura = () => {
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML = `
    <form id="MenuModificarAsignatura">
    <h3>Menu Modificar Profesor de la Asignatura</h3>
    <label for="profesorAsignatura">Profesor de la Asignatura:</label>
    <input type="number" id="profesorAsignatura" required>
    <button type="button" onclick="guardarModificacionAsignaturas()">Guardar Modificación del Profesor de la Asignatura</button>
    <button id="atras" class="atras" onclick="modificarAsignatura()">Atrás</button>
    </form>`;
}

const modificarProgramaAsignatura = () => {
    const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML = `
    <form id="MenuModificarAsignatura">
    <h3>Menu Modificar Programa de la Asignatura</h3>
    <label for="programaAsignatura">Programa de la Asignatura:</label>
    <input type="number" id="programaAsignatura" required>
    <button type="button" onclick="guardarModificacionAsignaturas()">Guardar Modificación del Programa de la Asignatura</button>
    <button id="atras" class="atras" onclick="modificarAsignatura()">Atrás</button>
    </form>`;
}

const modificarHorarioAsignatura = async() => {
    const boton1 = document.getElementById('botoncrearAsignatura');
    const boton2 = document.getElementById('botonmodificarAsignatura');
    const boton3 = document.getElementById('botonmostrarListado');
    atras.style.display = 'none';
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';  
  const contenedorAsignaturas = document.getElementById('crearAsignatura');
    contenedorAsignaturas.innerHTML = `
    <form id="MenuModificarAsignatura">
    <h3>Menu Modificar Horario de la Asignatura</h3>
    <!-- Aquí debes agregar campos para editar los horarios -->
    <button type="button" onclick="guardarModificacionAsignaturas()">Guardar Modificación del Horario de la Asignatura</button>
    <button id="atras" class="atras" onclick="modificarAsignatura()">Atrás</button>
    </form>`;
}

const  mostrarListadoAsignaturas=async()=>{
    await loadAsignaturas();
    const boton1 = document.getElementById('botoncrearAsignatura');
    const boton2 = document.getElementById('botonmodificarAsignatura');
    const boton3 = document.getElementById('botonmostrarListado');
    atras.style.display = 'none';
    boton1.style.display = 'none';
    boton2.style.display = 'none';
    boton3.style.display = 'none';  
    const listadoAsignaturas= document.getElementById('crearAsignatura');
    listadoAsignaturas.style.display='flex';
    const ul = document.createElement("ul");
    
    for(const asignatura of listaAsignaturas){
        const li=document.createElement('li');
        li.textContent= `ID: ${asignatura.id}, curso_id: ${asignatura.curso_id}, codigo: ${asignatura.codigo}, creditos: ${asignatura.creditos}, profesor_id: ${asignatura.profesor_id}, cupos_disponibles: ${asignatura.cupos_disponibles}, programa_id: ${asignatura.programa_id}, horario_clases: ${asignatura.horario_clases}`;
        ul.appendChild(li);
    }
    listadoAsignaturas.innerHTML='';
    listadoAsignaturas.appendChild(ul);

    const volverButton=document.createElement('button');
    volverButton.textContent='Volver al Formulario';
    volverButton.addEventListener('click',botonesAsignatura);
    listadoAsignaturas.appendChild(volverButton);
}







const guardarModificacionAsignaturas = async (valor) => {
    const newcodigo = document.getElementById('codigoAsignatura').value;
    const newcreditos = document.getElementById('creditosAsignatura').value;
    const newcupos = document.getElementById('cuposAsignatura').value;
    const newIdcurso = document.getElementById('cursoAsignatura').value;
    const newprofe = document.getElementById('profesorAsignatura').value;
    const newprograma = document.getElementById('programaAsignatura').value;
    const newhorarios = document.getElementById('').value;
    const nombreverificacion = document.getElementById('codigoAsignatura').value;
    let newInput = valor;
  
    listaasignaturas.forEach(asignatura => {
      if (asignatura.nombre === nombreverificacion) {
        if (newInput === newcodigo) {
          asignatura.nombre = newcodigo;
        } else if (newInput === newcreditos) {
          asignatura.codigo = newcreditos;
        } else if (newInput === newcupos) {
          asignatura.guia_catedra = newcupos;
        }else if (newInput === newIdcurso) {
            asignatura.guia_catedra = newIdcurso;
        }else if (newInput === newprofe) {
            asignatura.guia_catedra = newprofe;
        }else if (newInput === newprograma) {
            asignatura.guia_catedra = newprograma;
        }else if (newInput === newhorarios) {
            asignatura.guia_catedra = newhorarios;
        }

  
        const objetoModificado = {
          nombre: asignatura.nombre,
          codigo: asignatura.codigo,
          guia_catedra: asignatura.guia_catedra
        };
  
        fetch('http://localhost:3000/asignatura/' + asignatura.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objetoModificado)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al modificar el objeto');
          }
          return response.json();
        })
        .then(data => {
          console.log('Objeto modificado con éxito:', data);
        })
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
        });
      }
    });
  
    alert('Modificación del curso guardada con éxito!');
  }
  