const path = require('path');
const spawn = require('child_process').spawn;
const log = require('util').log;
const nwgui = require('nw.gui');

function openLink(e) {
	nwgui.Shell.openExternal($(this).attr('href'));
	e.preventDefault();
	e.stopPropagation();
	return false;
}

function buildDesktop() {
	disableButtons();
	grunt('desktop').then(enableButtons);
}

function buildItch() {
	disableButtons();
	grunt('itch').then(enableButtons);
}

function buildSteam() {
	disableButtons();
	grunt('steam').then(enableButtons);
}

function uploadItch() {
	disableButtons();
	grunt('upload-itch').then(enableButtons);
}

function uploadSteam() {
	disableButtons();
	grunt('upload-steam').then(enableButtons);
}

function grunt(task) {
	const gruntProc = spawn('npx', ['grunt', task], {
		cwd: path.dirname(process.execPath)
	});
	gruntProc.stdout.on('data', data => {
		log(data.toString());
	});
	gruntProc.stderr.on('data', data => {
		log(`*** ${data.toString()}`);
	});
	return new Promise(resolve => {
		gruntProc.on('exit', code => {
			log(`done! (${code})`);
			resolve(code);
		});
	});
}

function disableButtons() {
	const buttons = document.querySelectorAll('button');
	for (button of buttons) button.disabled = true;
}

function enableButtons() {
	const buttons = document.querySelectorAll('button');
	for (button of buttons) button.disabled = false;
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
