$(document).ready(function(){
  var logo = $('.hero__logo-image'),
      $win = $(window),
      $main = $('main'),
      $target_id = $('#header_inner'),
      $desktop = $('#desktop_nav, #mobile_bar'),
      $nav = $('#desktop_nav, #top_bar .logo, #mobile_bar'),
      navHeight = $nav.outerHeight(),
      navPos = $nav.offset().top,
      fixedClass = 'is-fixed',
      target_class = 'white';
      prevClass = '';

  if($('div').hasClass(target_class)){
     prevClass = true;
  }
    $('.menu-item').mouseover(function(){
      $nav.addClass('active');
    });
    $('.menu-item').mouseout(function(){
      $nav.removeClass('active');
    });

  $('#mobile_menu_bt--open').click(function(){
    $('#mobile_menu').show().animate({'marginLeft': '50%'}, 1000);
  });
  $('#mobile_menu_bt--close').click(function(){
    $('#mobile_menu').animate({'marginLeft': '-55%'}, 500);
    $('.submenu_list').hide();
  });

  $('#mobile_menu .sub-menu').click(function(){
    $('.submenu_list', this).slideToggle('show');
  });

  $win.on('load scroll', function() {
    var value = $(this).scrollTop();
    if ( value > navPos ) {
      $nav.addClass(fixedClass);
    } else{
        $nav.removeClass(fixedClass);
        $main.css('margin-top', '0');
        if(prevClass){
          $target_id.addClass(target_class);
        }
    }
  });


  $(document).on("click", "form[class*='klaviyo'] :button",function(e){
    coupon = $(this).text();
    if (coupon.indexOf("TRACEFAMILY10") >= 0) {
      let $textarea = $('<textarea></textarea>');
      $textarea.text(coupon);
      $(this).append($textarea);
      $textarea.select();
      document.execCommand('copy');
      $textarea.remove();
      $(this).text('COPIED!');
    }
  });

  if($('#product-detail').length){
    var content = null;
    var a = function() {
      if (content != $('.spr-form').text()) {
        if (content != null) {
            $('input[name="review[title]"]').attr('maxlength', 70);
        }
        content = $('.spr-form').text();
      }
    };
    setInterval(a, 300);
  };
});
