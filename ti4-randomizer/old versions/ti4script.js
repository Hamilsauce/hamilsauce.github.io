const playerCounter = document.querySelector('#player-counter');
const raceListCard = document.querySelector('.race-container');
const resultListContainer = document.querySelector('.results-container');
const nameInputContainer = document.querySelector('.player-details-container');
const raceDisplay = document.getElementById('result-list');
const submitButton = document.querySelector('#submit-btn');
const resetButton = document.querySelector('#reset-btn');

let textBoxes;
let playerNames = [];
let players = [];
let raceList = [];

let nameBoxes = playerCounter.addEventListener('change', () => {
    //Changes name textboxes displayed when player counter changes, returns the textbox form elements 
    let playerCount = parseInt(playerCounter.value);
    return addInputs(playerCount);
});

submitButton.addEventListener('click', () => {
    //on submit button, dole races and display 
    raceList = getRaceList()
    getPlayerData(playerNames, raceList);
    doleOut(raceList);
    displays();
});

function getPlayerNames(inputBox) {
    //function is run everytime a user deselects a text input - adds text content to playername list 

    let box = document.querySelector(inputBox);
    let input = box.value;
    if (playerNames.length >= 6) {
        alert("Already Got enough players. Click Reset to start over.");
        return;
    } else if (input != "") {
        playerNames.push(input);
    }
    console.log(playerNames);
}

function getRaceList() {
    //iterate over checklist of races, snag the checked ones, note that for loop is preferable to forEach here because need to reference index of each checklist item/race 
    const raceChecks = document.querySelectorAll('.raceBox');
    console.log(raceChecks);
    let selectBoxes = [];
    for (let i = 0; i < raceChecks.length; i++) {
        if (raceChecks[i].type == 'checkbox' && raceChecks[i].checked == true) {
            selectBoxes.push(raceChecks[i].value);
        }
        console.log(selectBoxes);
    }
    return selectBoxes;
}

function addInputs(count) {
    /*for each player (according to counter selection), 1) add text input html to output array, each with player ID label/Id/Name/selectors incremented accordingly. 
    Then 2) join the array elems and write it to the inner html of the 'player-details-container' div */
    const output = [];
    for (let i = 1; i <= count; i++) {
        output.push(` 
           <div class="flexInput">
                <p class="textbox-label">Player ${i}</p>
                <input type="text" class="name-input-field" name="playername-textbox${i}" id="playername-textbox${i}" value="" 
                placeholder="Enter a name..." onblur="getPlayerNames('#playername-textbox${i}')">
            </div>
        `);
    }
    nameInputContainer.innerHTML = ` ${output.join('')}`;
    toggleSubmit();
}

function toggleSubmit() {
    //show or hide subit buton 
    let textFields = document.querySelectorAll(".name-input-field");
    if (textFields.length > 0) {
        submitButton.style.display = "inline";
        resetButton.style.display = "inline";
    } else {
        submitButton.style.display = "none";
        resetButton.style.display = "none";
    }
    return textFields;
}

function getPlayerData(names, races) {
    //for each name in array, add a new player object to array
    let i = 1;
    names.forEach(name => {
        players.push({
            playername: name,
            id: i,
            gotRaces: [],
            displayData: function () {
                let Output = '';
                output =
                    `<h4 class="player-header"><span class="output-id">Player ${this.id}</span></h4>
                     <p class="player-details">${this.playername} - ${this.gotRaces[0]}</p>`;
                return output;
            },
            getRace: function (races) {
                //randomize/shuffle race array and select first element, then remove that from array 
                for (let i = races.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [races[i], races[j]] = [races[j], races[i]];
                }
                this.gotRaces.push(races.splice(0, 1));
                console.log(this.gotRaces);
            }
        });
        i++;
    });
    return players;
}

//Calls getRace method for each player, repeat once
function doleOut(races) {
    let pl = players;
    for (let i = 0; i < 2; i++) {
        pl.forEach(p => {
            p.getRace(races);
        });
    };
    console.log(races);
}
    //concats the player displayData() output and pushes to DOM 
function displays() {
    const resultList = document.querySelector('#result-list');
    let pl = players;
    let outText = [];
    
    pl.forEach(p => {
        outText.push(p.displayData());
    });
    raceDisplay.innerHTML = outText.join('<br>');
    resultList.style.display = "block";
}

// eed to clear players objects, races array, clean out the result list HTML, 
// Hide buttons, and clear names in textboxes.

//When reset button is pressed, fire off page reload
resetButton.addEventListener('click', () => {
    document.location.reload(true);
});




















/*
// resetButton.addEventListener('click',() => {
//     const resultList = document.querySelector('#result-list');

//     players.length = 0;
//     // raceList.length = 0;
//     console.log(players);
//     console.log(playerNames);
//     console.log(selectBoxes);
//     // playerNames.length = 0;
//     // selectBoxes.length = 0;

//     resultList.style.display = "none";
//     raceDisplay.innerHTML = "";

//     // submitButton.style.display = "none";



// });
// // function resetData() {
    
// // }
*/
