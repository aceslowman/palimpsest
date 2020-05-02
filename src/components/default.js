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

"palimpsest is a text manipulation toolkit".scramble(false).toAscii(1457).out('h1')

"it allows you to send text through a number of processes, which are defined at the bottom of this page".toAscii(1457).out();

"METHODS".style('h2').out()

"decimate(amount, substitute = '-')".decimate(0.8).out()

"filterRepeat(invert = false)".filterRepeat().out()

"superimpose(txt2, delineate = ' ')".superimpose("      _SUPERIMPOSITION_").out()

"weave(txt2, type = 'c', rhythm = 1.0)".weave("a string to weave with").out()

"reverse(words = true)".reverse().out()

"scramble(words = true)".scramble(false).out()

"alphabetize(words = true)".alphabetize().out()

"sortLength()".sortLength().out()

"isolate(match = '', words = true, invert = false)".isolate('match').out()

"stanza(nlines = 2, split = '.')".stanza().out()

"random(arr = txt)".weave(random(["other","strings"])),out()

"out()".out()

/*
    palimpsest was made in 2020
    
    by austin słominski
    @aceslowman (on twitter, ig)
    austin@aceslowman.com

    the code for this project is 
    located at it's github page
    https://github.com/aceslowman/palimpsest

    this project was inspired by
    live coding tools like:

    hydra (by Olivia Jack)
        https://github.com/ojack/hydra

    orca (by hundredrabbits)
        https://github.com/hundredrabbits/Orca

    TidalCycles
        https://tidalcycles.org

*/`