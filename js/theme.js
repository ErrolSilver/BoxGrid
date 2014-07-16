(function ($) {
  'use strict';
  var $rowItem,
      $boxes = $('div.boxContain'),
      $activeContain,
      $activeWrap,
      $activeBox,
      $activeHead,
      $containDistance,
      $boxIndex,
      $savedHeights = [],
      i;

  // Stores content height for use as margin later
  $('.boxContent').each(function() {
    $savedHeights.push($(this).outerHeight(true));
  });

  function boxWrap() {

    // Re-Usable function that fires only once the window is done resizing
    var onResize = (function () {
      var timers = {};
      return function (callback, ms, uniqueId) {
        if (!uniqueId) {
          uniqueId = "ID already in use";
        }
        if (timers[uniqueId]) {
          clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
      }
    })();


    $(window).resize(function() {
      // sets rowItem to according to window size
      var $rowItem = Math.ceil($('.wrapper').innerWidth() / $('.boxHead').outerWidth(true));

      onResize(function() {

      // Removes existing wrapper
       $boxes.unwrap();

       // Applies new wrapper
        setTimeout(function () {
          for (i = 0; i < $boxes.length; i += $rowItem) {
            $boxes.slice(i, i + $rowItem).wrapAll('<div class="boxWrapper"></div>')
          }
        },1); // Staggers the wrapping and unwrapping  
      }, 2, 'box wrap');

      // Hides any open content on resize
      $('.boxContent').css({
        height: 0,
        padding: 0
      });
    });
  }

  function boxExpand() {

    //Initial wrapping
    var $rowItem = Math.floor($('.wrapper').innerWidth() / $('.boxHead').outerWidth(true));

    for (i = 0; i < $boxes.length; i += $rowItem) {
      $boxes.slice(i, i + $rowItem).wrapAll('<div class="boxWrapper"></div>')
    }

    $('.boxWrapper').css('margin-bottom', '0');
    // Hide all box contents
    $('.boxContent').css({
      height: '0',
      padding: '0'
    });

    $('.boxHead').click(function () {
      $activeContain = $(this).parent('.boxContain');
      $activeWrap = $activeContain.parent('.boxWrapper');
      $activeBox = $activeContain.children('.boxContent');
      $activeHead = $activeContain.children('.boxHead');
      $boxIndex = $('.boxHead').index($(this));

      // Places content depending on which "row" of headers it falls into
      $containDistance = $activeHead.position();

      // Adds space so the header doesn't overlap the content
      $activeBox.css('top', $containDistance.top + $activeHead.outerHeight());



      /* Animations ----------------------------------------- */

      // Shows clicked box content, hides others;
        if ($activeWrap.css('margin-bottom') != 0) {
          $activeWrap.velocity({
            'margin-bottom': 0
          }, 100);
          $activeBox.velocity({
            'height': 0
          }, 100);
        }

        $('.boxContent').not($activeBox).velocity({
          height: 0,
          padding: 0
        }, 100);

        $activeBox.velocity({
          height:  $savedHeights[$boxIndex],
          padding: '2.5%'
        },200);

      // Adds space for content to appear, removes if inactive
        $activeWrap.velocity({
          "margin-bottom":  $savedHeights[$boxIndex]
        }, 200);
        
        $('.boxWrapper').not($activeWrap).velocity({'margin-bottom': 0}, 200);
    });

  }
  boxWrap();
  boxExpand();
}(jQuery));
