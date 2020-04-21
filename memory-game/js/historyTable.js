/* export class HistoryTable {
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
// let colNames = ['elapsedTime', 'gameDate', 'playerName', 'playerTurns', 'stars']
const getGameData = () => {
  let gameData = [];
  fetch('../memoryGameHistory.json')
    .then(res => res.json())
    .then(res => {
      gameData = res.gameHistory;

      let games = Object.values(gameData);
      console.log(games)
      buildTable(games);


    })
} */


export const getStoredHistory = () => {
let history = JSON.parse(sessionStorage.getItem('gameHistory'));
  let games = Object.values(history);
  buildTable(games);
}

const buildTable = (games) => {
  let tableBody = document.querySelector('.tableBody');
  let gameRows = games
    .map(game => {
      let row = buildRow(game);
      return row;
    })
    .reduce((acc, curr) => {
      return acc += curr;
    }, '');

  tableBody.innerHTML = gameRows;
}
const buildRow = (game) => {
  let cleanDate = new Date(game.gameDate).toLocaleDateString();
  return /*html*/ `
    <tr class="table-row" data-rowId=${game.id}>
      <td class="table-cell date-cell">${cleanDate}</td>
      <td class="table-cell name-cell">${game.playerName}</td>
      <td class="table-cell stars-cell">${game.stars}</td>
      <td class="table-cell turns-cell">${game.playerTurns}</td>
      <td class="table-cell time-cell">${game.elapsedTime}</td>
    </tr>`
}


{
  getStoredHistory
}