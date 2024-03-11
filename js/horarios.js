
const listaHorarioss = [];

const loadHorarios = async () => {
    try {
        listaHorarioss.length = 0;
        const respuesta = await fetch('http://localhost:3000/horarios');

        if (!respuesta.ok) {
            throw new Error('Error al cargar Horarios. Estado: ' + respuesta.status);
        }
        const horario = await respuesta.json();
        listaHorarioss.push(...horario);

    } catch (error) {
        console.error("Error al cargar Horario", error.message);
    }
}

const guardarHorario = async (nuevoHorario) => {
    try {
        const respuesta = await fetch('http://localhost:3000/horarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoHorario),
        });

        if (!respuesta.ok) {
            throw new Error('Error al crear el horario. Estado: ' + respuesta.status);
        }
        const horarioCreado = await respuesta.json();
        console.log('Horario creado:', horarioCreado);

    } catch (error) {
        console.error("Error al cargar Horario", error.message);
    }
}

const opcionesHorarios = async () => {
    const contenedor2 = document.getElementById('contenidoContenedor');
    contenedor2.innerHTML = `
      <form>
          <button class="botonsHorarios" id="botoncrearHorario" type="button" onclick="agregarAsignaturasAlHorario()">Crear Horario</button>
          <div id="VerHorario"></div>
          <div id="crearHorario"></div>
          <div id="AsignarHorario"></div>
          <button id="atras" class="atras" onclick="volverInicio()">Atrás</button>
      </form>`;
    stylesContenedorNuevo(contenedor2);
    return horario
}

// const formularioCrearHorario = async (valor) => {
//     const idAsignatura=valor;
//     const boton1 = document.getElementById('botoncrearHorario');
//     const boton3 = document.getElementById('botonmostrarListado');
//     const contenedorHorarios = document.getElementById('crearHorario');
//     contenedorHorarios.innerHTML = `
//       <form id="MenuCrearHorario">
//         <h3>Menu Crear Horario</h3>
//         <label for="programaHorario">Programa:</label>
//         <input type="text" id="programaHorario" required>
//         <label for="salonIdHorario">ID del Salón:</label>
//         <input type="text" id="salonIdHorario" required>
//         <label for="profesorHorario">Profesor:</label>
//         <input type="text" id="profesorHorario" required>
//         <button type="button" onclick="crearHorarios()">Crear Horario</button>
//         <button id="atras" class="atras" onclick="opcionesHorarios()">Atrás</button>
//       </form>
//   `;
//     const atras = document.getElementById('atras');
//     atras.style.display = 'none';
//     boton1.style.display = 'none'
//     boton3.style.display = 'none';
// }

const crearHorario = async () => {
   
   const boton1 =document.getElementById('botoncrearHorario');
   const boton2 =document.getElementById('botonmostrarListado');
   const nuevoHorario = {
    horario: {
        lunes: {"6-8": "", "8-10": "", "10-12": "Almuerzo", "14-16": "", "16-18": "", "18-20": ""},
        martes: {"6-8": "", "8-10": "", "10-12": "Almuerzo", "14-16": "", "16-18": "", "18-20": ""},
        miercoles: {"6-8": "", "8-10": "", "10-12": "Almuerzo", "14-16": "", "16-18": "", "18-20": ""},
        jueves: {"6-8": "", "8-10": "", "10-12": "Almuerzo", "14-16": "", "16-18": "", "18-20": ""},
        viernes: {"6-8": "", "8-10": "", "10-12": "Almuerzo", "14-16": "", "16-18": "", "18-20": ""}
    }};
    await formularioAgregarAsignaturasAlHorario()

    await guardarHorario(nuevoHorario);
    await loadHorarios();

    programaInput.value = '';
    salonIdInput.value = '';
    profesorInput.value = '';

    alert('Horario creado con éxito!');
}


const verificardisponibilidad=()=>{
    let dispoibles=0;
    let mostrarHorasDisponibles=[];
    let horariosDisponibles=[];
    let permiso=false;
    for(const diccionarios of listaHorarioss){
        for (dias in diccionarios.horario){
            for (let horasdisponibles in dias){
                if(horasdisponibles===""){
                    alert('Se encontraron Horarios Disponibles')
                    horariosDisponibles.push(...horasdisponibles)
                    dispoibles++
                }
                else{
                    alert('No hay horarios Disponibles porque no hay suficientes salones, intenta agregar nuevos salones para obtener mas opciones de matriculas')
                }
            }
        }
    }
    if(dispoibles>0){
        permiso=true
        let nuevohorarioDisponible={
            dia:dias,
            horas:horariosDisponibles
        }
        mostrarHorasDisponibles.push(nuevohorarioDisponible);
        
    }
    return mostrarHorasDisponibles,permiso;
}

const verificarAsignaturas2=async(codigo)=>{
    const contenedor1=document.getElementById('contenidoContenedor');
    const listaAsignaturas=[];
    await loadAsignaturas();
    listaAsignaturas.forEach(Asignatura => {
        if(Asignatura.codigo===codigo){
            alert('Ya hay una asignatura con el nombre, ¿deseas Agregar un duplicado?')
            contenedor1.innerHTML=`
            <form>
                <h1>¿Deseas Agregar un duplicado?</h1>
                <button class="" id="" type="button" onclick="()">Crear Duplicado</button>
                <button class="" id="" type="button" onclick="()">Ver el Horario de la Asignatura creada</button>
                <div id="VerHorario"></div>
                <div id="AsignarHorario"></div>
                <button id="atras" class="atras" onclick="()">atras</button>
            </form>`;

        } else if(Asignatura.codigo!==codigo){
            contenedor1.innerHTML=`
            <form>
                <h1>Agregar Horario A las Asignaturas</h1>
                <button class="botonsTarifas" id="botoncrearTarifa" type="button" onclick="agregarAsignaturasAlHorario()">Continuar</button>
                <div id="VerHorario"></div>
                <div id="AsignarHorario"></div>
                <button id="atras" class="atras" onclick="()">atras</button>
            </form>`;
        }
        
    });


}
const agregarAsignaturasAlHorario=async(valor)=>{
    let diccionarioAsignaturasHorarios={Id:"",horario:{Asignaturalunes68:"",Asignaturalunes810:"",Asignaturalunes1012:"",
    Asignaturalunes1214:"", Asignaturalunes1416:"", Asignaturalunes1618:"", Asignaturalunes1820:"", Asignaturamartes68:"",
    Asignaturamartes810:"", Asignaturamartes1012:"", Asignaturamartes1214:"", Asignaturamartes1416:"", Asignaturamartes1618:"",
    Asignaturamartes1820:"", Asignaturamiercoles68:"", Asignaturamiercoles810:"", Asignaturamiercoles1012:"", Asignaturamiercoles1214:"",
    Asignaturamiercoles1416:"", Asignaturamiercoles1618:"",Asignaturamiercoles1820 :"", Asignaturajueves68:"", Asignaturajueves810:"",
    Asignaturajueves1012:"", Asignaturajueves1214:"", Asignaturajueves1416:"", Asignaturajueves1618:"",
    Asignaturajueves1820 :"", Asignaturaviernes68:"", Asignaturaviernes810:"", Asignaturaviernes1012:"", Asignaturaviernes1214:"",
    Asignaturaviernes1416 :"", Asignaturaviernes1618:"",Asignaturaviernes1820:"" }};
    
    let opciones=[];
    
    for( let key in diccionarioAsignaturasHorarios.horario){
        console.log(key,diccionarioAsignaturasHorarios.horario.key)
        if(diccionarioAsignaturasHorarios.horario.key === undefined){
            opciones.push(key);
        }
    }

    await loadAsignaturas();
    const contenedor1 =document.getElementById('VerHorario');
    contenedor1.innerHTML=`
    <div id="HorariosDisponibles">
    <h3>Horarios Disponibles</h3>
    <section id="horario">
    <div>
    <div>    
    <h1 id="lunes">lunes</h1>
    </div>
        <div>
        <h1 id="lunes68"> 6-8</h1>
        <h1 id="Asignaturalunes68 "> </h1>
        </div>
        <div>
        <h1 id="lunes810"> 8-10</h1>
        <h1 id="Asignaturalunes810 "> </h1>
        </div>
        <div>
        <h1 id="lunes1012"> 10-12</h1>
        <h1 id="Asignaturalunes1012 "> </h1>
        </div>
        <div>
        <h1 id="lunes1214">Almuerzo</h1>
        <h1 id="Asignaturalunes1214 "> </h1>
        </div>
        <div>
        <h1 id="lunes1416"> 14-16</h1>
        <h1 id="Asignaturalunes1416 "> </h1>
        </div>
        <div>
        <h1 id="lunes1618"> 16-18</h1>
        <h1 id="Asignaturalunes1618"> </h1>
        </div>
        <div>
        <h1 id="lunes1820"> 18-20</h1>
        <h1 id="Asignaturalunes1820 "> </h1>
    </div>
    </div>
    <div>
    <div>    
    <h1 id="Martes">Martes</h1>
    </div>
    <!-- martes -->   
        <div>
        <h1 id="martes68"> 6-8</h1>
        <h1 id="Asignaturamartes68 "> </h1>
        </div>
        <div>
        <h1 id="martes810"> 8-10</h1>
        <h1 id="Asignaturamartes810 "> </h1>
        </div>
        <div>
        <h1 id="martes1012"> 10-12</h1>
        <h1 id="Asignaturamartes1012 "> </h1>
        </div>
        <div>
        <h1 id="martes1214">Almuerzo</h1>
        <h1 id="Asignaturamartes1214 "> </h1>
        </div>
        <div>
        <h1 id="martes1416"> 14-16</h1>
        <h1 id="Asignaturamartes1416 "> </h1>
        </div>
        <div>
        <h1 id="martes1618"> 16-18</h1>
        <h1 id="Asignaturamartes1618 "> </h1>
        </div>
        <div>
        <h1 id="martes1820"> 18-20</h1>   
        <h1 id="Asignaturamartes1820 "> </h1>
    </div>
    </div>
    
    <div>         
    <!-- miercoles -->
    <div>    
    <h1 id="miercoles">miercoles</h1>
    
    </div>
        <div>
        <h1 id="miercoles68"> 6-8</h1>
        <h1 id="Asignaturamiercoles68 "> </h1>
        </div>
        <div>
        <h1 id="miercoles810"> 8-10</h1>
        <h1 id="Asignaturamiercoles810 "> </h1>
        </div>
        <div>
        <h1 id="miercoles1012"> 10-12</h1>
        <h1 id="Asignaturamiercoles1012 "> </h1>
        </div>
        <div>
        <h1 id="miercoles1214">Almuerzo</h1>
        <h1 id="Asignaturamiercoles1214 "> </h1>
        </div>
        <div>
        <h1 id="miercoles1416"> 14-16</h1>
        <h1 id="Asignaturamiercoles1416 "> </h1>
        </div>
        <div>
        <h1 id="miercoles1618"> 16-18</h1>
        <h1 id="Asignaturamiercoles1618 "> </h1>
        </div>
        <div>
        <h1 id="miercoles1820"> 18-20</h1>
        <h1 id="Asignaturamiercoles1820 "> </h1>
    </div>
    </div>
    
    <div>
    <!-- jueves -->
    <div>    
    <h1 id="jueves">jueves</h1>
    </div>
        <div>
        <h1 id="jueves68"> 6-8</h1>
        <h1 id="Asignaturajueves68 "> </h1>
        </div>
        <div>
        <h1 id="jueves810"> 8-10</h1>
        <h1 id="Asignaturajueves810 "> </h1>
        </div>
        <div>
        <h1 id="jueves1012"> 10-12</h1>
        <h1 id="Asignaturajueves1012 "> </h1>
        </div>
        <div>
        <h1 id="jueves1214">Almuerzo</h1>
        <h1 id="Asignaturajueves1214 "> </h1>
        </div>
        <div>
        <h1 id="jueves1416"> 14-16</h1>
        <h1 id="Asignaturajueves1416 "> </h1>
        </div>
        <div>
        <h1 id="jueves1618"> 16-18</h1>
        <h1 id="Asignaturajueves1618 "> </h1>
        </div>
        <div>
        <h1 id="jueves1820"> 18-20</h1>
        <h1 id="Asignaturajueves1820 "> </h1>
    </div>
    </div>
    
    <div>
    <!-- viernes -->
    <div>    
    <h1 id="viernes">viernes</h1>
    </div>
        <div>
        <h1 id="viernes68"> 6-8</h1>
        <h1 id="Asignaturaviernes68 "> </h1>
        </div>
        <div>
        <h1 id="viernes810"> 8-10</h1>
        <h1 id="Asignaturaviernes810 "> </h1>
        </div>
        <div>
        <h1 id="viernes1012"> 10-12</h1>
        <h1 id="Asignaturaviernes1012 "> </h1>
        </div>
        <div>
        <h1 id="viernes1214">Almuerzo</h1>
        <h1 id="Asignaturaviernes1214 "> </h1>
        </div>
        <div>
        <h1 id="viernes1416"> 14-16</h1>
        <h1 id="Asignaturaviernes1416 "> </h1>
        </div>
        <div>
        <h1 id="viernes1618"> 16-18</h1>
        <h1 id="Asignaturaviernes1618 "> </h1>
        </div>
        <div>
        <h1 id="viernes1820"> 18-20</h1>
        <h1 id="Asignaturaviernes1820 "> </h1>
    </div>
    </div>
<section>
    </div>
  `
    const contenedor2=document.getElementById('AsignarHorario');
    contenedor2.innerHTML=`
    <form id="MenuAgregarAsignaturasAHorario">
    <h3>Menu Agregar Asignaturas al Horario</h3>
        <label for="horarioSeleccionado"> Selecciona una opcion:</label>
        <select id="miSelect"></select>
        
        <button type="button" onclick="()">Agregar</button>
        <button id="atras" class="atras" onclick="()">Atrás</button>
    </form>
  `

  generarOpciones(opciones)
}
function generarOpciones(opciones) {
        let select = document.getElementById('miSelect');
        select.innerHTML = '';
        opciones.forEach(function(opcion) {
            let option = document.createElement('option');
            option.value = opcion;
            option.textContent = opcion;
            select.appendChild(option);
        });
    }

 let horario=`<section id="horario">
        <div>
        <div>    
        <h1 id="lunes">lunes</h1>
        </div>
            <div>
            <h1 id="lunes68"> 6-8</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="lunes810"> 8-10</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="lunes1012"> 10-12</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="lunes1214">Almuerzo</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="lunes1416"> 14-16</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="lunes1618"> 16-18</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="lunes1820"> 18-20</h1>
            <h1 id="Asignatura "> </h1>
        </div>
        </div>
        <div>
        <!-- martes -->
        <div>    
        <h1 id="martes">Martes</h1>
        </div>
            <div>
            <h1 id="martes68"> 6-8</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="martes810"> 8-10</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="martes1012"> 10-12</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="martes1214">Almuerzo</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="martes1416"> 14-16</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="martes1618"> 16-18</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="martes1820"> 18-20</h1>   
            <h1 id="Asignatura "> </h1>
        </div>
        </div>
        
        <div>         
        <!-- miercoles -->
        <div>    
        <h1 id="miercoles">miercoles</h1>
        <h1 id="Asignatura "> </h1>
        </div>
            <div>
            <h1 id="miercoles68"> 6-8</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="miercoles810"> 8-10</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="miercoles1012"> 10-12</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="miercoles1214">Almuerzo</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="miercoles1416"> 14-16</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="miercoles1618"> 16-18</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="miercoles1820"> 18-20</h1>
            <h1 id="Asignatura "> </h1>
        </div>
        </div>
        
        <div>
        <!-- jueves -->
        <div>    
        <h1 id="jueves">jueves</h1>
        </div>
            <div>
            <h1 id="jueves68"> 6-8</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="jueves810"> 8-10</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="jueves1012"> 10-12</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="jueves1214">Almuerzo</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="jueves1416"> 14-16</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="jueves1618"> 16-18</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="jueves1820"> 18-20</h1>
            <h1 id="Asignatura "> </h1>
        </div>
        </div>
        
        <div>
        <!-- viernes -->
        <div>    
        <h1 id="viernes">viernes</h1>
        </div>
            <div>
            <h1 id="viernes68"> 6-8</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="viernes810"> 8-10</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="viernes1012"> 10-12</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="viernes1214">Almuerzo</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="viernes1416"> 14-16</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="viernes1618"> 16-18</h1>
            <h1 id="Asignatura "> </h1>
            </div>
            <div>
            <h1 id="viernes1820"> 18-20</h1>
            <h1 id="Asignatura "> </h1>
        </div>
        </div>
        
    
    <section>
    `
