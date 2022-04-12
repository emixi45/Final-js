const datos={
    nombre:'',
    email:'',
    mensaje:''
}



const nombreInput =document.querySelector('#nombre')
const emailInput =document.querySelector('#email')
const mensajeInput =document.querySelector('#mensaje')
const formulario = document.querySelector('.formulario')

nombre.addEventListener('input',leerTexto)
email.addEventListener('input',leerTexto)
mensaje.addEventListener('input',leerTexto)


formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const {nombre,email,mensaje}= datos
    
    if (nombre === ''||email ==='' ||mensaje === ''){
        // mostrarError('*los campos son obligatorios');
        Swal.fire({
            icon: 'error',
            title: 'Los campos son obligatorios',
            
          })
        return
    }
    // mostrarSend('Enviando mensado')
    Swal.fire({
        title: 'Mensaje enviado.',
        width: 500,
        padding: '1rem',
        color: '#696047',
        background: '#92AC86',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
      
      
});

function leerTexto (e){
    datos[e.target.id]=e.target.value
    console.log(datos)
    
}
// use sweetalert2 pero sirve bien
// function mostrarError (mensaje) {
//     const error = document.createElement ('p')
//     error.textContent = mensaje
//     error.classList.add('error')
//     formulario.appendChild(error)

//     setTimeout(()=>{
//         error.remove();
//     },3000);
// }
// function mostrarSend (mensaje) {
//     const enviado = document.createElement ('p')
//     enviado.textContent = mensaje
//     enviado.classList.add('enviado')
//     formulario.appendChild(enviado)

//     setTimeout(()=>{
//         enviado.remove();
//     },3000);
// }
