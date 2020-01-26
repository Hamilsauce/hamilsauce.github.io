const mysql = require('mysql');
const fetch = require('node-fetch');

let songData = [];

fetch("https://hamilsauce.github.io/audio/SongData.json")
    .then(res => res.json())
    .then(data => {
        let trimmedSongs = Object.values(data)[0]
            .map(song => {
                let filteredSongs = Object.entries(song)
                    .filter(([key, value]) => {
                        if (key != 'id' && key != 'plays' && key != 'likes') {
                            return value.split(',')[0];
                        }
                    });
                return filteredSongs;
            });
        let songList = [];
        trimmedSongs.forEach(song => {
            let  songVals = song.map(prop => {
                return prop[1]
            })
            songList.push(songVals);
        })
        songList.length = 11;
        songList.splice(9, 1)
        songData = songList;

        conn.query(insertInto,[songData], (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    });

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nellydog1"
});

const qryActors = `
SELECT * from sakila.actor
where left(first_name, 1) = "w";
`;

const insertInto = `INSERT INTO songdata.songs (title, genre, duration, comments, audioUrl) VALUES ?`;


conn.connect(err => {
    if (err) throw err;
    console.log('Connected Bitches!');



});