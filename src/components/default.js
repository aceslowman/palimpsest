export default `
/*
    PALIMPSEST is a text manipulation toolkit


    basic concepts
    -----------------------------------------
    any piece of text (referred to as a 
    string) can have a number of methods 
    applied to it.

    every change you make to the text and
    each method applied to it will update
    on the opposite side of the screen.

    you can also execute the code by typing
    (windows, linux) ctrl-enter
        or
    (mac) cmd-enter

*/
"PALIMPSEST is a text manipulation toolkit"
    .scramble(true).out();

"it allows you to send text through a number of processes, which are defined at the bottom of this page".out();
/*

    chaining
    -----------------------------------------
    any command can be chained together and 
    will only be output if ended with out().

    these chains can span multiple lines,
    making the document easier to read and
    experiment with.

*/   

"any method can be chained".out()

"any method can be chained"
    .decimate(0.5)
    .reverse(true)
    .out()

/*  

    text buffers 
    -----------------------------------------
    this tool can also handle text documents 
    by selecting from numbers 0-9 in the 
    middle toolbar.
    
    each text buffer exists in an array, 
    accessible as 
        txt[index of file].

    below, the first text buffer (numbers
    starting at zero) is reversed.
        txt[0].reverse()
        
    you can also upload multiple files using
    the chooser at the top of the page.
    (note: your existing buffers will be
    overwritten)


    selector
    -----------------------------------------
    after loading your files you can view
    them individually by clicking on the
    numbers that appear in the middle of 
    the page.
    
    the text can be retrieved using
    this number

*/

"you can upload multiple text files using the button at the top of the page (and shift-click-ing on each)".out()

"then you can view them individually using the selector in the middle".out()

"and use them in your code by accessing the txt array. the first file would be accessed as txt[0], as arrays begin at zero.".out()

// ABOUT THE METHODS ------------------------
/*
    decimate(amount, substitute = '-')
    filterRepeat(invert = false)
    superimpose(txt2, delineate = ' ')
    interleave(txt2, amount = 1.0, words = false)
    reverse(words = true)
    scramble(words = true)

    random(arr = txt)
    out()
*/
// ------------------------------------------

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

"let your text decay".decimate(0.2, '-').out()

/*
    filterRepeat(invert = false)
    -----------------------------------------
    you can filter out all repeat occurrences 
    of words.
    
    this function can also be inverted so 
    that only the repeats will be displayed.
*/

"only the first occurrence of the word will appear".filterRepeat().out()

"when inverted, only the repeated words will appear".filterRepeat(true).out()

/*
    superimpose(txt2, delineate = ' ')
    -----------------------------------------
    superimpose will replace all 
    non-whitespace characters of the first 
    document with the second.
*/

"lay two texts on top of each other".superimpose("THE TEXT ON TOP").out()

/*
    interleave(txt2, amount = 1.0, words = false)
    -----------------------------------------
    interleave will output a string that 
    alternates the characters(or words) 
    between two texts. If a second argument 
    is provided, it will alternate between 
    the texts at the given percentage.
*/

"you can perform text weaving"
    .interleave("to get interesting combinations of material", 1.0, true)
    .out()

/*
    reverse(words = true)
    -----------------------------------------
    reverse will reverse the order of the 
    words in a string.

    by passing false as an argument, it will
    reverse individual characters instead.
*/
"you can read forward or backwards".reverse().out()
"you can read forward or backwards".reverse(true).out()

/*
    scramble(words = true)
    -----------------------------------------
    scramble will mix up all of the words or
    individual characters of a string.
*/
"some text is better scrambled".reverse().out()
"some text is better scrambled".reverse(true).out()

/*
    random(arr = txt)
    -----------------------------------------
    the random command can be used to select 
    a random element from an array.

    this means you can select texts at random
        random(txt).decimate(0.2)

    or use it to generate a random number
        txt[0].decimate(random([0.0,0.5]))

    if no arguments are passed, it will get 
    the txt array by default.
*/
random(
    [
        "anything can be passed as an array",
        "it can work on text and on numbers".decimate(random([0.1,0.8]))
    ]
).out();

/* for example
random(txt)
    .reverse(true)
    .interleave(random(txt), , true)
    .out()
*/

/*
    palimpsest was made in 2020
    
    by austin słominski
    @aceslowman (on twitter, ig)
    austin@aceslowman.com

    this project was inspired by
    live coding tools like:

    hydra (by Olivia Jack)
        https://github.com/ojack/hydra

    orca (by hundredrabbits)
        https://github.com/hundredrabbits/Orca

    TidalCycles
        https://tidalcycles.org

*/`