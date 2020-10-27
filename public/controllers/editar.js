console.log('Editar Paciente');

const formularioRegistro = document.getElementById('editar');
const mensajeRespuesta = document.querySelector('.mensajeRespuesta');

formularioRegistro.addEventListener('submit', function(e) {
    e.preventDefault();
    const datos = new FormData(formularioRegistro);
    const idpaciente = datos.get('identificacion');
    const nombrepaciente = datos.get('nombre');
    const apellidopaciente = datos.get('apellido');
    const email = datos.get('email');
    const myHeaders = new Headers();

    mostrarResUpdatePaciente({
        method: 'PUT',
        headers: myHeaders,
        body: new URLSearchParams({
            'nombre': nombrepaciente,
            'apellido': apellidopaciente,
            'numid': idpaciente,
            'email': email
        }),
    })
});

async function updatePaciente(paciente) {
    let res = null;
    try {
        console.log('Actualizando paciente...');
        const response = await fetch('/basedatos/actualizarpaciente', paciente)
        res = await response.json()
    } catch (error) {
        console.log(error)
    }
    return res
}

async function mostrarResUpdatePaciente(paciente) {
    try {
        mensajeRespuesta.innerHTML = "";
        const res = await updatePaciente(paciente)
        if (res.status != 200) {
            mensajeRespuesta.innerHTML = "El usuario no existe"
        } else {
            mensajeRespuesta.innerHTML = "Usuario actualizado"
        }
    } catch (error) {
        console.log(error)
    }
}