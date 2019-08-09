    
const bottomContainer = document.querySelector('.bottom-container');
const playerCounter = document.querySelector('#player-counter');
const raceListCard = document.querySelector('.setting-inputs');
const resultListContainer = document.querySelector('.results-container');

const raceDisplay = document.getElementById('result-list');

let counter = playerCounter.addEventListener('change',() => {
    let playerCount = parseInt(playerCounter.value); 
    return addInputs(playerCount);
});


function getRaces(frm) {
    const raceChecks = frm.getElementsByClassName('raceBox');
    console.log(raceChecks);
    let selectBoxes = [];

    for (let i = 0; i < raceChecks.length; i++) {
       if (raceChecks[i].type == 'checkbox' && raceChecks[i].checked == true) {
           selectBoxes.push(raceChecks[i].value)
       }
        // console.log(selectBoxes);
    }
    console.log(selectBoxes);
    console.log(showRaces(selectBoxes));

    resultListContainer.style.display="block";
    
}   

function showRaces(lister) {
    const raceDisplay = document.getElementById('result-list');
    let i = 0;
    let newList = [];
    lister.forEach(race => {
        newList[i] = race + '';
        i++;
    });
    // raceListCard.style.display="none";
    
    raceDisplay.innerHTML = newList.join('</br>');
  
 console.log(raceDisplay.innerHTML);
 return raceDisplay.innerHTML;
}

const nameInputContainer = document.querySelector('.player-details-container');
function addInputs (count) {
//for each player, add text input html to output array, each with player ID label/Id/Name/selectors incremented accordingly.
//Then join the array elems and write it to the inner html of the 'player-details-container' div
    
    const output = [];
    
    for (let i = 1; i <= count; i++) {
        output.push(`
            <label for="playername-textbox1">Player ${i} 
                <input type="text" class="name-input-field" name="playername-textbox${i}" id="playername-textbox${i}" value="" 
                    placeholder="Enter a name...">
            </label><br>         
        `);
        
    }
    nameInputContainer.innerHTML = output.join('');
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