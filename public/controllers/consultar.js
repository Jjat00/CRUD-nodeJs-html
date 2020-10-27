console.log('Consulta');

const formularioConsulta = document.getElementById('consulta');;
const mensajeRespuesta = document.querySelector('.mensajeRespuesta');
const nombre = document.querySelector('.nombre')
const apellido = document.querySelector('.apellido')
const email = document.querySelector('.email')

formularioConsulta.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Consultado paciente...');
    const datos = new FormData(formularioConsulta);
    const numid = datos.get('identificacion');
    mostrarPaciente(numid)
});

async function getPaciente(numid) {
    let paciente = null;

    try {
        console.log('obteniendo info paciente...')
        const response = await fetch(`/basedatos/consultapaciente/${numid}`)
        paciente = await response.json()
    } catch (error) {
        console.log(error)
    }
    return paciente
}

async function mostrarPaciente(numid) {
    try {
        limpiarRespuesta()
        const paciente = await getPaciente(numid)
        console.log("mostrando info paciente...")
        nombre.innerHTML = ' Nombre: ' + paciente[0].nombre;
        apellido.innerHTML = ' Apellido: ' + paciente[0].apellido;
        email.innerHTML = ' Email: ' + paciente[0].email;
    } catch (error) {
        mensajeRespuesta.innerHTML = "El paciente no se encuentra registrado ";
    }
}

function limpiarRespuesta() {
    nombre.innerHTML = ""
    apellido.innerHTML = ""
    mensajeRespuesta.innerHTML = "";
}