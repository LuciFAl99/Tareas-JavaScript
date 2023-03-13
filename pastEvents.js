const $section = document.getElementById("section")
const $div = document.getElementById("checkbox")
const buscador = document.getElementById("buscador")
const boton = document.getElementById("boton")
const resultado = document.querySelector(".resultado")
const $form = document.getElementById("formulario")

function crearTarjeta(tarjetas) {
    return ` 
     <div class="card mt-3 style=" width: 18rem;">
        <img src="${tarjetas.image}" class="card-img-top imagenes" alt="${tarjetas.category}">
        <div class="card-body">
           <h2>${tarjetas.name}</h2>
           <div class="d-flex justify-content-around">
               <p><strong>Price: $</>    ${tarjetas.price}</strong><p/>
               <a href="./details.html?id=${tarjetas._id}" class="btn btn-primary">Details</a>
           </div>
        </div>
    </div>`
}

fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        
        function pintarTarjetas(tarjetas, elemento) {
            let template = ''
            for (let tarjeta of tarjetas) {
                if (tarjeta.date<= data.currentDate)
                template += crearTarjeta(tarjeta)
            }
            elemento.innerHTML = template
        }
        pintarTarjetas(data.events, $section)

        // armar lista con categorias

        let listaCategorias = Array.from(new Set(data.events.filter(datos => datos.category).map(datos => datos.category))) // set acepta valores únicos, por eso nos filtra siete elementos porque algunos estan repetidos y en total serian 14.Nos quita todos los repetidos
        let categorias = listaCategorias.reduce((acc, category) => {
            return acc += `<input type="checkbox" class="inputs" id="${category}" name="${category}">
    <label>${category}</label>`
        }, '')


        $div.innerHTML += categorias

        // agregar eventos

        $div.addEventListener('change', e => {

            const filtrado = filtroCruzado()
            if (filtroCruzado() == 0) {
                return $section.innerHTML = `<h2> No results found </h2>`
            }
            console.log(filtrado)
            pintarTarjetas(filtrado, $section)

        })


        buscador.addEventListener('input', e => {
            const filtrado = filtroCruzado()
            if (filtroCruzado() == 0) {
                return $section.innerHTML = `<h2> No results found </h2>`
            }
            console.log(filtrado)
            pintarTarjetas(filtrado, $section)
        })



        function filtroCheckbox(lista) {
            const checkboxs = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
            const listaValor = checkboxs.map(e => e.id)
            console.log(listaValor)
            if (listaValor.length === 0) {
                return lista
            }
            const listaFiltro = lista.filter(e => {
                return listaValor.includes(e.category)
            })
            return listaFiltro
        }



        function filtrarBusqueda(lista) {
            const texto = buscador.value.toLowerCase();
            const search = lista.filter(e => {
                return e.name.toLowerCase().includes(texto)
            })
            console.log(search)
            return search
        }

        //  boton.addEventListener('click', filtrarBusqueda)
        //  buscador.addEventListener('keyup', filtrarBusqueda)


        function filtroCruzado() {
            return filtroCheckbox(filtrarBusqueda(data.events))

        }

        console.log(filtrarBusqueda())

    })


  







