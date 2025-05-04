"use strict";

var playing = true;

var volume = 100;
var deltaVolume = 10;

var repeatMode = 1;

var shuffle = true;

document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("keydown", function(e) {
    switch (e.key) {
    // Spacebar
    case " ":
      if (playing)
        SCM.pause();
      else
        SCM.play();
      playing = !playing;
      break;
    // Left arrow
    case "ArrowLeft":
      SCM.previous();
      break;
    // Right arrow
    case "ArrowRight":
      SCM.next();
      break;
    // Up arrow
    case "ArrowUp":
      volume = Math.min(100, volume + deltaVolume);
      SCM.volume(volume);
      break;
    // Down arrow
    case "ArrowDown":
      volume = Math.max(0, volume - deltaVolume);
      SCM.volume(volume);
      break;
    // 'R' key
    case "r":
    case "R":
      switch(repeatMode) {
      case 1:
        repeatMode = 2;
        SCM.repeatMode(repeatMode);
        alert("Now repeating the current song.");
        break;
      case 2:
        repeatMode = 1;
        SCM.repeatMode(repeatMode);
        alert("Now playing the list.");
        break;
      }
      break;
    // 'S' key
    case "s":
    case "S":
      shuffle = !shuffle;
      SCM.isShuffle(shuffle);
      alert("Now the playlist will be played "
        + (shuffle ? "randomly." : "in order."));
      break;
    }
  });
});
