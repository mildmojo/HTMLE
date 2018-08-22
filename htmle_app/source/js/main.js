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
	// TODO: run grunt task
	grunt('desktop');
}

function buildItch() {
	// TODO: run grunt task
	grunt('itch');
}

function buildSteam() {
	// TODO: run grunt task
	grunt('steam');
}

function uploadItch() {
	// TODO: run grunt task
	grunt('upload-itch');
}

function uploadSteam() {
	// TODO: run grunt task
	grunt('upload-steam');
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
	gruntProc.on('exit', code => {
		log(`done! (${code})`);
	});
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
