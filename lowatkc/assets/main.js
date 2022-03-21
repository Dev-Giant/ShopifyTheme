
$(".search-icon").click(function(e){
  
  $(".search-box").addClass("search-box-active")
  e.preventDefault();
  
});

$(".search-box").on("mouseleave" , function(){
  
  $(".search-box").removeClass("search-box-active")
  
});



var keypressSlider = document.querySelector(".slider-keypress");
var input0 = document.querySelector(".input-with-keypress-0");
var input1 = document.querySelector(".input-with-keypress-1");
var inputs = [input0, input1];


var pawry  = $('.active-filter .add-filter').html();

//  var dashPosition = pawry.indexOf("-");

var basestart;
var baseend;


if(pawry)
{

  var split = pawry.split("-");

 



 if(split[0] == 'under'  )
 {
  basestart = 0;

 }

 else if(split[0] == 'Under')
 {
  basestart = 0;
  
 }
 else
 {
  basestart = parseInt(split[0])

 }

 baseend = parseInt(split[1]);
}

else
{
  basestart = 0;
  baseend = 100;

}


var base_url = window.location.origin;

var main_url = window.location.href;

var url_match = main_url.match(/collections/g);


if (url_match)
  
{

noUiSlider.create(keypressSlider, {
 start: [basestart, baseend],
 connect: true,
 step: 0,
 range: {
   min: [0],
   '10%': [0, 100],
   '50%': [200, 100],
   max: [400]
 }
});

/* begin Inputs  */

/* end Inputs  */
keypressSlider.noUiSlider.on("update", function(values, handle) {

  values[0] = Math.round(values[0]);
  values[1] = Math.round(values[1]);
 inputs[handle].value = values[handle];


 console.log(values[0] + "  " + values[1]);



 var basevalue;

 if(values[0] < 100)
 {
   basevalue = 'under'
 }

 else
 {
   basevalue = Math.round(values[0]);
 }




 var valueUrl;
  
  var price_match = main_url.match(/price_/g);
  
  if(price_match)
  {
    var real_url = main_url.split('price_')[0];
    valueUrl = real_url + '/price_' + basevalue + "-" + Math.round(values[1]);
  }
  
  else
  {
    valueUrl = main_url + '/price_' + basevalue + "-" + Math.round(values[1]);
  }
  
  
 $('.apply-button').attr('href' , valueUrl);


 /* begin Listen to keypress on the input */
 function setSliderHandle(i, value) {
   var r = [null, null];
   r[i] = value;
   keypressSlider.noUiSlider.set(r);
 }

 // Listen to keydown events on the input field.
 inputs.forEach(function(input, handle) {
   input.addEventListener("change", function() {
     setSliderHandle(handle, Math.round(this.value));
   });

   input.addEventListener("keydown", function(e) {
     var values = keypressSlider.noUiSlider.get();
     var value = Number(Math.round(values[handle]));

     // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
     var steps = keypressSlider.noUiSlider.steps();

     // [down, up]
     var step = steps[handle];

     var position;

     // 13 is enter,
     // 38 is key up,
     // 40 is key down.
     switch (e.which) {
       case 13:
         setSliderHandle(handle, Math.round(this.value));
         break;

       case 38:
         // Get step to go increase slider value (up)
         position = step[1];

         // false = no step is set
         if (position === false) {
           position = 1;
         }

         // null = edge of slider
         if (position !== null) {
           setSliderHandle(handle, Math.round(value + position));
         }

         break;

       case 40:
         position = step[0];

         if (position === false) {
           position = 1;
         }

         if (position !== null) {
           setSliderHandle(handle, Math.round(value - position));
         }

         break;
     }
   });
 });
 /* end Listen to keypress on the input */
});
  
}


/* -------------------------------------------------------------------------
  end Style-2
* ------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------
  FAQ tabs
* ------------------------------------------------------------------------- */

$(".accordion-buttonnew").on('click',function(){
	var mainTarget = $(this).data("bs-target");
 
  
  $(".accordion-collapse").each(function(){
    
    if($(this).hasClass('show'))
       {
       	$(this).removeClass('show');
       }
  });
  
  $(mainTarget).addClass('show');
});



var good = $(".lowa-story-delivery");

if(good.length > 0)
{

  $(".breadcrumb .breadcrumb-item a").css({
    color : '#000'
  })
  
  $(".breadcrumb .breadcrumb-item a span").css({
    color : '#000'
  })
}


var isHome = $(".home-categories");

if(isHome.length > 0)
{
	$(".carousel-item").addClass("text-box-home");
  
  $(".carousel-inner").addClass("text-box-home-container");

}

console.log('doning');

$(".nav-item").mouseover(function() {
  
  var text = $(this).children().attr("href");
  
 
  
 if(text === '/collections/men')
  {
    $("#mens-submenu").addClass("mega-menu-active");
    $("#womens-submenu").removeClass("mega-menu-active");
    
    
    
  
  }
  
  else if (text === '/collections/women')
  {
  	$("#womens-submenu").addClass("mega-menu-active");
    $("#mens-submenu").removeClass("mega-menu-active");
  }
  
  else
  {
  $("#womens-submenu").removeClass("mega-menu-active");
    $("#mens-submenu").removeClass("mega-menu-active");
  }
  
  
  $(".nav-item").children().removeClass("active-link");
   $(this).children().addClass("active-link");
    
  
});

// $(".mega-menu").mouseover(function() {
  
//   $(".mega-menu").addClass("mega-menu-active");
  
// });

$(".mega-menu").mouseleave(function() {
  
  $(".mega-menu").removeClass("mega-menu-active");
   $(".nav-item").children().removeClass("active-link");
  
});


$(".btn-info").on("click",function(){
  
  $("#collapse1 .card-body").addClass("card-body-active");
  
  $(this).addClass("btn-info-active");
  
 
});


$(".alone .col-lg-3.col-md-4").each(function(i){
	if(i < 4)
    {
      $(this).css({
        display : 'block'
      });
    }
 
});


$(".last-button button").click(function(){
  $(".alone").addClass("alone-active");
})


$(".product-detail-content .slider-nav div").click(function(){
  
  var child = $(".product-detail-content .slider-nav").children();
  
  child.each(function(){
    $(this).removeClass("active-circle-div")
  });
  
  $(this).addClass("active-circle-div")
  
});





