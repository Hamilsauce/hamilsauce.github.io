// var h1 = document.getElementsByTagName('h2')[0],
//   start = document.getElementById('start'),
//   stop = document.getElementById('stop'),
//   clear = document.getElementById('clear'),
//   seconds = 0,
//   minutes = 0,
//   hours = 0,
//   t;

// function add() {
//   seconds++;
//   if (seconds >= 60) {
//     seconds = 0;
//     minutes++;
//     if (minutes >= 60) {
//       minutes = 0;
//       hours++;
//     }
//   }

//   h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

//   timer();
// }

// function timer() {
//   t = setTimeout(add, 1000);
// }
// timer();


// /* Start button */
// start.onclick = timer;

// /* Stop button */
// stop.onclick = function() {
//   clearTimeout(t);
// }

// /* Clear button */
// clear.onclick = function() {
//   h1.textContent = "00:00:00";
//   seconds = 0;
//   minutes = 0;
//   hours = 0;
// }

export class GameClock {
  constructor() {
    this.seconds = 0,
    this.minutes = 0,
    this.display = []
    this.finalTime = '';
    this.isRunning = false
    this.timeFunction = {}
  }
    timer(){
     this.timeFunction =  setTimeout(() => {
        this.addSec();
        this.showTime(this.display);
      }, 1000);

    }

  addSec(){
    this.seconds++;
    console.log('addsec');
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++ ;
    }
  }
  showTime(el){
    let timeDisplay =
    `0${this.minutes}:${this.seconds <= 9 ? '0' + this.seconds : this.seconds}`;
    el.textContent = timeDisplay;
    console.log(timeDisplay);

    this.timer();
  }
  start(el) {
    this.display = el;
    console.log(this.display);
    this.isRunning = true;
    this.timer();


  }
  stop() {
    console.log('in stop');
    this.finalTime = this.display.textContent;
    this.display.textContent = '0:00';
    clearTimeout(this.timeFunction);
    this.isRunning = false;
    this.seconds = 0;
    this.minutes = 0;
  }
}

{GameClock}