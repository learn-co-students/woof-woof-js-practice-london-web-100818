//FETCH DOGS FROM DATABASE

const fetchDogs = () => 
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())


const patchDog = (dog) => 
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dog)
    }).then(resp => resp.json())
        
