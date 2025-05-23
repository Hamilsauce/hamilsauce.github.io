PK   ��P            
   clock.htmlconst setTime = () => {
  const secOut = document.querySelector('.timeOut')
  const minOut = document.querySelector('.minsText')
  // const hourOut = document.querySelector('.hourText')
  const secHand = document.querySelector('.second-hand')
  const minHand = document.querySelector('.minute-hand')
  const hourHand = document.querySelector('.hour-hand')

  const initPosition = 90;
  let now = new Date();

  let seconds = now.getSeconds();
  let secDegrees = ((seconds / 60) * 360) + initPosition;
  if (seconds === 0) {
    secHand.style.transition = '0s'
    // secHand.style.transform = `rotate(${secDegrees}deg)`
    secHand.style.transform = `rotate(${secDegrees}deg)`
  } else if (seconds >= 1) {
    secHand.style.transition = '1s'
  }
  secHand.style.transform = `rotate(${secDegrees}deg)`

  let minutes = now.getMinutes();
  let minDegrees = ((minutes / 60) * 360) + initPosition;
  if (minutes === 0) {
    minHand.style.transition = '0s'
    // minHand.style.transform = `rotate(${secDegrees}deg)`
    minHand.style.transform = `rotate(${minDegrees}deg)`
  } else if (minutes >= 1) {
    minHand.style.transition = '1s'
  }
  minHand.style.transform = `rotate(${minDegrees}deg)`

  let hours = now.getHours();
  let hoursDegrees = ((hours / 12) * 360) + initPosition;
  if (hours === 0) {
    hourHand.style.transition = '0s'
    // hourHand.style.transform = `rotate(${secDegrees}deg)`
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`
  } else if (hours >= 1) {
    hourHand.style.transition = '1s'
  }
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`
}

const setDigital = () => {
  const secOut = document.querySelector('.secText')
  const minOut = document.querySelector('.minute-digit')
  const hourOut = document.querySelector('.hourText')

  let now = new Date();

  let seconds = now.getSeconds();
  secOut.textContent = seconds

  let hours = now.getHours();
  hourOut.textContent = hours

  let minutes = now.getMinutes();
  minOut.textContent = minutes;

  console.log(seconds);
}
setInterval(() =