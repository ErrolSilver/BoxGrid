(function ($) {
  var $rowItem,
      $boxes = $('div.boxContain'),
      $activeContain,
      $activeWrap,
      $activeBox,
      $activeHead,
      $containDistance,
      i;

  function boxWrap() {
    var onResize = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = "ID already in use";
        }
        if (timers[uniqueId]) {
          clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
      }
    })();

    $(window).resize(function() {
      var $rowItem = Math.ceil($('.wrapper').innerWidth() / $('.boxHead').outerWidth(true));
      console.log($rowItem);
      onResize(function() {
       $boxes.unwrap();
        setTimeout(function () {
          for (i = 0; i < $boxes.length; i += $rowItem) {
            $boxes.slice(i, i + $rowItem).wrapAll('<div class="boxWrapper"></div>')
          }
        },1);
        
      }, 2, 'box wrap');
      $('.boxContent').addClass('notShown');
    });



  }

  function boxExpand() {
    var $rowItem = Math.floor($('.wrapper').innerWidth() / $('.boxHead').outerWidth(true));

    for (i = 0; i < $boxes.length; i += $rowItem) {
      $boxes.slice(i, i + $rowItem).wrapAll('<div class="boxWrapper"></div>')
    }

    // hide all boxcontents
    $('.boxContent').addClass('notShown');


    $('.boxHead').click(function () {
      $activeContain = $(this).parent('.boxContain');
      $activeWrap = $activeContain.parent('.boxWrapper');
      $activeBox = $activeContain.children('.boxContent');
      $activeHead = $activeContain.children('.boxHead');

    // shows clicked box content, hides others
      $activeBox.toggleClass('notShown');
      $('.boxContent').not($activeBox).addClass('notShown');

    // adds space for content to appear, removes if inactive

      $activeWrap.velocity({
        "margin-bottom":  $activeBox.outerHeight()
      }, 200);
      $activeWrap.css("margin-bottom", $activeBox.outerHeight());
      
      //$('.boxWrapper').not($activeWrap).css('margin-bottom', 0);


      // places content depending on which "row" of headers it falls into
      $containDistance = $activeHead.position();

      $activeBox.velocity({
        top: $containDistance.top + $activeHead.outerHeight()
      }, 200);
      //$activeBox.css('top', $containDistance.top + $activeHead.outerHeight());
    });
  }
  boxWrap();
  boxExpand();
}(jQuery));
