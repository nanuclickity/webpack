/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals hotAddUpdateChunk parentHotUpdateCallback document XMLHttpRequest $require$ $hotChunkFilename$ $hotMainFilename$ */
module.exports = function() {
	if (__webpack_hot_blob === true){
		console.log('webpack: hotBlob Mode.')
	}

	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
		hotAddUpdateChunk(chunkId, moreModules);
		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
	}

	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		var src = $require$.p + $hotChunkFilename$;
		script.type = "text/javascript";
		script.charset = "utf-8";
		if (__webpack_hot_blob !== true){
			script.src = src
		} else {
			script.src = window.URL.createObjectURL(src);
		}
		head.appendChild(script);
	}

	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
		if(typeof XMLHttpRequest === "undefined")
			return callback(new Error("No browser support"));
		try {
			var request = new XMLHttpRequest();
			var requestPath = $require$.p + $hotMainFilename$;
			request.open("GET", requestPath, true);
			request.timeout = 10000;
			request.send(null);
		} catch(err) {
			return callback(err);
		}
		request.onreadystatechange = function() {
			if(request.readyState !== 4) return;
			if(request.status === 0) {
				// timeout
				callback(new Error("Manifest request to " + requestPath + " timed out."));
			} else if(request.status === 404) {
				// no update available
				callback();
			} else if(request.status !== 200 && request.status !== 304) {
				// other failure
				callback(new Error("Manifest request to " + requestPath + " failed."));
			} else {
				// success
				try {
					var update = JSON.parse(request.responseText);
				} catch(e) {
					callback(e);
					return;
				}
				callback(null, update);
			}
		};
	}
};
