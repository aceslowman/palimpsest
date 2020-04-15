//--------------------------------------------------------------------
function decimate(str, amount, sub = '-') {
    return str.split('').map(char => {
        return Math.random() < amount ? char : sub;
    }).join('');
}

String.prototype.decimate = function (amount, sub) {
    return decimate(this.toString(), amount, sub)
}
//--------------------------------------------------------------------

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

//--------------------------------------------------------------------

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

//--------------------------------------------------------------------
/*
    interleave will output a string that alternates the
    characters (or words) between two texts
*/
function interleave(txt1, txt2, words = false) {
    let arr1 = txt1.split(words ? ' ' : '');
    let arr2 = txt2.split(words ? ' ' : '');

    return arr1.map((elem, i) => {
        return (i % 2 === 0) ? arr1[i] : arr2[i];     
    }).join(words ? ' ' : '')
}

String.prototype.interleave = function (txt2, words = false) {
    return interleave(this.toString(), txt2, words);
}