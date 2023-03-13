const $div = document.getElementById("details")
const params = new URLSearchParams(location.search)//Es un método que nos permite trabajar con lo que hay en la URL
const id = params.get("id")

//comparar el id que trajimos de la url con los id de la data.event
fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
let tarjeta = data.events.find(elemento => elemento._id==id)

function createCard(objeto){
    return `<img src="${objeto.image}" alt="${objeto.category}" class="imagen me-5 mt-4 ms-5 d-flex justify-content-center">
    <div class="card mt-4 ">

        <div class="card-body d-flex flex-column justify-content-center">
            <h2>${objeto.name}</h2>
            <p class= "mt-2"><strong>Description:</strong> ${objeto.description}
            </p>
            <p><strong>Category:</strong> ${objeto.category}
            </p>
            <p><strong>Place:</strong> ${objeto.place}
            </p>
            <p><strong>Capacity:</strong> ${objeto.capacity}
            </p>
            <p class="assistance"><strong>${objeto.assistance ? "Assistance: "+objeto.assistance: "Estimate: "+objeto.estimate}</strong>
            </p>


        </div>
    </div>`
}

function renderCard(objeto, elemento){
 let template = ''
 template+=createCard(objeto)
 elemento.innerHTML = template
}

renderCard(tarjeta, $div)
    })
