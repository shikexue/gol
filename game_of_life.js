
var Board = function(height, width) {
	// create the pad object for drawing to
	var pad = Pad(document.getElementById('canvas'));
	pad.clear();

	// define the variables which determine the size of the grid.
	var default_width = 50;
	var default_height = 50;
	width = (width) ? width : default_width;
	height = (height) ? height : default_height;

	// begin by instantiating our grid with values,with a random initial configuration
	// our grid starts with 0, 0 in the top left corner and contains the state of the square
	var grid = [];
	for (var i = 0; i < width; i++) {
		grid[i] = [];
		for (var j = 0; j < height; j++) {
			grid[i][j] = [Math.round(Math.random()), -1];
		}
	}

	// draw the grid
	for (var i = 0; i <= width; i++) {
		var drawPoint = i/width * pad.get_width();
		pad.draw_line(Coord(drawPoint, 0), Coord(drawPoint, pad.get_height()), .5, Color(0, 0, 0));
	};
	for (i = 0; i <= height; i++) {
		var drawPoint = i/height * pad.get_height();
		pad.draw_line(Coord(0, drawPoint), Coord(pad.get_width(), drawPoint), .5, Color(0, 0, 0));
	};

	// define a helper function to redraw cell squares based on grid
	var redraw = function() {
		for (i = 0; i < width; i++) {
			for (j = 0; j < height; j++) {
				if (grid[i][j][0] === 1) {
					var fillColor = Color(100, 0, 0);
				} else {
					fillColor = Color(256, 256, 256);
				}
				pad.draw_rectangle(Coord(i * pad.get_width()/width, j * pad.get_height()/height), 
						pad.get_width()/width, pad.get_height()/height, .5, Color(0, 0, 0), fillColor);
			}
		}
	}
	
	redraw();

	return {
		getCurrentState: function(i, j) {
			return grid[i][j][0];
		},
		step: function() {
			for (i = 0; i < width; i++) {
				for (j = 0; j < height; j++) {
					var count = 0;
					for (var adjWidth = -1; adjWidth <= 1; adjWidth++) {
						for (var adjHeight = -1; adjHeight <= 1; adjHeight++) {
							if (adjWidth != 0 || adjHeight != 0 ) {
								var newI = i + adjWidth;
								var newJ = j + adjHeight;
								if (newI >= 0 && newI < width && newJ >= 0 && newJ < height){
									count += grid[newI][newJ][0];
								}
							}
						}
					}
					if (grid[i][j][0] == 0) {
						if (count == 3) {
							grid[i][j][1] = 1;
						}
					} else {
						if (count < 2 || count > 3) {
							grid[i][j][1] = 0;
						} else {
							grid[i][j][1] = 1;
						}
					}
				}
			}

			for (i = 0; i < width; i++) {
				for (j = 0; j < width; j++) {
					grid[i][j][0] = grid[i][j][1];
				}
			}

			redraw();
		}
	}
}

var myBoard = Board(75, 75);
var iterate = function() {
	setTimeout(myBoard.step, 500);
	iterate();
}
iterate();