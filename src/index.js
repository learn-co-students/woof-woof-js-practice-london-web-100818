
const getDogs = () => fetch('http://localhost:3000/pups').then(res => res.json())
let filterSwitch = false
const dogInfo = document.querySelector('#dog-info')


const addDog = dog => {
    const dogBar = document.querySelector('#dog-bar')
    const dogSpan = document.createElement('span')
    dogSpan.id =  `dog-${dog.id}-span`
    dogSpan.innerText =  `${dog.name}`
    dogBar.appendChild(dogSpan)
   
    dogSpan.addEventListener("click", () => showDogInfo(dog))
    
}

const addDogs = dogs => 
    dogs.forEach(dog => addDog(dog))



const showDogInfo = dog => {
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = `
        <img src="${dog.image}">
        <h2>${dog.name}</h2>
        <button id="toggle-${dog.id}">${!!dog.isGoodDog ? "Good dog!" : "Bad Dog!"}</button>
    `
        toggleBtn = document.querySelector(`#toggle-${dog.id}`)
        toggleBtn.addEventListener("click", () => {
            dog.isGoodDog = !dog.isGoodDog
            toggleBtn.innerHTML = `${!!dog.isGoodDog ? "Good dog!" : "Bad Dog!"}`
            dogToggle(dog)
        })
    }
    

const dogToggle = dog =>
    fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(dog)
     }).then(resp => resp.json())

document.addEventListener("DOMContentLoaded", () => {
    getDogs().then(addDogs)

    const dogFilter = document.querySelector('#good-dog-filter')
    dogFilter.addEventListener("click", () => {
        const dogBar = document.querySelector('#dog-bar')
        dogBar.innerHTML = ''
        filterSwitch = !filterSwitch
        dogFilter.innerText = `${filterSwitch ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'}`
        if (filterSwitch) {
            
            
            getDogs().then(dogs => dogs.filter(dog => dog.isGoodDog)).then(addDogs)} else { getDogs().then(addDogs)}
        })
    



})


