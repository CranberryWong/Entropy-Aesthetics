var videoTrackers = [];

function initEB() {
	if (EB.isInitialized()) {
		startAd();
	}
	else {
		EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
	}
}

function startAd() {
	trackVideoInteractions();
	addEventListeners();
	determineIfAutoExpansion();
}

function determineIfAutoExpansion() {
	if (EB._adConfigDefined) {
		var isAutoExpansion = EB._adConfig.customJSVars.mdShouldAutoExpand;

		if (isAutoExpansion) {
			doAutoExpansionBehavior();
		}
	}
}

function doAutoExpansionBehavior() {
	var firstVideo = videoTrackers[0];

	if (firstVideo) {
		firstVideo._videoElement.muted = true;
		firstVideo.playVideo(false); // false prevents tracking a user play
		// auto play may be restricted on some phones and tablets
	}
}

function addEventListeners() {
	var closeButton = document.getElementById("close-button");
	var clickthroughButton = document.getElementById("clickthrough-button");
	var userActionButton = document.getElementById("user-action-button");

	closeButton.addEventListener("click", collapse);
	clickthroughButton.addEventListener("click", clickthrough);
	userActionButton.addEventListener("click", userAction);
	window.addEventListener("message", handleMessageFromCustomScript);

	var cancelAutoCollapseOnUserInteraction = EB._isLocalMode ? false : EB._adConfig.customJSVars.mdCancelAutoCollapseOnUserInteraction;

	if (cancelAutoCollapseOnUserInteraction) {
		document.addEventListener("mousedown", cancelAutoCollapse);
		document.addEventListener("touchstart", cancelAutoCollapse);
	}
}

function handleMessageFromCustomScript(message) {
	try {
		var data = JSON.parse(message.data);

		if (data.type) {
			switch (data.type) {
				case "handleBeforeBillboardCollapse":
					pauseAllVideos();
					break;
				case "handleAfterBillboardExpand":
					// add any code you'd like to run after the billboard expand animation completes
					break;
			} 
		}
		
	}
	catch (error) {}
}

function trackVideoInteractions() {
	var videos = document.getElementsByTagName("video");

	for (var i = 0; i < videos.length; i++) {
		videoTrackers.push(new EBG.VideoModule(videos[i]));
	}
}

function collapse(event) {
	var leaveBehindPanelName = EB._isLocalMode ? "leavebehind" : EB._adConfig.customJSVars.mdLeaveBehindPanelName;

	EB.expand({
		panelName: leaveBehindPanelName,
		actionType: EBG.ActionType.AUTO
	});

	var billboardPanelName = EB._isLocalMode ? "billboard" : EB._adConfig.customJSVars.mdBillboardPanelName;

	EB.collapse({
		panelName: billboardPanelName
	});
}

function pauseAllVideos() {
	var videos = document.getElementsByTagName("video");

	for (var i = 0; i < videos.length; i++) {
		videos[i].pause();
	}
}

function clickthrough(event) {
	pauseAllVideos();
	EB.clickthrough();
}

function userAction(event) {
	EB.userActionCounter("UserAction");
}

function cancelAutoCollapse(event) {
	document.removeEventListener("mousedown", cancelAutoCollapse);
	document.removeEventListener("touchstart", cancelAutoCollapse);

	EB._sendMessage("cancelAutoCollapse", {});
}

// window.addEventListener("load", initEB);