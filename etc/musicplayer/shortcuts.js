"use strict";

var playing = true;

var volume = 100;
var deltaVolume = 10;

var repeatMode = 1;

var shuffle = true;

$(document).ready(function() {
  $(document).keydown(function(e) {
    switch (e.keyCode) {
    // Spacebar
    case 32:
      if (playing)
        SCM.pause();
      else
        SCM.play();
      playing = !playing;
      break;
    // Left arrow
    case 37:
      SCM.previous();
      break;
    // Right arrow
    case 39:
      SCM.next();
      break;
    // Up arrow
    case 38:
      volume = Math.min(100, volume + deltaVolume);
      SCM.volume(volume);
      break;
    // Down arrow
    case 40:
      volume = Math.max(0, volume - deltaVolume);
      SCM.volume(volume);
      break;
    // 'R' key
    case 82:
      switch(repeatMode) {
      case 1:
        repeatMode = 2;
        SCM.repeatMode(repeatMode);
        alert("이제 한 곡만 반복적으로 들려드립니다.");
        break;
      case 2:
        repeatMode = 1;
        SCM.repeatMode(repeatMode);
        alert("이제 목록을 재생합니다.");
        break;
      }
      break;
    // 'S' key
    case 83:
      shuffle = !shuffle;
      SCM.isShuffle(shuffle);
      alert("이제 목록의 음악들이 "
        + (shuffle ? "무작위로" : "순서대로")
        +  " 재생됩니다.");
      break;
    }
  });
});
