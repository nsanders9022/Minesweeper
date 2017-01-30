$(document).ready(function() {
  $(".cell").mousedown(function(event) {
    switch (event.which) {
      case 1:
      if ($(this).hasClass("has-bomb")){
        $(".has-bomb").addClass("bomb-clicked");
      } else {
        $(this).addClass("clicked-on");
      }
      break;
      case 3:
      <<<<<<< HEAD
      if (!$(this).hasClass("clicked-on")){
        $(this).addClass("flag");
      } else if ($(this).hasClass("flag")) {
        $(this).removeClass("flag")
      } else {
        $(this).addClass("flag");
      }
      >>>>>>> 47a8369b59f8aec09ba8c3e60ba68d22e03615ee
    }
  })
})
