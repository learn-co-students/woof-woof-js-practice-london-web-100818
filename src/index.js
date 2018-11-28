const renderDog = (dog) => {
  let dogSpan = document.createElement('span')
      dogSpan.setAttribute(`id`, `dog${dog.id}`)
      dogSpan.innerHTML = `
        ${dog.name}
      `
  let dogBar = document.querySelector('#dog-bar')
      dogBar.appendChild(dogSpan)

  dogSpan.addEventListener('click' ,() => {

    let dogInfo = document.querySelector('#dog-info')
        dogInfo.innerHTML = '';

    renderDogInfo(dog)
  })
}

const renderDogs = (dogs) => {
  dogs.forEach(dog => renderDog(dog))
}

const renderDogInfo = (dog) => {

  let dogImg = document.createElement('img')
      dogImg.setAttribute("src", `${dog.image}`);
  let dogName = document.createElement('h2')
      dogName.innerHTML = `${dog.name}`
  let dogGoodOrBad = document.createElement('button')
      if (dog.isGoodDog){
        dogGoodOrBad.innerHTML = `Good Dog!`
      }else {
        dogGoodOrBad.innerHTML = `Bad Dog!`
    }

  let dogInfo = document.querySelector('#dog-info')

      dogInfo.appendChild(dogImg)
      dogInfo.appendChild(dogName)
      dogInfo.appendChild(dogGoodOrBad)


      dogGoodOrBad.addEventListener('click', () => {
        if (dog.isGoodDog){
          dog.isGoodDog = false
          dogGoodOrBad.innerHTML = `Bad Dog!`
        }else {
          dog.isGoodDog = true
          dogGoodOrBad.innerHTML = `Good Dog!`
        }
        updateDog(dog)
      })
}

/////////API calls/////////
const dogFetch = () =>
  fetch('http://localhost:3000/pups')
  .then(resp => resp.json())
  .then(renderDogs)

const updateDog = (dog) => {
    fetch(`http://localhost:3000/pups/${dog.id}`, {
      method: 'PATCH',
      content: {'Content-Type': 'application/json'},
      body: JSON.stringify(dog)
    }).then(resp => resp.json())
}

dogFetch();
