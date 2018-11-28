
//SELECT ELEMENTS

const dogFilterBtn = document.querySelector('#good-dog-filter')
const dogBarEl = document.querySelector('#dog-bar')
const dogInfoEl = document.querySelector('#dog-info')

const status = []

// FETCH DOGS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', event => {
    fetchDogs()
        .then(renderDogs)
})

// ADD DOG TO DOG BAR
const renderDog = (dog) => {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogBarEl.appendChild(dogSpan)
    status.push(dog)
}

// ADD DOGS
const renderDogs = (dogs) => {
    dogs.forEach(dog => renderDog(dog))
}