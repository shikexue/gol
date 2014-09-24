// a cell object
var Cell = function(x, y, random) {
	// we use false to indicate dead whereas true indicates alive.
	if (random) {
		var state = Math.random() > .5;
		var nextState = state;
	} else {
		state = false;
		nextState = false;
	}
	var div = document.createElement("td");

	div.onclick = function() {
		state = !state;
		output.redraw();
	}

	var output = {
		get_x : function() {
			return x;
		},
		get_y : function() {
			return y;
		}, 
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
				div.style.backgroundColor = 'black';
			} else {
				div.style.backgroundColor = 'white';
			}
		},
		get_div : function() {
			return div;
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

	function initialize() {
		for (var i = 0; i < height; i += 1) {
			cells[i] = [];
			for (var j = 0; j < width; j += 1) {
				// we must call Cell(j, i) because we iterate through
				// height using i and width using j.
				cells[i][j] = Cell(j, i, random);
			}
		}
	}
	initialize()

	var output = {
		alive_neighbors : function(x, y) {
			var count = 0;
			// iterate 
			for (var i = -1; i <= 1; i += 1) {
				var adjX = x + i;
				if (adjX >= 0 && adjX < width) {
					for (var j = -1; j <= 1; j += 1) {
						var adjY = y + j;
						if (!(i == 0 && j == 0) && adjY >= 0 && adjY < height && 
							cells[adjX][adjY].get_state()) {
								count += 1;
						}
					}
				}
			}
			return count;
		},
		step : function() {
			var update = [];
			for (var i = 0; i < width; i += 1) {
				for (var j = 0; j < height; j += 1) {
					var current_cell = cells[i][j];
					var count = output.alive_neighbors(i, j);
					//cells become alive if they were dead and had 3 neighbors
					//or alive and had 2 or 3 neighbors
					if (count == 3 || (count == 2 && current_cell.get_state())) {
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
			if (current_board != null) {
				container.replaceChild(dom_board, current_board);
			} else {
				container.appendChild(dom_board);
			}
			container.appendChild(dom_board);

			for (var i = 0; i < height; i += 1) {
				var row = document.createElement("tr");
				dom_board.appendChild(row);

				for (var j = 0; j < width; j += 1) {
					row.appendChild(cells[i][j].get_div());
				}
			}
		}
	}
	return output;
}



b = Board(20, 20, "output");
b.draw();