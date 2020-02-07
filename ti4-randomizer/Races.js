export class Race {
    constructor(name,selectionRecord) {
        this.name = name,
        this.selectionRecord = selectionRecord || [],
        this.selectionCount = this.currentCount() || 0
    }
    handleSelected(player) {
        let newSelection = {
            countId:  ++this.selectionCount,
            playerName: player,
            selectionDate: new Date().toDateString()
        }
        this.selectionRecord.push(newSelection);
    }
    currentCount() {
        this.selectionRecord.sort((a, b) => {
            let first = a.countId;
            let second = b.countId;
            if (first == second) {
                return 0
            } else if (first < second) {
                return -1
            } else {
                return 1
            }
        });

        let highestCount = this.selectionRecord[this.selectionRecord.length - 1].countId;
        return highestCount;
    }
    storeData() {
        return {
            name: this.name,
            selectionRecord: this.selectionRecord
        }
    }
}


let baseRaceList = [
    "Arborec",
    "Barony of Letnev",
    "Clan of Saar",
    "Embers of Muaat",
    "Emirates of Hacan",
    "Federation of Sol",
    "Ghosts of Creuss",
    "L1Z1X Mindnet",
    "Mentak Coalition",
    "Naalu Collective",
    "Nekro Virus",
    "Sardakk N'Orr",
    "Universities of Jol-Nar",
    "Winnu",
    "Xxcha Kingdom",
    "Yin Brotherhood",
    "Yssaril Tribes"
];
console.log(races);


export const createRace = () => {
    let retrievedRaces = [];
    let storedRaces = JSON.parse(localStorage.getItem('galacticCouncil')) || {};
    storedRaces.forEach(race => {
        let raceName = race.name
        let history = race.selectionRecord;
        let newRace = new Race(raceName, history);
        retrievedRaces.push(newRace);
    })
    return retrievedRaces;
};

export const storeRaces = (races) => {
    let bundledRaces = [];
    races.forEach(race => {
        bundledRaces.push(race.storeData())
    });
    localStorage.setItem('galacticCouncil', JSON.stringify(bundledRaces));
}

{Race, createRace, storeRaces}