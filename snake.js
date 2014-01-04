function Snake() {
  this.segments = [[3, 4], [3, 5], [3, 6], [3, 7]];
  this.currentDir = "S";
  this.nextDir = "S"
  this.justAteApple = false;
};

Snake.prototype.move = function() {
  if(this.justAteApple) {
    this.eatApple();
  } else {
    this.moveBody();  
  }
  this.moveHead();
};

Snake.prototype.moveBody = function() {
  var len = this.segments.length - 1;
  for(var i = 0; i < this.segments.length - 1; i++) {
    this.segments[len - i] = this.segments[len - (i + 1)].slice();
  }  
};

Snake.prototype.moveHead = function() {
  var dirCoords = this.getDirection(this.nextDir);
  this.segments[0][0] += dirCoords[0];
  this.segments[0][1] += dirCoords[1];
  this.currentDir = this.nextDir;
};

Snake.prototype.eatApple = function() {
  var appleLocation = this.segments[0].slice();
  this.segments.unshift(appleLocation);
  this.justAteApple = false;
}

Snake.prototype.turn = function(newDir) {
  var that = this;
  var invalidTurns = [['N', 'S'], ['S', 'N'], ['E', 'W'], ['W', 'E']];
  var validMove = true;
  invalidTurns.forEach(function(turn) {
    if(that.currentDir === turn[0] && newDir === turn[1]) {
      validMove = false;
    }
  })

  if(validMove) { 
    this.nextDir = newDir; 
  }
};

Snake.prototype.getDirection = function() {
  switch(this.nextDir) {
    case "N":
      return [-1, 0];
    case "S":
      return [1, 0];
    case "E":
      return [0, 1];
    case "W":
      return [0, -1];
  }
};

Snake.prototype.isOverlapping = function() {
  for(var i = 1; i < this.segments.length; i++) {
    if(_.isEqual(this.segments[i], this.segments[0])) {
      return true
    }
  }
  return false;
};