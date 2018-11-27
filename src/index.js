// ***RENDER***
const dogBarDiv = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')
// ***TOGGLE DOGS***
const goodDogFilterBtn = document.querySelector('#good-dog-filter')

const state = {
  "dogs": [],
  "filterGoodDogs": false
}

const storeDog = dog => {
  state.dogs.push(dog)
}

const storeDogs = dogs => {
  dogs.forEach(storeDog)
}

const updateDogBar = dogs => {
  dogBarDiv.innerHTML = ''
  dogs.forEach(renderDogBar)
}

const updateDogInfo = () => {
  dogInfoDiv.innerHTML = ''
  state.dogs.forEach(renderDogInfo)
}

const renderDogBar = dog => {
  const dogSpanEl = document.createElement('span')
  dogSpanEl.innerText = dog.name
  dogBarDiv.appendChild(dogSpanEl)
  dogSpanEl.addEventListener('click', () => renderDogInfo(dog))
}

const renderDogInfo = dog => {
  const dogCardDiv = document.createElement('div')
  dogCardDiv.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button>${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
  `
  dogInfoDiv.innerHTML = ''
  dogInfoDiv.appendChild(dogCardDiv)

  const goodDogBtn = dogCardDiv.querySelector('button')
  goodDogBtn.addEventListener('click', () => toggleGoodDog(goodDogBtn, dog))
}

const toggleGoodDog = (el, dog) => {
  dog.isGoodDog = !dog.isGoodDog
  if(dog.isGoodDog) {
    el.innerText = 'Good Dog!'
  } else {
    el.innerText = 'Bad Dog!'
  }
  updateDog(dog)
}

const filterGoodDogs = () => {
  let goodDogs = state.dogs.filter(dog => dog.isGoodDog === true)
  updateDogBar(goodDogs)
}

goodDogFilterBtn.addEventListener('click', () => {
  state.filterGoodDogs = !state.filterGoodDogs

  if (state.filterGoodDogs) {
    goodDogFilterBtn.innerText = 'Filter Good Dogs: ON'
    filterGoodDogs()
  } else {
    goodDogFilterBtn.innerText = 'Filter Good Dogs: OFF'
    updateDogBar(state.dogs)
  }
})

getDogs()
  .then(dogs => {
    storeDogs(dogs)
    updateDogBar(dogs)
  })