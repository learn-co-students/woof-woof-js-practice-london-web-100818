
const baseUrl = "http://localhost:3000/pups";
const goodBtn = document.querySelector("#good-dog-filter");

goodBtn.addEventListener("click", () =>{
    if(goodBtn.innerText.includes("OFF")){
        goodBtn.innerText = "Filter good dogs: ON";
        showDogs();
    } else {
        goodBtn.innerText = "Filter good dogs: OFF";
        showDogs();
    }
});

const fetchDogs = () => fetch(baseUrl).then(resp => resp.json());

const updateDog = (dog) => {
    fetch(`${baseUrl}/${dog.id}`, {
        method: "PATCH",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(dog)
    }).then(showDogs);
}

const appendDog = (dog) => {
    const dogBar = document.querySelector("#dog-bar");
    const span = document.createElement("span");
    span.innerText = dog.name;
    span.addEventListener("click", () => {
        const dogInfo = document.querySelector("#dog-info");
        dogInfo.innerHTML = `<img src="${dog.image}">
                            <h2>${dog.name}</h2>`;
        dogInfo.appendChild(makeButton(dog));
    })
    dogBar.appendChild(span);
}

const dogFilter = (dog) => {
    if(goodBtn.innerText.includes("ON") && dog.isGoodDog){
        appendDog(dog);
    } else if(goodBtn.innerText.includes("OFF")){
        appendDog(dog);
    }
} 

const makeButton = (dog) => {
    const btn = document.createElement("button");
    if(dog.isGoodDog){
        btn.innerText = "Good Dog!";
    } else {
        btn.innerText = "Bad Dog!";
    }
    btn.addEventListener("click", () => {
        dog.isGoodDog = !dog.isGoodDog;
        if(btn.innerText.includes("Good")){
            btn.innerText = "Bad Dog!";
        } else {
            btn.innerText = "Good Dog!";
        }
        updateDog(dog);
    })
    return btn;
}

const appendDogs = (dogs) => {
    const dogBar = document.querySelector("#dog-bar");
    dogBar.innerHTML = "";
    dogs.forEach(dogFilter);
}

const showDogs = () => fetchDogs().then(appendDogs);

showDogs();
 