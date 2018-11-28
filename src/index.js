const dogFilterBtn = document.querySelector('#good-dog-filter')
const dogBarEl = document.querySelector('#dog-bar')
const dogInfoEl = document.querySelector('#dog-info')


const state = {
    dogs: [],
    sortByGoodBoy: false
}

const addDog = dog => {
    state.dogs.push(dog)
}

const addDogs = dogs => {
    dogs.forEach(dog => addDog(dog))
}

const renderDogs = (dogs) => {
    dogs.forEach(dog => renderDog(dog))
}

const renderDog = (dog) => {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name

    dogSpan.addEventListener('click', () => {
        dogInfoEl.innerHTML = `
            <img src="${dog.image}" alt="Dog Image">
            <h2>${dog.name}</h2>
            <button id='dog-${dog.id}'>${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
        `
        const dogBtn = dogInfoEl.querySelector('button')
        dogBtn.addEventListener('click', () => {
            dog.isGoodDog = !dog.isGoodDog
            dogBtn.textContent = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
            patchDog(dog)
                .catch(err => alert('Failed to write to database. Soz'))
        })
    })
    dogBarEl.appendChild(dogSpan)
}

const updateBar = () => {
    dogBarEl.innerHTML = ''
    renderDogs(state.dogs)
}

dogFilterBtn.addEventListener('click', () => {
    state.sortByGoodBoy = !state.sortByGoodBoy

    if (state.sortByGoodBoy) {
        dogBarEl.innerHTML = ''
        renderDogs(state.dogs.filter(dog => dog.isGoodDog))
    } else {
        dogBarEl.innerHTML = ''
        renderDogs(state.dogs)
    }

    dogFilterBtn.innerText = dogFilterBtn.innerText.includes("OFF") ?
        'Filter good dogs: ON' :
        'Filter good dogs: OFF'
})

fetchDogs()
    .then(dogs => {
        addDogs(dogs)
        updateBar()
    })