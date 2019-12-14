const ROOT_NAME = 'https://hamilsauce.github.io/';

export const musicFileList = [
'audio/procession(revise1).mp3',
'audio/syntheticdreams.mp3',
'audio/the-third-face.mp3',
'audio/Wild%20Onion.mp3',
'audio/Chasing%20Bengals.mp3',
'audio/flecktunes(primary%20full%20band).wav',
'audio/Offworld%20(up).mp3',
'audio/Battle%20Star.mp3',
'audio/Ink%20Erodes%20Slowly2.mp3',
'audio/The%20Gypsy.mp3',
'audio/Voyage%20into%20Sample.mp3',
'audio/appalachia.wav',
'audio/flecktune%20Slendro%20Bass%20and%20Pianos%20Best%20Blues.mp3',
'audio/new%20space%20reduced.mp3'
];

export const songNames = musicFileList
    .map(urlString => {
        return urlString
            .split('/')[1] //*  split off 'audio', then split 'mp3' off the that new array's 2nd element (everything other than 'audio')
            .split('.')[0] //*  with the array element containings only the track name, split the text at the '%20'
            .split('%20')
            .join(' ');
    });

export const urlArray = musicFileList
    .map(track => {
        return `${ROOT_NAME}${track}`;

    });
    // console.log('in trackModule, urlArray: ');
    // console.log(urlArray);
    // console.log(songNames);
