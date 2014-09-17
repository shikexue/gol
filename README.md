proj1
=====
Game of Life

Grading Directions:
  Highlights: There's nothing particularly spectacular that I feel the need 
    to point out. Every part kind of just does what it needs to in order to 
    function; the grid simply repaints itself every tick, and searches through 
    the grid to find what's changed.
  Help wanted: I'm fairly unsure of how to use qunit, because I don't 
    understand how to include test cases that rely on specific javascript files
    without calling the entirety of the javascript file in order to access the functions.
Programming:
  Basic Coding: I feel like the code is pretty straightforward and confirmed to
    most programming conventions. I had to iterate through the grid fairly frequently
    which meant a disapointing number of times that a double for-loop had to be called.
    If javascript performs similarly to the way ActionScript does, then it's probable that
    there will be a performance increase if I store each cell's neighbors in an array instead
    of calling the grid.
  Modularity: It's disappointingly not quite as extendable to the DOM version for phase 2, but
    it supports different sizes of width and height pretty well. 
  Verifications: I couldn't quite figure out how to get qunit working, but all of the checks on
    performance behavior appears to be correct.
Design:
  Challenges: The main design challenge was to design some sort of data structure as 
    well as implement a class to represent the grid for Life. A matrix of values, with
    0 representing dead cells and 1 representing alive cells was used. Additionally,
    the values are all represented by an array containing the current state as well as
    the calculated next state. This is because we can't mutate the current state while we're
    calculating which cells should live or die. Although the most correct design is probably
    making Board a completely immutable class, ease of programming outweighed the design choice here.

How to view the App:
  Open drawing.html in a browser. It randomly generates a new board every time the page is
  loaded, with each cell having a 50% probability of being alive. 
