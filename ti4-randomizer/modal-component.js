
export function modularity() {
    const modal = document.querySelector('#modal-menu');
    const backdrop = document.querySelector('#modal-backdrop');
    const modalButton = document.querySelector('#modal-button');

    modalButton.addEventListener('click', () => {
        showModal(modal, backdrop);
    });

    backdrop.addEventListener('click', () => {
        backdrop.style.display = "none";
        modal.style.display = "none";
    });

    function showModal(modal, backdrop) {
        const modalText = document.querySelector('.modal-text');
        let pastPlayers = [];
        let getPast = JSON.parse(localStorage.getItem('pastResults'));

        //console.log('before getKeys');

        //console.log(getPast);
        //console.log(pastPlayers);

        getPast.forEach(p => {
            pastPlayers.push(`
                <div class="modal-cell" id="modal-cell${p.id}">${getKeys(p)}</div>
            `);
        });

        //console.log('after getKeys');
        //console.log(getPast);

        ////console.log(`Object Keys (after getKeys): ${Object.keys(pastPlayers[5])}`);

        modalText.innerHTML = pastPlayers.join('');

        backdrop.style.display = "block";
        modal.style.display = "block";

        return getPast;
        //return Object.keys(p);

    }

    function getKeys(pl) {
        let pairs = [];
        Object.keys(pl).forEach(key => {
            let value = pl[key];
            key == 'id' ? value++ : value;
            pairs.push(`${key}: ${value}`);

            ////console.log(pairs);
        });
        let joined = pairs.join('<br>');
        return joined;
    }
}
