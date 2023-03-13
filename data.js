const URL = 'https://mindhub-xj03.onrender.com/api/amazing'

fetch(URL)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))