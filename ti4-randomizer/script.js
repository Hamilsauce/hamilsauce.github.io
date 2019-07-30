    
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

