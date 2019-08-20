const names = ['Lew', 'Gert', 'Mildred', 'Jon', 'Tom'];
let raceList = [];

function reset(arr) {
    //reset or restore the races array 
    arr = [
        "Arborec",
        "Embers of Muaat",
        "Ghosts of Creuss",
        "Naalu Collective",
        "Universities of Jol-Nar",
        "Yin Brotherhood",
        "Barony of Letnev",
        "Emirates of Hacan",
        "L1Z1X Mindnet",
        "Nekro Virus",
        "Winnu",
        "Yssaril Tribes",
        "Clan of Saar",
        "Federation of Sol",
        "Mentak Coalition",
        "Sardakk N’orr",
        "Xxcha Kingdom"
    ];
    return arr;
}


const players = [

    {
        playername: "jed",
        id: 0,
        exclusionList: [
            "Muaat",
            "Sol"
        ],
        selectedRace: '1',
        getRace: function (races) {

            for (let i = races.length - 1; i > 0; i--) {
                let j =
                    Math.floor(Math.random() * (i + 1)); // random index from 0 to i
                [races[i], races[j]] = [races[j], races[i]]; // swap elements 
            }
            let returnVals = [];
            let racePick = races.splice(0, 1);
            //this.selectedRace = racePick;
            returnVals[0] = racePick; //
            returnVals[1] = races;
            //selectedRace = racePick;
            return returnVals;

        }
    }
];
console.log(getPlayerData(players, names, raceList));
doleOut(players,raceList);
// doleOut(players, raceList);
function test(races) {

    players[0].selectedRace = players[0].getRace(races);


}



function getPlayerData(p, n, array) {
    let i = 1;
    //let races = reset(array);
    let rOuts = [];
    let poo = '';
    n.forEach(e => {

        p.push({
            playername: e,
            id: i,
            gotRaces: [],
            displayData: function () {
                let Output = '';
                output =
                    this.playername +
                    this.gotRaces[0];
                //console.log(output);
            },
            assignRace: function (races) {

                for (let i = races.length - 1; i > 0; i--) {
                    let j =
                        Math.floor(Math.random() * (i + 1)); // random index from 0 to i
                    [races[i], races[j]] = [races[j], races[i]]; // swap elements 
                }
                
                rOuts[0] = races.splice(0, 1);
                rOuts[1] = races;
                //selectedRace = racePick;

            }
        });
        i++;
    });
    console.log(rOuts);
   // console.log(this.gotRaces.push(races[0]));
    doleOut(p)
    return rOuts;
}

//This wpuld be trigggerd by submit button click
function doleOut(pl, ra) {
    let races = ra;
    for (let i = 0; i < 2; i++) {
        pl.forEach(p => {
            p.assignRace(races);
            p.displayData;
        });
    }

    displays(players);
    return
}

function displays() {
    let pl = players
    pl[4].displayData();
    //console.log(players[4].selectedRace);

}


//console.log(x);
function getRandRace(races) {

    for (let i = races.length - 1; i > 0; i--) {
        let j =
            Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [races[i], races[j]] = [races[j], races[i]]; // swap elements
    }
    // console.log(j);
    let raceOuts = [];
    let racePick = races.splice(0, 1);
    //this.selectedRace = racePick;
    raceOuts[0] = racePick; //
    raceOuts[1] = races;
    //selectedRace = racePick;
    return raceOuts;
}
