#!/usr/bin/env node

var chokidar = require('chokidar')
	, browserify = require('browserify')
	, path = require('path')
	, fs = require('fs')
	, appPath = path.join(__dirname, '../js/app')
	, entryPath = path.join(appPath, 'index.js')
	, entryInstance = browserify(entryPath)
	, bundlePath = path.join(appPath, '..', 'bundle.development.js')
	, watcher = chokidar
			.watch(appPath, { persistent: true })
	,	bundleOptions = {
				debug: true
		};

entryInstance.transform('brfs');

var onWriteFile = function (err) {
	if (err) throw err;
};

var onBundle = function (err, src) {
	if (err) {
		console.error("Bundle Error: \n\n", err);
	}

	fs.writeFile(
			bundlePath 
		, src
		, onWriteFile
	);
};

var onChange = function (path) {
	if (path)
		console.log('Changed: ' + path);

	entryInstance.bundle(bundleOptions, onBundle);
};

var onError = function (err) {
	console.error("Error: ", err)
};

watcher
	.on('change', onChange)
	.on('unlink', onChange)
	.on('add', onChange)
	.on('error', onError);

onChange();