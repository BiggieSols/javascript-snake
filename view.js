$(document).ready(function() {
  v = new View();
  for(var i = 0; i < Math.pow(v.board.DIMENSION, 2); i++) {
    $('.wrapper').append('<div class="cell"></div>')  
  }

  v.render();
  v.board.snake.move();
  v.step();
})

function View() {
  this.board = new Board()
}

View.prototype.step = function() {
  this.board.snake.move();
  this.board.updateGrid();
  this.render();
}

View.prototype.render = function() {
  console.log(this.board.grid[1])
  for(var i = 0; i < this.board.DIMENSION; i++) {
    for(var j = 0; j < this.board.DIMENSION; j++) {
      this.updateCellClass(i, j)
    }
  }
}

View.prototype.updateCellClass = function(row, col) {
  var classToAdd;
  switch(this.board.grid[row][col]) {
    case "S":
      // console.log("snake at [" + row + ", " + col + "]" )
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
}