
//SELECT ELEMENTS

const dogFilterBtn = document.querySelector('#good-dog-filter')
const dogBarEl = document.querySelector('#dog-bar')
const dogInfoEl = document.querySelector('#dog-info')

let state = []




// FETCH DOGS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', event => {
    fetchDogs()
        .then(renderDogs)
})

// RENDER DOG TO DOG BAR AND SUMMARY BAR
const renderDog = (dog) => {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogBarEl.appendChild(dogSpan)
    state.push(dog)

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
}

// SORT DOGS
dogFilterBtn.addEventListener('click', event => {
    goodBoyFilter = false

    const changeBtnText = () => {
        return dogFilterBtn.innerText === 
            'Filter good dogs: OFF' ?
            'Filter good dogs: ON' : 'Filter good dogs: OFF'
    }

    const getGoodDogs = () => state.filter(function(dog) {
        return dog.isGoodDog
    })

    goodBoyFilter = !goodBoyFilter
    dogFilterBtn.innerText = changeBtnText()

    if (goodBoyFilter) {
        clearDogs()
        renderDogs(getGoodDogs())
    } else {
        clearDogs()
        renderDogs(state)
    }

})

// CLEAR DOGS
const clearDogs = () => {
    dogBarEl.innerHTML = ''
}

// RENDER DOGS
const renderDogs = (dogs) => {
    dogs.forEach(dog => renderDog(dog))
}

//UPDATE STATE
const updateState = () => {

}