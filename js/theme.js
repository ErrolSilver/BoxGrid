function boxExpand() { 
  /*
  var $boxHead = $('.boxHead'); 
  var $boxHeads = $.makeArray($boxHead);
  var $boxContent = $('.boxContent');
  var $boxContents = $.makeArray($boxContent);

  $($boxContents).detach().prependTo('.row');
  $($boxHeads).detach().prependTo('.row');
  $('.boxContain').remove();


  console.log($boxHeads);
*/
  $('.boxContent').addClass('hidden')
  $('.boxContain').click(function() {
    var $activeBox = $(this).children('.boxContent');
    $('.boxContent').not($activeBox).addClass('hidden');
    $activeBox.toggleClass('hidden');
  });
}

$(document).ready(function (){
  boxExpand();
});