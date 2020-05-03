/*
    decimate(amount, substitute = '-')
    unique(invert = false)
    superimpose(txt2, delineate = ' ')
    weave(txt2, rhythm = 1.0, words = false)
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
function decimate(str, amount = '0.5', type = 'w', sub = '-') {
    return str.split(type === 'w' ? ' ' : '').map(char => {
        return Math.random() < amount ? char : sub;
    }).join('');
}

String.prototype.decimate = function (amount, type = 'w', sub) {
    return (new Text(decimate(this.toString(), amount, type, sub)))
}
Text.prototype.decimate = function (amount, type = 'w', sub) {
    this.text = decimate(this.text.toString(), amount, type, sub)
    return this;
}

Array.prototype.decimate = function(amount, type = 'c', sub){
    this.forEach((e,i) => {
        if(e.constructor.name === "Text"){
            this[i].text = decimate(e.text.toString(), amount, type, sub)
        }else{
            this[i] = new Text(decimate(e.toString(), amount, type, sub))
        }  
    })
    return this;
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

Text.prototype.filterRepeat = function (invert = false) {
    this.text = filterRepeat(this.toString(), invert);
    return this;
}

// Array.prototype.filterRepeat = function(){}

/*
    unique()
    -----------------------------------------
    display only the unique words in the 
    text. 
*/
function unique(str) {
    let uniques = [];

    str.split(' ').forEach(word => {
        word = word.replace(/(^[,\s]+)|([,\s]+$)/g, '').trim();
        let match = uniques.includes(word);
        if(match){
            uniques.splice(uniques.indexOf(word), 1)
        }else{
            uniques.push(word);
        }
    });

    return uniques.join(' ');
}

String.prototype.unique = function () {
    return (new Text(unique(this.toString())));
}

Text.prototype.unique = function (invert = false) {
    this.text = unique(this.text.toString(), invert);
    return this;
}

// Array.prototype.unique = function(){}

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
    return (new Text(superimpose(this.toString(), txt2)));
}

Text.prototype.superimpose = function (txt2) {
    this.text = superimpose(this.text.toString(), txt2);
    return this;
}

// Array.prototype.superimpose = function(){}

/*
    weave(txt2, type = ('c'|'w'), rhythm = 1.0)
    -----------------------------------------
    weave will output a string that 
    alternates the characters(or words) 
    between two texts. If a second argument 
    is provided, it will alternate between 
    the texts at the given percentage.
*/
function weave(txt1, txt2, type = 'w', rhythm = 1.0) {
    let arr1 = txt1.split(type === 'w' ? ' ' : '');
    let arr2 = txt2.split(type === 'w' ? ' ' : '');

    return arr1.map((e, i) => {
        return (i % 2 === 0) && (Math.random() < rhythm) ? e : arr2[i];     
    }).join(type === 'w' ? ' ' : '')
}

String.prototype.weave = function (txt2, type = 'w', rhythm = 1.0) {
    return (new Text(weave(this.toString(), txt2, type, rhythm)));
}

Text.prototype.weave = function (txt2, type = 'w', rhythm = 1.0) {
    this.text = weave(this.text.toString(), txt2.text.toString(), type, rhythm);
    return this;
}

Array.prototype.weave = function (arr2 = []) {
    if (arr2 !== '' && arr2) {
        return this.map((e, i) => {
            return (i % 2 === 0) ? this[i] : arr2[i];
        });
    }

    return this;
}

/*
    reverse(type = 'w')
    -----------------------------------------
    reverse will reverse the order of the 
    words in a string.

    by passing false as an argument, it will
    reverse individual characters instead.
*/
function reverse(txt, type = 'w') {
    let arr = txt.split(type === 'w' ? ' ' : '');    

    return arr.reverse().join(type === 'w' ? ' ' : '');
}

String.prototype.reverse = function (words = true) {
    return (new Text(reverse(this.toString(), words)));
}

Text.prototype.reverse = function (words = true) {
    this.text = reverse(this.text.toString(), words);
    return this;
}

// Array.prototype.reverse = function(){}

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
    return (new Text(scramble(this.toString(), words)));
}

Text.prototype.scramble = function (words = true) {
    this.text = scramble(this.text.toString(), words);
    return this;
}

// Array.prototype.scramble = function(){}

/*
    alphabetize(type = 'w')
    -----------------------------------------
    alphabetize will reorder a string either 
    by word or by character
*/

function alphabetize(txt, type = 'w') {
    let array = txt.split(type == 'w' ? ' ' : '');

    return array.sort().join(type == 'w' ? ' ' : '');
}

String.prototype.alphabetize = function (words = true) {
    return (new Text(alphabetize(this.toString(), words)));
}

Text.prototype.alphabetize = function (words = true) {
    this.text = alphabetize(this.text.toString(), words);
    return this;
}

// Array.prototype.alphabetize = function(){}

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

// Text.prototype.sortLength = function(){}

// Array.prototype.sortLength = function(){}

/*
    isolate(match = '', words = true, invert = false)
    -----------------------------------------
    isolate will remove all words or
    characters that fail to match the 
    provided string

    by default it will preserve all spacing,
    otherwise it would just return the given
    phrase and be useless

    returns a string
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

String.prototype.isolate = function(match = '', words = true, invert = false) {
    return isolate(this.toString(), match, words, invert);
}

// Text.prototype.isolate = function(){}

// Array.prototype.isolate = function(){}

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
    return (new Text(stanza(this.toString(), nlines, split)));
}

Text.prototype.stanza = function (nlines = 2, split = '.') {
    this.text = stanza(this.text.toString(), nlines, split);
    return this;
}

// Array.prototype.stanza = function(){}

/*
    ascii(offset = 0)
    -----------------------------------------
    map the current letter to a symbol in 
    unicode, an offset can be provided 
*/
function ascii(txt, offset = 65) {
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return txt.split('').map((e,i)=>{
        return (e !== ' ') ? String.fromCharCode(alphabet.indexOf(e) + offset) : ' '
    }).join('');
}

String.prototype.ascii = function (offset = 65) {
    return (new Text(ascii(this.toString(), offset)));
}

Text.prototype.ascii = function (offset = 65) {
    this.text = ascii(this.text.toString(), offset);
    return this;
}

Array.prototype.ascii = (offset = 1457) => {
    this.forEach((e) => {
        e.text = ascii(e.text.toString(), offset);
    })

    return this;
}

/*
    questions()
    -----------------------------------------
    isolate questions.

    should return an array?
*/
function questions(txt) {
    return txt.split('?').map((e) => {
        return e.split('.').slice(-1).join("").trim().concat('?')
    });
}

String.prototype.questions = function () {
    return (new Text(questions(this.toString())));
}

Text.prototype.questions = function () { // returns an array
    return questions(this.text.toString()).map((e, i) => {
        return (new Text(e, this.element))
    })
}

// Array.prototype.questions = function(){}

/*
    answers()
    -----------------------------------------
    isolate answers.

    should return an array?
*/
function answers(txt) {
    return txt.split('?').map((e) => {
        return e.split('.').slice(1,-1).join("").trim().concat('.')
    });
}

String.prototype.answers = function () {
    return (new Text(answers(this.toString())));
}

Text.prototype.answers = function () { // returns an array
    return answers(this.text.toString()).map((e, i) => {
        return (new Text(e, this.element))
    })
}

// Array.prototype.answers = function(){}

/*
    condense()
    -----------------------------------------
    remove all extraneous white space and
    linebreaks
*/
function condense(txt) {
    return txt.replace(/[\r\n]+/gm,"").trim()
}

String.prototype.condense = function () {
    return (new Text(condense(this.toString())));
}

Text.prototype.condense = function () {
    this.text = condense(this.text.toString());
    return this;
}

// Array.prototype.condense = function(){}

/*
    stats()
    -----------------------------------------
    get statistics about the given string,
    including the number of words, 
    individual characters, number of unique
    words, etc. should primarily be numerical
    data

    returns a string 
*/
function stats(txt) {
    let cCount = txt.length;
    let wCount = txt.split(' ').length;
    let sCount = txt.split(/[.?!]/).length;
    let uwCount = unique(txt).split(' ').length;
    
    return (
        `
        characters: ${cCount} 
        words: ${wCount}
        sentences: ${sCount}
        unique words: ${uwCount}
        `
    );
}

String.prototype.stats = () => {
    return (new Text(
        stats(this.toString())
    ))
}

// Text.prototype.stats = function(){}

// Array.prototype.stats = function(){}

//----------------------------------------------------------------
//----------------------------------------------------------------

function Text(text = '', element = 'p', style = {}) {
    this.element = element;
    this.text = text;
    this.style = style;
}

/* 
    each method is added to String so that they can be 
    performed on any string. after this, all methods will
    deal directly with the Text object instead.
*/

String.prototype.style = function (element = 'p') {
    return (new Text(
        this.toString(),
        (element !== '' && element) ? element : 'p',
    ))
}

Text.prototype.style = function (element = 'p') {
    this.element = (element !== '' && element) ? element : 'p';
    return this;
}

Array.prototype.style = function (element = 'p') {
    this.forEach((e) => {
        e.element = (element !== '' && element) ? element : 'p';
    })

    return this;
}


String.prototype.align = function (type = 'left') {
    return (new Text(
        this.toString(),
        'p', {
            align: type
        }
    ))
}

Text.prototype.align = function (type = 'left') {
    this.style = {
        ...this.style,
        align: type
    }
    return this;
}

Array.prototype.align = (type = 'left') => {
    this.forEach((e) => {
        e.style = {
            ...e.style,
            textAlign: type
        };
    })

    return this;
}































//----------------------------------------------------------------































//----------------------------------------------------------------


























/*
decimate
filterRepeat
unique
superimpose
weave
reverse
scramble
alphabetize
sortLength
isolate
stanza
ascii
questions
answers
condense
style
align
stats
*/

export default Text