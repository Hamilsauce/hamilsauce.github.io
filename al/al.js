import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';

// import { Component } from './components/component.js';
// import { App } from './app.js';
const { template, date, array, utils, text } = ham;
// import { addDragAction } from './multi-select.js';

const { forkJoin, Observable, iif, BehaviorSubject, AsyncSubject, Subject, interval, of, fromEvent, merge, empty, delay, from } = rxjs;
const { flatMap, reduce, groupBy, toArray, mergeMap, switchMap, scan, map, tap, filter } = rxjs.operators;
const { fromFetch } = rxjs.fetch;

const getTargetRow = (e) => {
  return e.target.closest('tr');
};

const getTargetCell = (e) => {
  return e.target.closest('td');
};

function handleClick(e) {
  const target = e.target;

  console.log((target));
  target.style.background = '#b404c4'
  return;
}

// const tableContainer = document.querySelector('#table-container');
// const table = tableContainer.querySelector('table');
// const databody = table.querySelector('tbody');
// const rows = databody.querySelectorAll('tr');

// const click$ = fromEvent(databody, 'click')
//   .pipe(
//     map(getTargetRow),
//     tap(y => console.log('TAP', y))
//   );


const dragContainer = document.querySelector('#drag-container');
const geoAss = document.querySelector('#geo-political-ass');

// const  =


geoAss.addEventListener('click', handleClick)





const pointerdown$ = fromEvent(geoAss, 'pointerdown');
const pointermove$ = fromEvent(document, 'pointermove');
const pointerup$ = fromEvent(document, 'pointerup');


pointerdown$.pipe(
  switchMap(() => pointermove$.pipe(
    tap(e => {
      const x = e.clientX;
      const y = e.clientY;

      geoAss.style.top = x + 'px';
      geoAss.style.left = y + 'px';

    }),
  ))
)

.subscribe()