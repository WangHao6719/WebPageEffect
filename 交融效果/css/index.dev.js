"use strict";

var n = 8;
var bubbles = document.querySelector('.bubbles');
bubbles.addEventListener('animationend', function (e) {
  e.target.remove();
});

function createBubbles() {
  var vw = document.documentElement.clientWidth;

  for (var i = 0; i < n; i++) {
    var bubble = document.createElement('div');
    bubble.classList.add('bubble');
    var s = Math.random() * 100 + 50;
    var x = Math.random() * (vw - s);
    var d = Math.random() * 2 + 1;
    bubble.style.setProperty('--s', "".concat(s, "px"));
    bubble.style.setProperty('--x', "".concat(x, "px"));
    bubble.style.setProperty('--d', "".concat(d, "s"));
    bubbles.appendChild(bubble);
  }
}

createBubbles();
setInterval(createBubbles, 500);