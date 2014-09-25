// a cell object
var Cell = function(random) {
	// we use false to indicate dead whereas true indicates alive.
	if (random) {
		var state = Math.random() > .5;
		var nextState = state;
	} else {
		state = false;
		nextState = false;
	}
	var td = document.createElement("td");

	td.onclick = function() {
		state = !state;
		output.redraw();
	}

	var output = {
		get_state : function() {
			return state;
		},
		set_next : function(next) {
			nextState = next;
		},
		get_next : function() {
			return nextState;
		},
		update : function() {
			state = nextState;
			output.redraw();
		},
		redraw : function() {
			if (state) {
				td.style.backgroundColor = 'black';
			} else {
				td.style.backgroundColor = 'white';
			}
		},
		get_td : function() {
			return td;
		}
	}
	output.redraw();
	return output;
}

// the board object representing the array of cells and contains 
// functions that affect the overall board state.
var Board = function(width, height, containerID, random) {
	// begin by instantiating array which will hold the cells
	var cells = [];
	var container = document.getElementById(containerID);
	var stop = true;
	// true represents numbers that are accepted counts for births/staying alive
	// these are the default rules for Conway's Game of Life
	var birthNums = [false, false, false, true, false, false, false, false];
	var aliveNums = [false, false, true, true, false, false, false, false];

	function initialize() {
		for (var i = 0; i < height; i += 1) {
			cells[i] = [];
			for (var j = 0; j < width; j += 1) {
				cells[i][j] = Cell(random);
			}
		}
	}
	initialize()

	var output = {
		alive_neighbors : function(h, w) {
			var count = 0;
			// iterate 
			for (var i = -1; i <= 1; i += 1) {
				var adjH = h + i;
				if (adjH >= 0 && adjH < height) {
					for (var j = -1; j <= 1; j += 1) {
						var adjW = w + j;
						if ((!(i == 0 && j == 0) && adjW >= 0 && adjW < width) && 
							cells[adjH][adjW].get_state()) {
								count += 1;
						}
					}
				}
			}
			return count;
		},
		step : function() {
			var update = [];
			for (var i = 0; i < height; i += 1) {
				for (var j = 0; j < width; j += 1) {
					var current_cell = cells[i][j];
					var count = output.alive_neighbors(i, j);
					//cells become alive if they were dead and had 3 neighbors
					//or alive and had 2 or 3 neighbors
					if ((birthNums[count] && !current_cell.get_state()) || 
						(aliveNums[count] && current_cell.get_state())) {
						current_cell.set_next(true);
					} else {
						current_cell.set_next(false);
					}
					if (current_cell.get_state() != current_cell.get_next()) {
						update[update.length] = current_cell;
					}
				}
			}
			for (i = 0; i < update.length; i += 1) {
				update[i].update();
			}
		},
		draw : function() {
			var current_board = document.getElementById("board");
			var dom_board = document.createElement("table");
			dom_board.border = "1";
			dom_board.id = "board";
			dom_board.setAttribute("cellspacing", "0");
			dom_board.align = "center";
			if (current_board != null) {
				container.replaceChild(dom_board, current_board);
			} else {
				container.appendChild(dom_board);
			}

			for (var i = 0; i < height; i += 1) {
				var row = document.createElement("tr");
				dom_board.appendChild(row);

				for (var j = 0; j < width; j += 1) {
					row.appendChild(cells[i][j].get_td());
				}
			}
		},
		start : function() {
			stop = false;
			output.run();
		},
		run : function() {
			if (!stop) {
				output.step();
				setTimeout(output.run, 100);
			}
		},
		stop : function() {
			stop = true;
		},
		ruleEdit: function() {
			if (document.getElementById("edit").value == "add") {
				if (document.getElementById("rule").value == "birth") {
					birthNums[document.getElementById("newNumber").value] = true;
				} else {
					aliveNums[document.getElementById("newNumber").value] = true;
				}
			} else {
				if (document.getElementById("rule").value == "birth") {
					birthNums[document.getElementById("newNumber").value] = false;
				} else {
					aliveNums[document.getElementById("newNumber").value] = false;
				}
			}
			output.rewriteRules();
		}, 
		rewriteRules : function() {
			var birthElt = document.getElementById("birth");
			var birthStr = "";
			var aliveElt = document.getElementById("alive");
			var aliveStr = "";
			// 9 is technically a magic number but it represents the maximum number of
			// adjacent alive cells possible, and it seems silly to store that in
			// a global variable to only be used once.
			for (var i = 0; i < 9; i += 1) {
				if (birthNums[i]) {
					birthStr += i + ", ";
				}
				if (aliveNums[i]) {
					aliveStr += i + ", ";
				}
			}
			if (birthStr != "") {
				birthElt.innerHTML = birthStr.substring(0, birthStr.length - 2);
			} else {
				birthElt.innerHTML = "never occurs";
			}
			if (aliveStr != "") {
				aliveElt.innerHTML = aliveStr.substring(0, aliveStr.length - 2);
			} else {
				aliveElt.innerHTML = "never occurs";
			}
		}
	}
	// immediately draw new boards when they are created
	output.draw();
	output.rewriteRules();
	return output;
}

var newBoard = function(random) {
	var width = document.getElementById("width").value;
	var height = document.getElementById("height").value;
	var b = Board(width, height, "output", random);
	return b;
}
var lifeBoard = newBoard();