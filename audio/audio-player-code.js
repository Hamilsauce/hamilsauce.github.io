<<<<<<< HEAD
<< << << < HEAD
import {
    urlArray,
    songNames,
    musicFileList
} from "./trackListModule.js";
//"https://hamilsauce.github.io/audio/trackListModule.js";

//  console.log('just imported, urlArray');
//  console.log(urlArray);
//  console.log('just imported, songNames');
//  console.log(songNames);
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
        const lister = (titles, urls) => {
            let listArr = titles
                .map(title => {
                    console.log(urls[titles.indexOf(title)])
                    return `<option class="song-option" value="${urls[titles.indexOf(title)]}">${title}</option>`
                })
                .reduce((itemOut, acc) => {
                    return acc += itemOut;
                }, '');
            return listArr;
        }
        /* end list builder */

        const songListHtmlOut = htmlString => {
            document.querySelector('.song-menu').innerHTML = htmlString;
        }
        //! Call all the above code to setup song selection/selectbox
        songListHtmlOut(lister(songNames, urlArray));

        //! define interface/control/input functionality
        const playTime = () => {
            let time = Math.round(audioPlayer.currentTime);
            let curr = `<span class="audioTimeText">${time}s</span> `;
            return curr;
        }

        function playAudio() {
            if (!audioPlayer.currentTime == 0) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }


            let songUrl = trackMenu.options[trackMenu.selectedIndex].value;
            let songName = trackMenu.options[trackMenu.selectedIndex].text;

            source.setAttribute('src', songUrl);
            document.querySelector('.showTime').innerHTML = songName;
            audioPlayer.load();
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

        // play.onclick = playAudio;
        pause.onclick = pauseAudio;
        stop.onclick = stopAudio;






        play.addEventListener('click', () => {
            playAudio();
        });




        //   audioPlayer.play();
        //   console.log(optionValue);
    } ===
    === =
    import {
        urlArray,
        songNames,
        musicFileList
    } from "./trackListModule.js";
//"https://hamilsauce.github.io/audio/trackListModule.js";

//  console.log('just imported, urlArray');
//  console.log(urlArray);
//  console.log('just imported, songNames');
//  console.log(songNames);
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
        const lister = (titles, urls) => {
            let listArr = titles
                .map(title => {
                    console.log(urls[titles.indexOf(title)])
                    return `<option class="song-option" value="${urls[titles.indexOf(title)]}">${title}</option>`
                })
                .reduce((itemOut, acc) => {
                    return acc += itemOut;
                }, '');
            return listArr;
        }
        /* end list builder */

        const songListHtmlOut = htmlString => {
            document.querySelector('.song-menu').innerHTML = htmlString;
        }
        //! Call all the above code to setup song selection/selectbox
        songListHtmlOut(lister(songNames, urlArray));

        //! define interface/control/input functionality
        const playTime = () => {
            let time = Math.round(audioPlayer.currentTime);
            let curr = `<span class="audioTimeText">${time}s</span> `;
            return curr;
        }

        function playAudio() {
            if (!audioPlayer.currentTime == 0) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
            }


            let songUrl = trackMenu.options[trackMenu.selectedIndex].value;
            let songName = trackMenu.options[trackMenu.selectedIndex].text;

            source.setAttribute('src', songUrl);
            document.querySelector('.showTime').innerHTML = songName;
            audioPlayer.load();
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

        // play.onclick = playAudio;
        pause.onclick = pauseAudio;
        stop.onclick = stopAudio;






        play.addEventListener('click', () => {
            playAudio();
        });




        //   audioPlayer.play();
        //   console.log(optionValue);
    } >>>
    >>> > 4 df2b7f93bb3e0cd66367abf19a4f6a16da83a8a
=======
import {
    urlArray,
    songNames,
    musicFileList
} from "./trackListModule.js";
//"https://hamilsauce.github.io/audio/trackListModule.js";

//  console.log('just imported, urlArray');
//  console.log(urlArray);
//  console.log('just imported, songNames');
//  console.log(songNames);
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
    const lister = (titles, urls) => {
        let listArr = titles
            .map(title => {
                console.log(urls[titles.indexOf(title)])
                return `<option class="song-option" value="${urls[titles.indexOf(title)]}">${title}</option>`
            })
            .reduce((itemOut, acc) => {
                return acc += itemOut;
            }, '');
        return listArr;
    }
    /* end list builder */

    const songListHtmlOut = htmlString => {
        document.querySelector('.song-menu').innerHTML = htmlString;
    }
    //! Call all the above code to setup song selection/selectbox
    songListHtmlOut(lister(songNames, urlArray));

    //! define interface/control/input functionality
    const playTime = () => {
        let time = Math.round(audioPlayer.currentTime);
        let curr = `<span class="audioTimeText">${time}s</span> `;
        return curr;
    }

    function playAudio() {
        if (!audioPlayer.currentTime == 0) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        }

   
        let songUrl = trackMenu.options[trackMenu.selectedIndex].value;
        let songName = trackMenu.options[trackMenu.selectedIndex].text;

        source.setAttribute('src', songUrl);
        document.querySelector('.showTime').innerHTML = songName;
        audioPlayer.load();
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

    // play.onclick = playAudio;
    pause.onclick = pauseAudio;
    stop.onclick = stopAudio;






      play.addEventListener('click', () => {
          playAudio();
     });




    //   audioPlayer.play();
    //   console.log(optionValue);
}
>>>>>>> 4df2b7f93bb3e0cd66367abf19a4f6a16da83a8a
