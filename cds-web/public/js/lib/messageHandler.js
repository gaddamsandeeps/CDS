define(["jquery"], function($){

	function renderMessage(msg, container, className, time){
		var statusNode = $("<div class='"+className+" status-wrapper' style='display:none'>"),
			stausWrapper = $(container),
			time = time || 500;

		if(!stausWrapper.length){
			console.error("No status wrapper field is specified.");
			return;
		}
		statusNode.html(msg);
		stausWrapper.empty().append(statusNode);
		statusNode.fadeIn(500);
	}

	function showErrorStatus(msg, container, time){
			renderMessage(msg, container, "error-status-node",time);
	}

	function showInfoStatus(msg, container, time){
			renderMessage(msg, container, "info-status-node", time);
	}

	function clearMessageStatus(time){
			var time = time|| 500;
			$(".status-wrapper").fadeOut(500);
			$(".status-wrapper").remove();
	}



	function msgTracker(config){

		var defConfig = {
			containerId : "body",			
			className : "status-wrapper",
			timer : 500
		};
		
		this.config = $.extend({},defConfig,config);
		if(this.config.containerId.indexOf("#") == -1){
			this.container = $("#"+this.config.containerId);
		}else{
			this.container = $(this.config.containerId);
		}
		
		this.container.html("");

		this.showError= function(msg, timer){
			this.timer = timer ||this.timer;
			this.renderMessage(msg, "cds-error");
		};

		this.showInfo= function(msg){
			this.renderMessage(msg, "cds-info");
		};		


		this.hideStatus = function(timer){
			var hideTimer = timer || this.timer;
			$("."+this.config.className).eq(0).fadeOut(hideTimer);	
		}


		this.clearStatus = function(time){
			var clearTimer = time || this.timer;
			$("."+this.config.className).eq(0).fadeOut(clearTimer);
			$("."+this.config.className).eq(0).remove();
		}	

		this.renderMessage = function(msg, type){			
			var statusNode;
			
			if($("."+this.config.className).length){
				statusNode = $("."+this.config.className).eq(0).removeClass("cds-error cds-info").addClass(type);
			}else{
				statusNode = $("<div class='"+this.config.className+" "+type+"' style='display:none'>");	
			}

			var stausWrapper = this.container;
			if(!stausWrapper.length){
				console.error("No container field is specified.");
				return;
			}
			statusNode.html(msg);
			stausWrapper.empty().html(statusNode);
			statusNode.fadeIn(this.timer);
		}

	}

	return {
		showInfoStatus : showInfoStatus,
		showErrorStatus : showErrorStatus,
		clearMessageStatus : clearMessageStatus,
		msgTracker : msgTracker
	}

});




