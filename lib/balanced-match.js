module.exports = balanced;
function balanced(a, b, str) {
  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0], r[1] + b.length),
    post: str.slice(r[1] + b.length)
  };
}

balanced.range = range;
function range(a, b, str) {
  var level = 1;
  var start = str.indexOf(a);
  if (start < 0) {
    return null;
  }
  var index = start + a.length;
  while(index < str.length) {
    var ai = str.indexOf(a, index);
    var bi = str.indexOf(b, index);
    if (bi > 0 && (ai < 0 || bi < ai)) {
      if (--level == 0) {
        return [start, bi]
      }
      index = bi + b.length
    }
    else if (ai > 0 && (bi < 0 || ai < bi)) {
      level ++
      index = ai + a.length
    }
    else {
      break;
    }
  }
  return null;
}
