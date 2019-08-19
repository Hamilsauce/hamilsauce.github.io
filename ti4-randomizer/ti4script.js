const playerCounter = document.querySelector('#player-counter'); 
const raceListCard = document.querySelector('.race-container');
const resultListContainer = document.querySelector('.results-container');
const nameInputContainer = document.querySelector('.player-details-container');
const raceDisplay = document.getElementById('result-list');
const submitButton = document.querySelector('#submit-btn');

let textBoxes;
let playerNames = [];
let players = [];

let nameBoxes = playerCounter.addEventListener('change', () => {
    //Changes name textboxes displayed when player counter changes, returns the textbox form elements 
    let playerCount = parseInt(playerCounter.value);
    return addInputs(playerCount);
});

submitButton.addEventListener('click', () => {
    //on submit button, dole races and display 
    let raceList = getRaceList();
console.log(raceList);
    getPlayerData(playerNames, raceList);
    doleOut(raceList);
    displays();
});

function getPlayerNames(boxes) {
    //function is run everytime a user deselects a text input - adds text content to playername list 
    let box = document.querySelector(boxes);
    let input = box.value;

    if (input != "") {
        playerNames.push(input);
    }
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
    nameInputContainer.innerHTML = `<br> ${output.join('')}`;
    toggleSubmit();
}

function toggleSubmit() {
    //show or hide subit buton 
    let textFields = document.querySelectorAll(".name-input-field");
    if (textFields.length > 0) {
        submitButton.style.display = "inline";
    } else {
        submitButton.style.display = "none";
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
            displayData: function() {
                let Output = '';
                output =
                    `<p class="player-header"><b>Player ${this.id}: ${this.playername}</b></p> 
                     <p class="player-details"> ${this.gotRaces[0]}</p>`;
                return output;
            },
            getRace: function(races) {
                //randomize/shuffle race array and select first element, then remove that from array 
                for (let i = races.length - 1; i > 0; i--) {
                    let j =Math.floor(Math.random() * (i + 1));
                    [races[i], races[j]] = [races[j], races[i]];
                }
                this.gotRaces.push(races[0]);
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
}

function displays() {
    //concats the player displayData() output and pushes to DOM 
    const resultList = document.querySelector('#result-list');

    let pl = players;
    let outText = [];
    pl.forEach(p => {
        outText.push(p.displayData());
    });
    raceDisplay.innerHTML = outText.join('<br>');
    resultList.style.display = "block";
}

