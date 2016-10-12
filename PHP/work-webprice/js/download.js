//文件下载
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var ua = navigator.userAgent.toLowerCase();
	if(/micromessenger/.test(ua)){
		$("#downCover").show();
	}
	else{
		location.href = url;
	}
}

(window, window.lib || (window.lib = {}), window.app || (window.app = {}));
