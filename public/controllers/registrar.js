console.log('Registro');

const formularioRegistro = document.getElementById('registro');
const mensajeRespuesta = document.querySelector('.mensajeRespuesta');

formularioRegistro.addEventListener('submit', function(e) {
    e.preventDefault();
    const datos = new FormData(formularioRegistro);
    const idpaciente = datos.get('identificacion');
    const nombrepaciente = datos.get('nombre');
    const apellidopaciente = datos.get('apellido');
    const email = datos.get('email');

    const myHeaders = new Headers();

    mostrarResAddPaciente({
        method: 'POST',
        headers: myHeaders,
        body: new URLSearchParams({
            'nombre': nombrepaciente,
            'apellido': apellidopaciente,
            'numid': idpaciente,
            'email': email
        }),
    })
});

async function addPaciente(paciente) {
    let res = null;
    try {
        console.log('Registrando paciente...');
        const response = await fetch('/basedatos/insertarpaciente', paciente)
        res = await response.json()
    } catch (error) {
        console.log(error)
    }
    return res
}

async function mostrarResAddPaciente(paciente) {
    try {
        mensajeRespuesta.innerHTML = "";
        const res = await addPaciente(paciente)
        if (res.status != 200) {
            mensajeRespuesta.innerHTML = "El usuario ya existe"
        } else {
            mensajeRespuesta.innerHTML = "Usario registrado con éxito"
        }
    } catch (error) {
        console.log(error)
    }
}