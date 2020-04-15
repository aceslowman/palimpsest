export default `
"palimpsest is a text manipulation toolkit".out()

//----METHODS-----------------------------

/*
    decimate(amount, substitute = '-')
*/

"you can decimate a string, replacing a percentage of the text with the substitution. this paragraph has replaced 80% of its characters with a dash".decimate(0.2, '-').out()

/*
    filterRepeat(invert = false)
*/

"you can filter out all repeat occurrences of words. this function can also be inverted so that only the repeats will be displayed.".filterRepeat().out()

"you can filter out all repeat occurrences of words. this function can also be inverted so that only the repeats will be displayed.".filterRepeat(true).out()

/*
    superimpose(txt2, delineate = ' ')
*/

"superimpose will replace all non-whitespace characters of the first document with the second".superimpose("HELLO WORLD").out()

/*
    interleave(txt2, words = false)
*/

"interleave will output a string that alternates the characters (or words) between two texts".interleave("try changing the second argument to true").out()

//----FILE INPUT--------------------------

"this tool can also handle multiple file uploads. by using the file chooser at the top of the page. each text file will be loaded into an array, accessible here as txt[index of file]. ".out()

"after loading your files you can view them individually by clicking on the numbers that appear in the middle of the page. the text can be retrieved using this number".out()

// for example
// txt[0].filterRepeat().out()
// or
// txt[0].superimpose(txt[1])

//----CHAINING----------------------------

"any command can be chained togetherand will only be output if ended with out().".filterRepeat().decimate(0.8).out()

//----OUTPUT------------------------------

/*
    this was made in 2020
    please share your thoughts and bugs to
    
    @aceslowman (on twitter, ig)
    austin@aceslowman.com
    
    austin slominski
*/`