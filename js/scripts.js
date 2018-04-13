function getContent(id){
	$('#tab-content-wrapper .tab-content').removeClass('show');
	$('#tab-content-wrapper').find(id).addClass('show');
	$('#tab-content-wrapper').find(id).parent().addClass('current');
}

$(document).ready(function(){
    
	//Flexslider
	if($.isFunction($.fn.flexslider)){ 
		$('#home-banner').flexslider({
            controlNav: true,
 			directionNav: false,
            slideshow: true,
            pauseOnHover: false
        });
	}
	

    //Header Dropdowns
	if ($(window).width() >= 1200) {
    	$('#primary-nav > li').hoverIntent(primaryNavConfig);
	}

    $('#primary-nav > li > a').each(function(){
    	var first = $(this);
		first.html(first.html().replace(/^(\w+)/, '<span>$1</span>'));
	});

	$("#primary-btn").click(function() {
		$(this).toggleClass("active");
		$("#primary-btn i").toggleClass("ion-ios-close-outline ion-android-menu"); 
    	$("#mobile-nav").slideToggle();
    	
    if ($(window).width() <= 767) {
    	$("#search-btn").removeClass("active");
    	$("#search-btn i").removeClass("ion-ios-close-outline").addClass("ion-search");
    	$("#header .searchWrap").slideUp();
		//$("#header #telephone").innerHTML("<a href="tel:18006629612">1-800-662-9612</a>");
    }
	});
		
    $("#search-btn").click(function(){
	    $(this).toggleClass("active");
		$("#search-btn i").toggleClass("ion-ios-close-outline ion-search"); 
	    $("#header .searchWrap").slideToggle();

    	$("#primary-btn").removeClass("active");
    	$("#primary-btn i").removeClass("ion-ios-close-outline").addClass("ion-android-menu");
    	$("#mobile-nav").slideUp();
    });
    
	$("#mobile-nav .close-btn").click(function() {
    	$("#primary-btn").removeClass("active");
    	$("#primary-btn i").removeClass("ion-ios-close-outline").addClass("ion-android-menu");
    	$("#mobile-nav").slideUp();
    });
    
    
    if ($(window).width() <= 767) {
/*
		$("#primary-nav > li > a i").click(function(e) {
			e.preventDefault();
			$("#primary-nav").animate({"left":"-100%"}, 500);
			$(this).parent().parent().find("nav").addClass("active").animate({"right":"-100%"}, 500);
		});
*/
	$("#primary-nav > li > a i").click(function(e) {
		e.preventDefault();
        $(this).parent().parent().siblings("li").fadeOut();
        $(this).parent().parent().find("nav").addClass("active").animate({
            "right":"0"
        });
    });
	}

	$(".back-btn").click(function() {
        $("#primary-nav > li").siblings("li").fadeIn();
		$(this).parent().removeClass("active").animate({
            "right":"-100%"
        });
		
/*
		$("#primary-nav").animate({"left":"0"}, 500);
		$(this).parent().animate({"right":"-100%"}, 500, 
		function() {
	    	$(this).removeClass("active");
		});
*/
    });
	
	
	// Sidebar Level 3 and 4 Children Fix
	if ($(window).width() >= 1200) {
		$("#secondary-nav").each(function() {
			var $this = $(this);
			if ($this.find("li.level2").length >= 1) {
				$("li.level1").addClass("hide");
				$("#secondary-nav li.level2").appendTo("#secondary-nav");
			}
			if ($this.find("li.level3").length >= 1) {
				$("li.level2").addClass("hide");
				$("#secondary-nav li.level3").appendTo("#secondary-nav");
			}
		});
	}
	
	// Shorten the size of items if there are too many
	$("#secondary-nav").each(function() {
		var $this = $(this);
		if ($this.find("> li").length > 6) {
			$this.addClass("long");
		}
	});
	$("#sidebar-left h3 a").click(function(event) { 
		event.preventDefault();
		$(this).toggleClass("active"); 
   		$("#secondary-nav").slideToggle();      
	});
	$('#tabs-menu').each(function() {
		var $this = $(this);
		if ($this.find('li').length > 5) {
			$this.addClass('long');
		}
	});
		

	//Tabbed Content
	$('#tabs-menu > li:first-of-type').addClass('current');
	$('#tab-content-wrapper > div:first-of-type').addClass('current');
	$('#tab-content-wrapper > div:last-of-type .tab-content').addClass('last');
	$('#tab-content-wrapper .current > ul:first-of-type').addClass('show');	
	
    $('#tabs-menu a').click(function(e) {
        e.preventDefault();
        if ($(window).width() >= 960) {
	        $(this).parent().addClass('current');
	        $(this).parent().siblings().removeClass('current');
	        var link = $(this).attr('href');
	        $('.tab-content').not(link).css('display', 'none');
	        $('#tab-content-wrapper > div').removeClass('current');
	        $(link).show().parent().addClass('current');
	    }
    });
  	
    	
	//Tabbed Content Mobile Navigation
    var tab = $('#tabs-menu li');
	var currentTab = tab.filter('.current');
	$('span.next').on('click', function() {
		var nextItem = currentTab.next();
		currentTab.removeClass('current');
		$("#tab-content-wrapper > div").removeClass('current');
		if ( nextItem.length ) {
        currentTab = nextItem.addClass('current');
		} 
		getContent(nextItem.find('a').attr('href'));
	});
	$('span.prev').on('click', function() {
		var prevItem = currentTab.prev();
		currentTab.removeClass('current');
		$("#tab-content-wrapper > div").removeClass('current');
		if ( prevItem.length ) {
        currentTab = prevItem.addClass('current');
		} 
		getContent(prevItem.find('a').attr('href'));
	});
	
	$('#tabs-wrapper .next').click(function() {
		$('.prev').removeClass('disabled');
		if($('.last').hasClass('show')){
			$('.next').addClass('disabled');
        } 
    });
	$('#tabs-wrapper .prev').click(function() {
		$('.next').removeClass('disabled');
		if($('#tab1').hasClass('show')){
			$('.prev').addClass('disabled');
        } 
    });
    
    
    // Content Accordions
	if ($(window).width() <= 1199) {
	$('.accordion-content').addClass('collapse').collapse({toggle: false});
	$('[data-toggle=collapse-next]').on('click', function(e) {
    	e.preventDefault();
		$('.accordion-title').not(this).removeClass('open');

		// Try to close all of the collapse areas first
		var parent_id = $(this).data('parent');
		$(parent_id+' .accordion-content').collapse('hide');

		// ...then open just the one we want
    	var $target = $(this).toggleClass('open').parents('.item').find('.accordion-content');
		$target.collapse('toggle');
		
	});
	}

    
    // RFQ Forms
   	if($.isFunction($.fn.datepicker)){ 
		$(".date-text").datepicker();
	}
   	if($.isFunction($.fn.selectmenu)){ 
		$(".custom-select").selectmenu()
		.selectmenu( "menuWidget" );
	}
	$('input.oneWay,input.roundTrip').click(function() {
		$('.multi').slideUp('fast');
		$('.round').slideDown('fast');
		$('input.formValue').val('2');
		$('#insiteKey').val('actk=8odxrq-47dr12ddj2');
	});
	$('input.multiLeg').click(function() {
		$('.multi, .round').slideDown('fast');
		$('input.formValue').val('4');
		$('#insiteKey').val('actk=8odxrq-475v3q5pbd');
	});
/*
	$('input.oneWay').click(function() {
		$('.multi, .round').slideUp('fast');
		$('input.formValue').val('3');
		$('#insiteKey').val('actk=8odxrq-47dqtdn22m');
	});
*/
	
	$('#arrival input#rentalCarYes').click(function(){
		$('#carToggle').slideDown('fast');
	});
	$('#arrival input#rentalCarNo').click(function(){
		$('#carToggle').slideUp('fast');
	});
	$('#arrival input#rentalCarYes2').click(function(){
		$('#carToggle2').slideDown('fast');
	});
	$('#arrival input#rentalCarNo2').click(function(){
		$('#carToggle2').slideUp('fast');
	});

	$('#arrival input#hotelYes').click(function(){
		$('#hotelToggle').slideDown('fast');
	});
	$('#arrival input#hotelNo').click(function(){
		$('#hotelToggle').slideUp('fast');
	});
	$('#arrival input#hotelYes2').click(function(){
		$('#hotelToggle2').slideDown('fast');
	});
	$('#arrival input#hotelNo2').click(function(){
		$('#hotelToggle2').slideUp('fast');
	});

	$('#arrival input#otherTransportYes').click(function(){
		$('#otherToggle').slideDown('fast');
	});
	$('#arrival input#otherTransportNo').click(function(){
		$('#otherToggle').slideUp('fast');
	});
	$('#arrival input#otherTransportYes2').click(function(){
		$('#otherToggle2').slideDown('fast');
	});
	$('#arrival input#otherTransportNo2').click(function(){
		$('#otherToggle2').slideUp('fast');
	});

	
	// Passenger Information Charter Price
	$('#rfq input#priceBtn').click(function(){
		$passCount = $('#rfq input#passengerCount').val();
		$planeSize = $('#rfq select#planeSize option:selected').val();
		$('div#charterPrice table').css('margin-bottom', '20px');
		$('div#charterPrice table').html('<tr><th>Category</th><th>Range (statute miles)</th><th>Passenger Capacity</th><th class="last">Hourly Rate*</th></tr>');	
		if($planeSize == 'light'){
			$('div#charterPrice table').hide().append('<tr class="odd"><td><a href="light-jets.html">Light</a></td><td>800-2,400</td><td class="center">4 - 7</td><td>$1,700-$2,850</td></tr>').fadeIn('500');
		}
		else if($planeSize == 'mid'){
			$('div#charterPrice table').hide().append('<tr class="odd"><td><a href="mid-size-jets.html">Mid-Size</a></td><td>1,200-3,400</td><td class="center">6 - 9</td><td>$2,700-$3,500</td></tr><tr class="even"><td>Turbo Prop</td><td>1,200-2,000</td><td class="center">6 - 9</td><td>$1,400-$1,800</td></tr><tr class="odd"><td><a href="super-mid-size-jets.html">Super Mid-Size</a></td><td>3,300-4,000</td><td class="center">8 - 10</td><td>$3,500-$4,200</td></tr>').fadeIn('500');
		}
		else if($planeSize == 'heavy'){
			$('div#charterPrice table').hide().append('<tr class="odd"><td><a href="heavy-jets.html">Heavy</a></td><td>3,000-6,500</td><td class="center">8 - 19</td><td>$4,500-$5,800</td></tr><tr class="odd"><td><a href="long-range-jets.html">Ultra Long Range</a></td><td>5,400-7,000</td><td class="center">10 - 19</td><td>$6,800-$8,500</td></tr>').fadeIn('500');
			//$('#rfq select#planeSize option:selected').removeAttr("selected");
			//$('#rfq select#planeSize option:selected').val('');
		}
		else if($planeSize == 'unsure'){
			$('div#charterPrice table').hide().html('<tr><th>Category</th><th>Range (statute miles)</th><th>Passenger Capacity</th><th class="last">Hourly Rate*</th></tr><tr class="odd"><td><a href="light-jets.html">Light</a></td><td>800-2,400</td><td class="center">4 - 7</td><td>$1,700-$2,850</td></tr><tr class="even"><td><a href="mid-size-jets.html">Mid-Size</a></td><td>1,200-3,400</td><td class="center">6 - 9</td><td>$2,700-$3,500</td></tr><tr class="odd"><td>Turbo Prop</td><td>1,200-2,000</td><td class="center">6 - 9</td><td>$1,400-$1,800</td></tr><tr class="even"><td><a href="super-mid-size-jets.html">Super Mid-Size</a></td><td>3,300-4,000</td><td class="center">8 - 10</td><td>$3,500-$4,200</td></tr><tr class="odd"><td><a href="heavy-jets.html">Heavy</a></td><td>3,000-6,500</td><td class="center">8 - 19</td><td>$4,500-$5,800</td></tr><tr class="even"><td><a href="long-range-jets.html">Ultra Long Range</a></td><td>5,400-7,000</td><td class="center">10 - 19</td><td>$6,800-$8,500</td></tr>').fadeIn('500');
		}
			
		else{
			$('div#charterPrice table').hide().html('<p style="color:red;">Please enter the size of aircraft needed to see an approximate cost!</p>').fadeIn('500');
			$('#rfq input#passengerCount').val('');
			$('#rfq select#planeSize option:selected').removeAttr("selected");
			$('#rfq select#planeSize option:selected').val('');
			$('div#charterPrice table').css('border', 'none');
		}	
	});
	
	
	//Fancybox 
	$(".modal img").parent().addClass("fancybox").attr("rel","gallery");
    $(".fancybox").fancybox({
		maxHeight	: '85%',
		maxWidth	: '85%',
		openEffect	: 'none',
		closeEffect	: 'none',
		tpl : {
			prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><i class="ion-ios-arrow-left bold"></i></a>',
			next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><i class="ion-ios-arrow-right bold"></i></a>',
			closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i class="ion-close-circled"></i></a>'
		},
		helpers : {
            title : null            
        }
	});

	// States Dropdown Required Hack
	$('#state').on('change', function() {
		var $this = $(this).find('option:selected').attr('value');
		$('#state-req').attr('value',$this);
	});
	$('#dept').on('change', function() {
		var $this = $(this).find('option:selected').attr('value');
		$('#dept-req').attr('value',$this);
	});

	
	//Emergency Alert
	$("#emergency .close-btn").click(function() {
    	$("#emergency").fadeOut();
    });

	
    //IE Placeholder/Value
    $("[placeholder]").focus(function(){
        var input = $(this);
        if(input.val() == input.attr("placeholder")){
            input.val("");
            input.removeClass("placeholder");
        }
    });
    $("[placeholder]").blur(function(){
        var input = $(this);
        if(input.val() == "" || input.val() == input.attr("placeholder")){
            input.addClass("placeholder");
            input.val(input.attr("placeholder"));
        }
    });
    $("[placeholder]").parents("form").submit(function(){
        $(this).find("[placeholder]").each(function(){
            var input = $(this);
            if(input.val() == input.attr("placeholder")){
                input.val("");
            }
        });
    });
   
    
	// Validation
/*
	$.validator.addMethod("zero", function (input, element) {
        return !input || input.match(/^[0]/);
    }, "This field must start with a zero");
*/
	$(".forms").validate({
		ignore: []
	});
	
	
/*
	// Airport Locator
	$('body#page-airport-locator').each(function(){
		loadMap();
	});
*/
	
	
	// Footer Stuff
	$(".newsletter h4").click(function() {
    	$("#newsletter").slideToggle();
    });

	
    // Anchor Link Animations
    $('#back-top').click(function (){
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
	
	
	// Misc Responsive Changes
	if ($(window).width() >= 768 && $(window).width() <= 1199) {
		$("#header .searchWrap").appendTo("#header nav .constrain");
		$("#sidebar-right").appendTo("#wrap");
	}
	if ($(window).width() <= 960) {
		$('#sidebar-left').not(':has(nav)').hide();
	}
	if ($(window).width() <= 767) {
		$("#header .searchWrap").appendTo("#header");
		$("#sidebar-right").appendTo("#wrap");
		$("#mobile-nav li a i").removeClass("ion-arrow-right-b").addClass("ion-ios-arrow-right");
	}



	// Charter vs Commercial Calculator
	if($('.charterCalc').length > 0) {
		
		// info boxes
		$('.charterCalc .fa-info').click(function(){
			if(!$(this).hasClass('open')) {
				$(this).addClass('open');
				$(this).parents('.input, .row').find('.info').slideToggle();
			} else {
				$(this).parents('.input, .row').find('.info').slideToggle();
				$(this).removeClass('open');
			}
		});
		
		// calculations
		avgDist = parseInt($('.charterCalc [name="avgDist"]').val());
		freqVal = 1;
		freqUnit = parseInt($('.charterCalc [name="freqUnit"]').val());
		flights = 1;
		miles = (avgDist * freqVal * freqUnit);
		
		airTime = 0;
		delTime = 0;
		missedTime = 0;
		
		travelTime = $('.charterCalc [name="tofrom"] option:checked').attr('value');
		arrivalTime = $('.charterCalc [name="preboard"] option:checked').attr('value');
		checkinTime = $('.charterCalc [name="checkin"] option:checked').attr('value');
		baggageTime = $('.charterCalc [name="bagClaim"] option:checked').attr('value');

		function calcMiles() {
			flights = (freqVal * freqUnit);
			miles = (avgDist * flights);
			$('.charterCalc [name="miles"]').val(miles);
//			console.log(miles);

			
			$('.charterCalc .flightTime .flights').text(flights);
			$('.charterCalc .flightTime .miles').text(miles);
			

			airTime = (miles / 300).toFixed(2);
			delTime = (flights * 0.09925 * 0.5).toFixed(2);
			missedTime = (flights * 0.09925 * 5).toFixed(2);
			$('.charterCalc .airTime .data').text(airTime+' hrs.');
			$('.charterCalc .delTime .data').text(delTime+' hrs.');
			$('.charterCalc .missedTime .data').text(missedTime+' hrs.');
			
			console.log(flights);
			travelTime = (($('.charterCalc [name="tofrom"] option:checked').attr('value') * 2) * flights).toFixed(2);
			arrivalTime = (($('.charterCalc [name="preboard"] option:checked').attr('value') * 2) * flights).toFixed(2);
			checkinTime = (($('.charterCalc [name="checkin"] option:checked').attr('value') * 2) * flights).toFixed(2);
			baggageTime = (($('.charterCalc [name="bagClaim"] option:checked').attr('value') * 2) * flights).toFixed(2);
			$('.charterCalc .travelTime .data').text(travelTime+' hrs.');
			$('.charterCalc .arrivalTime .data').text(arrivalTime+' hrs.');
			$('.charterCalc .checkinTime .data').text(checkinTime+' hrs.');
			$('.charterCalc .baggageTime .data').text(baggageTime+' hrs.');
			


		}

		$('.charterCalc [name="avgDist"]').change(function(){
			avgDist = $(this).val();
			calcMiles();
		});
		$('.charterCalc [name="freqVal"]').change(function(){
			freqVal = $(this).val();
			calcMiles();
		});
		$('.charterCalc [name="freqUnit"]').change(function(){
			freqUnit = $(this).val();
			calcMiles();
		});
		$('.charterCalc [name="avgDistSelect"]').change(function(){
			avgDistSelect = $(this).val();
			if(avgDistSelect > 0) {
				avgDist = $(this).val();
				$('.charterCalc [name="avgDist"]').val(avgDistSelect);
				calcMiles();
			}
		});
		$('.charterCalc [name="tofrom"]').change(function(){
			travelTime = $(this).val();
			calcMiles();
		});
		$('.charterCalc [name="preboard"]').change(function(){
			arrivalTime = $(this).val();
			calcMiles();
		});
		$('.charterCalc [name="checkin"]').change(function(){
			checkinTime = $(this).val();
			calcMiles();
		});
		$('.charterCalc [name="bagClaim"]').change(function(){
			baggageTime = $(this).val();
			calcMiles();
		});
		
		
		
	}


	// AB Test setup
	$('.abtoggle').click(function(){
		$('#featured-text').after($('#sidebar-right #sidebar-btn'));
		
		$('body').removeClass('tpl-3').addClass('tpl-2, abtest-formpos');
	});

});		// END document ready


//primaryNav Hover Intent Configuration
var primaryNavConfig = {
    sensitivity: 10,
    interval: 100,
    over: primaryOver,
    out: primaryOut,
    timeout: 250
};

function primaryOver(){$(this).find(">nav").slideToggle(); $(this).addClass("hover");}
function primaryOut(){$(this).find(">nav").slideUp(); $(this).removeClass("hover");}