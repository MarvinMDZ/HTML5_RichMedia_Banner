/*
 * Created Date: 04/11/2019 17:49
 * Author: Javier Egido Alonso
 * Author Email: javier.egido.alonso@gmail.com
 * Last Modified: 04/11/2019 17:59:01
 * Modified By: Javier Egido Alonso
 */

var video, audioButton, controlButton, closeButton;

function checkIfAdKitReady(event) {
	adkit.onReady(initializeCreative);
}

function initializeCreative(event) {
	video = document.getElementById("video");
	audioButton = document.getElementById("audioButton");
	controlButton = document.getElementById("controlButton");

	addEventListeners();
	initializeVideoTracking();
}

function addEventListeners() {
	document
		.getElementById("videoClickBtn")
		.addEventListener("click", function() {
			EB.clickthrough();
		});

	document.getElementById("clickBtn").addEventListener("click", function() {
		EB.clickthrough();
	});
}

function initializeVideoTracking() {
	videoTrackingModule = new EBG.VideoModule(video);

	controlButton.addEventListener("click", handleControlsButtonClick);
	audioButton.addEventListener("click", handleAudioButtonClick);

	video.addEventListener("play", setControlImage);
	video.addEventListener("pause", setControlImage);
	video.addEventListener("ended", onVideoEnd);
	video.addEventListener("volumechange", setAudioImage);

	setAudioImage();
	setControlImage();

	video.play();
}

function setAudioImage() {
	if (video.muted) {
		audioButton.style.backgroundImage = "url(images/audioOff.png)";
	} else {
		audioButton.style.backgroundImage = "url(images/audioOn.png)";
	}
}
function setControlImage() {
	if (video.paused) {
		controlButton.style.backgroundImage = "url(images/play.png)";
	} else {
		controlButton.style.backgroundImage = "url(images/pause.png)";
	}
}

function onVideoEnd() {
	controlButton.style.backgroundImage = "url(images/replay.png)";
	video.load();
}

function handleAudioButtonClick() {
	video.muted = !video.muted;
}

function handleControlsButtonClick() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	setControlImage();
}

window.addEventListener("load", checkIfAdKitReady);
