const ROOT_NAME = 'https://hamilsauce.github.io/';

export const musicFileList = [
    'audio/crimsom-picture-of-a-city-09102019.mp3',
    'audio/Ink%20Erodes%20Slowly2.mp3',
    'audio/incaSteepleDorian.mp3',
    'audio/new%20space%20reduced.mp3',
    'audio/new%20space%20guitar%20mix.mp3',
    'audio/lazystar%20remaster.mp3',
     'audio/Offworld.mp3',
    'audio/The%203rd%20Face3.mp3'
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
