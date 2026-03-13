/*global jQuery:false */
(function($) {

	$(window).load(function() {
		$("#navigation").sticky({
			topSpacing : 0
		});
	});

	/*$('#slider').nivoSlider({
		effect : 'slideInLeft',
		animSpeed : 300,
		pauseTime : 8000,
		directionNav : true,
		controlNav : false,
		pauseOnHover : false
	});*/
	$('#slider').nivoSlider({
		effect : 'slideInLeft',
		animSpeed : 300,
		pauseTime : 8000,
		directionNav : true,
		controlNav : false,
		pauseOnHover : false
	});

	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.navbar-nav li a').bind('click', function(event) {
			var $anchor = $(this);
			var nav = $($anchor.attr('href'));
			if (nav.length) {
				$('html, body').stop().animate({
					scrollTop : $($anchor.attr('href')).offset().top
				}, 1500, 'easeInOutExpo');

				event.preventDefault();
			}
		});
		$('a.totop,a#btn-scroll,a.btn-scroll,.carousel-inner .item a.btn').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop : $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});

	//nivo lightbox
	$('.gallery-item a').nivoLightbox({
		effect : 'fadeScale', // The effect to use when showing the lightbox
		theme : 'default', // The lightbox theme to use
		keyboardNav : true, // Enable/Disable keyboard navigation (left/right/escape)
		clickOverlayToClose : true, // If false clicking the "close" button will be the only way to close the lightbox
		onInit : function() {
		}, // Callback when lightbox has loaded
		beforeShowLightbox : function() {
		}, // Callback before the lightbox is shown
		afterShowLightbox : function(lightbox) {
		}, // Callback after the lightbox is shown
		beforeHideLightbox : function() {
		}, // Callback before the lightbox is hidden
		afterHideLightbox : function() {
		}, // Callback after the lightbox is hidden
		onPrev : function(element) {
		}, // Callback when the lightbox gallery goes to previous item
		onNext : function(element) {
		}, // Callback when the lightbox gallery goes to next item
		errorMessage : 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
	});

	jQuery('.appear').appear();
	jQuery(".appear").on("appear", function(data) {
		var id = $(this).attr("id");
		jQuery('.nav li').removeClass('active');
		jQuery(".nav a[href='#" + id + "']").parent().addClass("active");
	});

})(jQuery);

$(document).ready(function() {


	$('.collapse').on('shown.bs.collapse', function() {
		$(this).parent().find(".fa-plus-circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
	}).on('hidden.bs.collapse', function() {
		$(this).parent().find(".fa-minus-circle").removeClass("fa-minus-circle").addClass("fa-plus-circle");
	});

	$('.expand-all').on('click', function() {
		$('#accordion .panel-collapse').collapse('show');
	});

	$('.collapse-all').on('click', function() {
		$('#accordion .panel-collapse').collapse('hide');
	});
	
	$('.myarea').tooltip(); 

});

$(window).load(function() {
	var scountry = "Select Your Country|Afghanistan|Albania|Algeria|American Samoa|Andorra|Angola|Anguilla|Antigua|Argentina|Armenia|Aruba|Ascension Island|Australia|Australian External Territories|Austria|Azerbaijan|Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bermuda|Bhutan|Bolivia|Bosnia and Hercegovina|Botswana|Brazil|British Virgin Islands|Brunei Darussalm|Bulgaria|Burkina Faso|Burundi|Cambodia|Cameroon|Canada|Cape Verdi|Cayman Islands|Central African Republic|Chad|Chile|China|Colombia|Comoros and Mayotte|Congo|Cook Islands|Costa Rica|Croatia|Cuba|Cyprus|Czech Republic|Denmark|Diego Garcia|Djibouti|Dominca|Dominican Republic|Ecuador|Egypt|El Salvador|Equatorial Guinea|Eritrea|Estonia|Ethiopia|Falkland Islands|Faroe Islands|Fiji|Finland|Francaise|French Antilles|French Guiana|Gabon|Gambia|Georgia|Germany|Ghana|Gibraltar|Greece|Greenland|Grenada/Carricou|Guam|Guatemala|Guinea|Guinea-Bissau|Guyana|Haiti|Honduras|Hong Kong|Hungary|Iceland|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Ivory Coast|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kiribati Republic|Kuwait|Republic|Latvia|Laos|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Macau|Macedonia|Madagascar|Malawi|Malaysia|Maldives|Mali|Malta|Marshall Islands|Martinique|Mauritania|Mauritius|Mayolte|Mexico|Micronesia|Moldova|Monaco|Mongolia|Montserrat|Morocco|Mozambique|Myanmar|Namibia|Nauru|Nepal|Netherlands|Netherlands Antilles|Nevis|New Caledonia|New Zealand|Nicaragua|Niger|Nigeria|Niue|North Korea|North Mariana Islands|Norway|Oman|Pakistan|Palau|Panama|Papua New Guinea|Paraguay|Peru|Philippines|Poland|Portugal|Puerto Rico|Qatar|Romania|Russia|Rwanda|San Marino|Sao Tome and Principe|Saudi Arabia|Senegal|Serbia and Montenegro|Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Solomon Islands|Somalia|South Africa|South Korea|Spain|Sri Lanka|St. Helena|St. Kitts/Nevis|St. Pierre & Miquelon|Sudan|Suriname|Swaziland|Sweden|Switzerland|Syria|Tahiti|Taiwan|Tajikistan|Tanzania|Thailand|Togo|Tokelau|Tonga|Trinidad and Tobago|Tunisia|Turkey|Turkmenistan|Tuvalu|Uganda|Ukraine|United Arab Emirates|United Kingdom|Uruguay|USA|Uzbekistan|Vanuatu|Vatican City|Venezuela|Vietnam|Virgin Islands|Wallis and Futuna|Western Samoa|Yemen|North Yemen|Zaire|Zambia|Zimbabwe";

	lngno = scountry.split("|").length;

	var tcountry1 = "";

	document.form1.country.options.length = 0;
	document.form1.country.options[0] = new Option(scountry.split("|")[0], "", false, false);

	for (var i = 1; i < lngno; i++) {
		if (scountry.split("|")[i] == tcountry1) {
			document.form1.country.options[i] = new Option(scountry.split("|")[i], scountry.split("|")[i], false, true);
		} else {
			document.form1.country.options[i] = new Option(scountry.split("|")[i], scountry.split("|")[i], false, false);
		}
	}
});

