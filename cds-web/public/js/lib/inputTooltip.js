define(["jquery","tooltip"], function($) {
	
var defcofig = {
	position: { my: "left+15 center", at: "right center" },
	
}

	return function(selector, msg){
		var targetElement = $(selector);
		console.log(msg);
		targetElement.tooltip({tooltipClass:"errorToolTip",content:msg,items:targetElement,position: { my: "left center", at: "right+20 center",collision:"none" }}).off("mouseover mouseout");

		this.open = function(){			
			targetElement.tooltip("open");			
		}
	}
});