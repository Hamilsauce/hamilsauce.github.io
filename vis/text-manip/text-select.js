const textDiv = document.querySelector('.textDiv')
const valRange = document.querySelector('.text-size-selector')
// const redSelector = document.querySelector('.color-selector-red')
// const greenSelector = document.querySelector('.color-selector-green')
// const blueSelector = document.querySelector('.color-selector-blue')
const selectorGroup = document.querySelector('.selector-group')

const rgbaValues = {
  red: 240,
  green: 240,
  blue: 240,
  setTargetElement(element) {
    this.targetElement = element;
  },
  adjustColor(element) {
    element.style.background = `rgba(${this.red}, ${this.green}, ${this.blue}, 1)`;
    this.adjustFontColor()
  },
  adjustFontColor() {
    let rgbSum = parseInt(this.red) + parseInt(this.green) + parseInt(this.blue);

    if (rgbSum >= 397) {
      this.targetElement.style.color = '#00000098'
    } else {
      this.targetElement.style.color = '#ffffff98'
    }
  },
  getAdjustments(color, newValue) {
    this[color] = newValue;
    this.adjustColor(this.targetElement)
  }
}

const configureColorAdjustment = () => {
  // const textDiv = document.querySelector('.textDiv');
  const targetElemet = document.querySelector('body');
  rgbaValues.setTargetElement(targetElemet);

  const colorSelectors = document.querySelectorAll('.color-selector');
  colorSelectors.forEach(selector => {
    selector.addEventListener('input', e => {
      updateOutput(selector.dataset.color, selector.value)
      console.log(selector.dataset.color, selector.value);

      rgbaValues.getAdjustments(selector.dataset.color, selector.value);
    })
  })
  valRange.addEventListener('input', e => {
    // let divText = textDiv.textContent
    textDiv.style.fontSize = `${valRange.value}px`
    console.log(valRange.value);

  })
}

configureColorAdjustment();


const updateOutput = (color, value) => {
  const outputElement = document.querySelector(`.${color}-value-output`);
  outputElement.value = value;
}



//! select text content, dont delete
//*textDiv.addEventListener('click', e => selectText(textDiv))

const selectText = (element) => {
  if (document.body.createTextRange) {
    let range = document.body.createTextRange();
    range.moveToElementText(textDiv);
    range.select();
  } else if (window.getSelection) {
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNodeContents(textDiv);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}187