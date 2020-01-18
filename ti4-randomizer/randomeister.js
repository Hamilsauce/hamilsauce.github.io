//log last updated 1.18.20

import * as modularMan from "./modal-component.js";
import {handleWelcome} from "./ti4WelcomeModal.js";
import * as raceTable from "./race-table.js";

const playerCounter = document.querySelector('#player-counter');
const nameInputContainer = document.querySelector('.player-details-container');
const submitButton = document.querySelector('#submit-btn');
const raceDisplay = document.getElementById('result-list');
const resetButton = document.querySelector('#reset-btn');
const selectAllButton = document.querySelector('#select-btn');
const clearButton = document.querySelector('#clear-btn');
const raceChecks = document.querySelectorAll('.raceBox');
const settingsForm = document.querySelector('#settings-form');
const resultContainer = document.querySelector('.results-container');

let nameInputFields = [];
let playerNames = [];
let players = [];
let raceList = [];
let ins = [];
;(() => {
    handleWelcome();
})();

/* Event Listeners */

document.querySelector('#modal-button').addEventListener('click', e => modularMan.modularity());

playerCounter.addEventListener('change', () => {
    const resultHeader = document.querySelector('.display-header-controls');
    let playerCount = parseInt(playerCounter.value);

    if (playerCount >= 1) {
        resultHeader.style.display = "flex";
    }
    nameInputFields = addInputs(playerCount);
    raceDisplay.style.display = 'none';
    resultContainer.style.display = 'block';
});


settingsForm.addEventListener('submit', e => {
    e.preventDefault();

    let nameArr = filterNames(getPlayerData(nameInputFields));
    raceList = getRaceList();

    addPlayer(nameArr);
    doleOut(raceList);
    displays();
    getResultHeight();
});

selectAllButton.addEventListener('click', () => {
    raceChecks.forEach(r => {
        r.checked = true;
    });
    return;
});

clearButton.addEventListener('click', () => {
    raceChecks.forEach(r => {
        r.checked = false;
    });
    return;
});

resetButton.addEventListener('click', () => {
    document.location.reload(true);
});

/* End of Eventlisteners */

//See button HTML in addInput() below - function is run everytime a user deselects a text input - adds text content to playername list
function getPlayerData(nameBoxes) {
    nameBoxes.forEach(box => {
        //Input Validation
        let [bVal, boxID] = [box.value, parseInt(box.name.split('').pop()) - 1];

        if (bVal.length === 0 || bVal == ' ') {
            playerNames[boxID] = '';
            box.style.border = '1px solid rgba(40, 44, 48, 0.377)';
        } else if (bVal == playerNames[boxID]) {
            box.style.border = 'px outset  rgba(0, 18, 5, 0.3)';
        } else if (playerNames.length > 6) {
            alert("Already Got enough players. Click Reset to start over.");
        } else {
            box.style.color = "rgb(100, 100, 100)";
            box.style.border = 'px outset  rgba(0, 18, 5, 0.3)';
            playerNames[boxID] = [boxID, cleanNames(bVal)];
        }
    });
    return playerNames;
}

function getRaceList() {
    //iterate over checklist of races, snag the checked ones, note that for loop is preferable to forEach here because need to reference index of each checklist item/race
    let selectBoxes = [];

    for (let i = 0; i < raceChecks.length; i++) {
        if (raceChecks[i].type == 'checkbox' && raceChecks[i].checked == true) {
            selectBoxes.push(raceChecks[i].value);
        }
    }
    return selectBoxes;
}

function cleanNames(name) {
    //trim trailing spaces from names (split name into array, if a space is found at end, return the new array sans the space, if no trialing space, return original array)
    let chars = name.split('');

    if (chars.pop() == " ") {
        return chars.join('');
    } else {
        return name;
    }
}

function filterNames(names) {
    // filter out elements in playerName array that are empty or only space
    let trimmed = names.filter(n => {
        if ((n != '' && n != ' ')) {
            return n;
        }
    });
    return trimmed;
}

function addInputs(count) {
    /*for each player (according to counter selection), 1) add text input html to output array, each with player ID label/Id/Name/selectors incremented accordingly.
    Then ) join the array elems and write it to the inner html of the 'player-details-container' div */
    const output = [];
    const resultHeader = document.querySelector('.display-header-controls');

    for (let i = 1; i <= count; i++) {
        output.push( /*html*/ `
            <div class="flexInput">
                <p class="textbox-label">Player ${i}</p>
                <input type="text" class="name-input-field" name="playername-textbox${i}" id="playername-textbox${i}" value=""
                placeholder="Enter a name...">
            </div>
        `);
    }
    nameInputContainer.innerHTML = ` ${output.join('')}`;
    return toggleSubmit();
}

function toggleSubmit() {
    //show or hide submit buton
    let textFields = document.querySelectorAll(".name-input-field");
    if (textFields.length > 0) {
        submitButton.style.display = "inline";
        resetButton.style.display = "inline";
    } else {
        submitButton.style.display = "none";
    }
    return textFields;
}

function addPlayer(data) {
    data.forEach(d => {
        players.push({
            id: d[0],
            playername: d[1],
            gotRaces: [],
            displayData: function (c) {
                let choiceText = c > 1 ? ' Choose One: <br>' : ' Plays as ';
                let showRaces = "";

                if (this.gotRaces.length == 0) {
                    showRaces = "Not a single race to be assigned";
                } else if (c == 2) {
                    showRaces = this.gotRaces.join('<b> or </b>');
                } else {
                    showRaces = this.gotRaces[0];
                }
                let output = /*html*/ `
                        <p class="player-header"><span class="output-id">Player ${this.id + 1} - ${this.playername} </span></p>
                        <div class="detes-container"><span style="font-size: 12px;">${choiceText}</span><span class="player-details">${showRaces}</span></div>
                    `;
                return output;
            },
            getRace: function (races) {
                for (let i = races.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [races[i], races[j]] = [races[j], races[i]];
                }
                let racePick = races.splice(0, 1);
                if (racePick.length == 0) {
                    this.gotRaces.push('No Available Race. Sad!');
                } else {
                    this.gotRaces.push(racePick[0]);
                }
            }
        });
    });
    return players;
}

//Calls getRace method for each player, repeat once (in order to get  races per player)
function doleOut(races) {
    let pl = players;
    for (let i = 0; i < 2; i++) {
        pl.forEach(p => {
            p.getRace(races);
        });
    }
}

function displays() {
    //concats the player displayData() output from each player object and pushes to DOM
    const choiceCount = document.querySelector('#choice-counter').value;
    let pl = players;
    let outText = [];

    pl.forEach(p => {
        outText.push(p.displayData(choiceCount));
    });

    raceDisplay.style.background = "rgb(255, 255, 255)";
    raceDisplay.style.textAlign = "center";
    raceDisplay.innerHTML = outText.join('<br>');
    raceDisplay.style.display = 'block';
    //move player data to storage session data gets cleared

    localStorage.setItem('pastResults', JSON.stringify(players));
    clearInputs(choiceCount);
}

function getResultHeight() {
    // just used to fix some styling depending on height (due to scroll bar making it look shitty)
    let resultY = raceDisplay.clientHeight;

    if (parseInt(resultY) >= 350) {
        raceDisplay.style.borderTopRightRadius = '3px';
        raceDisplay.style.borderBottomRightRadius = '3px';
    }
    return resultY;
}

function clearInputs(cCount) {
    const nameInputs = document.querySelectorAll('.name-input-field');
    const inputColumn = document.querySelector('.setting-inputs');
    const gridContainer = document.querySelector('.grid-container');

    raceList.length = 0;
    playerNames.length = 0;
    playerCounter.value = 0;
    cCount = 0;

    document.querySelector('#choice-counter').value = cCount;

    nameInputs.forEach(n => {
        n.value = "";
        n.disabled = true;
        n.style.border = '1px solid rgba(40, 44, 48, 0.377)';
    });
    submitButton.disabled = true;
    resetButton.style.border = "1px solid rgba(255, 255, 255, 0.7)";
    resetButton.style.color = "rgba(255, 255, 255, 0.7)";

    //hide inputs section after everythings been cleand up
    inputColumn.style.display = 'none';
    gridContainer.style.gridTemplateColumns = "1fr";
}

(function createGreeting() {
    //creates the greeting display that shows in the Race Assignments section after the dispense button's been clicked
    const resultHeader = document.querySelector('.display-header-controls');
    const welcomeModal = document.querySelector('.welcome-modal');
    const greetMessage = /*html*/ `
        <h6>Welcome to the Randomeister</h6>
        <p class="greeting-text" id="greet-text1" >
            Select the races to include in the race draw to the left.
            Under that, select the number of players to draw races for, and if they should have a choice between two races
            <br><br>
            Enter the player names in the textboxes that appear in order for them to be included. Any textboxes not
            completed will be ignored by the program.

            Finally, click "Dispense" and take in the awesome power of automated race randomization!
            <br><br>
            fin</p>
            <p class="welcome-footer">(click me to proceed)</p>
    `;
    resultHeader.style.display = "none";
    raceDisplay.style.display = "block";
    raceDisplay.style.background = "rgba(250, 250, 250, 1)";
    raceDisplay.style.textAlign = "left";
    welcomeModal.innerHTML = greetMessage;
})();