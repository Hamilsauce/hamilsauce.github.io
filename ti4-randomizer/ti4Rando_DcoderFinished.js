const names = ['Jack', 'Pat', 'Steve', 'Chris', 'Jake', 'Charles'];

let players = [];
let raceList = [
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


getPlayerData(names, raceList);
doleOut(raceList);
displays();
console.log(players);

function getPlayerData(n, array) {
    let i = 1;
    let rOuts = [];

    n.forEach(e => {
        players.push({
            playername: e,
            id: i,
            gotRaces: [],
            displayData: function () {
                let Output = '';
                output =
                    this.playername +
                    ' - ' +
                    this.gotRaces[0];
                console.log(output);
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
    pl.forEach(p => {
        p.displayData();

    });
}

