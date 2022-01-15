import { interval, fromEvent } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// dom elements
let startButton = document.querySelector('#start-button');
let stopButton = document.querySelector('#stop-button');
let resultArea = document.querySelector<HTMLElement>('.output');

// Observables
let tenthSeconds$ = interval(100);
let startClick$ = fromEvent(startButton,'click');
let stopClick$ = fromEvent(stopButton, 'click');

startClick$.subscribe( () => {
    tenthSeconds$.pipe(
        map( item => (item/10)),
        takeUntil(stopClick$)
    ).subscribe(num => resultArea.innerHTML = num + 's');
});
