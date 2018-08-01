var count = 0;
const nwgui = require('nw.gui');

function openLink(e) {
	nwgui.Shell.openExternal($(this).attr('href'));
	e.preventDefault();
	e.stopPropagation();
	return false;
}

function buildDesktop() {
	// TODO: run grunt task
}

function buildItch() {
	// TODO: run grunt task
}

function buildSteam() {
	// TODO: run grunt task
}

function uploadItch() {
	// TODO: run grunt task
}

function uploadSteam() {
	// TODO: run grunt task
}

$(function() {
	$('.build.desktop').mouseup(buildDesktop);
	$('.build.itch').mouseup(buildItch);
	$('.build.steam').mouseup(buildSteam);
	$('.upload.itch').mouseup(uploadItch);
	$('.upload.steam').mouseup(uploadSteam);
	$('.quitGame').mouseup(function(){
		quitGame();
	});

	// Make links open in system web browser
	document.querySelectorAll('a[href]').forEach(el => el.addEventListener('click', openLink));
});
