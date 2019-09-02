const playerCounter = document.querySelector('#player-counter');
const nameInputContainer = document.querySelector('.player-details-container');
const raceDisplay = document.getElementById('result-list');
const submitButton = document.querySelector('#submit-btn');
const resetButton = document.querySelector('#reset-btn');
const selectAllButton = document.querySelector('#select-btn');
const clearButton = document.querySelector('#clear-btn');
const raceChecks = document.querySelectorAll('.raceBox');



let playerNames = [];
let players = [];
let raceList = [];

// window.onload(event => {
// getRaceList()
// });

//Event Listeners
playerCounter.addEventListener('change', () => {
    //Changes name textboxes displayed when player counter changes, returns the textbox form elements 
    const resultHeader = document.querySelector('.display-header-controls');
    let playerCount = parseInt(playerCounter.value);

    if (playerCount >= 1) {
        resultHeader.style.display = "flex";
    };
    return addInputs(playerCount);

});

submitButton.addEventListener('click', () => {
    //on submit button, dole races and display 
    let nameArr = filterNames(playerNames);
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


//function is run everytime a user deselects a text input - adds text content to playername list 
function getPlayerData(activeTextbox) {
    const box = document.querySelector(activeTextbox);
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
    return playerNames;
}

//iterate over checklist of races, snag the checked ones, note that for loop is preferable to forEach here because need to reference index of each checklist item/race 
function getRaceList() {
    let selectBoxes = [];

    for (let i = 0; i < raceChecks.length; i++) {
        if (raceChecks[i].type == 'checkbox' && raceChecks[i].checked == true) {
            selectBoxes.push(raceChecks[i].value);
        }
    }
    console.log(selectBoxes);
    return selectBoxes;
}

//trim trailing spaces from names (split name into array, if a space is found at end, return the new array sans the space, if no trialing space, return original array)
function cleanNames(name) {
    let chars = name.split('');

    if (chars.pop() == " ") {
        return chars.join('');
    } else {
        return name;
    }
}

function filterNames(names) {
    let trimmed = names.filter(n => {
        if ((n != '' && n != ' ')) {
            console.log('passing ' + n);
            return n;
        }
        console.log('filteting thisnel');
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
                placeholder="Enter a name..." onblur="getPlayerData('#playername-textbox${i}')">
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

    }
    return textFields;
}

function addPlayer(data) {
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
                output = /*html*/ `
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
                console.log(racePick[0]);
                
                if (racePick.length == 0) {
                    this.gotRaces.push('No Available Race. Sad!');
                } else {
                    this.gotRaces.push(racePick[0]);
                }
            }
        });
        //i++;
    });
    return players;
}

//Calls getRace method for each player, repeat once (in order to get  races per player)
function doleOut(races) {
    let pl = players;
    for (let i = 0; i < 2; i++) {
        pl.forEach(p => {
            let pick = p.getRace(races);

        });
    }
    console.log(races);
}

//concats the player displayData() output from each player object and pushes to DOM 
function displays() {
    const resultHeader = document.querySelector('.display-header-controls');
    const resultList = document.querySelector('#result-list');
    const choiceCount = document.querySelector('#choice-counter').value;

    let pl = players;
    let outText = [];

    pl.forEach(p => {
        outText.push(p.displayData(choiceCount));
    });

    raceDisplay.style.background = "rgb(255, 255, 255);)";
    raceDisplay.style.textAlign = "center";
    raceDisplay.innerHTML = outText.join('<br>');
    resultList.style.display = "block";

    localStorage.setItem('pastResults', JSON.stringify(players));
    clearInputs();
}



function getResultHeight() {
    let resultY = raceDisplay.clientHeight;

    if (parseInt(resultY) >= 350) {
        raceDisplay.style.borderTopRightRadius = '3px';
        raceDisplay.style.borderBottomRightRadius = '3px';
    }
    return resultY;
}

function clearInputs() {
    const nameInputs = document.querySelectorAll('.name-input-field');
    const inputColumn = document.querySelector('.setting-inputs');
    const gridContainer = document.querySelector('.grid-container');

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
    resetButton.style.border = "1px solid rgba(4, 4, 4, 0.9)";
    resetButton.style.color = "rgba(4, 4, 4, 0.9)";

    //hide inputs section after everythings been cleand up
    inputColumn.style.display = 'none';
    gridContainer.style.gridTemplateColumns = "1fr";
}

(function createGreeting() {
    const resultHeader = document.querySelector('.display-header-controls');
    const greetMessage = /*html*/ `
        <h6>Welcome to the Randomeister</h6>
        <p class="greeting-text" id="greet-text1" >
            Select the races to include in the race draw to the left.
            Under that, select the number of players to draw races for, and if they should have a choice between two races

            Enter the player names in the textboxes that appear in order for them to be included. Any textboxes not 
            completed will be ignored by the program. 
        
            Finally, click "Dispense" and take in the awesome power of automated race randomization!
     
            fin</p>
    `;
    resultHeader.style.display = "none";
    raceDisplay.style.display = "block";
    raceDisplay.style.background = "rgba(244, 244, 244, 0.95)";
    raceDisplay.style.textAlign = "left";
    raceDisplay.innerHTML = greetMessage;


})();

(function modalMan() {
    const modal = document.querySelector('#modal-menu');
    const backdrop = document.querySelector('#modal-backdrop');
    const modalButton = document.querySelector('#modal-button');


    modalButton.addEventListener('click', () => {
        showModal(modal, backdrop);
    });

    backdrop.addEventListener('click', () => {
        backdrop.style.display = "none";
        modal.style.display = "none";
    });


    // (function listenForModal() {


   
    // })();
    function showModal(modal, backdrop) {
        const modalText = document.querySelector('.modal-text');
        let pastPlayers = [];
        let getPast = JSON.parse(localStorage.getItem('pastResults'));
        getPast.forEach(p => {
            console.log(p);
            pastPlayers.push(Object.values(p).join('<br>'));
        });
    
        modalText.innerHTML = pastPlayers.join('<br><br>');
        
        backdrop.style.display = "block";
        modal.style.display = "block";
        
    }
})();

// resetButton.addEventListener('click', () => {
//     document.location.reload(true);
//     });

//     function stashData(pl) {


//     console.log(JSON.stringify(pl));
//     console.log(JSON.parse(localStorage.getItem('pastResults')));
//     };