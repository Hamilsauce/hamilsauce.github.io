<<<<<<< HEAD
import {
    fullUrlList,
    musicFileList
} from "https://hamilsauce.github.io/audio/trackListModule.js";
// import * as modularMan from "./modal-component.js";
console.log(fullUrlList);
var audioPlayer = document.getElementById('audio-player');

const trackMenu = document.querySelector('.song-menu');
const source = document.querySelector('.source');
let optionValue = '';
let optionText = '';
window.onload = function () {
    var play = document.getElementById('play');
    var pause = document.getElementById('pause');
    var stop = document.getElementById('stop');

    /* list builder */
    const lister = list => {
        const rootAddress = 'https://hamilsauce.github.io/';
        let listArr = list.map(item => {
            let splitter = item.split('/')[1];

                return `<option class="song-option" id="${splitter}" value="${rootAddress}${item}">${splitter}</option>
                `
            })
            .reduce((itemOut, acc) => {
                return acc += itemOut;
            }, '');
        console.log(listArr);
        return listArr;
    }
    /* end list builder */



    const htmlOut = htmlString => {
        document.querySelector('.song-menu').innerHTML = htmlString;
    }

    htmlOut(lister(musicFileList));

    const playTime = () => {
        let time = Math.round(audioPlayer.currentTime);
        let curr = `<span class="audioTimeText">${time}s</span> `;
        return curr;
    }

    function playAudio() {
        let songUrl = source.getAttribute('src');
        let songName = songUrl.split('/').pop();
        document.querySelector('.showTime').innerHTML = songName;

        audioPlayer.play();
    }


    function pauseAudio() {
        audioPlayer.pause();
        document.querySelector('.showTime').innerHTML = playTime();
    }

    const stopAudio = () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        document.querySelector('.showTime').innerHTML = playTime();

    }

    play.onclick = playAudio;
    pause.onclick = pauseAudio;
    stop.onclick = stopAudio;


    }



  trackMenu.addEventListener('change', () => {
      // let userChoice = trackMenu.textContent;
      // console.log(userChoice);
      changeTrack();
      audioPlayer.play();

;  });


  function changeTrack() {
      // let userChoice = trackMenu.value;

      let audioSrc = source.getAttribute('src');
    optionValue = trackMenu.options[trackMenu.selectedIndex].value;
      optionText = trackMenu.options[trackMenu.selectedIndex].text;

      source.setAttribute('src', optionValue)


  }


//   audioPlayer.play();
//   console.log(optionValue);
=======
import {
    fullUrlList,
    musicFileList
} from "https://hamilsauce.github.io/audio/trackListModule.js";
// import * as modularMan from "./modal-component.js";
console.log(fullUrlList);
var audioPlayer = document.getElementById('audio-player');

const trackMenu = document.querySelector('.song-menu');
const source = document.querySelector('.source');
let optionValue = '';
let optionText = '';
window.onload = function () {
    var play = document.getElementById('play');
    var pause = document.getElementById('pause');
    var stop = document.getElementById('stop');

    /* list builder */
    const lister = list => {
        const rootAddress = 'https://hamilsauce.github.io/';
        let listArr = list.map(item => {
            let splitter = item.split('/')[1];

                return `<option class="song-option" id="${splitter}" value="${rootAddress}${item}">${splitter}</option>
                `
            })
            .reduce((itemOut, acc) => {
                return acc += itemOut;
            }, '');
        console.log(listArr);
        return listArr;
    }
    /* end list builder */



    const htmlOut = htmlString => {
        document.querySelector('.song-menu').innerHTML = htmlString;
    }

    htmlOut(lister(musicFileList));

    const playTime = () => {
        let time = Math.round(audioPlayer.currentTime);
        let curr = `<span class="audioTimeText">${time}s</span> `;
        return curr;
    }

    function playAudio() {
        let songUrl = source.getAttribute('src');
        let songName = songUrl.split('/').pop();
        document.querySelector('.showTime').innerHTML = songName;

        audioPlayer.play();
    }


    function pauseAudio() {
        audioPlayer.pause();
        document.querySelector('.showTime').innerHTML = playTime();
    }

    const stopAudio = () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        document.querySelector('.showTime').innerHTML = playTime();

    }

    play.onclick = playAudio;
    pause.onclick = pauseAudio;
    stop.onclick = stopAudio;


    }



  trackMenu.addEventListener('change', () => {
      // let userChoice = trackMenu.textContent;
      // console.log(userChoice);
      changeTrack();
      audioPlayer.play();

;  });


  function changeTrack() {
      // let userChoice = trackMenu.value;

      let audioSrc = source.getAttribute('src');
    optionValue = trackMenu.options[trackMenu.selectedIndex].value;
      optionText = trackMenu.options[trackMenu.selectedIndex].text;

      source.setAttribute('src', optionValue)


  }


//   audioPlayer.play();
//   console.log(optionValue);
>>>>>>> 4df2b7f93bb3e0cd66367abf19a4f6a16da83a8a
