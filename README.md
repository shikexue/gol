proj1
=====
Game of Life

Grading Directions:
  Directions: View the project by opening drawing.html in a web browser.
    Click on a cell to change its state from dead to alive or from alive to dead.
    To modify the height or width settings, change the numbers and then click Empty Board or
    Random Board to create a new board with the appropriate dimensions which are either all dead
    to begin with or with randomly generated cell states. The rules for cell life and death
    can be modified by using the drop down menus to add or remove new counts to the appropriate 
    lists of counts.
  Highlights: The additional features that are implemented are the ability to modify 
    original rules for the Game of Life such that different counts of alive neighbors
    can also yield new cells being born or also result in existing cells continuing to
    exist instead of dying out. Additionally, this version supports boards of varying 
    sizes, although because there is no really good way to change the sizes of the cells,
    very large boards aren't really recommended.
  Help wanted: I'm unsure of how to actually include test cases for the HTML other than just
    manually testing by viewing the resulting web page. Additionally, I don't have very much
    experience with CSS yet, so making a web page that is more aesthetically pleasing is 
    more difficult. There is probably also a better way to transform the size of the table
    other than simply rebuilding the HTML and replacing the old table, but this seemed like
    the easiest, albeit not most efficient method.
Programming:
  Basic Coding: Again, I've coded in order to conform to programming conventions whenever
    possible. The data structures designed in javascript do not call "this". I'm not sure
    whether there are other conventions for using HTML IDs, but I've tried to use appropriately
    named ones whereever possible. 
  Modularity: The code is perhaps lacking in modularity in that it is all confined to a single
    file, but there is a single primary data structure, which is the Board. Because the Board 
    meaningfully handles everything related to actually running the Game of Life, it didn't
    seem unreasonable to represent it this way.
Design:
  Challenges: The main design concern was finding an appropriate data structure to handle the 
    running of the board as well as the display of the board. Using a table of cells that are 
    identically sized seemed like a reasonable representation, especially since table elements
    can have their background color be changed in order to represent cells that are alive or dead.
    The data structure of the Game in javascript is handled using two classes: a Board which 
    contains a matrix of Cells. The Board handles building the HTML representation of a Table, 
    using Cells to maintain the background color of its own corresponding cell in HTML as a <td>.