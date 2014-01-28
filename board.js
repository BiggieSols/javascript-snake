function Board() {
  this.snake = new Snake();
  this.apples = [];
  this.DIMENSION = 20;
  this.APPLECOUNT = 3;
  this.grid = this.createGrid();
  this.updateGrid();
  this.score = 0;
}

Board.prototype.checkGameOver = function() {
  return (this.outOfBounds() || this.snake.isOverlapping());
};

Board.prototype.outOfBounds = function() {
  var snakeHead = this.snake.segments[0];
  if(snakeHead[0] < 0 || snakeHead[0] >= this.DIMENSION ||
      snakeHead[1] < 0 || snakeHead[1] >= this.DIMENSION) {
        return true;
  }
};

Board.prototype.checkAppleEaten = function() {
  var that = this;
  var snakeHead = that.snake.segments[0];
  this.apples.forEach(function(apple) {
    if(_.isEqual(snakeHead, apple)) {
      that.snake.justAteApple = true;
      that.addPoints();
      that.removeApple(apple);
    }
  });
};

Board.prototype.addPoints = function() {
  this.score += 1000 * this.snake.segments.length;
};

Board.prototype.removeApple = function(appleToRemove) {
  for(var i = 0; i < this.apples.length; i++) {
    var apple = this.apples[i];
    if(_.isEqual(appleToRemove, apple)) {
      this.apples.splice(i, 1);

      this.generateApple();
    }
  }
};

Board.prototype.generateApple = function() {
  var xCoord = Math.floor(Math.random() * this.DIMENSION);
  var yCoord = Math.floor(Math.random() * this.DIMENSION);
  var newApple = [xCoord, yCoord];
  var validPos = true;

  if(this.snake.segments.includesArr(newApple)) {
    validPos = false;
    console.log(newApple + "at invalid position");
    console.log("snake segments: " + this.snake.segments);
  }

  if(this.apples.includesArr(newApple)) {
    validPos = false;
  }

  if(validPos) {
    this.apples.push(newApple);
  } else {
    this.generateApple();
  }
};

Board.prototype.createGrid = function() {
  var newGrid = [];
  for(var i = 0; i < this.DIMENSION; i++) {
    newGrid.push(new Array(this.DIMENSION));
  }

  for(i = 0; i < this.APPLECOUNT; i++) {
    this.generateApple();
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
  });

  that.apples.forEach(function(apple){
    if(apple[0] === i && apple[1] === j) {
      that.grid[i][j] += "A";
    }
  });
};