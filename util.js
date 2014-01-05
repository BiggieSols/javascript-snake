Array.prototype.equals = function(otherArr) {
  if(this.length !== otherArr.length) {
    return false;
  }

  for(var i = 0; i < this.length ; i++) {
    if(this[i] !== otherArr[i]) {
      return false;
    }
  }
  return true;
}

Array.prototype.includesArr = function(otherArr) {
  for(var i = 0; i < this.length; i++) {
    if(_.isEqual(this[i], otherArr)) {
      return true;
    }
  }
  return false;
}