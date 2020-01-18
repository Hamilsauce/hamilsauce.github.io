//log last updated 1.18.20

export function handleWelcome() {
    const welcomeModal = document.querySelector('.welcome-modal');
    const backdrop = document.querySelector('#modal-backdrop');
    backdrop.style.display = 'block';


    backdrop.addEventListener('click', () => {
        setTimeout(() => {
            backdrop.style.display = "none";
            welcomeModal.style.display = "none";
        }, 1500);
    });

    welcomeModal.addEventListener('click', () => {
        setTimeout(() => {
            backdrop.style.display = "none";
            welcomeModal.style.display = "none";
        }, 1500);
    });

}

{handleWelcome()}
