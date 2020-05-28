const countDisplay = document.querySelector('.counter-display');
const countAdd = document.querySelector('.add');
const countMinus = document.querySelector('.minus');
const cards = document.querySelectorAll('.card');
const minusLevel = document.querySelector('.minusLevel');
const addLevel = document.querySelector('.addLevel');
const lvlCard = document.querySelector('.level-card');
const lvlButton = document.querySelectorAll('.lvlButton');

class Character {
  constructor(name, charClass, level) {
    this.name = name,
      this.charClass = charClass,
      this.level = level,
      this.gold = 0,
      this.xp = 0,
      this.items = [],
      this.actionCards = [{}]
  }
  addXp() {}
  addGold(amt) {
    this.gold += amt;
  }
  removeGold(amt) {
    this.gold -= amt;
  }
  buyItem() {} //will need to subtract gold + add card}
  addCard() {}
}

const factory = (name, charClass, level) => {
  const newChar = new Character(name, charClass, level);
  return newChar
}

const char1 = factory('frodo', 'hobbit', 2);

const ui = {
  activecard: null,
  activeClickCount: 0
}


const getSaved = () => {
  let savedChar = localStorage.getItem('')
}
const saveChar = () => {
  let saveChar = localStorage.getItem('')
}

lvlCard.addEventListener('click', e => {
  lvlButton.forEach(btn => {
    btn.classList.remove('buttonhide')
    btn.classList.add('buttonShow')
  })
})

lvlCard.addEventListener('onblur', e => {
  // lvlButton.forEach(btn => {
  // btn.classList.add('buttonhide')
  //btn.classList.remove('buttonShow')
  //  })
})

countAdd.addEventListener('click', () => { //!incrementer code
  char1.addGold(1);
  countDisplay.textContent = char1.gold;
});
countMinus.addEventListener('click', () => { //!incrementer code
  char1.removeGold(1);
  countDisplay.textContent = char1.gold;
});

const cardFocusHandler = () => { //! handles card clicks
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    let input = card.querySelector('.textIn');
    handleTextInClick(input)

    card.addEventListener('click', e => {
      e.stopPropagation();
      handleCardState(card)
    })
  })
}

const handleCardState = card => { //! handles card behavior
  //* tracks user card selection as well as click counts, adjusts behavior accordingly
  let lastTarget = ui.activeCard || card;
  let input = card.querySelector('.textIn');
  let focused = false
  ui.activeCard = card;

  if (ui.activeCard == lastTarget) {
    if (ui.activeClickCount == 1) {
      console.log('focus input');
      input.focus();
      focused = true;
    }
    if (focused === true) {
      console.log('focus true, adding activeCard, remove card');
      ui.activeCard.classList.add('activeCard')
      ui.activeCard.querySelector('.textIn').style.pointerEvents = 'all';
    }
    if (focused === true && ui.activeClickCount >= 2) {
      console.log('focus true was true and clicks > 2, adding activeCard, remove card');
      ui.activeCard.classList.remove('activeCard')
      ui.activeCard.classList.add('card')
      ui.activeCard.querySelector('.textIn').style.pointerEvents = 'none';
      ui.activeClickCount = 0;
      focus = false;
    }
    ui.activeClickCount += 1;
  }
  if (ui.activeCard != lastTarget) { //If current target is new card, reset clicks and change uistste
    console.log('focus false, removing activeCard class');
    ui.activeCard = card;
    focused = false
    ui.activeClickCount = 1
    lastTarget.classList.remove('activeCard')
    lastTarget.classList.add('card')
    ui.activeCard.querySelector('.textIn').style.pointerEvents = 'none';
  }
}

const handleTextInClick = textIn => {
  textIn.addEventListener('click', e => {
    e.stopPropagation()
    e.preventDefault();
  })
}

cardFocusHandler()