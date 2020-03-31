export class HistoryTable {
    constructor(gameHistoryData) { //TODO figure out params
        this.gameHistoryData = gameHistoryData
    }
    cleanData(data) {
        //...
    }
    createRecords() {
        //...
    }
    generateHTML() {
        //@ Possible Better idea than below?!? - Create new objects for each game, have the objects write their own HTML and store it
        //@ internally; use an API to access the HTML, simplifying the rendering, reducing extra arrays

        //* Write code that creates and stores table HTML for each game, complete with dynamic references for each row
        //* Every game object's markup will get stored in an array
        //* Using a render function, loop through array, adding to/inserting/embedding into on-page html Table
    }
    //@  Sample of table row mark up
    //*   <tr class="trow" data-player="">
    //*     <td>1/25/2019</td>
    //*     <td>Buttguy</td>
    //*     <td>3</td>
    //*     <td>14</td>
    //*     <td>24s</td>
    //*   </tr>


    renderTable() {
        //...
    }
}

const getGameData = () => {
    let gameData = [];
    fetch('../memoryGameHistory.json')
        .then(res => res.json())
        .then(res => {
            gameData = res.gameHistory;
            // console.log(Object.entries(gameData));

            let games = Object.values(gameData)
                .map(game => {

                    console.log(game);  //! FUCKED

                }).filter(([key, val]) => {
                    if (key != 'id' || 'playerName' || 'elapsedTime' || 'stars' || 'playerTurns') {
                        return `${key}: ${val}`
                    }
                })

                // return Object.entries(gameData);
//

            console.log(games[8]);
        });
    return gameData
}

console.log(getGameData())

export const initiateGameTable = historyData => {
    const gameTable = new HistoryTable(historyData);
    gameTable.cleanData(historyData);
}

{
    initiateGameTable
} {
    HistoryTable
}