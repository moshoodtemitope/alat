$(document).ready(function(){
	$('#nav-icon1').click(function(){
      $(this).toggleClass('open');
      $('.hr-nav-header').fadeToggle();
    });

    $('.user-name-circle').click(function(){
      $('.mini-nav').fadeToggle(300);
    });

	$(function() {
		$('.acct-match').matchHeight();
	});

	$(function(){
	  $('.bxslider').bxSlider({
	    mode: 'horizontal',
	    slideWidth: 600
	  });
	});

    $('.saving-set').click(function(){
        $(this).next().fadeToggle();
    })


	$(function () {
        $("#abroad").click(function () {
            if ($(this).is(":checked")) {
                $(".abroad").show();
            } else {
                $(".abroad").hide();
            }
        });
    });

    $(function () {
        $(".lcard-save").click(function () {
            if ($(this).is(":checked")) {
                $(".lcard-form").show();
            } else {
                $(".lcard-form").hide();
            }
        });
    });

    $(function () {
        $("#save-purchase").click(function () {
            if ($(this).is(":checked")) {
                $(".save-purchase-form").show();
            } else {
                $(".save-purchase-form").hide();
            }
        });
    });



    
});