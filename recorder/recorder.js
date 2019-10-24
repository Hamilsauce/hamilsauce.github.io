const recordButton = document.querySelector('#record-button');
const stopButton = document.querySelector('#stop-button');
const recordedAudio = document.querySelector('#recorded-audio');

let recordState = false;

navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        processAudio(stream);
    });

const processAudio = (stream) => {
    rec = new MediaRecorder(stream);

    rec.ondataavailable = e => {
        audioChunks.push(e.data);

        if (rec.state == 'inactive') {
            let blob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
            recordedAudio.src = URL.createObjectURL(blob);
            recordedAudio.controls = true;
            recordedAudio.autoplay = true;
            sendData(blob);

        }
    }
}

const sendData = data => { };


recordButton.addEventListener('click', () => {
    console.log(toggleRecordState());

});


const toggleRecordState = () => {
    recordState = !recordState;

    if (recordState === true) {
        recordButton.innerHTML = 'recording...';
        recordButton.style.color = 'rgb(255,255,255)';
        recordButton.style.background = 'rgb(235, 7, 7)';
        recordButton.style.fontSize = '14px';
        recordButton.style.transition = '700ms font ease, 1000ms color ease';

        audioChunks = [];
        rec.start()

    } else if (recordState === false) {
        recordButton.style.background = 'rgb(184, 7, 7)';
        recordButton.style.color = 'transparent';
        recordButton.style.fontSize = '14px';
        recordButton.style.transition = '200ms font ease, 700ms color ease, 1000ms border ease, 2000ms box-shadow ease';
        recordButton.innerHTML = 'record';

        rec.stop()

    } else {
        console.log('toggle is neither true nor false?');

    }

    let newState = recordState;
    return newState;
}