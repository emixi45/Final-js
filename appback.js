

const fragment = document.createDocumentFragment()

let carrito= {}


document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
    if (localStorage.getItem('carrito')){
        
        carrito=JSON.parse(localStorage.getItem('carrito'))
        mostrarCarrito()
    }
})
cards.addEventListener('click', e => {
    addCarrito(e)
})
items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async () =>{
    try{
        const res = await fetch('api.json')
        const data = await res.json()
        
        MostrarItems(data)
        
    }catch (error){
        console.log(error)
    }
    
    
}

function MostrarItems  (data) {
    const cards= document.querySelector("#cards")
    const templateCard = document.querySelector("#template-card").content

    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('.btn-dark').dataset.id = producto.id
        const clone =templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}
function addCarrito  (e) {
    if(e.target.classList.contains("btn-dark")) {
        setCarrito(e.target.parentElement )
    }
    
    e.stopPropagation()
    
}
function setCarrito (objeto) {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad:1
    }
    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1 

    }
    carrito[producto.id] = {...producto}
    mostrarCarrito()

}

function mostrarCarrito () {
    const items= document.querySelector("#items")
    const templateCarrito = document.querySelector("#template-carrito").content

    items.innerHTML=""
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent=producto.title
        templateCarrito.querySelectorAll('td')[1].textContent=producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id =producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id =producto.id
        templateCarrito.querySelector('span').textContent =producto.cantidad * producto.precio
        const clone =templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    mostrarFooter()

    localStorage.setItem('carrito',JSON.stringify(carrito))
}


function mostrarFooter ()  {
    const footer = document.querySelector("#footer")
    const templateFooter = document.querySelector("#template-footer").content

    footer.innerHTML = ""
    if (Object.keys(carrito).length===0){
        footer.innerHTML=
        `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }
    const nCantidad = Object.values(carrito).reduce((acc,{cantidad})=> acc+cantidad, 0)
    const nPrecio=Object.values(carrito).reduce((acc,{cantidad,precio})=> acc+cantidad*precio, 0)

    templateFooter.querySelectorAll('td')[0].textContent=nCantidad
    
    templateFooter.querySelector('span').textContent= nPrecio
    
    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)
    const btnVaciar = document.querySelector("#vaciar-carrito")
    btnVaciar.addEventListener('click', ()=>{
        Swal.fire({
            title: 'Borrar todo?',
            text: "Esta accion elimina lo agregado al carrito!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, borrar todo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'Tu carrito esta vacio.',
                    )
                    carrito={}
                    mostrarCarrito()
                }
            })
            
        })
    const btnFin = document.querySelector("#Finalizar-compra")
    btnFin.addEventListener('click', ()=>{
        Swal.fire({
            title: 'Seguro?',
            text: "El tiempo de preparacion es de 10 minutos!",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, Tengo hambre!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cocinando!',
                    
                    )
                    
                }
            })
            
        })
    
}
function btnAccion  (e) {
    if(e.target.classList.contains('btn-info')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        mostrarCarrito()
        Toastify({
            backgroundColor: 'black',
            text: "Unidad Agregada",
            
            duration: 3000
            
            }).showToast();
    }
    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad===0){
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
        Toastify({
            backgroundColor: 'black',
            text: "Unidad Eliminada",
            
            duration: 3000
            
            }).showToast();
    }
    e.stopPropagation()
}
function tengoHambre () {
    
}