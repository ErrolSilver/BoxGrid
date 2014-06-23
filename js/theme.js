function boxExpand() {  
  $('.boxContent').hide();

  $('.boxContain').click(function() {
    $(this).children('.boxContent').toggle()
  });
}

$(document).ready(function (){
  boxExpand();
});