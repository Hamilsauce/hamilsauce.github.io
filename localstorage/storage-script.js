const form = document.querySelector('form');
const ul = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.getElementById('item');

//This conditional will check localStorage upon document loading for any data. If data is found, it'll load it.
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

/*To move input data to localStorage, must convert array into string. Later we;ll use JSON.parse to split back to array*/
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

/*function creates a new li element and appends it to end of list each function execution*/
const liMaker = text => {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
};

/*THis function hijacks the submit event, prevents the submit form action, and executes liMaker in its place*/
form.addEventListener('submit', e => {
    e.preventDefault();

    itemsArray.push(input.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
        
    liMaker(input.value);
    input.value = '';
});

// For each item returned from localStorage in the data  array, and append it to the list as a li
data.forEach(i => {
    liMaker(i);
});


// This will clear all the list items from localStorage as well as the document/display when button pressed
button.addEventListener('click', () => {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
        }
});