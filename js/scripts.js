
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
        } else if (!$(this).hasClass("clicked-on")){
          $(this).addClass("flag");
        } else {
          $(this).addClass("flag");
        }
      }
    }

  });
});
