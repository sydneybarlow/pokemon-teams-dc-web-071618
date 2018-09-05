document.addEventListener('DOMContentLoaded', function() {
  getAllTrainers()
})

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getAllTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(tData => {
    getEachTrainer(tData)
  })
}

function getEachTrainer(tData) {
  tData.forEach(trainer => {
    let id = trainer.id
    let tName = trainer.name
    let main = document.querySelector('main')

    let divCard = document.createElement('div')
    divCard.classList = `card`
    divCard.id = `trainer-${id}`
    main.appendChild(divCard)

    let pName = document.createElement('p')
    pName.innerText = tName
    divCard.appendChild(pName)

    let tButton = document.createElement('button')
    tButton.id = `button-${id}`
    tButton.innerText = `Add Pokemon`
    divCard.appendChild(tButton)

    let ul = document.createElement('ul')
    ul.id = `ul-${id}`
    ul.classList = `pokemon-list`
    divCard.appendChild(ul)

    let pokemons = trainer.pokemons
    pokemons.forEach(poke => {
      renderEachPoke(poke)
    })

    tButton.addEventListener('click', function(e){
      postPokemon(id)
    })
  })
}

function renderEachPoke(poke) {
  let li = document.createElement('li')
  li.id = `pokemon-${poke.id}`
  let rButton = document.createElement('button')
  rButton.innerText = `Release`
  rButton.classList = `release`
  rButton.id = `button-${poke.id}`
  li.innerText = `${poke.nickname} (${poke.species})`
  li.appendChild(rButton)
  ul = document.querySelector(`#trainer-${poke.trainer_id}`).querySelector(`.pokemon-list`)
  ul.appendChild(li)
  rButton.addEventListener('click', function(event){
    deletePokemon(poke.id)
  })
}

function postPokemon(trainer_id) {
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainer_id
    })
  }).then(response => response.json())
    .then(data => {
      renderEachPoke(data)
    })
}

function deletePokemon(id) {
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: "DELETE"
  }).then(response => response.json())
    .then(data => {
      console.log(data)
      let li = document.querySelector(`#pokemon-${data.id}`)
      let ul = document.querySelector(`#ul-${data.trainer_id}`)
      ul.removeChild(li)
    })
}
