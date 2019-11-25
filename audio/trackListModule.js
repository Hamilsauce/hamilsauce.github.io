
const ROOT_NAME = 'https://hamilsauce.github.io/';

 const musicFileList = [
    'audio/crimsom-picture-of-a-city-09102019.mp3',
    'audio/Ink Erodes Slowly2.mp3',
    'audio/incaSteepleDorian.mp3',
    'audio/incaSteepleDorian.mp3',
    'audio/new space reduced.mp3',
    'audio/lazystar remaster.mp3'
];

export default const fullUrlList = musicFileList
    .map(track => {
        return `${ROOT_NAME}${track}`;
    });

console.log(fullUrlList);


 //   export {fullUrlList}
