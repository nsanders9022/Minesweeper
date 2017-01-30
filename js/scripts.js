$(document).ready(function() {
  $(".cell").click(function() {
    if ($(this).hasClass("has-bomb")){
      $(this).addClass("bomb-clicked");
    } else {
      $(this).addClass("clicked-on");
    }
  })
})
