const $section = document.getElementById("section")
const $div = document.getElementById("checkbox")
const dataCateg =  data.events.filter(datos => datos.category)
const buscador = document.getElementById("buscador")
const boton = document.getElementById("boton")
const resultado = document.querySelector(".resultado")

function crearTarjeta(array) {
    return ` 
     <div class="card mt-3 style=" width: 18rem;">
     <img src="${array.image}" class="card-img-top imagenes" alt="cine">
    <div class="card-body">
        <h2>${array.name}</h2>
        <p class="card-text">${array.description}</p>
        <div class="d-flex justify-content-around">
         <p><strong>Price: $</>    ${array.price}</strong><p/>
            <a href="./details.html" class="btn btn-primary">Details</a>
        </div>
    </div>
    </div>`
}

 function pintarTarjetas(array, elemento) {
    let template = ''
    for (let tarjeta of array) {
        if (tarjeta.date<= data.currentDate)
        template += crearTarjeta(tarjeta)
    }
    elemento.innerHTML = template
}

pintarTarjetas(data.events, $section)

let listaCategorias = Array.from(new Set(dataCateg.map(datos=>datos.category)))  // set acepta valores únicos, por eso nos filtra siete elementos porque algunos estan repetidos y en total serian 14.Nos quita todos los repetidos
let categorias = listaCategorias.reduce((acc, category) => {
    return acc += `<input type="checkbox" class="inputs" id="${category}" name="${category}">
    <label>${category}</label>`
}, '')

$div.innerHTML += categorias

// agregar eventos

$div.addEventListener('change', e =>{

   const filtrado = filtroCheckbox(dataCateg)
    pintarTarjetas(filtrado, $section)
 
   
})


function filtroCheckbox(lista){
    const checkboxs = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    const listaValor = checkboxs.map(e => e.id)
    // console.log(listaValor)
    if(listaValor.length === 0){
        return lista
    }

     const listaFiltro = lista.filter(e => {return listaValor.includes(e.category)})
     console.log(listaFiltro)
     return listaFiltro
}

function filtrarBusqueda(){
    resultado.innerHTML = ' ';
   const texto = buscador.value.toLowerCase();
   for(let tarjeta of data.events){
    let nombre= tarjeta.name.toLowerCase();
    if (nombre.indexOf(texto) !== -1 && tarjeta.date<= data.currentDate){
       resultado.innerHTML+=crearTarjeta(tarjeta)
    }
    
   }
   if (resultado.innerHTML === ' '){
    resultado.innerHTML += `<h2>No results found </h2>`
   }
}

boton.addEventListener('click', filtrarBusqueda)
buscador.addEventListener('keyup', filtrarBusqueda)
