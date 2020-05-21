export class GameClock {
  constructor() {
    this.seconds = 0,
    this.minutes = 0,
    this.display = []
    this.finalTime = '';
    this.isRunning = false
    this.timeFunction = {}
  }
  timer() {
    this.timeFunction = setTimeout(() => {
      this.addSec();
      this.showTime(this.display);
    }, 1000);
  }
  addSec() {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
    }
  }
  showTime(el) {
    let timeDisplay =
      `0${this.minutes}:${this.seconds <= 9 ? '0' + this.seconds : this.seconds}`;
    el.textContent = timeDisplay;

    this.timer();
  }
  start(el) {
    this.display = el;
    // console.log(this.display);
    this.isRunning = true;
    this.timer();
  }
  stop() {
    this.finalTime = this.display.textContent;
    this.display.textContent = '0:00';
    clearTimeout(this.timeFunction);
    this.isRunning = false;
    this.seconds = 0;
    this.minutes = 0;
  }
}

{GameClock}