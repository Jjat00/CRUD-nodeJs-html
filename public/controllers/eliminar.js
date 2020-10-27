console.log('Eliminar Paciente');

const formularioRegistro = document.getElementById('eliminar');
const mensajeRespuesta = document.querySelector('.mensajeRespuesta');

formularioRegistro.addEventListener('submit', function(e) {
    e.preventDefault();
    const datos = new FormData(formularioRegistro);
    const nombrepaciente = datos.get('nombre');
    const apellidopaciente = datos.get('apellido');
    const idpaciente = datos.get('identificacion');
    const myHeaders = new Headers();

    mostrarResDeletePaciente({
        method: 'DELETE',
        headers: myHeaders,
        body: new URLSearchParams({
            'nombre': nombrepaciente,
            'apellido': apellidopaciente,
            'numid': idpaciente
        }),
    })
});

async function deletePaciente(paciente) {
    let res = null;
    try {
        console.log('eliminando paciente...');
        const response = await fetch('/basedatos/eliminarpaciente', paciente)
        res = await response.json()
    } catch (error) {
        console.log(error)
    }
    return res
}

async function mostrarResDeletePaciente(paciente) {
    try {
        mensajeRespuesta.innerHTML = "";
        const res = await deletePaciente(paciente)
        if (res.status != 200) {
            mensajeRespuesta.innerHTML = "El usuario no existe"
        } else {
            mensajeRespuesta.innerHTML = "Usuario eliminado"
        }
    } catch (error) {
        console.log(error)
    }
}