const appendPuppies= document.querySelector('#dog-bar')
const url="http://localhost:3000/pups"
const info= document.querySelector('#dog-info')
const filter= document.querySelector('#good-dog-filter')

document.addEventListener("DOMContentLoaded",()=>{
  getPuppies()
})



function getPuppies(){
  fetch(url)
  .then(res=>res.json())
  .then(json=>{
    puppies_array=json
    addPuppies(json)})

}

function addPuppy(pup){
  span=document.createElement('span')
  span.innerText=pup.name
  appendPuppies.appendChild(span)
  span.addEventListener('click',()=>{showPupInfo(pup)})
}

function addPuppies(puppies){
  for(element of puppies){
    addPuppy(element)
  }
}

function showPupInfo(pup){
info.innerHTML=`<img src=${pup.image}> <h2>${pup.name}</h2>`
button=document.createElement('button')
info.appendChild(button)
button.innerText=isAGoodDogFunction(pup)
button.addEventListener('click',()=>{changeBehavior(pup)})
}



function isAGoodDogFunction(pup){
  if(pup.isGoodDog===true){
    return "Good Dog!"
  } else {
    return "Bad Dog!"
  }

}

function changeBehavior(pup){
  pup.isGoodDog=!pup.isGoodDog
  fetch(`${url}/${pup.id}`,{
    method: "PATCH",
    headers: {"content-type":"application/json"},
    body: JSON.stringify(pup)
  })
  .then (dog_mod=>{ if(dog_mod.status===200){
    button.innerText=isAGoodDogFunction(pup)
  }else{
    alert("The dog did not change his behavior!")
  }
})
}

const filter_func= ()=>{
  changeTextfilter()
  if(filter.innerText==="Filter good dogs: ON"){
    new_puppies_array=puppies_array.filter(pup => pup.isGoodDog == true)
    deletePuppies()
    addPuppies(new_puppies_array)
  }else{
    deletePuppies()
    getPuppies()
  }

}

filter.addEventListener('click',filter_func)


function deletePuppies(){
  const spans= document.querySelectorAll('span')
  for(span of spans){
  span.remove()}
}


function changeTextfilter() {
  if(filter.innerText==="Filter good dogs: OFF"){
    filter.innerText="Filter good dogs: ON"
  }else{
    filter.innerText="Filter good dogs: OFF"

  }
}
