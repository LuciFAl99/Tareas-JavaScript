const $section = document.getElementById("section")

function crearTarjeta(tarjetas) {
    return ` 
     <div class="card mt-3 style=" width: 18rem;">
     <img src="${tarjetas.image}" class="card-img-top imagenes" alt="cine">
    <div class="card-body">
        <h2>${tarjetas.name}</h2>
        <p class="card-text">${tarjetas.description}</p>
        <div class="d-flex justify-content-around">
         <p><strong>Price: $</>    ${tarjetas.price}</strong><p/>
            <a href="./details.html" class="btn btn-primary">Details</a>
        </div>
    </div>
    </div>`
}

function pintarTarjetas(tarjetas, elemento) {
    let template = ''
    for (let tarjeta of tarjetas) {
        template += crearTarjeta(tarjeta)
    }
    elemento.innerHTML = template
}





pintarTarjetas(data.events, $section)

//
