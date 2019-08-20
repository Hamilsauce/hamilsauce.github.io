    



const raceDisplay = document.getElementById('texter');

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
}

function showRaces(lister) {
    const raceDisplay = document.getElementById('texter');
    let i = 0;
    let newList = [];
    lister.forEach(race => {
        newList[i] = race + '';
        i++;
    });

    raceDisplay.innerHTML = newList.join('</br>');

 console.log(raceDisplay.innerHTML);
 return raceDisplay.innerHTML;
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