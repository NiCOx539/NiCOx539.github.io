/*Event Tracking*/
if (ga) {	
	jQuery("a[href^='mailto:']").click(function(){
		var mAddress = jQuery(this).attr('href').replace('mailto:', '');
		ga('send', 'event', 'MailTo', 'click', mAddress);
	});
	jQuery("a[href^='tel:']").click(function(){
		var tAddress = jQuery(this).attr('href').replace('tel:', '');
		ga('send', 'event', 'Click to Call', 'click', tAddress);
	});
	jQuery("a[href*='.doc'],a[href*='.docx'],a[href*='.dwg'],a[href*='.cad'],a[href*='.pdf'],a[href*='.xls'],a[href*='.xlsx'],a[href*='.ppt'],a[href*='.pptx'],a[href*='.zip'],a[href*='.txt'],a[href*='.vsd'],a[href*='.vxd'],a[href*='.js'],a[href*='.css'],a[href*='.rar'],a[href*='.exe'],a[href*='.wma'],a[href*='.mov'],a[href*='.avi'],a[href*='.wmv'],a[href*='.mp3']").click(function(e){          
		ga('send', 'event', 'Download', 'click', jQuery(this).attr('href'));
	});
	jQuery("a[href*='http']:not([href*='" + window.location.hostname + "'])").click(function(e){
		var activeURL = window.location.href;
		if (jQuery(this).attr('rel') == 'print') {
			ga('send', 'event', 'Print', 'click', activeURL);
			return;
		}
		var socialSites = new Array(
			"linkedin.com","www.linkedin.com","twitter.com","www.twitter.com","facebook.com","www.facebook.com","www.google.com/bookmarks","google.com/bookmarks","youtube.com","www.youtube.com","plus.google.com","www.pinterest.com","pinterest.com","www.instagram.com","instagram.com","googleplus.com","www.googleplus.com","www.vimeo.com","vimeo.com"
		);
		var excludedSites = new Array(
			"pentastaraviation.com",
			"www.pentastaraviation.com"
		);
		var linkHost = this.hostname;
		if(jQuery.inArray(linkHost, excludedSites) == -1){
			if(jQuery.inArray(linkHost, socialSites) >= 0){
				ga('send', 'event', 'Social', 'click', jQuery(this).attr('href'));
			} else {
				ga('send', 'event', 'Outbound', 'click', jQuery(this).attr('href'));
			}  
		} else {
			/*alert("not tracked");*/
		}
	});
	/*Custom Events - START*/
	/*Calculate Cost*/
	jQuery("input[value='Calculate Cost']").click(function(){
		var passengerCountValue = jQuery(':input[name="passengerCount"]').val();
		var planeSizeValue = jQuery('select[name="planeSize"] option:selected').text();
		ga('send', 'event', 'Calculate Cost', 'click', passengerCountValue + ' Passenger(s) - ' + planeSizeValue + ' Aircraft');
	});
	/*Custom Events - END*/
}