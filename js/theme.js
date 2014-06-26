function boxExpand() { 
  var $rowItem = $('.wrapper').innerWidth() / $('.boxHead').outerWidth(true);
  var $boxColumns = $('.boxHead').length / $rowItem;
  var $boxes = $('div.boxContain');

  //hide all boxcontents
  $('.boxContent').addClass('hidden');

  //wrap each "row" of divs in a wrapper to apply margin to on click
    for (var i = 0; i < $boxes.length; i+=$rowItem) {
      $boxes.slice(i, i+$rowItem).wrapAll('<div class="boxWrapper"></div>');
    };


  
  $('.boxHead').click(function() {
    var $activeContain = $(this).parent($('.boxContain'));
    var $activeWrap = $activeContain.parent('.boxWrapper');
    var $activeBox = $activeContain.children('.boxContent');
    var $activeHead = $activeContain.children('.boxHead');
    var $containDistance;
    
    //shows clicked box content, hides others
    $activeBox.toggleClass('hidden');
    $('.boxContent').not($activeBox).addClass('hidden');
    
    //adds space for content to appear, removes if inactive
    $activeWrap.css("margin-bottom", $activeBox.outerHeight());
    $('.boxWrapper').not($activeWrap).css('margin-bottom', 0);


    //places content depending on which "row" of headers it falls into
    $containDistance = $activeHead.position();
    $activeBox.css('top', $containDistance.top + $activeHead.outerHeight());
  });
}

$(document).ready(function (){
  boxExpand();

});