let People = []
let peopleWithoutTeam

const generateTeams = function() {
    let teams = document.querySelectorAll('#teamContainer .card')
    if(teams.length == 0) {
        return
    }
    peopleWithoutTeam = [...People]

    let personsPerTeam = Math.floor(peopleWithoutTeam.length/teams.length)
    let personLeft = peopleWithoutTeam.length%teams.length

    let nameContainer = document.getElementById('nameContainer')
    nameContainer.innerHTML = ''

    while(peopleWithoutTeam.length > 0) {
        let randomNumber = Math.floor(Math.random()*peopleWithoutTeam.length)
        let randomPerson = peopleWithoutTeam[randomNumber]

        let newTeamMemberLi = document.createElement('li')
        newTeamMemberLi.classList.add('list-group-item', 'd-flex', 'p-0', 'justify-content-between', 'align-items-center')
        newTeamMemberLi.innerHTML = `<p class="my-auto">${randomPerson}</p>
        <button type="button" class="btn btn-danger my-1 deleteButton">X</button>`

        const index = peopleWithoutTeam.indexOf(randomPerson);
        if (index > -1) {
           peopleWithoutTeam.splice(index, 1);
        }
        for(team of teams) {
            let participantCount = team.childNodes[1].childElementCount
            if(participantCount<personsPerTeam){
                team.childNodes[1].appendChild(newTeamMemberLi)
                break
            }else if(participantCount==personsPerTeam && personLeft>0) {
                personLeft -= 1
                team.childNodes[1].appendChild(newTeamMemberLi)
                break
            }
        }
    }
    addButtonListeners()
}

const addName = function(deleted) {
    let name
    if(deleted) {
        name = deleted
    } else {
        let input = document.getElementById('nameInput')
        name = input.value
        if(name === '') {
            return
        }
        input.value = ''
        People.push(name)
    }

    let nameCard = document.createElement('div')
    nameCard.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'py-1')
    nameCard.innerHTML = `<div class="card">
                            <div class="card-body p-1">
                            ${name}
                            </div>
                          </div>`
    
    document.getElementById('nameContainer').appendChild(nameCard)
}

const addTeams = function() {
    let teamInput = document.getElementById('teamsInput')
    let teamCount = teamInput.value
    teamInput.value = ''

    let teamSection = document.getElementById('teamContainer')
    teamSection.innerHTML = ''

    for(let i=0; i<teamCount; i++) {
        let col = document.createElement('div')
        col.classList.add('col-6', 'py-1')
        let teamCard = `<div class="card teamCards">
                            <div class="card-header">
                                Team ${i+1}
                            </div>
                            <ul class="list-group list-group-flush">
                            </ul>
                        </div>`
        col.innerHTML = teamCard
        teamSection.appendChild(col)
    }
}

const addButtonListeners = function(){
    let deleteButtons = document.querySelectorAll('.deleteButton')

    for(button of deleteButtons) {
        button.removeEventListener('click', function(e){})
        button.addEventListener('click', function(e) {
            addName(e.path[1].childNodes[0].innerText)
            e.path[1].remove()})
    }
}

window.onload = function() {
    document.getElementById('nameInput').addEventListener("keydown", function(event) {
        console.log(event.code)
        if (event.code === 'Enter') {
            event.preventDefault();
            document.getElementById("addNameBtn").click();
        }
    });
}