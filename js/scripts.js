function Cell(bomb) {
  this.isBomb = bomb;
  this.adjValue = 0;
}

var a0 = new Cell(false);
var a1 = new Cell(false);
var a2 = new Cell(true);
var b0 = new Cell(false);
var b1 = new Cell(true);
var b2 = new Cell(false);
var c0 = new Cell(false);
var c1 = new Cell(false);
var c2 = new Cell(false);

var a = [a0, a1, a2];
var b = [b0, b1, b2];
var c = [c0, c1, c2];
var gameRows = [a, b, c];
var width = a.length;

$(document).ready(function() {
  var stateOfGame = true;
  $(".minesweeper-game").contextmenu(function() {
    return false;
  });
  $(".cell").mousedown(function(event) {
    if (stateOfGame === true) {
      switch (event.which) {
        case 1:
        if ($(this).hasClass("has-bomb")){
          $(".flag").removeClass("flag");
          $(".has-bomb").addClass("bomb-clicked");
          stateOfGame = false;
          console.log(stateOfGame);
        } else {
          $(this).addClass("clicked-on");
        }
        break;

        case 3:
        if ($(this).hasClass("flag")) {
          $(this).removeClass("flag")
        } else if ($(this).hasClass("clicked-on")){
          break;
        } else {
          $(this).addClass("flag");
        }
      }
    }

  });
});
