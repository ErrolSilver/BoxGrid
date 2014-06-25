function boxExpand() { 
  var $rowItem = $('.wrapper').innerWidth() / $('.boxHead').outerWidth(true);
  var $boxColumns = $('.boxHead').length / $rowItem;

  //hide all boxcontents
  $('.boxContent').addClass('hidden');

  //apply target class to last row item
  $('.boxContain:nth-child(' + $rowItem +'n)').addClass('lastBox');

  
  $('.boxHead').click(function() {
    var $activeContain = $(this).parent($('.boxContain'));
    var $activeBox = $activeContain.children('.boxContent');
    var $activeHead = $activeContain.children('.boxHead');
    
    //shows clicked box, hides others
    $activeBox.toggleClass('hidden');
    $('.boxContent').not($activeBox).addClass('hidden');
    
    //adds space for content to appear, removes if inactive

    //$activeHead.css("margin-bottom", $activeBox.outerHeight());
    //('.boxHead').not($activeHead).css('margin-bottom', 0);


    $('.boxContain').next('.lastBox').children('.boxHead').css("margin-bottom", $activeBox.outerHeight());

    //places content depending on which "row" of headers it falls into
    var $containDistance = $activeHead.position();
    $activeBox.css('top', $containDistance.top + $activeHead.outerHeight());


  });
}

$(document).ready(function (){
  boxExpand();

});