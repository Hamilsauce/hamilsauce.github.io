process.stdin.resume();
process.stdin.setEncoding('ascii');

//Global vars (u='ser ins)
var input = "";
var inArray = "";
var currLine = 0;

process.stdin.on('data', function (data) {
  input += data;

});

process.stdin.on('end', function () {
  inArray = input.split("\n");
  
  main();
});

//start
function main() {
	const countMoves = inArray[1].length;
	const lineCount = inArray[0];
	const seriesString = inArray[1];
	
	let splitSeries= 
		getSeries(
			seriesString, 
			inArray[1].length
		);
		
	let results = evalRPS(splitSeries);
	for(let i = 0; i < (countMoves / 2); i++){
		
		console.log(results[i]);
	}
	return;
}

function getSeries(games, count) {
	let j = 0;
	let pair = [];
	
	for(let i = 0; i < count; i = i + 2) {
		pair[j] = games.slice(i, i + 2);
		j++;
	}
	let splitPairs = splitElements(pair);
	return splitPairs;
}

function splitElements(targetArr) {
	let nestSplit = [];
	let newCt = targetArr.length;
	
	for(let i = 0; i < newCt; i++) {
		nestSplit[i] = targetArr[i].split('');
		
		if (nestSplit[i].length !== 2){
			nestSplit[i] = 'Bad Input';
		}
	}
	return nestSplit;
}

function evalRPS(games) {
	const gameCt = games.length;
	let winners = [];
	let userAct = '';
	let cpuAct = '';
	
	for(let i = 0; i < gameCt; i++) {
		cpuAct = games[i][0];
		userAct = games[i][1];
		
		//validation
		if ((userAct < 'P' || userAct > 'S') || (cpuAct < 'P' || cpuAct > 'S')) {
			winners[i] = 'Bad Input'; 
		} else if (userAct == 'Q' || cpuAct == 'Q'){
			winners[i] = 'Bad Input';
		//start game eval
		} else if (userAct == cpuAct){
			winners[i] = 'Draw';
		} else {
			switch (userAct) {
				case 'R':
					if (cpuAct == 'P'){
						winners[i] = 'Dcoder';
					} else {
						winners[i] = 'You';
					}
					break;
				case 'S':
					if (cpuAct == 'R'){
						winners[i] = 'Dcoder';
					} else {
						winners[i] = 'You';
					}
					break;
				case 'P':
						if (cpuAct == 'S'){
						winners[i] = 'Dcoder';
					} else {
						winners[i] = 'You';
					}
					break;
				default:
					winners[i] = 'THE FUCK YOU INPUT?';
			}
		}
	}
	return winners;
}

