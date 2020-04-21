/*
    decimate(amount, substitute = '-')
    filterRepeat(invert = false)
    superimpose(txt2, delineate = ' ')
    interleave(txt2, amount = 1.0, words = false)
    reverse(words = true)
    scramble(words = true)
    alphabetize(words = true)
    sortLength()
    isolate(match = '', words = true, invert = false)
    stanza(nlines = 2, split = '.')

    random(arr = txt)
    out()
*/

/*
    decimate(amount, substitute = '-')
    -----------------------------------------
    you can decimate a string, replacing a 
    percentage of the text with the 
    substitution.

    by default it decimates individual
    characters, but soon it will allow for 
    decimating words instead.
*/
function decimate(str, amount, sub = '-') {
    return str.split('').map(char => {
        return Math.random() < amount ? char : sub;
    }).join('');
}

String.prototype.decimate = function (amount, sub) {
    return decimate(this.toString(), amount, sub)
}


/*
    filterRepeat(invert = false)
    -----------------------------------------
    you can filter out all repeat occurrences 
    of words.
    
    this function can also be inverted so 
    that only the repeats will be displayed.
*/
function filterRepeat(str, invert = false) {
    let uniques = [];

    return str.split(' ').map(word => {
        let match = uniques.includes(word);
        if (!match) uniques.push(word);

        if ((match && !invert) || (!match && invert)) {
            return new Array(word.length + 1).join(' ');
        } else {
            return word;
        }
    }).join(' ');
}

String.prototype.filterRepeat = function (invert = false) {
    return filterRepeat(this.toString(), invert);
}


/*
    superimpose(txt2, delineate = ' ')
    -----------------------------------------
    superimpose will replace all 
    non-whitespace characters of the first 
    document with the second.
*/
function superimpose(txt1, txt2, delineate = ' ') {
    let arr1 = txt1.split('')
    let arr2 = txt2.split('')

    return arr1.map((char, i) => {
        if (arr2[i] === delineate || arr2[i] === undefined )
            return char;
        else
            return arr2[i];
    }).join('');
}

String.prototype.superimpose = function (txt2) {
    return superimpose(this.toString(), txt2);
}


/*
    interleave(txt2, amount = 1.0, words = true)
    -----------------------------------------
    interleave will output a string that 
    alternates the characters(or words) 
    between two texts. If a second argument 
    is provided, it will alternate between 
    the texts at the given percentage.
*/
function interleave(txt1, txt2, amount = 1.0, words = true) {
    let arr1 = txt1.split(words ? ' ' : '');
    let arr2 = txt2.split(words ? ' ' : '');

    return arr1.map((elem, i) => {
        return (i % 2 === 0) && (Math.random() < amount) ? arr1[i] : arr2[i];     
    }).join(words ? ' ' : '')
}

String.prototype.interleave = function (txt2, amount = 1.0, words = true) {
    return interleave(this.toString(), txt2, amount, words);
}


/*
    reverse(words = true)
    -----------------------------------------
    reverse will reverse the order of the 
    words in a string.

    by passing false as an argument, it will
    reverse individual characters instead.
*/
function reverse(txt, words = true) {
    let arr = txt.split(words ? ' ' : '');    

    return arr.reverse().join(words ? ' ' : '')
}

String.prototype.reverse = function (words = true) {
    return reverse(this.toString(), words);
}


/*
    scramble(words = true)
    -----------------------------------------
    scramble will mix up all of the words or
    individual characters of a string.
*/
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function scramble(txt, words = true) {
    let array = txt.split(words ? ' ' : '');
    var currentIndex = array.length,
    temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array.join(words ? ' ' : '');
}

String.prototype.scramble = function (words = true) {
    return scramble(this.toString(), words);
}


/*
    alphabetize(words = true)
    -----------------------------------------
    alphabetize will reorder a string either 
    by word or by character
*/

function alphabetize(txt, words = true) {
    let array = txt.split(words ? ' ' : '');

    return array.sort().join(words ? ' ' : '');
}

String.prototype.alphabetize = function (words = true) {
    return alphabetize(this.toString(), words);
}


/*
    sortLength()
    -----------------------------------------
    sortLength will reorder the words in a 
    string by their length

    ?: should I have a general sort method
    that accepts 'alpha' or 'length', etc?
*/

function sortLength(txt) {
    let array = txt.split(' ');

    return array.sort((a,b)=>a.length-b.length).join(' ');
}

String.prototype.sortLength = function () {
    return sortLength(this.toString());
}

/*
    isolate(match = '', words = true, invert = false)
    -----------------------------------------
    isolate will remove all words or
    characters that fail to match the 
    provided string
*/
function isolate(txt, match = '', words = true, invert = false) {
    let array = txt.split(words ? ' ' : '');

    return array.map(e => {
        if (((e === match) && invert) || (!(e === match) && !invert)) {
            return new Array(e.length + 1).join(' ');
        } else {
            return e;
        }
    }).join(words ? ' ' : '');
}

String.prototype.isolate = function (match = '', words = true, invert = false) {
    return isolate(this.toString(),match,words,invert);
}

/*
    stanza(nlines = 2, split = '.')
    -----------------------------------------
    stanza will split a string (by each period
    by default) and insert a number of 
    linebreaks
*/
function stanza(txt, nlines = 2, split = '.') {
    let array = txt.split(split);

    let b = new Array(nlines+1).join('\n');

    return array.join(split+b);
}

String.prototype.stanza = function (nlines = 2, split = '.') {
    return stanza(this.toString(),nlines,split);
}

/*
    toAscii(offset = 0)
    -----------------------------------------
    map the current letter to a symbol in 
    unicode, an offset can be provided 
*/
function toAscii(txt, offset = 65) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return txt.split('').map((e,i)=>{
        return (e !== ' ') ? String.fromCharCode(alphabet.indexOf(e) + offset) : ' '
    }).join('');
}

String.prototype.toAscii = function (offset = 65) {
    return toAscii(this.toString(), offset);
}