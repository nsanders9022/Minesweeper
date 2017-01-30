$(document).ready(function() {
  $(".cell").mousedown(function(event) {
    switch (event.which) {
      case 1:
        if ($(this).hasClass("has-bomb")){
          $(this).addClass("bomb-clicked");
        } else {
          $(this).addClass("clicked-on");
        }
        break;
      case 3:
        $(this).addClass("flag");
    }
  })
})
