$(document).ready(function() {
  $(".cell").click(function() {
    $(this).addClass("clicked-on");
    if ($(this).hasClass("clicked-on, has-bomb")){
      $(this).addClass("bomb-clicked");
    }
  })
})
