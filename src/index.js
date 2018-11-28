const dogUrl = 'http://localhost:3000/pups'
let filterStatus = false;

const addDog = dog => {
    const dogBar = document.querySelector('#dog-bar');
    const dogForm = document.querySelector('#dog-info');

    const dogItem = document.createElement('div');
    const dogName = document.createElement('span');
    const dogBtn = document.createElement('button');

    status = (dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!') 

    dogItem.id = dog.id
    dogItem.className = 'dog-item'
    dogName.innerHTML = `${dog.name}`

    dogBtn.id = `dog-${dog.id}`
    dogBtn.innerHTML = status

    dogName.addEventListener('click', () => {
        dogForm.style.display = 'block'
        dogForm.innerHTML = `
            <img src=${dog.image}>
            <h2>${dog.name}</h2>
        `
        dogForm.appendChild(dogBtn)
      }) 

    dogBtn.addEventListener('click', () => {
        bool = (dog.isGoodDog ? false : true)
        updateGood(`${dog.id}`, bool)
            .then(serverDog => updateDog(serverDog))
    })

    dogItem.appendChild(dogName)
    dogBar.appendChild(dogItem)
}

const updateDog = dog => {
    const dogBtnEl = document.querySelector(`#dog-${dog.id}`)
    if (dogBtnEl.innerHTML === 'Good Dog!') {
        dogBtnEl.innerHTML = 'Bad Dog!'
    } else { 
        dogBtnEl.innerHTML = 'Good Dog!'
    }
}

const addDogs = dogs => {
    if (filterStatus === true) {
        dogs = dogs.filter(function(dog){
            return dog.isGoodDog === true;
        });
    }     
    dogs.forEach(dog => addDog(dog))
}

const getDogs = () => {
    fetch(dogUrl)
    .then(resp => resp.json())
    .then(dogs => addDogs(dogs))
}

const updateGood = (id, bool) => 
    fetch((dogUrl + `/${id}`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json',
          Accept: "application/json" },
        body: JSON.stringify({"isGoodDog": bool})
      })
      .then(resp => resp.json())

document.addEventListener("DOMContentLoaded", function() {
    const filterBtn = document.querySelector('#good-dog-filter');
    filterBtn.addEventListener('click', () => {
        document.querySelectorAll('.dog-item').forEach(dog => dog.remove())
        filterStatus = !filterStatus
        if (filterStatus === true) {
            filterBtn.innerHTML = 'Filter good dogs: ON'
            getDogs()  
        } else {
            filterBtn.innerHTML = 'Filter good dogs: OFF'
            getDogs() 
        }
    })

    getDogs()
});