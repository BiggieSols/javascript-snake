function Board() {
  this.snake = new Snake();
  this.apples = [[10, 10]];
  this.DIMENSION = 20;
  this.grid = this.createGrid();
  this.updateGrid();
};

Board.prototype.checkGameOver = function() {

}

Board.prototype.checkAppleEaten = function() {
  var that = this;
  var snakeHead = that.snake.segments[0]
  this.apples.forEach(function(apple) {
    if(_.isEqual(snakeHead, apple)) {
      that.snake.justAteApple = true;
      that.removeApple(apple)
    }
  })
}

Board.prototype.removeApple = function(appleToRemove) {
  for(var i = 0; i < this.apples.length; i++) {
    var apple = this.apples[i];
    if(_.isEqual(appleToRemove, apple)) {
      this.apples.splice(i, 1);
      this.generateApple();
    }
  }
}

Board.prototype.generateApple = function() {
  var xCoord = Math.floor(Math.random() * this.DIMENSION);
  var yCoord = Math.floor(Math.random() * this.DIMENSION);
  var newApple = [xCoord, yCoord];
  var validPos = true;

  if(_.include(this.snake.segments, newApple)) {
    validPos = false;
  }

  if(_.include(this.apples, newApple)) {
    validPos = false;
  }

  if(validPos) {
    this.apples.push(newApple);
    console.log("new apple added at: " + newApple)
  } else {
    generateApple();
  }

}

Board.prototype.createGrid = function() {
  var newGrid = [];
  for(var i = 0; i < this.DIMENSION; i++) {
    newGrid.push(new Array(this.DIMENSION));
  }
  return newGrid;
};

Board.prototype.clearGrid = function() {
  for(var i = 0; i < this.DIMENSION; i++) {
    for(var j = 0; j < this.DIMENSION; j++) {
      this.grid[i][j] = "";
    }
  }
};

Board.prototype.updateGrid = function() {
  this.clearGrid();
  for(var i = 0; i < this.DIMENSION; i++) {
    for(var j = 0; j < this.DIMENSION; j++) {
      this.fillCell(i, j);
    }
  }
};

Board.prototype.fillCell = function(i, j) {
  var that = this;
  that.snake.segments.forEach(function(seg){
    if(seg[0] === i && seg[1] === j) {
      that.grid[i][j] += "S";
    }
  })

  that.apples.forEach(function(apple){
    if(apple[0] === i && apple[1] === j) {
      that.grid[i][j] += "A";
    }
  })
};

// b = new Board();
// b.updateGrid();
// console.log(b.grid)