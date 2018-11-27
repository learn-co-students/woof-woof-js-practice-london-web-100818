url = ('http://localhost:3000/pups')

const getDogs = () =>
  fetch(url)
    .then(resp => resp.json())

const updateDog = dogToUpdate =>
  fetch(`${url}/${dogToUpdate.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(dogToUpdate)
  })
    .then(resp => resp.json())