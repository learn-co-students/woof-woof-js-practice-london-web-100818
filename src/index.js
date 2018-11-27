//Define elements
listEl = document.getElementById("dog-bar")
infoEl = document.getElementById("dog-info")
filterEl = document.getElementById("good-dog-filter")

let allDogs = []
let filterStatus = false

//Filter dogs on page
filterEl.addEventListener("click", event => {
  let filteredDogs = [...allDogs]
  filterStatus = !filterStatus
  if (filterStatus === true) {
    filterEl.innerText = "Filter good dogs: ON"
    addAllDogsOntoPage(filterGoodDogs(filteredDogs))
  }
  if (filterStatus === false) {
    filterEl.innerText = "Filter good dogs: OFF"
    addAllDogsOntoPage(allDogs)
  }
})

//Function to filter dogs on page
function filterGoodDogs(filteredDogs) {
  return filteredDogs.filter((dog) => dog.isGoodDog === true)
}

//Get all dogs from server
const getAllDogsFromServer = () =>
  fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then((dogs) => {
      allDogs = dogs
      addAllDogsOntoPage(dogs)
    })

//All all dogs onto server using add single dog function
const addAllDogsOntoPage = (dogs) => {
  listEl.innerHTML = ""
  dogs.forEach((dog) => addSingleDogOntoPage(dog))
}

//Add single dog onto page
const addSingleDogOntoPage = (dog) => {
  const newDog = document.createElement("span")
  newDog.className = "dog-item"
  newDog.id = dog.id
  newDog.status = ""
  if (dog.isGoodDog === true) {
    newDog.status = "Good Dog!"
  }
  if (dog.isGoodDog === false) {
    newDog.status = "Bad Dog!"
  }
  newDog.innerHTML = `<p class="dog-name">${dog.name}</p>`
  listEl.appendChild(newDog)
  const dogEl = newDog.querySelector(".dog-name")
  dogEl.addEventListener("click", event => {
    infoEl.innerHTML = ""
    infoEl.innerHTML = `
    <div>
      <img src="${dog.image}">
      <h2>${dog.name}</h2>
      <button class="dog-status">${newDog.status}</button>
    </div>
    `
    const statusEl = infoEl.querySelector(".dog-status")
    statusEl.addEventListener("click", event => {
      dog.isGoodDog = !dog.isGoodDog
      updateDogOnServer(dog.id, dog.isGoodDog)
      statusEl.innerText = statusEl.innerText === "Good Dog!" ? "Bad Dog!" : "Good Dog!"
    })
  })
}

//Update dog on server
const updateDogOnServer = (id, isGoodDog) =>
fetch(`http://localhost:3000/dogs/${id}`, {
  method: "PATCH",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({isGoodDog: isGoodDog})
})
  .then(response => {
    response.json()
  })
  .catch(err => alert(err))


getAllDogsFromServer()
