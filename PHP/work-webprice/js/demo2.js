(function(obj) {

	var requestFileSystem = obj.webkitRequestFileSystem || obj.mozRequestFileSystem || obj.requestFileSystem;

	function onerror(message) {
		alert(message);
	}

	function createTempFile(callback) {
		var tmpFilename = "tmp.dat";
		requestFileSystem(TEMPORARY, 4 * 1024 * 1024 * 1024, function(filesystem) {
			function create() {
				filesystem.root.getFile(tmpFilename, {
					create : true
				}, function(zipFile) {
					callback(zipFile);
				});
			}

			filesystem.root.getFile(tmpFilename, null, function(entry) {
				entry.remove(create, create);
			}, create);
		});
	}

	var model = (function() {
		var URL = obj.webkitURL || obj.mozURL || obj.URL;

		return {
			getEntries : function(file, onend) {
				zip.createReader(new zip.BlobReader(file), function(zipReader) {
					//zipReader.getEntries(onend);
					
					
					zipReader.getEntries(function(entries) {
						if (entries.length) {

						  // get first entry content as text
						  entries[0].getData(new zip.TextWriter(), function(text) {
							// text contains the entry data as a String
							console.log(text);

							// close the zip reader
							zipReader.close(function() {
							  // onclose callback
							});

						  }, function(current, total) {
							// onprogress callback
						  });
						}
					});
					
					
				}, onerror);
			},
			getEntryFile : function(entry, creationMethod, onend, onprogress) {
				var writer, zipFileEntry;

				function getData() {
					entry.getData(writer, function(blob) {
						var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
						onend(blobURL);
					}, onprogress);
				}

				if (creationMethod == "Blob") {
					writer = new zip.BlobWriter();
					getData();
				} else {
					createTempFile(function(fileEntry) {
						zipFileEntry = fileEntry;
						writer = new zip.FileWriter(zipFileEntry);
						getData();
					});
				}
			}
		};
	})();

	(function() {
		var fileInput = document.getElementById("file-input");
		var unzipProgress = document.createElement("progress");
		var fileList = document.getElementById("file-list");
		var creationMethodInput = document.getElementById("creation-method-input");

		function download(entry, li, a) {
			model.getEntryFile(entry, creationMethodInput.value, function(blobURL) {
				var clickEvent = document.createEvent("MouseEvent");
				if (unzipProgress.parentNode)
					unzipProgress.parentNode.removeChild(unzipProgress);
				unzipProgress.value = 0;
				unzipProgress.max = 0;
				clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				a.href = blobURL;
				a.download = entry.filename;
				a.dispatchEvent(clickEvent);
			}, function(current, total) {
				unzipProgress.value = current;
				unzipProgress.max = total;
				li.appendChild(unzipProgress);
			});
		}

		if (typeof requestFileSystem == "undefined")
			creationMethodInput.options.length = 1;
		fileInput.addEventListener('change', function() {
			fileInput.disabled = true;
			model.getEntries(fileInput.files[0], function(entries) {
				fileList.innerHTML = "";
				entries.forEach(function(entry) {
					var li = document.createElement("li");
					var a = document.createElement("a");
					a.textContent = entry.filename;
					a.href = "#";
					a.addEventListener("click", function(event) {
						if (!a.download) {
							download(entry, li, a);
							event.preventDefault();
							return false;
						}
					}, false);
					li.appendChild(a);
					fileList.appendChild(li);
				});
			});
		}, false);
	})();

})(this);





var URL = "../../price/cache/param/b2643f39-b145-4497-ba5b-166f47c680f0_price.zip";;

var zipFs = new zip.fs.FS();

function onerror(message) {
	alert(message);
}

function logText(text) {
	//console.log(text);
	//console.log("--------------");
	document.getElementById("file-list").innerHTML=text;
}

zipFs.importHttpContent(URL, false, function() {
	var firstEntry = zipFs.root.children[0];
	firstEntry.getText(function(data) {
		logText(data);
	});
}, onerror);
