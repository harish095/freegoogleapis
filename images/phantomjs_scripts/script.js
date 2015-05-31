/**
 * Global Variables
 */
var bodyHeight = 0;
var loaderIdName = 'isr_cld';
var SMCIdName = 'smc';
var footerIdName = 'fbarcnt';

/**
 * Main function which calls scrollDownTillSMC()
 * And set the body height
 */
function init() {
	bodyHeight = document.body.scrollHeight;
	scrollDownTillSMC();
}

/**
 * Function which starts the first scroll, loading some images
 * Scrolls down the page until 'Show more contents' is displayed
 * And also calls the triggerSMC() after the display of 'Show more contents' button  
 */
function scrollDownTillSMC() {
	var interval1 = setInterval(function () {
		if (checkLoaderAndSMC()) {
			clearInterval(interval1);
			bodyHeight = document.body.scrollHeight; //setting the body height, so that it is used in checkBodyHeight()
			triggerSMC();
		} else if(checkLoaderAndFooter()){
			clearInterval(interval1);
			window.close();
		} else {
			scrollDown();
		}
	}, 500);
}

/**
 * Function which simulates the click on 'Show more contents' button
 * And also calls the loadAll() after getting the contents 
 */
function triggerSMC() {
	document.getElementById(SMCIdName).click();
	var interval2 = setInterval(function () {
		if (checkBodyHeight()) {
			clearInterval(interval2);
			loadAll();
		}
	}, 500);
}

/**
 * Function which starts the second scroll, loading all images
 * Scrolls down the page until footer is displayed
 * returns the html content of all images
 */
function loadAll() {
	var interval3 = setInterval(function () {
		if (checkLoaderAndFooter()) {
			clearInterval(interval3);
			window.close(); //This triggers the onClosing event which generates HTML file
		} else {
			scrollDown();
		}
	}, 500);
}

/**
 * Scrolls down the page till the end
 */
function scrollDown() {
	window.scrollTo(0, document.body.scrollHeight);
}

/**
 * Checks if loader is not displayed and 'Show More Contents' is displayed
 */
function checkLoaderAndSMC() {
	if(document.getElementById(loaderIdName) && document.getElementById(SMCIdName)) {
		if (document.getElementById(loaderIdName).style.display === "none" && document.getElementById(SMCIdName).style.display === "block") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * Checks if body height is changed
 */
function checkBodyHeight() {
	if (bodyHeight === document.body.scrollHeight) {
		return false;
	} else {
		return true;
	}
}

/**
 * Checks if loader is not displayed and footer is displayed
 */
function checkLoaderAndFooter() {
	if(document.getElementById(loaderIdName) && document.getElementById(footerIdName)) {
		if (document.getElementById(loaderIdName).style.display === "none" && document.getElementById(footerIdName).style.display !== "none" && document.getElementById(footerIdName).style.visibility === "visible") {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

init();