$(document).on('ready', function() {



  $('.add-on').click(function(){

    $('.dropdown-menu').toggle();

  });

   jQuery('.post').addClass("").viewportChecker({

    classToAdd: 'visible animated bounceInLeft',

      offset: 100    

     }); 

     jQuery('.post1').addClass("").viewportChecker({

      classToAdd: 'visible animated bounceInUp',

    offset: 100    

     }); 

     jQuery('.post2').addClass("").viewportChecker({

    classToAdd: 'visible animated fadeInDown',

    offset: 100    

     }); 

     jQuery('.post3').addClass("").viewportChecker({

    classToAdd: 'visible animated flipInX',

    offset: 100    

   }); 

     jQuery('.post4').addClass("").viewportChecker({

    classToAdd: 'visible animated bounceInDown',

    offset: 100    

   }); 

     jQuery('.post5').addClass("").viewportChecker({

    classToAdd: 'visible animated bounceInRight',

      offset: 100    

     });


	 

     

});

$(function(){
  $(window).scroll(function(){
     if ($(window).scrollTop() >= 50) {

            $(".header").addClass("darkHeader");

        } else {

            $(".header").removeClass("darkHeader");

        }
  });

  $('.about-slider, .news-slider').slick({
  dots: true,
  infinite: false,
  speed: 300,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
  $('.product-slider').slick({
  dots: false,
  infinite: false,
  speed: 300,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
  
   $('.category-slider').slick({
  dots: true,
  infinite: false,
  speed: 300,
  arrows: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

  
   $('.review-slide').slick({
  dots: false,
  infinite: false,
  speed: 300,
  arrows: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
  
   //Slick slider initialize
        $('.product-slide').slick({
          arrows:false, dots: true, infinite:true, speed:500,
          autoplay:false, autoplaySpeed: 3000, slidesToShow:1, slidesToScroll:1
        });
        //On click of slider-nav childern,
        //Slick slider navigate to the respective index.
        $('.slider-nav > div').click(function() {
          $('.product-slide').slick('slickGoTo',$(this).index());
        })
$('.guide-btn button').on('click',function(){
  var mainHref = $(this).data('href');

  $(".length-properties").removeClass('active-length');

  $(".length-properties").each(function(){
    if($(this).attr('id') == mainHref)
    {
      $(this).addClass('active-length');
    }
  })

  $(".guide-btn button").removeClass('active-btn');

  $(this).addClass('active-btn');
})
  
})


