function boxExpand() {
  "use strict";
  var $rowItem = $('.wrapper').innerWidth() / $('.boxHead').outerWidth(true),
    $boxes = $('div.boxContain'),
    $activeContain,
    $activeWrap,
    $activeBox,
    $activeHead,
    $containDistance,
    i;

  //hide all boxcontents
  $('.boxContent').addClass('hidden');

  //wrap each "row" of divs in a wrapper to apply margin to on click
  for (i = 0; i < $boxes.length; i += $rowItem) {
    $boxes.slice(i, i + $rowItem).wrapAll('<div class="boxWrapper"></div>');
  }

  $('.boxHead').click(function () {
    $activeContain = $(this).parent('.boxContain');
    $activeWrap = $activeContain.parent('.boxWrapper');
    $activeBox = $activeContain.children('.boxContent');
    $activeHead = $activeContain.children('.boxHead');

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
boxExpand();
