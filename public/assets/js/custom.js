/********************************************************
 *
 * Custom Javascript code for Flexor Bootstrap theme
 *
 *******************************************************/
$(document).ready(function() {
  // Bootstrap collapse
  $('[data-toggle="collapse"]').on({
    'click': function () {
      var $this = $(this),
          target = $this.data('target') || null;

      if ($(target).size() > 0) {
        $this.toggleClass('target-open', !$(target).hasClass('in'));
      }
    },
  });
/*FABIO INIZIO*/
$("#b1").click(function(){
   document.getElementById("b1").setAttribute("class","active"); 
 document.getElementById("b2").setAttribute("class",""); 
    $("#cont1").show();
    $("#cont2").hide();
    
});
$("#b2").click(function(){
   document.getElementById("b2").setAttribute("class","active"); 
    document.getElementById("b1").setAttribute("class",""); 
    $("#cont2").show();
    $("#cont1").hide();
});
$("#drp").click(function(){
    if(document.documentElement.clientWidth>768){
        document.getElementById("drp").setAttribute("data-toggle","");
        console.log(document.documentElement.clientWidth);
    }else{
        document.getElementById("drp").setAttribute("data-toggle","dropdown");
    }
                     
                     
                     }); 
 $("#drp1").click(function(){
    if(document.documentElement.clientWidth>768){
        document.getElementById("drp1").setAttribute("data-toggle","");
        console.log(document.documentElement.clientWidth);
    }else{
        document.getElementById("drp1").setAttribute("data-toggle","dropdown");
    }
                     
                     
                     });    


/*FABIO FINE*/
  // Tooltip & popovers
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  // Dropdowns on hover on desktop
  var navbarToggle = '.navbar-toggle'; // name of navbar toggle, BS3 = '.navbar-toggle', BS4 = '.navbar-toggler'
  $('.dropdown, .dropup').each(function() {
    var dropdown = $(this),
      dropdownToggle = $('[data-toggle="dropdown"]', dropdown),
      dropdownHoverAll = dropdownToggle.data('dropdown-hover-all') || false;
      
    // Mouseover
    dropdown.hover(function(){
      var notMobileMenu = $(navbarToggle).size() > 0 && $(navbarToggle).css('display') === 'none';
      if( ! $(this).closest('.dropdown').hasClass('open')) {
        return;
      }
      if ((dropdownHoverAll == true || (dropdownHoverAll == false && notMobileMenu))) {
        dropdownToggle.trigger('click');
      }
    })
  });

  // Background image via data tag
  $('[data-block-bg-img]').each(function() {
    // @todo - invoke backstretch plugin if multiple images
    var $this = $(this),
      bgImg = $this.data('block-bg-img');

      $this.css('backgroundImage','url('+ bgImg + ')').addClass('block-bg-img');
  });

  // jQuery counterUp
  if(jQuery().counterUp) {
    $('[data-counter-up]').counterUp({
      delay: 20,
    });
  }

  //Scroll Top link
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrolltop').fadeIn();
    } else {
      $('.scrolltop').fadeOut();
    }
  });

  $('.scrolltop').click(function(){
    $("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
  });

  // OwlCarousel
  $('[data-toggle="owlcarousel"], [data-toggle="owl-carousel"]').each(function() {
    var $this = $(this),
      owlCarouselSettings = $this.data('owlcarousel-settings') || {};

    $this.owlCarousel(owlCarouselSettings);
  });

  //initialise Stellar.js
  $(window).stellar({
    responsive: true,
  });

});
//FRANCESCO FOR 'GROUP_BY_SERV'
function mostraservizi(loc){
    $(loc).show();
}
function nascondilista(){
    document.getElementById("loc1").style.display = "none";
    document.getElementById("loc2").style.display = "none";
    document.getElementById("loc3").style.display = "none";
    document.getElementById("loc4").style.display = "none";
    document.getElementById("loc5").style.display = "none";
    
}