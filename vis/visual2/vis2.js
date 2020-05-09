// class Vis {
//   constructor(vixExElement) {
//     this.element = vixExElement,
//       this.styles = window.getComputedStyle(this.element, null)
//     this.morphState = 0,
//       this.clickToggle = 0,
//       this.position = {
//         x: this.element.style.left
//       }
//   }
// }

const visEx = document.querySelector('.vis-exterior');
let styles = window.getComputedStyle(visEx, null)

const visValues = {
  x: 240,
  y: 240,
  w: 100,
  h: 100,
  rotate: 0,
  skew: 0,
  translate: 1, //! translate unecessary?
  scale: 1,
  radius: 10,
  setTargetElement(element) {
    this.targetElement = element;
  },

  adjustAttributes() {
    this.targetElement.style = ''
    this.targetElement.style.transform += this.rotate3d();

    this.targetElement.style.left += `${this.x}px`;
    console.log('x', `${this.x}px`);

    this.targetElement.style.top += `${this.y}px`;
    console.log('y', `${this.y}px`);

    this.targetElement.style.width += `${this.w}px`;
    console.log('w', `${this.w}px`);

    this.targetElement.style.height += `${this.h}px`;
    console.log('h', `${this.h}px`);

    this.targetElement.style.transform += `rotate(${this.rotate}deg)`;
    console.log('rotate', `rotate(${this.rotate}deg)`);

    this.targetElement.style.borderRadius += `${this.radius}px`;
    console.log('rad', `${this.radius}px`);



    this.targetElement.style.transform += `perspective(500px)  ${this.rotate3d()}`
    this.targetElement.style.transform += `skewY(${this.skew}deg)`;
    console.log('skew', `skew(${this.skew})`);

    this.targetElement.style.transform += `perspective(500px) translateZ(${this.translate}px)`; //! translate unecessary?
    console.log('translate', `translate(${this.translate}px)`);

    this.targetElement.style.transform += `scale(${this.scale})`;
    console.log('sca', `${this.scale}deg`);

    this.targetElement.classList.add('shape-square')
  },
  rotate3d(target) {
    let dims = [
      ['x', 0],
      ['y', 0],
      ['z', 0],
      ['d', 0]
    ]
    let [x, y, z, d] = dims;
    x[1] = Math.floor(Math.random() * Math.floor(999));
    y[1] = Math.floor(Math.random() * Math.floor(764));
    z[1] = Math.floor(Math.random() * Math.floor(1231));
    d[1] = Math.floor(Math.random() * Math.floor(1111));
    console.log(`rotate3d(${x[1]},${y[1]},${z[1]},${d[1]}deg)`);
    console.log(`rotate3d(${x[1]}px,${y[1]}px,${z[1]}px,${d[1]}deg)`);

    //  `rotate3d(${x[1]},${y[1]},${z[1]},${d[1]}deg)`;
    return `rotate3d(${x[1]}px, ${y[1]}px, ${z[1]}px, ${d[1]}deg)`
  },

  adjustFontColor() {
    let rgbSum = parseInt(this.red) + parseInt(this.green) + parseInt(this.blue);

    if (rgbSum >= 397) {
      this.targetElement.style.color = '#00000098'
    } else {
      this.targetElement.style.color = '#ffffff98'
    }
  },
  getAdjustments(attr, newValue) {
    this[attr] = newValue;
    console.log('newval');
    console.log(newValue);

    this.adjustAttributes()
  }
}

const updateOutput = (attr, value) => {
  const outputElement = document.querySelector(`.${attr}-control`);
  outputElement.value = value;
}

const configureColorAdjustment = (el) => {
  const targetElemet = el;
  visValues.setTargetElement(targetElemet);

  const controls = document.querySelectorAll('.control');
  controls.forEach(control => {
    control.addEventListener('change', e => {
      let input = e.target;
      updateOutput(input.dataset.attribute, input.value)
      console.log(input.dataset.attribute, input.value);

      visValues.getAdjustments(input.dataset.attribute, input.value);
    })
  })
  // valRange.addEventListener('input', e => {
  //   // let divText = textDiv.textContent
  //   textDiv.style.fontSize = `${valRange.value}px`
  //   console.log(valRange.value);
  // })
}
configureColorAdjustment(visEx)

































// const vises = document.querySelectorAll('.vis');
// const visIn = document.querySelector('.vis-interior');

let dblCickState = 0;
// console.log(styles);
// console.log(typeof styles.cssText);

let i = 0
const morphSquare = () => {
  visEx.addEventListener('click', e => {
    if (dblCickState >= 2) {
      dblCickState = 0
    }
    console.log('first', dblCickState);
    if (dblCickState == 0) {
      dblClick1(visEx, '5px', '225', '225')
    } else if (dblCickState == 1) {
      dblClick1(visEx, '200px', '300', '300')
    } else if (dblCickState == 2) {
      dblClick1(visEx, '50px', '0', '0')
    }
    dblCickState += 1;

    console.log('second', dblCickState);
  })
}
// console.log(187 * 2);

// let x = styles.left
// let y = styles.top
// visEx.style.left = `420px`
// visEx.style.top = '302px'
// //  vis.style.top = `${parseInt(x.slice(0, 3)) - (x - (w + 62))}px`
const dblClick1 = (vis, radius, w, h) => {
  setTimeout(() => {
    let x = styles.left
    let y = styles.top
    vis.style.transitionDelay = '0.0s';
    vis.style.transitionDuration = '1s';
    vis.style.transitionDuration = '1s';

    // vis.style.left = `${parseInt(x.slice(0, 3)) - (x - (w + 62))}px`
    // vis.style.width = `${w}px`;
    // vis.style.top = `${parseInt(y.slice(0, 3)) -  (y - (h + 62))}px`
    // vis.style.height = `${h}px`;
    vis.style.borderRadius = radius;
    setTimeout(() => {
      vis.style.left = `${parseInt(x)}px`
      vis.style.width = `${100}px`;
      vis.style.top = `${parseInt(y)}px`
      vis.style.height = `${100}px`;
      vis.style.borderRadius = radius;
    }, 500);

  }, 100);
}

morphSquare();