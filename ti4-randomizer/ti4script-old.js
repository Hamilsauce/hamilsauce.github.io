const bottomContainer = document.querySelector('.bottom-container');
const playerCounter = document.querySelector('#player-counter');
const raceListCard = document.querySelector('.setting-inputs');
const resultListContainer = document.querySelector('.results-container');
const nameInputContainer = document.querySelector('.player-details-container');
const raceDisplay = document.getElementById('result-list');
const submitButton = document.querySelector('#submit-btn');
const inputForm = document.querySelector('form');

let textBoxes;
let playerNames = [];
let players = [];
//Changes name textboxes displayed when player counter changes, returns the textbox form elements
let nameBoxes = playerCounter.addEventListener('change', () => {
   
    let playerCount = parseInt(playerCounter.value);
    console.log(playerNames);
    console.log(inputForm);
    console.log(addInputs(playerCount));
    return addInputs(playerCount);
});

//function is run everytime a user deselects a text input - adds text content to playername list
function getPlayerNames(boxes){
let box = document.querySelector(boxes);

  console.log(boxes);

        let input = box.value;
console.log(input);
        if (input != "") {
            playerNames.push(input);
        }

    console.log(playerNames);

}



// need to get this to re-read textboxes automatically when changed and add to names
// inputForm.addEventListener('change', () => {
//     let playerNames = [];
//     console.log(namies);
//     let namies = document.querySelectorAll('.name-input-field');
//   console.log(namies.length);
//   namies.forEach(box => {
//         let name = box.value;

//         if (name != "" ) {
//             playerNames.push(name);
//         }
//     });
//     return console.log(playerNames);
//     }
// );

//on submit button, dole races and display
submitButton.addEventListener('click', () => {
  let raceList = getRaceList();
    getPlayerData(playerNames, raceList);
    doleOut(raceList);
    displays();
});

function getRaceList(frm) {
    //iterate over checklist of races, snag the checked ones, note that for loop is preferable to forEach here because need to reference index of each checklist item/race
    const raceChecks = document.getElementsByClassName('raceBox');
    let selectBoxes = [];

    for (let i = 0; i < raceChecks.length; i++) {
        if (raceChecks[i].type == 'checkbox' && raceChecks[i].checked == true) {
            selectBoxes.push(raceChecks[i].value);
        }
    }
  return selectBoxes;
}



function addInputs(count) {
    /*for each player (according to counter selection), 1) add text input html to output array, each with player ID label/Id/Name/selectors incremented accordingly.
        Then 2) join the array elems and write it to the inner html of the 'player-details-container' div */
    const output = [];

    for (let i = 1; i <= count; i++) {
        output.push(`
            <label for="playername-textbox${i}">Player ${i} 
                <input type="text" class="name-input-field" name="playername-textbox${i}" id="playername-textbox${i}" value="" 
                    placeholder="Enter a name..." onblur="getPlayerNames('#playername-textbox${i}')">
            </label>    
        `);
    }
    nameInputContainer.innerHTML = output.join('');
    
    //show or hide subit buton  
    let textFields = document.querySelectorAll(".name-input-field");

    if (textFields.length > 0) { 
        submitButton.style.display="inline";
    } else {
        submitButton.style.display="none";
    }

   
     return textFields;
}

function getPlayerData(names, races) {
    let i = 1;
    let rOuts = [];

    names.forEach(name => {
        players.push({
            playername: name,
            id: i,
            gotRaces: [],
            displayData: function () {
                let Output = '';
                output =
                    this.playername +
                    ' - ' +
                    this.gotRaces[0];
                console.log(output);
                return output;
            },
            getRace: function (races) {
                for (let i = races.length - 1; i > 0; i--) {
                    let j =
                        Math.floor(Math.random() * (i + 1)); // random index from 0 to i
                        [races[i], races[j]] = [races[j], races[i]]; // swap elements 
                }
                this.gotRaces.push(races[0]);

                rOuts[0] = races.splice(0, 1);
                rOuts[1] = races;
            }
        });
        i++;
    });
    return players;
}
//This wpuld be trigggerd by submit button click
function doleOut(races) {
    let pl = players;
    for (let i = 0; i < 2; i++) {
        pl.forEach(p => {
            p.getRace(races);
        });
    }; 
}

function displays() {
    let pl = players;
    let outText = [];
    pl.forEach(p => {
       outText.push(p.displayData());
       

    });
    raceDisplay.innerHTML = outText.join('</br>');
    resultListContainer.style.display = "block";

}


function showRaces(raceList) {
// join the array of races + br tags creates in getRaces into single string, write it to appropriate html element. Then update resultContainer to display.
 
    // raceListCard.style.display="none";

    raceDisplay.innerHTML = raceList.join('</br>');
    resultListContainer.style.display = "block";

}


/*
---constructs html elements with values derived from object props
function buildQuiz() {
    const output = [];

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            const answers = [];
            
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter}:
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
    );
    quizContainer.innerHTML = output.join('');
}

*/