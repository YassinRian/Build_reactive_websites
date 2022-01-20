import { fromEvent, from } from "rxjs";
import { map, mergeMap, reduce } from 'rxjs/operators';

let textbox = document.querySelector('#textbox');
let results = document.querySelector('#results');


function pigLatinify (word: string) {
    if (word.length > 2) {
        return word.slice(1) + '-' + word[0] + 'ay'
    }
    return word;
}


fromEvent<any>(textbox, 'keyup').pipe(
    map(event => event.target.value), // gives us a sentence of all the words
    mergeMap( word =>
        from(word.split(/\s+/)).pipe( // due to mergeMap we keep the sentence instead of having an array of words, so now we can split the sentence based on spaces
           map(pigLatinify),
            reduce( (firstW, nextW) => firstW + ' ' + nextW, '' )
        ))
).subscribe( w => results.innerHTML = w );
