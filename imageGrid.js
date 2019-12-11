<<<<<<< HEAD
<<<<<<< HEAD

const gridContainer = document.querySelector('#grid');
const gridItems = document.querySelectorAll('#grid>div');
const timeSwitch = document.querySelector('.switcher');
let timer = 0;
// document.querySelector('grid-item-phase').,KeyframeEffect(CSSKeyframesRule)
const timeChange = (target, newDuration) => {
    let durationCheck = '';
    gridItems.forEach(item => {
        item.style.animationDuration = `${newDuration}s`;
        durationCheck = item.style.animationDuration;
    });
    return durationCheck;
}

// timeSwitch.addEventListener('click', (e) => {
//     let target = e.currentTarget;
//     let trimmed
//     console.log(timeChange(target, clicker(target)));
//     console.log(timer);
// });
// const clicker = target => {
//     // let currDur = target.style.animationDuration.slice(0, this.length - 1);
//     let currDur = target.style.animationDuration;
//     console.log('currDur = ' + currDur);

//     let newDur = timer >= 15 ? timer = 0 : timer++;
//     console.log('newDur = ' + newDur);

//     return newDur;
// }







const childDurationChange2 = (event) => {
    let childTarg = event.target;
    let currDur = childTarg.style.animationDuration;
    console.log(childTarg.style.animationDuration);

    console.log('currDur1 = ' + currDur);

    let newDur;

    if (!currDur || currDur >= 15) {
        newDur = 0;

    } else {
        //currDur == 15 ? console.log('currentDur is 15') : console.log('currentDur doesnt exi');
        newDur = currDur++;
    }
    console.log('new duration - ' + newDur);

    childTarg.style.animationDuration = newDur;
    durationCheck = childTarg.style.animationDuration;
    // newDuration = 0;
    return newDur;
    //   childClicker(target);
}



const clicker = current => {
    // let currDur = target.style.animationDuration.slice(0, this.length - 1);
    console.log(' clicker current = ' + current);
    // if (!current) {
    //     console.log('current doesnt exst :' + typeof currDur);

    // }
    console.log(current.slice(0, current.length - 1));
    let currNum = parseInt(current);
    currNum >= 15 ? currNum = 0 : currNum++;
    let newDur = currNum;
    console.log('newDur = ' + newDur);

    return newDur;
}




gridContainer.addEventListener('click', e => {
    let target = e.target;
    // console.log(childDurationChange(target, clicker(target)));
    console.log(e.target.tagName);
    console.log(childDurationChange(e));

}, false);


const childDurationChange = (event) => {
    let target = event.target;
    let currDur = target.style.animationDuration;

    if (!currDur) {
        currDur = '0';
        target.style.animationDuration = currDur;
    }

    let newDuration = clicker(currDur);
    target.style.animationDuration = `${newDuration}s`;
    durationCheck = target.style.animationDuration;
    target.innerHTML = durationCheck;
    return durationCheck;
=======

const gridContainer = document.querySelector('#grid');
const gridItems = document.querySelectorAll('#grid>div');
const timeSwitch = document.querySelector('.switcher');
let timer = 0;
// document.querySelector('grid-item-phase').,KeyframeEffect(CSSKeyframesRule)
const timeChange = (target, newDuration) => {
    let durationCheck = '';
    gridItems.forEach(item => {
        item.style.animationDuration = `${newDuration}s`;
        durationCheck = item.style.animationDuration;
    });
    return durationCheck;
}

// timeSwitch.addEventListener('click', (e) => {
//     let target = e.currentTarget;
//     let trimmed
//     console.log(timeChange(target, clicker(target)));
//     console.log(timer);
// });
// const clicker = target => {
//     // let currDur = target.style.animationDuration.slice(0, this.length - 1);
//     let currDur = target.style.animationDuration;
//     console.log('currDur = ' + currDur);

//     let newDur = timer >= 15 ? timer = 0 : timer++;
//     console.log('newDur = ' + newDur);

//     return newDur;
// }







const childDurationChange2 = (event) => {
    let childTarg = event.target;
    let currDur = childTarg.style.animationDuration;
    console.log(childTarg.style.animationDuration);

    console.log('currDur1 = ' + currDur);

    let newDur;

    if (!currDur || currDur >= 15) {
        newDur = 0;

    } else {
        //currDur == 15 ? console.log('currentDur is 15') : console.log('currentDur doesnt exi');
        newDur = currDur++;
    }
    console.log('new duration - ' + newDur);

    childTarg.style.animationDuration = newDur;
    durationCheck = childTarg.style.animationDuration;
    // newDuration = 0;
    return newDur;
    //   childClicker(target);
}



const clicker = current => {
    // let currDur = target.style.animationDuration.slice(0, this.length - 1);
    console.log(' clicker current = ' + current);
    // if (!current) {
    //     console.log('current doesnt exst :' + typeof currDur);

    // }
    console.log(current.slice(0, current.length - 1));
    let currNum = parseInt(current);
    currNum >= 15 ? currNum = 0 : currNum++;
    let newDur = currNum;
    console.log('newDur = ' + newDur);

    return newDur;
}




gridContainer.addEventListener('click', e => {
    let target = e.target;
    // console.log(childDurationChange(target, clicker(target)));
    console.log(e.target.tagName);
    console.log(childDurationChange(e));

}, false);


const childDurationChange = (event) => {
    let target = event.target;
    let currDur = target.style.animationDuration;

    if (!currDur) {
        currDur = '0';
        target.style.animationDuration = currDur;
    }

    let newDuration = clicker(currDur);
    target.style.animationDuration = `${newDuration}s`;
    durationCheck = target.style.animationDuration;
    target.innerHTML = durationCheck;
    return durationCheck;
>>>>>>> 4df2b7f93bb3e0cd66367abf19a4f6a16da83a8a
=======

const gridContainer = document.querySelector('#grid');
const gridItems = document.querySelectorAll('#grid>div');
const timeSwitch = document.querySelector('.switcher');
let timer = 0;
// document.querySelector('grid-item-phase').,KeyframeEffect(CSSKeyframesRule)
const timeChange = (target, newDuration) => {
    let durationCheck = '';
    gridItems.forEach(item => {
        item.style.animationDuration = `${newDuration}s`;
        durationCheck = item.style.animationDuration;
    });
    return durationCheck;
}

// timeSwitch.addEventListener('click', (e) => {
//     let target = e.currentTarget;
//     let trimmed
//     console.log(timeChange(target, clicker(target)));
//     console.log(timer);
// });
// const clicker = target => {
//     // let currDur = target.style.animationDuration.slice(0, this.length - 1);
//     let currDur = target.style.animationDuration;
//     console.log('currDur = ' + currDur);

//     let newDur = timer >= 15 ? timer = 0 : timer++;
//     console.log('newDur = ' + newDur);

//     return newDur;
// }







const childDurationChange2 = (event) => {
    let childTarg = event.target;
    let currDur = childTarg.style.animationDuration;
    console.log(childTarg.style.animationDuration);

    console.log('currDur1 = ' + currDur);

    let newDur;

    if (!currDur || currDur >= 15) {
        newDur = 0;

    } else {
        //currDur == 15 ? console.log('currentDur is 15') : console.log('currentDur doesnt exi');
        newDur = currDur++;
    }
    console.log('new duration - ' + newDur);

    childTarg.style.animationDuration = newDur;
    durationCheck = childTarg.style.animationDuration;
    // newDuration = 0;
    return newDur;
    //   childClicker(target);
}



const clicker = current => {
    // let currDur = target.style.animationDuration.slice(0, this.length - 1);
    console.log(' clicker current = ' + current);
    // if (!current) {
    //     console.log('current doesnt exst :' + typeof currDur);

    // }
    console.log(current.slice(0, current.length - 1));
    let currNum = parseInt(current);
    currNum >= 15 ? currNum = 0 : currNum++;
    let newDur = currNum;
    console.log('newDur = ' + newDur);

    return newDur;
}




gridContainer.addEventListener('click', e => {
    let target = e.target;
    // console.log(childDurationChange(target, clicker(target)));
    console.log(e.target.tagName);
    console.log(childDurationChange(e));

}, false);


const childDurationChange = (event) => {
    let target = event.target;
    let currDur = target.style.animationDuration;

    if (!currDur) {
        currDur = '0';
        target.style.animationDuration = currDur;
    }

    let newDuration = clicker(currDur);
    target.style.animationDuration = `${newDuration}s`;
    durationCheck = target.style.animationDuration;
    target.innerHTML = durationCheck;
    return durationCheck;
>>>>>>> 4df2b7f93bb3e0cd66367abf19a4f6a16da83a8a
}