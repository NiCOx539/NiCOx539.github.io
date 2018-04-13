var $ = jQuery.noConflict();

$(document).ready(function(){	




if($('.jbmodal').length > 0){

	function loadModal(newModal) {
		theTitle = $('.jbmodal-title');
		theImg = $('.jbmodal-img > img');
		theCaption = $('.jbmodal-caption');
		theHTML = $('.jbmodal-HTML');
		thePinit = $('.jbmodal-img > a.pinit');
		
		newTitle = $(newModal).attr('data-jbmodal-title');
		newImg = $(newModal).attr('data-jbmodal-img');
		newCaption = $(newModal).attr('data-jbmodal-caption');
		newHTML = $(newModal).attr('data-jbmodal-HTML');
		newPinit = $(newModal).attr('data-jbmodal-pinit');
		
		if(theTitle !== undefined && newTitle !== undefined) {
			$(theTitle).hide().html(newTitle).fadeIn();
		} else { $(theTitle).hide();
		}
		if(theImg !== undefined && newImg !== undefined) {
			$(theImg).hide().attr('src', newImg).fadeIn();
		} else { $(theImg).hide();
		}
		if(theCaption !== undefined && newCaption !== undefined) {
			$(theCaption).hide().html(newCaption).fadeIn();
		} else { $(theCaption).hide();
		}
		if(theHTML !== undefined && newHTML !== undefined) {
			$(theHTML).hide().html(newHTML).fadeIn();
		} else { $(theHTML).hide();
		}
		if(thePinit !== undefined && newPinit !== undefined) {
			$(thePinit).hide().attr('href', newPinit).fadeIn();
		} else { $(thePinit).hide();
		}
				$(newModal).addClass('jbmodal-trigger');

	}

	$('.jbmodal').click(function(){
		$('.jbmodal').removeClass('jbmodal-trigger');
		$(this).addClass('jbmodal-trigger');

		// setup the modal content
		jbmodal = '<div class="jbmodal-pos"><div class="jbmodal-box">';
		jbmodal += '<div class="jbmodal-content">'

		// check if modal trigger is part of a set
		jbmodal_parent = $(this).parent();
		jbmodal_set_count = $(jbmodal_parent).find('.jbmodal').length;
//		alert(jbmodal_set_count);
		
		// variable modal content
		if($(this).attr('data-jbmodal-title') !== undefined) {
			jbmodal_title = $(this).attr('data-jbmodal-title');
			jbmodal += '<h3 class="jbmodal-title">'+jbmodal_title+'</h3>';
		}
		if($(this).attr('data-jbmodal-img') !== undefined) {
			jbmodal_img = $(this).attr('data-jbmodal-img');
			jbmodal += '<div class="jbmodal-img"><img src="'+jbmodal_img+'" />';
			// add set linking
			if(jbmodal_set_count > 1) {
				jbmodal += '<span class="jbmodal-prev"><i class="fa fa-chevron-left"></i></span>';
				jbmodal += '<span class="jbmodal-next"><i class="fa fa-chevron-right"></i></span>';
			}
			if($(this).attr('data-jbmodal-pinit') !== undefined) {
				jbmodal_pinit = $(this).attr('data-jbmodal-pinit');
				jbmodal += '<a class="pinit" target="_blank" href="'+jbmodal_pinit+'" data-pin-do="buttonPin" data-pin-config="beside" data-pin-color="red"><img src="//assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_20.png" /></a>';
			}
			jbmodal += '</div>';
			if($(this).attr('data-jbmodal-caption') !== undefined) {
				jbmodal_caption = $(this).attr('data-jbmodal-caption');
				jbmodal += '<p class="jbmodal-caption">'+jbmodal_caption+'</p>';
			}
		}
		if($(this).attr('data-jbmodal-HTML') !== undefined) {
			jbmodal_HTML = $(this).attr('data-jbmodal-HTML');
			jbmodal += '<div class="jbmodal-HTML">'+jbmodal_HTML+'</div>';
		}

		jbmodal += '<div class="jbmodal-controls"><i class="fa fa-close"></i></div>';

		jbmodal += '</div>';		// end modal content
		jbmodal += '</div></div>';		// end modal box
	
		// the modal background overlay
		jbmodalBG = '<div class="jbmodal-bg"></div>';
	
		// create and show the modal elements
		$('body').append(jbmodalBG);
		$('body').append($(jbmodal).hide().fadeIn('fast'));
	

		// close the modal
		$('.jbmodal-bg, .jbmodal-pos, .jbmodal-controls .fa-close').on('click', function(e) { 
			if( e.target !== this ) {
				return;
			} else {
				$('.jbmodal-pos').fadeOut('fast', function() { 
					$('.jbmodal-bg').fadeOut('fast', function() {
							$('.jbmodal-pos').remove();
							$('.jbmodal-bg').remove();
					});
				});
			}
		});

		// escape the modal
		$(document).keyup(function(e) {
			if (e.keyCode == 27) {

			$('.jbmodal-box').fadeOut('fast', function() { 
				$('.jbmodal-bg').fadeOut('fast', function() {
						$('.jbmodal-box').remove();
						$('.jbmodal-bg').remove();
				});
			});

				
			}
		});
		
		// prev/next
		if(jbmodal_set_count > 1) {
			var targetModal = '';
			// prev
			$('.jbmodal-prev').click(function(){
				targetModal = $('.jbmodal-trigger').prevAll('.jbmodal').first();
				if(!$(targetModal).length > 0){
					targetModal = $('.jbmodal-trigger').parent().find('.jbmodal').last();
				}
				$('.jbmodal').removeClass('jbmodal-trigger');
				loadModal(targetModal);
			});
			// next
			$('.jbmodal-next').click(function(){
				targetModal = $('.jbmodal-trigger').nextAll('.jbmodal').first();
				if(!$(targetModal).length > 0){
					targetModal = $('.jbmodal-trigger').parent().find('.jbmodal').first();
				}
				$('.jbmodal').removeClass('jbmodal-trigger');
				loadModal(targetModal);
			});
		}

		// prev/next (arrow keys)
		$(document).keyup(function(e) {
			if (e.keyCode == 37) {	// left/prev
				targetModal = $('.jbmodal-trigger').prevAll('.jbmodal').first();
				if(!$(targetModal).length > 0){
					targetModal = $('.jbmodal-trigger').parent().find('.jbmodal').last();
				}
				$('.jbmodal').removeClass('jbmodal-trigger');
				$(targetModal).addClass('jbmodal-trigger');
				loadModal(targetModal);
			}
		});
		$(document).keyup(function(e) {
			if (e.keyCode == 39) {	// right/next
				targetModal = $('.jbmodal-trigger').nextAll('.jbmodal').first();
				if(!$(targetModal).length > 0){
					targetModal = $('.jbmodal-trigger').parent().find('.jbmodal').first();
				}
				$('.jbmodal').removeClass('jbmodal-trigger');
				loadModal(targetModal);
			}
		});



	}); // END main modal function
	
	
}	// END main if
		
});