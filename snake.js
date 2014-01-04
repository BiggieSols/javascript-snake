function Snake() {
  this.segments = [[3, 4], [3, 5], [3, 6], [3, 7]];
  this.dir = "S";
};

Snake.prototype.move = function() {
  var len = this.segments.length - 1
  for(var i = 0; i < this.segments.length - 1; i++) {
    this.segments[len - i] = this.segments[len - (i + 1)].slice();
  }

  var dirCoords = this.getDirection(this.dir);

  this.segments[0][0] += dirCoords[0];
  this.segments[0][1] += dirCoords[1];
};

Snake.prototype.turn = function(newDir) {
  this.dir = newDir;
};

Snake.prototype.getDirection = function() {
  switch(this.dir) {
    case "N":
      return [-1, 0];
    case "S":
      return [1, 0];
    case "E":
      return [0, 1];
    case "W":
      return [0, -1];
  }

  Snake.prototype.eatApple = function() {

  }
};

// s = new Snake();
// console.log(s.segments)
// s.move();
// console.log(s.segments)