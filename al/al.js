const input1 = document.querySelector('#textinput1');
const output = document.querySelector('.output');


input1.addEventListener('keyup', e => {
  console.log('output');

  const text = e.target.value

  const text2 = text.split('').map(char => {

    return new Array(5).fill(char).join('')
  })



  output.textContent = text2



});
