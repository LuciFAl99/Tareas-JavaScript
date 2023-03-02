const $section = document.getElementById("section")

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
        if (tarjeta.date>= data.currentDate)
        template += crearTarjeta(tarjeta)
    }
    elemento.innerHTML = template
}

pintarTarjetas(data.events, $section)