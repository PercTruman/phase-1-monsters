document.addEventListener('DOMContentLoaded', ()=>{

  getFiftyMonsters()
  createInputs()

  
})

const forwardButton = document.getElementById('forward').addEventListener('click', ()=>getFiftyMonsters())

function getFiftyMonsters(){
    let counter = 1
    fetch (`http://localhost:3000/monsters/?_limit=50*${counter}`)
        .then (res=>res.json())
        .then (monsters=>{
            let monsterContainer = document.getElementById('monster-container')
            monsters.forEach(monster => createMonsterEntry(monster,monsterContainer))
        }
        )
        counter++
}

function createMonsterEntry(monster, monsterContainer){
     let monsterDiv =document.createElement('div')
     monsterContainer.append(monsterDiv)
   
    let monsterName = document.createElement('h1')
    monsterName.innerText = `name: ${monster.name}`
    monsterDiv.append(monsterName)

    let monsterAge=document.createElement('h3')
    monsterAge.innerText=`age: ${monster.age}`
    monsterDiv.append(monsterAge)

    let monsterDescription=document.createElement('p')
    monsterDescription.innerText=`description: ${monster.description}`
    monsterDiv.append(monsterDescription)
   
}

function createInputs(){
   const monsterBuilder = document.getElementById('create-monster')

    let nameInput =document.createElement('input')
        nameInput.placeholder = 'Name'
    let ageInput =document.createElement('input')
        ageInput.placeholder = 'Age'
    let descriptionInput =document.createElement('input')
        descriptionInput.placeholder = 'Description'
    let addMonsterBtn =document.createElement('button')
        addMonsterBtn.innerText = 'Add Monster'
        addMonsterBtn.addEventListener('click',(e =>{
            e.preventDefault()
            let madeUpName = nameInput.value
            let madeUpAge = ageInput.value
            let madeUpDescription = descriptionInput.value
           

            let monsterObject={
                name: madeUpName,
                age: madeUpAge,
                description: madeUpDescription
            }
            postNewMonster(monsterObject)
        }))
    monsterBuilder.append(nameInput, ageInput, descriptionInput, addMonsterBtn)
    }


function postNewMonster(monsterObject){
    let monsterContainer = document.getElementById('monster-container')
    console.log(monsterContainer)
    fetch('http://localhost:3000/monsters',{
            method: 'POST',
            headers:{
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            
            body:JSON.stringify(monsterObject)
        })
    .then(res=>res.json())
    .then(monster =>createMonsterEntry(monster,monsterContainer))
}