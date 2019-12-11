
const ROOT_URL = 'https://hamilsauce.github.io/';

 const musicFileList = [
    'audio/crimsom-picture-of-a-city-09102019.mp3',
    'audio/Ink Erodes Slowly2.mp3',
    'audio/incaSteepleDorian.mp3',
    'audio/incaSteepleDorian.mp3',
    'audio/new space reduced.mp3',
    'audio/lazystar remaster.mp3'
];

let fullUrls = musicFileList
    .map(track => {
        return `${ROOT_URL}${track}`;
    });

console.log(fullUrls);


    export {fullUrls}