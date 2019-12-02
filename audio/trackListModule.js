const ROOT_NAME = 'https://hamilsauce.github.io/';

export const musicFileList = [
'audio/Ink%20Erodes%20Slowly2.mp3',
'audio/Offworld%20(up).mp3',
'audio/appalachia.wav',
'audio/incaSteepleDorian.mp3',
'audio/new%20space%20reduced.mp3',
'audio/syntheticdreams.mp3',
'audio/the-third-face.mp3'
'audio/procession(revise1).mp3'
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
