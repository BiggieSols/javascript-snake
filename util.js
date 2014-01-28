Array.prototype.includesArr = function(otherArr) {
  for(var i = 0; i < this.length; i++) {
    if(_.isEqual(this[i], otherArr)) {
      return true;
    }
  }
  return false;
};

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
};
