    const bottomContainer = document.querySelector('.bottom-container');
    const playerCounter = document.querySelector('#player-counter');
    const raceListCard = document.querySelector('.setting-inputs');
    const resultListContainer = document.querySelector('.results-container');
    const nameInputContainer = document.querySelector('.player-details-container');
    const raceDisplay = document.getElementById('result-list');

    let counter = playerCounter.addEventListener('change', () => {
        let playerCount = parseInt(playerCounter.value);
        return addInputs(playerCount);
    });


function getRaces(frm) {
    //iterate over checklist of races, snag the checked ones, note that for loop is preferable to forEach here because need to reference index of each checklist item/race
    const raceChecks = frm.getElementsByClassName('raceBox');
    let selectBoxes = [];

    for (let i = 0; i < raceChecks.length; i++) {
        if (raceChecks[i].type == 'checkbox' && raceChecks[i].checked == true) {
            selectBoxes.push(raceChecks[i].value);
        }
    }
   showRaces(selectBoxes);
}

function showRaces(raceList) {
// join the array of races + br tags creates in getRaces into single string, write it to appropriate html element. Then update resultContainer to display.
    const raceDisplay = document.getElementById('result-list');
    // raceListCard.style.display="none";

    raceDisplay.innerHTML = raceList.join('</br>');
    resultListContainer.style.display = "block";

}



function addInputs(count) {
    /*for each player, 1) add text input html to output array, each with player ID label/Id/Name/selectors incremented accordingly.
        Then 2) join the array elems and write it to the inner html of the 'player-details-container' div */
    const output = [];

    for (let i = 1; i <= count; i++) {
        output.push(`
            <label for="playername-textbox${i}">Player ${i} 
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