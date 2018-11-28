
//SELECT ELEMENTS

const dogFilterBtn = document.querySelector('#good-dog-filter')
const dogBarEl = document.querySelector('#dog-bar')
const dogInfoEl = document.querySelector('#dog-info')


const state = {
    dogs: [],
    sortByGoodBoy: false
}

// ADD DOG TO STATE
const addDog = dog => {
    state.dogs.push(dog)
}

// ADD DOGS TO STATE
const addDogs = dogs => {
    dogs.forEach(dog => addDog(dog))
}

// RENDER DOGS
const renderDogs = (dogs) => {
    dogs.forEach(dog => renderDog(dog))
}

// RENDER DOG TO DOG BAR AND SUMMARY BAR
const renderDog = (dog) => {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name

    dogSpan.addEventListener('click', () => {
        const renderGoodOrBadDog = () => dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
        
        dogInfoEl.innerHTML = `
            <img src="${dog.image}" alt="Dog Image">
            <h2>${dog.name}</h2>
            <button id='dog-${dog.id}'>${renderGoodOrBadDog()}</button>
        `
        const dogBtn = dogInfoEl.querySelector('button')
        dogBtn.addEventListener('click', event => {
            dog.isGoodDog = !dog.isGoodDog
            dogBtn.textContent = renderGoodOrBadDog()
            patchDog(dog)
                .catch(err => alert('Failed to write to database. Soz'))
        })
    })
    dogBarEl.appendChild(dogSpan)
}

// UPDATE BAR FROM STATE
const updateBar = () => {
    dogBarEl.innerHTML = ''
    renderDogs(state.dogs)
}



// SORT DOGS
dogFilterBtn.addEventListener('click', () => {
    state.sortByGoodBoy = !state.sortByGoodBoy
    
    const getGoodDogs = (state) => state.dogs.filter(function (dog) {
        return dog.isGoodDog
    })

    if (state.sortByGoodBoy) {
        dogBarEl.innerHTML = ''
        renderDogs(getGoodDogs(state))
    } else {
        dogBarEl.innerHTML = ''
        renderDogs(state.dogs)
    }

    const changeBtnText = () => {
        return dogFilterBtn.innerText === 
            'Filter good dogs: OFF' ?
            'Filter good dogs: ON' : 'Filter good dogs: OFF'
    }

    dogFilterBtn.innerText = changeBtnText()
})

fetchDogs()
    .then(dogs => {
        addDogs(dogs)
        updateBar()
    })