function Board() {
  this.snake = new Snake();
  this.apples = [[10, 10]];
  this.DIMENSION = 20;
  this.grid = this.createGrid();
  this.updateGrid();
}

Board.prototype.createGrid = function() {
  var newGrid = [];
  for(var i = 0; i < this.DIMENSION; i++) {
    newGrid.push(new Array(this.DIMENSION));
  }
  return newGrid;
}

Board.prototype.clearGrid = function() {
  for(var i = 0; i < this.DIMENSION; i++) {
    for(var j = 0; j < this.DIMENSION; j++) {
      this.grid[i][j] = ""
    }
  }
}

Board.prototype.updateGrid = function() {
  this.clearGrid()
  for(var i = 0; i < this.DIMENSION; i++) {
    for(var j = 0; j < this.DIMENSION; j++) {
      this.fillCell(i, j);
    }
  }
}

Board.prototype.fillCell = function(i, j) {
  var that = this;
  that.snake.segments.forEach(function(seg){
    if(seg[0] === i && seg[1] === j) {
      that.grid[i][j] += "S"
    }
  })

  that.apples.forEach(function(apple){
    if(apple[0] === i && apple[1] === j) {
      that.grid[i][j] += "A"
    }
  })
}

// b = new Board();
// b.updateGrid();
// console.log(b.grid)