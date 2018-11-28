//FETCH DOGS FROM DATABASE

const fetchDogs = () => 
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
