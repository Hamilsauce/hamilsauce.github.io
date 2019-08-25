const names = ['Lew', 'Gert', 'Mildred', 'Jon', 'Tom'];


const players = [

    {
        playername: "jed",
        id: 0,
        exclusionList: [
            "Muaat",
            "Sol"
        ],
        selectedRace: "Hacan"
    }
];

function getPlayerData(pArr, n) {
    let i = 1;

    n.forEach(e => {
        pArr.push({
            playername: e,
            id: i
        });
        i++;
    });
    console.log(players);
}
getPlayerData(players, names);
/*

let str = 'bob';
console.log(player1);
function getName(p, s) {
p.playername = s;
return player1;
}
let newName = getName(player1, 'bobby');
console.log(player1.playername);
console.log(newName);
*/

