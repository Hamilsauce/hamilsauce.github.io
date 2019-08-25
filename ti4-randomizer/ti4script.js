const playerCounter = document.querySelector('#player-counter');
const nameInputContainer = document.querySelector('.player-details-container');
const raceDisplay = document.getElementById('result-list');
const submitButton = document.querySelector('#submit-btn');
const resetButton = document.querySelector('#reset-btn');
const selectAllButton = document.querySelector('#select-btn');
const clearButton = document.querySelector('#clear-btn');
//const raceItems = document.querySelectorAll('.raceBox');

let playerNames = [];
let players = [];
let raceList = [];

// window.onload(event => {

// });

playerCounter.addEventListener('change', () => {
    //Changes name textboxes displayed when player counter changes, returns the textbox form elements 
    let playerCount = parseInt(playerCounter.value);
    raceList = getRaceList();
    return addInputs(playerCount);

});

submitButton.addEventListener('click', () => {
    //on submit button, dole races and display 
    let nameArr = trimNames(playerNames);

    addPlayer(nameArr, raceList);
    doleOut(raceList);
    displays();
    getResultHeight();
});

selectAllButton.addEventListener('click', () => {
    const raceItems = document.querySelectorAll('.raceBox');
    raceItems.forEach(r => {
        r.checked = true;
    });
    return;
});

clearButton.addEventListener('click', () => {
    const raceItems = document.querySelectorAll('.raceBox');

    raceItems.forEach(r => {
        r.checked = false;
    });
    return;
});

//function is run everytime a user deselects a text input - adds text content to playername list 
function getPlayerData(activeTextbox) {
    let box = document.querySelector(activeTextbox);
    let [bName, bVal, boxID] = [box.name, box.value, parseInt(box.name.split('').pop()) - 1];

    if (bVal.length === 0 || bVal == ' ') {
        console.log(`${bVal} empty`);
        playerNames[boxID] = '';
        box.style.border = '1px solid rgba(40, 44, 48, 0.377)';
        // console.log(playerNames[boxID].length);    

    } else if (bVal == playerNames[boxID]) {
        console.log(`${bVal} is already in ${bName}`);
        box.style.border = '2px outset  rgba(0, 128, 25, 0.3)';

    } else if (playerNames.length > 6) {
        alert("Already Got enough players. Click Reset to start over.");
    } else {
        box.style.color = "rgb(100, 100, 100)";
        box.style.border = '2px outset  rgba(0, 128, 25, 0.3)';

        playerNames[boxID] = [boxID, cleanNames(bVal)];
    }
    return playerNames;
}


function trimNames(names) {
    let trimmed = names.filter(n => {
        if ((n != '' && n != ' ')) {
            console.log('passing ' + n);
            return n;
        }
        console.log('filteting thisnel');
    });
    return trimmed;
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
                placeholder="Enter a name..." onblur="getPlayerData('#playername-textbox${i}')">
            </div>
        `);
    }
    nameInputContainer.innerHTML = ` ${output.join('')}`;
    // nameInputContainer.style.display = 'block';
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
        // resetButton.style.display = "none";
    }
    return textFields;
}

function addPlayer(data, races) {
    //for each name in array, add a new player object to array
    let i = 1;
    data.forEach(d => {
        players.push({
            playername: d[1],
            id: d[0],
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
                let Output = '';
                output =
                    `<p class="player-header"><span class="output-id">Player ${this.id + 1} - ${this.playername} </span></p>
                    <div class="detes-container"><span style="font-size: 12px;">${choiceText}</span><span class="player-details">${showRaces}</span></div>`;
                return output;
            },
            //randomize/shuffle race array and select first element, then remove that from array 
            getRace: function (races) {
                for (let i = races.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [races[i], races[j]] = [races[j], races[i]];
                }
                this.gotRaces.push(races.splice(0, 1));
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
    const choiceCount = document.querySelector('#choice-counter').value;

    let pl = players;
    let outText = [];

    pl.forEach(p => {
        outText.push(p.displayData(choiceCount));
    });

    raceDisplay.innerHTML = outText.join('<br>');
    resultList.style.display = "block";
    clearInputs();
}

// Need to clear players objects, races array, clean out the result list HTML, 
// Hide buttons, and clear names in textboxes.

//When reset button is pressed, fire off page reload
resetButton.addEventListener('click', () => {
    document.location.reload(true);
});

function getResultHeight() {
    let resultY = raceDisplay.clientHeight;

    if (parseInt(resultY) >= 350) {
        raceDisplay.style.borderTopRightRadius = '3px';
        raceDisplay.style.borderBottomRightRadius = '3px';
    }
    return resultY;
}

function cleanNames(name) {
    let chars = name.split('');
    let trailer = name.split('').pop();

    if (chars.pop() == " ") {
        return chars.join('');
    } else {
        return name;
    }
}

function clearInputs() {
    const nameInputs = document.querySelectorAll('.name-input-field');
    const inputColumn = document.querySelector('.setting-inputs');
    const gridContainer = document.querySelector('.grid-container');

    let remainingRaces = raceList;

    raceList.length = 0;
    playerNames.length = 0;
    playerCounter.value = 0;
    choiceCount = 0;
    document.querySelector('#choice-counter').value = choiceCount;

    nameInputs.forEach(n => {
        n.value = "";
        n.disabled = true;
        n.style.border = '1px solid rgba(40, 44, 48, 0.377)';
    });
    submitButton.disabled = true;
    resetButton.style.border = "1px solid  rgba(224, 224, 224, 0.9)";
    resetButton.style.color = "rgba(224, 224, 224, 0.9)";

    //hide inputs section after everythings been cleand up
    inputColumn.style.display = 'none';
    gridContainer.style.gridTemplateColumns = "1fr";
    // ;


}