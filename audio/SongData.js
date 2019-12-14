let songList = () => {
    const songs = [{
            "id": "1",
            "songTitle": "Battle Star",
            "plays": "12",
            "likes": "4",
            "genre": "Rock",
            "duration": "02:45",
            "comments": "3",
            "audioUrl": "https://hamilsauce.github.io/audio/Battle%20Star.mp3"

        },
        {
            "id": "2",
            "songTitle": "The Third Face",
            "plays": "8",
            "likes": "5",
            "genre": "Rock",
            "duration": "04:47",
            "comments": "3",
            "audioUrl": "https://hamilsauce.github.io/audio/the-third-face.mp3"
        },
        {
            "id": "3",
            "songTitle": "The Gypsy",
            "plays": "12",
            "likes": "5",
            "genre": "Folk",
            "duration": "08:00",
            "comments": "0",
            "audioUrl": "https://hamilsauce.github.io/audio/The%20Gypsy.mp3"
        },
        {
            "id": "4",
            "songTitle": "Voyage into Sample",
            "plays": "51",
            "likes": "2",
            "genre": "Psychedlic",
            "duration": "02:18",
            "comments": "2",
            "audioUrl": "https://hamilsauce.github.io/audio/The%20Gypsy.mp3"
        },
        {
            "id": "5",
            "songTitle": "The Wild Onion",
            "plays": "6",
            "likes": "1",
            "genre": "Folk",
            "duration": "02:32",
            "comments": "1",
            "audioUrl": "https://hamilsauce.github.io/audio/Wild%20Onion.mp3"
        },
        {
            "id": "6",
            "songTitle": "A Memory Remains",
            "plays": "6",
            "likes": "3",
            "genre": "Ambient",
            "duration": "04:29",
            "comments": "1"
        },
        {
            "id": "44",
            "songTitle": "Offworld",
            "plays": "0",
            "likes": "0",
            "genre": "Rock",
            "duration": "02:05",
            "comments": "0",
            "audioUrl": "https://hamilsauce.github.io/audio/Offworld%20(up).mp3"
        },
        {
            "id": "7",
            "songTitle": "Procession",
            "plays": "7",
            "likes": "2",
            "genre": "Electronic",
            "duration": "02:29",
            "comments": "0",
            "audioUrl": "https://hamilsauce.github.io/audio/procession(revise1).mp3"
        },
        {
            "id": "8",
            "songTitle": "Uncle Frog's Deep Space Chorus",
            "plays": "11",
            "likes": "1",
            "genre": "Rock",
            "duration": "04:08",
            "comments": "0"
        },
        {
            "id": "9",
            "songTitle": "Chasing Bengals",
            "plays": "4",
            "likes": "2",
            "genre": "Ballad",
            "duration": "03:20",
            "comments": "0",
            "audioUrl": "https://hamilsauce.github.io/audio/Chasing%20Bengals.mp3"
        },
        {
            "id": "10",
            "songTitle": "Ink Erodes",
            "plays": "22",
            "likes": "1",
            "genre": "Zappa",
            "duration": "04:09",
            "comments": "0",
            "audioUrl": "https://hamilsauce.github.io/audio/Ink%20Erodes%20Slowly2.mp3"
        },
        {
            "id": "11",
            "songTitle": "Gregorian Moan",
            "plays": "126",
            "likes": "0",
            "genre": "",
            "duration": "02:05",
            "comments": "0"
        },
        {
            "id": "12",
            "songTitle": "Sunken Garden",
            "plays": "6",
            "likes": "0",
            "genre": "",
            "duration": "03:15",
            "comments": "0"
        },
        {
            "id": "13",
            "songTitle": "Son of Mad Dirt Machine",
            "plays": "68",
            "likes": "1",
            "genre": "",
            "duration": "07:02",
            "comments": "0"
        },
        {
            "id": "14",
            "songTitle": "Desolation",
            "plays": "22",
            "likes": "3",
            "genre": "",
            "duration": "04:37",
            "comments": "0"
        },
        {
            "id": "15",
            "songTitle": "\"Bootheel",
            "plays": " p2\"",
            "likes": "6",
            "genre": "1",
            "duration": "",
            "comments": "3 months ago"
        },
        {
            "id": "16",
            "songTitle": "Bootheel(Dreaming of Life)",
            "plays": "65",
            "likes": "1",
            "genre": "",
            "duration": "01:58",
            "comments": "0"
        },
        {
            "id": "17",
            "songTitle": "Rethinking Bob Dylan's Buckets of Rain",
            "plays": "39",
            "likes": "5",
            "genre": "",
            "duration": "05:03",
            "comments": "0"
        },
        {
            "id": "18",
            "songTitle": "The Howling Menace and the Return of the Synths",
            "plays": "35",
            "likes": "2",
            "genre": "",
            "duration": "06:28",
            "comments": "0"
        },
        {
            "id": "19",
            "songTitle": "The Mad Dirt Machine",
            "plays": "18",
            "likes": "5",
            "genre": "",
            "duration": "03:05",
            "comments": "0"
        },
        {
            "id": "20",
            "songTitle": "Remix of Royals - Lorde",
            "plays": "13",
            "likes": "1",
            "genre": "",
            "duration": "03:20",
            "comments": "0"
        },
        {
            "id": "21",
            "songTitle": "Under The Sun",
            "plays": "16",
            "likes": "0",
            "genre": "",
            "duration": "04:58",
            "comments": "0"
        },
        {
            "id": "22",
            "songTitle": "Real FunTown",
            "plays": "18",
            "likes": "2",
            "genre": "",
            "duration": "04:23",
            "comments": "0"
        },
        {
            "id": "23",
            "songTitle": "Singularity M",
            "plays": "27",
            "likes": "4",
            "genre": "",
            "duration": "04:14",
            "comments": "0"
        },
        {
            "id": "24",
            "songTitle": "Baby Girl",
            "plays": "72",
            "likes": "1",
            "genre": "",
            "duration": "02:06",
            "comments": "0"
        },
        {
            "id": "25",
            "songTitle": "Ave Maria",
            "plays": "121",
            "likes": "5",
            "genre": "",
            "duration": "02:24",
            "comments": "0"
        },
        {
            "id": "26",
            "songTitle": "Brown Town",
            "plays": "40",
            "likes": "2",
            "genre": "",
            "duration": "03:26",
            "comments": "1"
        },
        {
            "id": "27",
            "songTitle": "Rat Boot Redux",
            "plays": "52",
            "likes": "0",
            "genre": "",
            "duration": "04:55",
            "comments": "0"
        },
        {
            "id": "28",
            "songTitle": "Jimnopeedie",
            "plays": "59",
            "likes": "1",
            "genre": "",
            "duration": "02:28",
            "comments": "0"
        },
        {
            "id": "29",
            "songTitle": "Stargazer Junk Recording1",
            "plays": "24",
            "likes": "0",
            "genre": "",
            "duration": "05:43",
            "comments": "0"
        },
        {
            "id": "30",
            "songTitle": "Glaciers",
            "plays": "151",
            "likes": "0",
            "genre": "",
            "duration": "04:16",
            "comments": "0"
        },
        {
            "id": "31",
            "songTitle": "Refined Love",
            "plays": "59",
            "likes": "0",
            "genre": "",
            "duration": "04:02",
            "comments": "0"
        },
        {
            "id": "33",
            "songTitle": "What Do You Know ?",
            "plays": "0",
            "likes": "3",
            "genre": "",
            "duration": "05:25",
            "comments": "0"
        },
        {
            "id": "34",
            "songTitle": "How to Get a Wink From a Waitress",
            "plays": "52",
            "likes": "1",
            "genre": "",
            "duration": "04:50",
            "comments": "1"
        },
        {
            "id": "35",
            "songTitle": "We're All Victims Now!",
            "plays": "50",
            "likes": "2",
            "genre": "",
            "duration": "05:27",
            "comments": "0"
        },
        {
            "id": "36",
            "songTitle": "Mischievous",
            "plays": "35",
            "likes": "1",
            "genre": "",
            "duration": "04:43",
            "comments": "1"
        },
        {
            "id": "37",
            "songTitle": "Aurora",
            "plays": "54",
            "likes": "1",
            "genre": "",
            "duration": "08:00",
            "comments": "1"
        },
        {
            "id": "38",
            "songTitle": "Dreamers(Suburban Sexual Tension)",
            "plays": "46",
            "likes": "0",
            "genre": "",
            "duration": "04:32",
            "comments": "0"
        },
        {
            "id": "39",
            "songTitle": "Mozyin'",
            "plays": "66",
            "likes": "2",
            "genre": "",
            "duration": "03:50",
            "comments": "0"
        },
        {
            "id": "40",
            "songTitle": "Pfizer Entertains",
            "plays": "60",
            "likes": "1",
            "genre": "",
            "duration": "03:22",
            "comments": "0"
        },
        {
            "id": "41",
            "songTitle": "Lulu Goes Away",
            "plays": "67",
            "likes": "2",
            "genre": "",
            "duration": "04:08",
            "comments": "0"
        },
        {
            "id": "42",
            "songTitle": "The Overture of the Morbid Nietzschean Space Vikings",
            "plays": "80",
            "likes": "1",
            "genre": "",
            "duration": "03:03",
            "comments": "1"
        },
        {
            "id": "43",
            "songTitle": "\"Hoo Hoo",
            "plays": " Ooo Eee Ooo\"",
            "likes": "503",
            "genre": "1",
            "duration": "",
            "comments": "7 years ago"
        }
    ]
    return songs;
}


export default songList();