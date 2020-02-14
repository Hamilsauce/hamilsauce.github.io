const axios = require('axios');
const express = require('express'),
    server = express()

//setting the port.
server.set('port', process.env.PORT || 3000);

//routes
server.get('/', (request, response) => {
    response.sendFile(__dirname + '/songGuy.html');
});

server.get('/allData', (request, response) => {
    axios.get('https://hamilsauce.github.io/audio/SongData.json')
        .then(res => {
            response.json(res.data)
        });
});

server.get('/users', (request, response) => {
    response.json(users);
});

//Binding to localhost://3000
server.listen(3000, () => {
    console.log('Express server started at port 3000');
});