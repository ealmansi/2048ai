function AIPlayer(gameManager) {
	this.gameManager = gameManager;
	this.playing = false;
	this.customMoveFunction = null;
	this.customData = null;
	this.intervalID = null;
	
	this.startPlaying = function () {
		try {
			if (!this.playing) {
				this.playing = true;
				eval("this.customMoveFunction = "
					+ document.getElementById("ai-move-function").value.trim() + ";");
				this.customData = {};
				this.intervalID = setInterval(this.makeMove.bind(this), 100);
			}
		}
		catch(err) {
			alert(err);
			console.log(err);
			this.stopPlaying();
		}
	}

	this.makeMove = function () {
		if (!this.gameManager.over) {
			var grid = new Array(this.gameManager.grid.cells.length);
			for (var i = 0; i < this.gameManager.grid.cells.length; i++) {
				grid[i] = new Array(this.gameManager.grid.cells[0].length);
			}
			for (var i = 0; i < this.gameManager.grid.cells.length; i++) {
				for (var j = 0; j < this.gameManager.grid.cells[i].length; j++) {
					if (this.gameManager.grid.cells[i][j]) {
						grid[i][j] = this.gameManager.grid.cells[i][j].value;
					}
					else {
						grid[i][j] = 0;
					}
				};
			};
			this.gameManager.move(this.customMoveFunction(grid, this.customData));
		}
	}

	this.stopPlaying = function () {
		if (this.playing) {
			this.playing = false;
			this.customMoveFunction = null;
			this.customData = null;
			clearInterval(this.intervalID); this.intervalID = null;
		}
	}
}
