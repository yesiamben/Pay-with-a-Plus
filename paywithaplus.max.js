/*! jQuery Pay With a Plus plugin */
/* More at: http://thisisbensblog.com/pay-with-a-plus/ */

(function($) {
	// Set up some defaults
    var defaults = {
       displaySpeed: 500,
       displayType: 'fadeIn',
       redirectSpeed: '2000',
       pushToAnalytics: false, 
       customPushEvent: 'Pay-With-A-Plus-One',
       popupCopy: 'Thanks! Grab your download link...',
       popupLinkCopy: 'Download here',
       displaySlide: true
    }

    $.payWithAPlusPlugin = function(options) {
        var settings = $.extend({}, defaults, options);

        // Figure out what we're doing from the options we've been given.
        
        if (typeof settings.displayDiv != 'undefined') {
	        
	        // Does the div exist? 
	        if ($(settings.displayDiv).length > 0) {
	        	// what sort of display are we doing (if neither, do nothing)
	        	if (settings.displayType == 'fadeIn') {
		        	$(settings.displayDiv).fadeIn(settings.displaySpeed);
	        	} else if (settings.displayType == 'slideDown') {
		        	$(settings.displayDiv).slideDown(settings.displaySpeed);
	        	}
	        }
	        
        } else if (typeof settings.loadInToPopup != 'undefined') {
	        
	        // Check if the div already exists, and if we're +1-ing
	        if ($('#pwap-popOver').length < 1 && settings.buttonPush == 'on') {
	        	// append the div to the body right at the bottom, insert the link we want into an iframe.
	        	$('body').append('<div id="pwap-popOver"><div id="pwap-contents"><iframe id="frame" src="'+settings.loadInToPopup+'" width="100%" height="100%"></iframe><div id="pwap-closePop">Close Popup</div></div></div>');
	        	// if the close link is clicked, fadeOut our div.
	        	$('#pwap-closePop').on('click', function () { $('#pwap-popOver').fadeOut(settings.displaySpeed); });
	        	// fade in the div (remember Iframe may still be loading).
	        	$('#pwap-popOver').fadeIn(settings.displaySpeed);
	        }
	        
	        
        } else if (typeof settings.redirectTo != 'undefined') {

	        // Redirect to wherever after a couple of seconds. 
	        // Should be long enough to allow for the +1 to actually +1
	        setTimeout(function(){window.location = settings.redirectTo;},settings.redirectSpeed);

        } else if (typeof settings.popupLink != 'undefined') {
	        
	        // Check if the div already exists, and if we're +1-ing
	        if ($('#pwap-popOver').length < 1 && settings.buttonPush == 'on') {
	        	// append the div to the body right at the bottom, insert the relevant copy into the link and header.
	        	$('body').append('<div id="pwap-popOver"><div id="pwap-contents"><div id="pwap-table"><h3>'+settings.popupCopy+'</h3><p><a href="'+settings.popupLink+'">'+settings.popupLinkCopy+'</a></p></div><div id="pwap-closePop">Close Popup</div></div></div>');
	        	// if the close link is clicked, fadeOut our div.
	        	$('#pwap-closePop').on('click', function () { $('#pwap-popOver').fadeOut(settings.displaySpeed); });
	        	// fade in the div
	        	$('#pwap-popOver').fadeIn(settings.displaySpeed);
	        }
	        
        }
        
        // Are we pushing this click to Google Analytics?
        if (settings.pushToAnalytics == true) {
        	// Check we have analytics...
	        if(window._gaq){
		        // Push it! Push it real good!
		        _gaq.push(['_trackEvent', settings.customPushEvent, settings.buttonPush, settings.buttonHREF]);
	        }
        }
        
    }
}(jQuery));