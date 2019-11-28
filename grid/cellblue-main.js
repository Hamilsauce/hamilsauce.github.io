   const headerInput = document.querySelector('.header-text-input')
   const header = document.querySelector('header');
   const hiddenMsg = document.querySelector('.hiddenMessage');
   let headerDisplayState = true;
   const sidebar = document.querySelector('#sidebar-div');
   const toggleButton = document.querySelector('i');

   headerInput.addEventListener('click', (e) => {
       const submitButton = document.querySelector('.header-button');

       let buttonState = submitButton.style.opacity == 0 ? true : false;

       if (buttonState == true) {
           submitButton.style.opacity = '1';
       } else if (!buttonState && headerInput.value.length == 0) {
           submitButton.style.opacity = '0';
       }
   });

   const messenger = (msg) => {
       const chatCell = document.querySelector('.cell5');
       chatCell.innerHTML = msg;
   }

   document.querySelector('.header-button').addEventListener('click', (e) => {
       e.preventDefault();
       let userMsg = headerInput.value;

       if (!userMsg.trim().length == 0) {
           messenger(userMsg);
       } else {
           messenger('Nothing to Send!');
       }

       headerInput.value = '';
       document.querySelector('.header-button').style.opacity = '0';

   });

   const hiddenDiv = hide => {
       if (headerDisplayState === true) {
           headerDisplayState = false;

           hiddenMsg.style.display = 'block';
           hiddenMsg.style.display = 'none';
       } else {
           headerDisplayState = true;

           hiddenMsg.style.display = 'none';
           header.style.display = 'flex';
       }

   }

   const hideHead = show => {
       if (headerDisplayState === true) {
           headerDisplayState = false;

           header.style.display = 'none';
           hiddenMsg.style.display = 'block';
       } else {
           headerDisplayState = true;

           header.style.display = 'flex';
           hiddenMsg.style.display = 'none';
       }
       console.log(headerDisplayState);
       show ? header.style.display = 'none' : header.style.display = 'flex';
   }

   header.addEventListener('click', () => {
       hideHead(headerDisplayState);
       console.log(headerDisplayState);

   });

   hiddenMsg.addEventListener('click', () => {
       hiddenDiv(headerDisplayState);
       console.log(headerDisplayState);
   });

   toggleButton.addEventListener('click', () => {
       sidebar.classList.toggle('sidebar-shown');
       hiddenDiv(headerDisplayState);
       console.log(headerDisplayState);
   });
