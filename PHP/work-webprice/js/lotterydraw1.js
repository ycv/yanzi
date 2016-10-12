//webkit内核浏览器脚本
(window, window.lib || (window.lib = {})), function (a, b) {
	//提交事件
	$("#btn").on("click", function (e) {
		$(this).attr({"disabled":"disabled"});
		var phone='86'+$("#phone").val();
		if(!phone.match(/^(86){0,1}1[3,4,5,7,8]\d{9}$/)){
			alert("请输入正确的手机号码");
			$("#phone").focus();
			$(this).removeAttr("disabled");
			return false;
		}
		var surname=$.trim($("#surname").val());
		if(surname.length == 0){
			alert("请输入真实姓名");
			$("#surname").focus();
			$(this).removeAttr("disabled");
			return false;
		}
		var identity='';
		$('input[name="identity"]:checked').each(function(){
			if(identity.length==0){
				identity+=$(this).val(); 
			}
			else{
				identity+='-'+$(this).val(); 
			}			
		});
		location.href = '../api/oauth/wx/connect.php?phone='+phone+'&surname='+encodeURIComponent(surname)+'&identity='+identity;
	});
}

(window, window.lib || (window.lib = {})), function (a, b, c) {
	$("#loading").hide();
}
//MD5加密方法
(window, window.lib || (window.lib = {})), function (a, b) {
	b.encode || (b.encode = {}),
	b.encode.md5 = function (a) {
		function b(a, b) {
			return a << b | a >>> 32 - b
		}
		function c(a, b) {
			var c,
			d,
			e,
			f,
			g;
			return e = 2147483648 & a,
			f = 2147483648 & b,
			c = 1073741824 & a,
			d = 1073741824 & b,
			g = (1073741823 & a) + (1073741823 & b),
			c & d ? 2147483648^g^e^f : c | d ? 1073741824 & g ? 3221225472^g^e^f : 1073741824^g^e^f : g^e^f
		}
		function d(a, b, c) {
			return a & b | ~a & c
		}
		function e(a, b, c) {
			return a & c | b & ~c
		}
		function f(a, b, c) {
			return a^b^c
		}
		function g(a, b, c) {
			return b^(a | ~c)
		}
		function h(a, e, f, g, h, i, j) {
			return a = c(a, c(c(d(e, f, g), h), j)),
			c(b(a, i), e)
		}
		function i(a, d, f, g, h, i, j) {
			return a = c(a, c(c(e(d, f, g), h), j)),
			c(b(a, i), d)
		}
		function j(a, d, e, g, h, i, j) {
			return a = c(a, c(c(f(d, e, g), h), j)),
			c(b(a, i), d)
		}
		function k(a, d, e, f, h, i, j) {
			return a = c(a, c(c(g(d, e, f), h), j)),
			c(b(a, i), d)
		}
		function l(a) {
			for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i; )
				b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
			return b = (i - i % 4) / 4,
			h = i % 4 * 8,
			g[b] = g[b] | 128 << h,
			g[f - 2] = c << 3,
			g[f - 1] = c >>> 29,
			g
		}
		function m(a) {
			var b,
			c,
			d = "",
			e = "";
			for (c = 0; 3 >= c; c++)
				b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
			return d
		}
		function n(a) {
			a = a.replace(/\r\n/g, "\n");
			for (var b = "", c = 0; c < a.length; c++) {
				var d = a.charCodeAt(c);
				128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
			}
			return b
		}
		var o,
		p,
		q,
		r,
		s,
		t,
		u,
		v,
		w,
		x = [],
		y = 7,
		z = 12,
		A = 17,
		B = 22,
		C = 5,
		D = 9,
		E = 14,
		F = 20,
		G = 4,
		H = 11,
		I = 16,
		J = 23,
		K = 6,
		L = 10,
		M = 15,
		N = 21;
		for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)
			p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
		var O = m(t) + m(u) + m(v) + m(w);
		return O.toLowerCase()
	}
}
//获取用户信息
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var md5 = b.encode.md5,
	ls = window.localStorage,
	nav = a.navigator,
	stl = nav.standalone,
	uag = nav.userAgent.toLowerCase(),
	geo = nav.geolocation;
	var statInfo = {
		osplatform : "",
		osversion : "",
		language : (navigator.browserLanguage || navigator.language).toLowerCase(),
		ismobiledevice : "0",
		devicename : "",
		deviceid : "",
		devicepixelratio : window.devicePixelRatio,
		defaultbrowser : "",
		micromessager : "",
		useridentifier : "",
		latitude : 0,
		longitude : 0,
		screenW : window.screen.width,
		screenH : window.screen.height
	}
	if(ls){
		if(ls.getItem("appkey")){
			statInfo.useridentifier = ls.getItem("appkey");
		}
	}
	
	//OS
	null != uag.match(/iphone|ipod|ipad/i) ? statInfo.osplatform = "iOS" : null != uag.match(/android/i) ? statInfo.osplatform = "Android" : null != uag.match(/linux/i) ? statInfo.osplatform = "Android" : null != uag.match(/adr/i) ? statInfo.osplatform = "Android" : null != uag.match(/windows/i) ? statInfo.osplatform = "Windows" : null != uag.match(/mac/i) ? statInfo.osplatform = "Mac" : statInfo.osplatform = "Other";

	//OS版本
	var d = uag.match(/(adr)\s+([\d.]+)/),
	e = uag.match(/(android)\s+([\d.]+)/),
	f = uag.match(/(ipad).*os\s([\d_]+)/),
	g = !f && uag.match(/(iphone\sos)\s([\d_]+)/),
	h = uag.match(/(webos|hpwos)[\s\/]([\d.]+)/),
	j = uag.match(/kindle\/([\d.]+)/),
	k = uag.match(/silk\/([\d._]+)/),
	l = uag.match(/(blackberry).*version\/([\d.]+)/),
	m = uag.match(/(bb10).*version\/([\d.]+)/),
	n = uag.match(/(rim\stablet\sos)\s([\d.]+)/);

	null != uag.match(/adr/i) ? statInfo.osversion = d[2] : null != uag.match(/android/i) ? statInfo.osversion = e[2] : null != uag.match(/ipad/i) ? statInfo.osversion = f[2].replace(/_/g, ".") : null != uag.match(/iphone/i) ? statInfo.osversion = g[2].replace(/_/g, ".") : null != uag.match(/webos|hpwos/i) ? statInfo.osversion = h[2] : null != uag.match(/kindle/i) ? statInfo.osversion = j[1] : null != uag.match(/silk/i) ? statInfo.osversion = k[1] : null != uag.match(/blackberry/i) ? statInfo.osversion = l[2] : null != uag.match(/bb10/i) ? statInfo.osversion = m[2] : null != uag.match(/rim|stablet|sos/i) ? statInfo.osversion = n[2] : statInfo.osversion = "Other";
	//浏览器	
	null != uag.match(/uc|ucbrowser|ucweb/i) ? statInfo.defaultbrowser = "UC" : null != uag.match(/baidu|baidubrowser/i) ? statInfo.defaultbrowser = "Baidu" : null != uag.match(/qq|mqqbrowser/i) ? statInfo.defaultbrowser = "QQ" : null != uag.match(/360|360browser/i) ? statInfo.defaultbrowser = "360" : null != uag.match(/opr|opera/i) ? statInfo.defaultbrowser = "Opera" : null != uag.match(/firefox\/([\d.]+)/) ? statInfo.defaultbrowser = "Firefox" : null != uag.match(/micromessenger/i) ? statInfo.defaultbrowser = "MicroMessenger" : null != uag.match(/chrome\/([\d.]+)/) ? statInfo.defaultbrowser = "Chrome" : null != uag.match(/safari\/([\d.]+)/) ? statInfo.defaultbrowser = "Safari" : statInfo.defaultbrowser = "Other";
	null != uag.match(/mobile/i) ? statInfo.ismobiledevice = "1" : "0";
	//微信版本
	var wmsg = uag.match(/micromessenger\/([\d.]+)/);
	null != uag.match(/micromessenger/i) ? statInfo.micromessager = wmsg[1] : "";
	var sendStat = {
		send : function (sdata){
			var mydate=new Date();
			var param = {
				type : "POST",
				url : "stat.php?t="+mydate.getTime(),
				timeout : 5e4,
				dataType : "json",
				data : "info="+JSON.stringify(sdata),
				success : function (statid) {
					//本地持久化存储
					if (ls) {
						if(!ls.getItem("appkey")){
							ls.setItem("appkey",statid);
						}
					}
				},
				error : function (fdata) {
					
				}
			};
			$.ajax(param);
		}
	}

	var gps = {
		getGPS : function (position){
			if (position){
				//授权获取地理位置
				statInfo.latitude = position.coords.latitude;
				statInfo.longitude = position.coords.longitude;
				sendStat.send(statInfo);
			}
			else{
				//未授权获取地理位置
				sendStat.send(statInfo);
			}
		}
	}
	if(geo){
		//支持获取地理位置
		geo.getCurrentPosition(gps.getGPS,function (error) {
			//不支持获取地理位置
			sendStat.send(statInfo);
		},{
			// 指示浏览器获取高精度的位置，默认为false  
			enableHighAcuracy: true,  
			// 指定获取地理位置的超时时间，默认不限时，单位为毫秒  
			timeout: 5000,  
			// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。  
			maximumAge: 3000  
		});
	}
	else{
		//不支持获取地理位置
		sendStat.send(statInfo);
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {}));
