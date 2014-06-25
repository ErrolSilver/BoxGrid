function boxExpand() { 
  $('.boxContent').addClass('hidden');


  $('.boxContain').click(function() {
    var $activeContain = $(this);
    var $activeBox = $(this).children('.boxContent');
    var $activeHead = $(this).children('.boxHead');
    var $containDistance = $activeHead.position();
    $activeBox.toggleClass('hidden');


    $('.boxHead').not($activeHead).css('margin-bottom', 0);
    $('.boxContent').not($activeBox).addClass('hidden');


    $boxSpacing = $activeBox.height();


    $activeBox.css('top', $containDistance.top + $activeHead.outerHeight());


    $activeHead.css("margin-bottom", $activeBox.outerHeight());
    
    console.log($activeHead.position());







  });
}

$(document).ready(function (){
  boxExpand();
});