$(document).ready(function() {
  v = new View();
  for(var i = 0; i < Math.pow(v.board.DIMENSION, 2); i++) {
    $('.wrapper').append('<div class="cell"></div>')  
  }
  v.run();

  $(window).on('keydown', function(event) {
    v.handleKeyEvent(event)
  })
})

function View() {
  this.board = new Board();
};

View.prototype.run = function() {
  this.render();
  this.interval = setInterval(this.step.bind(this), 200)
};

View.prototype.step = function() {
  this.board.snake.move();
  this.board.updateGrid();
  this.board.checkAppleEaten();
  this.render();
  console.log(this.board.snake.justAteApple)
};

View.prototype.render = function() {
  this.clearCellClasses();
  for(var i = 0; i < this.board.DIMENSION; i++) {
    for(var j = 0; j < this.board.DIMENSION; j++) {
      this.updateCellClass(i, j);
    }
  }
};

View.prototype.clearCellClasses = function() {
  $('.cell').attr('class', 'cell');
};

View.prototype.updateCellClass = function(row, col) {
  var classToAdd;
  switch(this.board.grid[row][col]) {
    case "S":
      classToAdd = "snake"
      break;
    case "SA":
      classToAdd = "snake"
      break;
    case "A":
      classToAdd = "apple"
      break;
  }

  if(classToAdd) {
    // sets the relationship between the grid coordinate and child div
    var childNum = (row * 20 + col) + 1
    $('.wrapper > :nth-child(' + childNum +')').addClass(classToAdd);
  }
};

View.prototype.handleKeyEvent = function(event) {
  var newDir;

  switch(event.keyCode){
    case 37:
      newDir = 'W';
      break;
    case 38:
      newDir = 'N';
      break;
    case 39:
      newDir = 'E';
      break;
    case 40:
      newDir = 'S';
      break;
    }

  if(newDir) {
    this.board.snake.turn(newDir);    
  }
};