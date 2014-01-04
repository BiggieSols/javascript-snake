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