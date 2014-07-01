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
      var $rowItem = Math.floor($('.wrapper').innerWidth() / $('.boxHead').outerWidth(true));
      console.log($rowItem);
      onResize(function() {
       // $boxes.parent('div.boxWrapper').remove();
        /*
        for (i = 0; i < $boxes.length; i += $rowItem) {
          $boxes.slice(i, i + $rowItem).wrapAll('<div class="boxWrapper"></div>')
        }
        */
        
      }, 100, 'box wrap');
    });



  }

  function boxExpand() {
    var $rowItem = Math.floor($('.wrapper').innerWidth() / $('.boxHead').outerWidth(true));

    for (i = 0; i < $boxes.length; i += $rowItem) {
      $boxes.slice(i, i + $rowItem).wrapAll('<div class="boxWrapper"></div>')
    }

    //hide all boxcontents
    $('.boxContent').addClass('hidden');


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
  boxWrap();
  boxExpand();
}(jQuery));
