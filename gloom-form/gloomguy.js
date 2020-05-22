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

}
const ui = {
  activeCell: null,
  activeClickCount: 0
}
const countDisplay = document.querySelector('.counter-display');
const countAdd = document.querySelector('.add');
const countMinus = document.querySelector('.minus');
const cells = document.querySelectorAll('.cell');
const minusLevel = document.querySelector('.minusLevel');
const addLevel = document.querySelector('.addLevel');
const lvlCell = document.querySelector('.level-cell');
const lvlButton = document.querySelectorAll('.lvlButton');

const char1 = new Character('frodo', 'hobbit', 2);


const getSaved = () => {
  let savedChar = localStorage.getItem('')
}
const saveChar = () => {
  let saveChar = localStorage.getItem('')
}

lvlCell.addEventListener('click', e => {
  lvlButton.forEach(btn => {
    btn.classList.remove('buttonhide')
    btn.classList.add('buttonShow')
  })
})
lvlCell.addEventListener('onblur', e => {
  // lvlButton.forEach(btn => {
  // btn.classList.add('buttonhide')
  //btn.classList.remove('buttonShow')
  //  })
})
countAdd.addEventListener('click', () => {
  char1.addGold(1);
  countDisplay.textContent = char1.gold;
});
countMinus.addEventListener('click', () => {
  char1.removeGold(1);
  countDisplay.textContent = char1.gold;
});

const focuser = () => {
  const cells = document.querySelectorAll('.cell');
 
  cells.forEach(c => {
    let input = c.children[1];
    let focused = false

    c.addEventListener('click', e => {
      e.stopPropagation();
   
      let lastTarget = ui.activeCell || c;
      ui.activeCell = c;
  
      if (ui.activeCell == lastTarget) {
        if (ui.activeClickCount == 1) {
          input.focus();
          focused = true;
        }
   
        if (focused === true) {
          ui.activeCell.classList.remove('cell')
          ui.activeCell.classList.add('activeCell')
        }
        ui.activeClickCount += 1;
      }

      if (ui.activeCell != lastTarget) { //If current target is new cell, reset clicks and change uistste
        ui.activeCell = c;
        focused = false

        ui.activeClickCount = 1
        lastTarget.classList.remove('activeCell')
        lastTarget.classList.add('cell')
      }
    })
  })
}
focuser()