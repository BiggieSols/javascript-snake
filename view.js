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
  this.SPEED = 100;
};

View.prototype.run = function() {
  this.render();
  this.interval = setInterval(this.step.bind(this), this.SPEED)
};

View.prototype.step = function() {
  this.board.snake.move();
  this.board.checkAppleEaten();
  this.board.updateGrid();

  this.render();
  this.checkGameOver()
};

View.prototype.checkGameOver = function() {
  if(this.board.checkGameOver()) {
    clearInterval(this.interval);
    alert("sorry, you lose!");
    return true;
  }
};

View.prototype.render = function() {
  this.clearCellClasses();
  for(var i = 0; i < this.board.DIMENSION; i++) {
    for(var j = 0; j < this.board.DIMENSION; j++) {
      this.updateCellClass(i, j);
    }
  }
  this.renderSnake();
  this.renderScore();
};

View.prototype.renderSnake = function() {
  var that = this;

  var segs = this.board.snake.segments;
  var greenStartVal = 255;
  var greenEndVal = 100;
  var interval = Math.floor((greenEndVal - greenStartVal) / segs.length);
  segs.forEach(function(seg) {
    var childNum = (seg[0]*20 + seg[1] + 1);
    $('.wrapper > :nth-child(' + childNum +')')
      .css('background-color', 'rgb(0,'+ greenStartVal + ',0');
    greenStartVal += interval;
  })


}

View.prototype.renderScore = function() {
  var start = parseInt($('#score').text().replace(",", ""))
  var end = this.board.score

  // Animate the element's value from x to y:
  $({score: start}).animate({score: end}, {
      duration: 100,
      step: function() { 
          $('#score').text(commaSeparateNumber(Math.round(this.score)));
      }
  });

  function commaSeparateNumber(val){
    var valArr = val.toString().split("");
    var len = valArr.length;
    for(var i = 3; i < len; i += 3) {
      valArr.splice(len - i, 0, ",");
    }
    return valArr.join("");
  }
};


View.prototype.clearCellClasses = function() {
  $('.cell').attr('class', 'cell');
  $('.cell').css('background-color', '');
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
    case "SS":
      classToAdd = "snakeOverlap"
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