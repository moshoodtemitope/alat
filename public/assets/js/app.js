$(document).ready(function(){
	$('#nav-icon1').click(function(){
      $(this).toggleClass('open');
      $('.hr-nav-header').fadeToggle();
    });

	$(function() {
		$('.acct-match').matchHeight();
	});

	$(function(){
	  $('.bxslider').bxSlider({
	    mode: 'horizontal',
	    captions: true,
	    slideWidth: 600
	  });
	});

    
});