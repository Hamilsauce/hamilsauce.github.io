//log last updated 1.18.20

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
        let playerHistory = JSON.parse(localStorage.getItem('pastResults'));

        playerHistory.forEach(p => {
            pastPlayers.push(`
                <div class="modal-cell" id="modal-cell${p.id}">${getKeys(p)}</div>
            `);
        });
        modalText.innerHTML = pastPlayers.join('');

        backdrop.style.display = "block";
        modal.style.display = "block";

        return playerHistory;
    }

    function getKeys(pl) {
        let pairs = [];
        Object.keys(pl).forEach(key => {
            let value = pl[key];
            key == 'id' ? value++ : value;
            pairs.push(`${key}: ${value}`);
        });
        let joined = pairs.join('<br>');
        return joined;
    }
}
