//webkit内核浏览器脚本
//渐进式查询插件
(function($) {
    var autocomplete = null;
	//默认配置
    var defaults = {
		inputClass : "ac_input",
		resultsClass : "ac_results",
		loadingClass : "ac_loading",
		reset : "",
		timeout : 0,
		minChars : 1,
		delay : 400,
		matchCase : false,
		matchSubset : true,
		matchContains : false,
		cacheLength : 10,
		max : 100,
		mustMatch : false,
		extraParams : {},
		selectFirst : true,
		formatItem : function (b) {
			return b[0]
		},
		formatMatch : null,
		autoFill : false,
		width : 0,
		height : 0,
		top :0,
		left :0,
		visible : false,
		multiple : false,
		multipleSeparator : ", ",
		highlight : function (c, b) {
			return c.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + b.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
		},
		scroll : true,
		scrollHeight : "100%"
	};
	
	//插件核心
	Autocomplete = function (l, g) {
		var c = {
			UP : 38,
			DOWN : 40,
			DEL : 46,
			TAB : 9,
			RETURN : 13,
			ESC : 27,
			COMMA : 188,
			PAGEUP : 33,
			PAGEDOWN : 34,
			BACKSPACE : 8
		};
		var b = l.attr("autocomplete", "off").addClass(g.inputClass);
		var j;
		var p = "";
		var m = Autocomplete.Cache(g);
		var e = 0;
		var u;
		var x = {
			mouseDownOnSelect : false
		};
		var r = Autocomplete.Select(g, l, d, x);
		var w;
		b.bind("keydown.autocomplete", function (y) {
			e = 1;
			u = y.keyCode;
			switch (y.keyCode) {
			case c.UP:
				y.preventDefault();
				if (r.visible()) {
					r.prev()
				} else {
					t(0, true)
				}
				break;
			case c.DOWN:
				y.preventDefault();
				if (r.visible()) {
					r.next()
				} else {
					t(0, true)
				}
				break;
			case c.PAGEUP:
				y.preventDefault();
				if (r.visible()) {
					r.pageUp()
				} else {
					t(0, true)
				}
				break;
			case c.PAGEDOWN:
				y.preventDefault();
				if (r.visible()) {
					r.pageDown()
				} else {
					t(0, true)
				}
				break;
			case g.multiple && $.trim(g.multipleSeparator) == "," && c.COMMA:
			case c.TAB:
			case c.RETURN:
				if (d()) {
					y.preventDefault();
					w = true;
					return false
				}
				break;
			case c.ESC:
				r.hide();
				break;
			default:
				clearTimeout(j);
				j = setTimeout(t, g.delay);
				break
			}
		}).focus(function () {
			if (b.val() == g.tipText) {
				b.val("")
			}
			e++
		}).blur(function () {
			//失去焦点自动隐藏
			// e = 0;
			// if (!x.mouseDownOnSelect) {
				// s()
			// }
		}).click(function () {
			if (e++ > 1 && !r.visible()) {
				t(0, true)
			}
			b.focus();
			b.select();
		}).bind("search", function () {
			var y = (arguments.length > 1) ? arguments[1] : null;
			function z(D, C) {
				var A;
				if (C && C.length) {
					for (var B = 0; B < C.length; B++) {
						if (C[B].result.toLowerCase() == D.toLowerCase()) {
							A = C[B];
							break
						}
					}
				}
				if (typeof y == "function") {
					y(A)
				} else {
					b.trigger("result", A && [A.data, A.value])
				}
			}
			$.each(h(b.val()), function (A, B) {
				f(B, z, z)
			})
		}).bind("flushCache", function () {
			m.flush()
		}).bind("setOptions", function () {
			$.extend(g, arguments[1]);
			if ("data" in arguments[1]) {
				m.populate()
			}
		}).bind("unautocomplete", function () {
			r.unbind();
			b.unbind();
			$(l.form).unbind(".autocomplete")
		}).bind("input", function () {
			//显示清空按钮
			var key = b.val(),
				word = key.replace(/( |[\s　])/g, "");
			if (word !== '') {
				clearTimeout(g.timeout);
				g.timeout = setTimeout(function () {
					$(g.reset).show();
				}, 100);
			} else {
				$(g.reset).hide();
			}
			t(0, true);
			b.trigger("refresh");
		});
		function d() {
			var B = r.selected();
			if (!B) {
				return false
			}
			var y = B.innerText;
			p = y;
			if (g.multiple) {
				var E = h(b.val());
				if (E.length > 1) {
					var A = g.multipleSeparator.length;
					var D = $(l).selection().start;
					var C,
					z = 0;
					$.each(E, function (F, G) {
						z += G.length;
						if (D <= z) {
							C = F;
							return false
						}
						z += A
					});
					E[C] = y;
					y = E.join(g.multipleSeparator)
				}
				y += g.multipleSeparator
			}
			//b.val(y);
			v();
			b.trigger("result", [B.innerText ,$(B).attr("ac_data")]);
			return true
		}
		function t(A, z) {
			if (u == c.DEL) {
				r.hide();
				return
			}
			var y = b.val();
			if (!z && y == p) {
				return
			}
			if (y == g.tipText) {
				return
			}
			p = y;
			y = i(y);
			if (y.length >= g.minChars) {
				b.addClass(g.loadingClass);
				if (!g.matchCase) {
					y = y.toLowerCase()
				}
				f(y, k, v)
			} else {
				n();
				r.hide()
			}
		}
		function h(y) {
			if (!y) {
				return [""]
			}
			if (!g.multiple) {
				return [$.trim(y)]
			}
			return $.map(y.split(g.multipleSeparator), function (z) {
				return $.trim(y).length ? $.trim(z) : null
			})
		}
		function i(y) {
			if (!g.multiple) {
				return y
			}
			var A = h(y);
			if (A.length == 1) {
				return A[0]
			}
			var z = $(l).selection().start;
			if (z == y.length) {
				A = h(y)
			} else {
				A = h(y.replace(y.substring(z), ""))
			}
			return A[A.length - 1]
		}
		function q(y, z) {
			if (g.autoFill && (i(b.val()).toLowerCase() == y.toLowerCase()) && u != c.BACKSPACE) {
				b.val(b.val() + z.substring(i(p).length));
				$(l).selection(p.length, p.length + z.length)
			}
		}
		function s() {
			clearTimeout(j);
			j = setTimeout(v, 200)
		}
		function v() {
			var y = r.visible();
			r.hide();
			clearTimeout(j);
			n();
			if (g.mustMatch) {
				b.search(function (z) {
					if (!z) {
						if (g.multiple) {
							var A = h(b.val()).slice(0, -1);
							b.val(A.join(g.multipleSeparator) + (A.length ? g.multipleSeparator : ""))
						} else {
							b.val("");
							b.trigger("result", null)
						}
					}
				})
			}
		}
		function k(z, y) {
			if (y && y.length && e) {
				n();
				r.display(y, z);
				q(z, y[0].value);
				r.show()
			} else {
				v()
			}
		}
		function f(z, B, y) {
			if (!g.matchCase) {
				z = z.toLowerCase()
			}
			var A = m.load(z);
			if (A && A.length) {
				B(z, A)
			} else {
				if ((typeof g.url == "string") && (g.url.length > 0)) {
					var C = {
						timestamp : +new Date()
					};
					$.each(g.extraParams, function (D, E) {
						C[D] = typeof E == "function" ? E() : E
					});
					$.ajax({
						mode : "abort",
						port : "autocomplete" + l.name,
						dataType : g.dataType,
						url : g.url,
						data : $.extend({
							q : i(z),
							limit : g.max
						}, C),
						success : function (E) {
							var D = g.parse && g.parse(E) || o(E);
							m.add(z, D);
							B(z, D)
						}
					})
				} else {
					r.emptyList();
					y(z)
				}
				if(A.length==0){
					r.nosearch(z);
					r.show();
				}
			}
		}
		function o(B) {
			var y = [];
			var A = B.split("\n");
			for (var z = 0; z < A.length; z++) {
				var C = a.trim(A[z]);
				if (C) {
					C = C.split("|");
					y[y.length] = {
						data : C,
						value : C[0],
						result : g.formatResult && g.formatResult(C, C[0]) || C[0]
					}
				}
			}
			return y
		}
		function n() {
			b.removeClass(g.loadingClass)
		}
	};
	
	//缓存
	Autocomplete.Cache = function (c) {
		var f = {};
		var d = 0;
		function h(l, k) {
			if (!c.matchCase) {
				l = l.toLowerCase()
			}
			var j = l.indexOf(k);
			if (c.matchContains == "word") {
				j = l.toLowerCase().search("\\b" + k.toLowerCase())
			}
			if (j == -1) {
				return false
			}
			return j == 0 || c.matchContains
		}
		function g(j, i) {
			if (d > c.cacheLength) {
				b()
			}
			if (!f[j]) {
				d++
			}
			f[j] = i
		}
		function e() {
			if (!c.data) {
				return false
			}
			var k = {},
			j = 0;
			if (!c.url) {
				c.cacheLength = 1
			}
			k[""] = [];
			for (var m = 0, l = c.data.length; m < l; m++) {
				var p = c.data[m];
				p = (typeof p == "string") ? [p] : p;
				var o = c.formatMatch(p, m + 1, c.data.length);
				if (o === false) {
					continue
				}
				var n = o.charAt(0).toLowerCase();
				if (!k[n]) {
					k[n] = []
				}
				var q = {
					value : o,
					data : p,
					result : c.formatResult && c.formatResult(p) || o
				};
				k[n].push(q);
				if (j++ < c.max) {
					k[""].push(q)
				}
			}
			$.each(k, function (r, s) {
				c.cacheLength++;
				g(r, s)
			})
		}
		setTimeout(e, 25);
		function b() {
			f = {};
			d = 0
		}
		return {
			flush : b,
			add : g,
			populate : e,
			load : function (n) {
				if (!c.cacheLength || !d) {
					return null
				}
				if (!c.url && c.matchContains) {
					var m = [];
					for (var j in f) {
						if (j.length > 0) {
							var o = f[j];
							$.each(o, function (p, k) {
								if (h(k.value, n)) {
									m.push(k)
								}
							})
						}
					}
					return m
				} else {
					if (f[n]) {
						return f[n]
					} else {
						if (c.matchSubset) {
							for (var l = n.length - 1; l >= c.minChars; l--) {
								var o = f[n.substr(0, l)];
								if (o) {
									var m = [];
									$.each(o, function (p, k) {
										if (h(k.value, n)) {
											m[m.length] = k
										}
									});
									return m
								}
							}
						}
					}
				}
				return null
			}
		}
	};
	
	//选中
	Autocomplete.Select = function (e, j, l, p) {
		var i = {
			ACTIVE : "ac_over"
		};
		var k,
		f = -1,
		r,
		m = "",
		s = true,
		c,
		a,
		o;
		function n() {
			if (!s) {
				return
			}
			if($("#"+e.resultsClass).length>0){
				a=$("#"+e.resultsClass).hide();
				if(a.find("#scroller").length>0){
					c=a.find("#scroller");
				}else{
					c=$('<div id="scroller"/>').appendTo(a).hide().addClass("scroller");
				}
			}else{
				c = $("<div/>").hide().addClass(e.resultsClass).css("position", "absolute").appendTo(e.parentContainer);
			}
			c.empty();
			o = $("<ul/>").appendTo(c).mouseover(function (t) {
					if (q(t).nodeName && q(t).nodeName.toUpperCase() == "LI") {
						f = $("li", o).removeClass(i.ACTIVE).index(q(t));
						$(q(t)).addClass(i.ACTIVE)
					}
				}).click(function (t) {
					$(q(t)).addClass(i.ACTIVE);
					l();
					return false
				}).mousedown(function () {
					p.mouseDownOnSelect = true
				}).mouseup(function () {
					p.mouseDownOnSelect = false
				});
			if (e.width > 0) {
				c.css("width", e.width)
			}
			s = false
		}
		function q(u) {
			var t = u.target;
			while (t && t.tagName != "LI") {
				t = t.parentNode
			}
			if (!t) {
				return []
			}
			return t
		}
		function h(t) {
			k.slice(f, f + 1).removeClass(i.ACTIVE);
			g(t);
			var v = k.slice(f, f + 1).addClass(i.ACTIVE);
			if (e.scroll) {
				var u = 0;
				k.slice(0, f).each(function () {
					u += this.offsetHeight
				});
				if ((u + v[0].offsetHeight - o.scrollTop()) > o[0].clientHeight) {
					o.scrollTop(u + v[0].offsetHeight - o.innerHeight())
				} else {
					if (u < o.scrollTop()) {
						o.scrollTop(u)
					}
				}
			}
		}
		function g(t) {
			f += t;
			if (f < 0) {
				f = k.size() - 1
			} else {
				if (f >= k.size()) {
					f = 0
				}
			}
		}
		function b(t) {
			return e.max && e.max < t ? e.max : t
		}
		function d() {
			o.empty();
			var u = b(r.length);
			for (var v = 0; v < u; v++) {
				if (!r[v]) {
					continue
				}
				var w = e.formatItem(r[v].data, v + 1, u, r[v].value, m);
				if (w === false) {
					continue
				}
				var t = $("<li/>").html(e.highlight(w, m)).addClass(v % 2 == 0 ? "ac_even" : "ac_odd").attr("ac_data", r[v].data.fid).appendTo(o)[0];
			}
			k = o.find("li");
			if (e.selectFirst) {
				k.slice(0, 1).addClass(i.ACTIVE);
				f = 0
			}
			if ($.fn.bgiframe) {
				o.bgiframe()
			}
		}
		return {
			display : function (u, t) {
				n();
				r = u;
				m = t;
				d()
			},
			next : function () {
				h(1)
			},
			prev : function () {
				h(-1)
			},
			pageUp : function () {
				if (f != 0 && f - 8 < 0) {
					h(-f)
				} else {
					h(-8)
				}
			},
			pageDown : function () {
				if (f != k.size() - 1 && f + 8 > k.size()) {
					h(k.size() - 1 - f)
				} else {
					h(8)
				}
			},
			hide : function () {
				c && c.hide();
				a && a.hide();
				k && k.removeClass(i.ACTIVE);
				f = -1
			},
			visible : function () {
				return c && e.visible
			},
			current : function () {
				return this.visible() && (k.filter("." + i.ACTIVE)[0] || e.selectFirst && k[0])
			},
			show : function () {
				var v = $(j).offset();
				c.show();
				a.css({
					width : typeof e.width == "string" || e.width > 0 ? e.width : a(j).width(),
					top : e.top,
					left : e.left,
					height : e.height > 0 ? e.height - e.top : $(window).height() - e.top
				}).show();
				if (e.scroll) {
					o.scrollTop(0);
				}
				e.visible=true;
			},
			selected : function () {
				var t = k && k.filter("." + i.ACTIVE).removeClass(i.ACTIVE);
				return t && t.length && t[0];
			},
			emptyList : function () {
				o && o.empty();
			},
			unbind : function () {
				//c && c.remove();
			},
			nosearch : function(kw) {
				var t = $("<li/>").html("抱歉，没有找到与<strong>"+kw+"</strong>相关的结果。").addClass("ac_even").appendTo(o);
			}
		}
	};
	
	//键盘上下键选中事件
	$.fn.selection = function (i, b) {
		if (i !== undefined) {
			return this.each(function () {
				if (this.createTextRange) {
					var j = this.createTextRange();
					if (b === undefined || i == b) {
						j.move("character", i);
						j.select()
					} else {
						j.collapse(true);
						j.moveStart("character", i);
						j.moveEnd("character", b);
						j.select()
					}
				} else {
					if (this.setSelectionRange) {
						this.setSelectionRange(i, b)
					} else {
						if (this.selectionStart) {
							this.selectionStart = i;
							this.selectionEnd = b
						}
					}
				}
			})
		}
		var g = this[0];
		if (g.createTextRange) {
			var c = document.selection.createRange(),
			h = g.value,
			f = "<->",
			d = c.text.length;
			c.text = f;
			var e = g.value.indexOf(f);
			g.value = h;
			this.selection(e, e + d);
			return {
				start : e,
				end : e + d
			}
		} else {
			if (g.selectionStart !== undefined) {
				return {
					start : g.selectionStart,
					end : g.selectionEnd
				}
			}
		}
	}
	
	//初始化插件
    $.fn.autocomplete = function(data,c) {
        if (!autocomplete) {
			var d = typeof data == "string";
			c = $.extend({}, defaults, {
					url : d ? data : null,
					data : d ? null : data,
					delay : d ? defaults.delay : 10,
					max : c && !c.scroll ? 10 : 150,
					tipText : c && c.tipText ? c.tipText : "",
					parentContainer : c && c.parentContainer ? c.parentContainer : document.body
				}, c);
			c.highlight = c.highlight || function (e) {
				return e
			};
			c.formatMatch = c.formatMatch || c.formatItem;

            autocomplete = new Autocomplete($(this), c);
        }
        return this;
    };
	//其他方法
	$.fn.unautocomplete = function(data,c) {
		autocomplete=null;
		return this.trigger("unautocomplete");
	};
	$.fn.result = function (b) {
		return this.bind("result", b);
	};
	$.fn.refresh = function (b) {
		return this.bind("refresh", b);
	};
	$.fn.search = function (b) {
		return this.trigger("search", [b]);
	};
	$.fn.flushCache = function () {
		return this.trigger("flushCache");
	};
	$.fn.setOptions = function (b) {
		return this.trigger("setOptions", [b]);
	};
    $.fn.autocomplete.version = '0.1.0';
}(Zepto));
//设置默认高度
(window, window.lib || (window.lib = {})), function (a, b, c) {
	//默认窗体高度
	var windowH={
		height : $(window).height()
	}
	b.windowH = windowH;
	
	$("#wrap").css({
		height : windowH.height - $("#bar").height()
	})
}
//公共动画方法
(window, window.lib || (window.lib = {})), function (a, b) {
	var translation2d = {
		translation : function (a, b, c) {
			var d = $.extend({
					duration : "0.4s",
					origin : "0 0"
				}, b || {}),
			e = a.style;
			!e.webkitTransitionProperty && (e.webkitTransitionProperty = "-webkit-transform"),
			e.webkitTransitionDuration !== d.duration && (e.webkitTransitionDuration = d.duration),
			e.webkitTransformOrigin !== d.origin && (e.webkitTransformOrigin = d.origin),
			"hidden" !== e.webkitBackfaceVisibility && (e.webkitBackfaceVisibility = "hidden"),
			"preserve-3d" !== e.webkitTransformStyle && (e.webkitTransformStyle = "preserve-3d"),
			(null != d.x || null != d.y) && (e.webkitTransform = "translate(" + (d.x ? d.x + "px," : "0,") + (d.y ? d.y + "px" : "0") + ")", setTimeout(c, 1500 * parseFloat(d.duration)))
		}
	}
	b.trans2d = translation2d;
}
//选型
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var myScroll = {
		refreshP : function(){
			$("#priceInfo").css({
				height : b.windowH.height - $("#se-bar").height() - $(".banners").height() - $(".product").height() - $(".TabTitle").height()
			});
			//重置选型页面区域大小
			b.myScroll.myPScroll.refresh();
		}
	};
	var priceinfo  = function (m,a, b,initTab){
		einfo.init(m,a,b,initTab);
	};
	var sinfo = {
		q_series_json : "",
		q_proplist_json : "",
		q_complist_json : "",
		q_rellist_json : "",
		q_mproplist_json : "",
		q_sprops_json : new Array(),
		q_m_comps_json : new Array(),
		q_m_props_json : "",
		q_n_comps_json : new Array(),
		q_a_props_json : new Array(),
		q_class_json : new Array(),
		q_curprod : {},
		q_comblist_json : [],
		q_element_json : "",
		q_element_innermodel : "",
		q_elenent_ct : new Array(),//附件ID
		q_elenented_ct : new Array(),//必选附件ID
		q_ct_id : new Array(),//附件选型明细
		q_seled_attach_json : new Array(),//必选附件明细
		q_sel_attach_json : new Array(),//可选附件明细
		q_supp_discount : {},
		q_element_price : "",//元件价格列表
		q_seled_attach_count : 0,
		stimeout : 5000,//统计信息发送停留时间
		sendtimeout : 0,
		ltimeout : 1500,//元件信息加载停留时间
		elementtimeout : 0,
		q_pclassid : ''
	};
	var einfo = {
		init : function(innermodel,classid,pclassid,initTab){
			//清空历史数据
			sinfo.q_series_json = "",
			sinfo.q_proplist_json = "",
			sinfo.q_complist_json = "",
			sinfo.q_rellist_json = "",
			sinfo.q_mproplist_json = "",
			sinfo.q_sprops_json = new Array(),
			sinfo.q_m_comps_json = new Array(),
			sinfo.q_m_props_json = "",
			sinfo.q_n_comps_json = new Array(),
			sinfo.q_a_props_json = new Array(),
			sinfo.q_class_json = new Array(),
			sinfo.q_curprod = {},
			sinfo.q_comblist_json = [],
			sinfo.q_element_json = "",
			sinfo.q_element_innermodel = "",
			sinfo.q_element_price = "",
			sinfo.q_elenent_ct = new Array(),
			sinfo.q_elenented_ct = new Array(),
			sinfo.q_ct_id = new Array(),
			sinfo.q_seled_attach_json = new Array(),
			sinfo.q_sel_attach_json = new Array(),
			sinfo.q_supp_discount = {},
			sinfo.q_seled_attach_count = 0,
			//上级系列ID
			sinfo.q_pclassid = pclassid;
			//初始化加载选型信息
			var mydate=new Date();
			$.getJSON("../price/getseriesfilezip.php?t="+mydate.getTime()+"&classid="+classid+"&client=msg", function (cdata) {
				if(cdata!=null){
					$.getJSON("price/classjson.js?t="+cdata.hash, function (data) {
						sinfo.q_class_json = data;
					});
					JSZipUtils.getBinaryContent("price/param/"+classid+".zip?t="+cdata.hash, function(err, binarydata) {
						if(err) {
							$.getJSON("price/param/"+classid+".js?t="+cdata.hash, function (data) {
								einfo.getJsonData(innermodel,initTab,data);
							});
						}
						else{
							var zip = new JSZip(binarydata);
							var zipdata = zip.file(classid+".js").asText();
							var data=eval('('+zipdata+')');
							einfo.getJsonData(innermodel,initTab,data);
						}
					});				
				}
			});
		},
		getJsonData : function (innermodel,initTab,data){
			//获取系列参数json数据
			sinfo.q_series_json = data.SERIES_INFO,
			sinfo.q_proplist_json = data.PROPS_INFO,
			sinfo.q_complist_json = data.COMPS_INFO,
			sinfo.q_rellist_json = data.RELS_INFO,
			sinfo.q_mproplist_json = data.MPROPS_INFO,
			sinfo.q_comblist_json = data.ATTACH_INFO;

			if(initTab==0){
				einfo.showMainContent();
			}
			if (sinfo.q_series_json != null && sinfo.q_proplist_json.length > 0 && sinfo.q_complist_json != "") {
				//初始化
				einfo.Q_InitData(),
				einfo.Q_InitQuery(innermodel),
				//清空
				$("#result_prodname").empty(),
				$("#fissuedate").empty(),
				$("#price_i").html("0"),
				$("#price_b").html(".00");
			}
		},
		showMainContent : function (){
			//初始化选项卡显示
			$("#myTab").find("span").first().addClass("active").removeClass("normal").siblings().addClass("normal").removeClass("active"),
			$("#myTab_Content0").show().siblings().hide();
		},
		Q_InitData : function () {
			//整理json数据
			$.each(sinfo.q_complist_json, function (d) {
				var c = sinfo.q_complist_json[d];
				if (c.IsMain == 1) {
					sinfo.q_m_comps_json.push(c);//本体信息
					$.each(sinfo.q_proplist_json, function (i) {
						var a = sinfo.q_proplist_json[i];
						if (a.CompId == c.CompId) {
							sinfo.q_a_props_json.push(a);
						}
					});
				} else {
					sinfo.q_n_comps_json.push(c);//附件信息
					$.each(sinfo.q_proplist_json, function (i) {
						var a = sinfo.q_proplist_json[i];
						if (a.CompId == c.CompId) {
							var b = einfo.Q_H_FindComp(sinfo.q_complist_json, a.CompId);
							if (b != null) {
								if (b.CompProps == null) {
									b.CompProps = new Array();
								}
								b.CompProps.push(a);
							}
						}
					});
				}
			});
		},
		Q_InitQuery : function (n) {
			//初始化查询
			var a;
			if (sinfo.q_sprops_json != null) {
				$.each(sinfo.q_sprops_json, function (b) {
					var c = sinfo.q_sprops_json[b];
					if (c.MPropList == null || c.MPropList.length == 0) {
						a = c;
						return false;
					}
				});
			}
			if (a == null && sinfo.q_m_props_json != null) {
				$.each(sinfo.q_m_props_json, function (b) {
					var c = sinfo.q_m_props_json[b];
					if (c.MPropList == null || c.MPropList.length == 0) {
						a = c;
						return false;
					}
				});
			}
			a=sinfo.q_proplist_json;
			einfo.ElementSelected_CheckOpt(a, n, 0);
		},
		ElementSelected_CheckOpt : function (a, n, b) {
			//元件列表跳转后修改当前选中元件的本体
			if(n.length>0){
				var inner = n.split("≌");
				var z = "";
				//初始化本体信息
				$.each(sinfo.q_a_props_json, function (c) {
					if(sinfo.q_a_props_json.length>1){
						if(c>0&&c>b){
							var d = sinfo.q_a_props_json[c-1];//上级
							var k = sinfo.q_a_props_json[c];//本级
							var p = k.PropId + "|";
							
							var s;
							
							//循环上级
							$.each(d.OptList, function (j) {
								var t = d.OptList[j];
								if(t.IsChk==true){
									if (z == "") {
										z = t.OID;
									} else {
										z = z + "+" + t.OID;
									}
									
									var f = sinfo.q_rellist_json[p + z];
									if (f != null && f.length > 0) {
										s = new Array();
										for (var h = 0; h < f.length; h++) {
											s.push(f[h]);
										}
									}
									var isex=true;
									//循环本级
									$.each(k.OptList, function (i){
										var u = k.OptList[i];
										if(u.OMod == inner[c]){
											u.IsChk = true;
										}
										else{
											u.IsChk = false;
										}
										var istrue = einfo.CheckSelectOpt(k.OptList, s);
										if(istrue){
											isex=false;
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
												} else {
													u.IsEn = false;
												}
											}
										}
										else{
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
													if(isex){
														isex = false;
													}
												} else {
													u.IsEn = false;
												}
											}
										}
									});
								}
							});
							var o = sinfo.q_a_props_json[0];//第一级
							$.each(o.OptList, function (j) {
								var t = o.OptList[j];
								if(t.IsChk==true){
									var x = t.OID;
									var f = sinfo.q_rellist_json[p + x];
									if (f != null && f.length > 0) {
										s = new Array();
										for (var h = 0; h < f.length; h++) {
											s.push(f[h]);
										}
									}
									var isex=true;
									$.each(k.OptList, function (i){
										var u = k.OptList[i];
										if(u.OMod == inner[c]){
											u.IsChk = true;
										}
										else{
											u.IsChk = false;
										}
										var istrue = einfo.CheckSelectOpt(k.OptList, s);
										if(istrue){
											isex=false;
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
												} else {
													u.IsEn = false;
												}
											}
										}
										else{
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
													if(isex){
														isex = false;
													}
												} else {
													u.IsEn = false;
												}
											}
										}
									});
								}
							});
						}
						else if (c==0&&b==0){
							var d = sinfo.q_a_props_json[c];//本级
							var k = sinfo.q_a_props_json[c+1];//下级
							var p = k.PropId + "|";
							var x = "";
							var s;
							//循环本级
							$.each(d.OptList, function (j) {
								var t = d.OptList[j];
								if(t.OMod == inner[c]){
									t.IsChk = true;
									if (x == "") {
										x = t.OID;
									} else {
										//x = x + "+" + t.OID;
									}
									
									var f = sinfo.q_rellist_json[p + x];
									if (f != null && f.length > 0) {
										s = new Array();
										for (var h = 0; h < f.length; h++) {
											s.push(f[h]);
										}
									}
									
									var isex=true;
									//循环第二级
									$.each(k.OptList, function (i){
										var u = k.OptList[i];
										if(u.OMod == inner[c]){
											u.IsChk = true;
										}
										else{
											u.IsChk = false;
										}
										var istrue = einfo.CheckSelectOpt(k.OptList, s);
										if(istrue){
											isex=false;
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
												} else {
													u.IsEn = false;
												}
											}
										}
										else{
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
													if(isex){
														isex = false;
													}
												} else {
													u.IsEn = false;
												}
											}
										}
									});
								}
								else{
									t.IsChk = false;
								}
							});
						}
					}
					else{
						var d = sinfo.q_a_props_json[c];//本级
						//var cot = 0;
						
						//循环本级
						$.each(d.OptList, function (j) {
							var t = d.OptList[j];
							if(t.OMod == inner[c]){
								t.IsChk = true;
							}
							else{
								t.IsChk = false;
							}
							// if(t.IsChk==true){
								// t.IsChk = false;
							// }
							// else{
								// if(cot==0){
									// t.IsChk = true;
								// }
								// cot = 1;
							// }
						});
					}
				});
			}
			else{
				//直接选择系列，初始化本体信息
				var z = "";
				$.each(sinfo.q_a_props_json, function (c) {
					if(sinfo.q_a_props_json.length>1){
						if(c>0&&c>b){
							var d = sinfo.q_a_props_json[c-1];//上级
							var k = sinfo.q_a_props_json[c];//本级
							var p = k.PropId + "|";
							var s;
							
							//循环上级
							$.each(d.OptList, function (j) {
								var t = d.OptList[j];
								if(t.IsChk==true){
									if (z == "") {
										z = t.OID;
									} else {
										z = z + "+" + t.OID;
									}
									
									var f = sinfo.q_rellist_json[p + z];
									if (f != null && f.length > 0) {
										s = new Array();
										for (var h = 0; h < f.length; h++) {
											s.push(f[h]);
										}
									}
									var isex=true;
									//循环本级
									$.each(k.OptList, function (i){
										var istrue = einfo.CheckSelectOpt(k.OptList, s);
										var u = k.OptList[i];
										if(istrue){
											isex=false;
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
												} else {
													u.IsEn = false;
													u.IsChk = false;
												}
											}
										}
										else{
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
													if(isex){
														u.IsChk = true;
														isex = false;
														n = n + "≌" + u.OMod;
													}
													else{
														u.IsChk = false;
													}
												} else {
													u.IsEn = false;
													u.IsChk = false;
												}
											}
										}
									});
								}
							});
							var o = sinfo.q_a_props_json[0];//第一级
							$.each(o.OptList, function (j) {
								var t = o.OptList[j];
								if(t.IsChk==true){
									var x = t.OID;
									var f = sinfo.q_rellist_json[p + x];
									if (f != null && f.length > 0) {
										s = new Array();
										for (var h = 0; h < f.length; h++) {
											s.push(f[h]);
										}
									}
									var isex=true;
									$.each(k.OptList, function (i){
										var istrue = einfo.CheckSelectOpt(k.OptList, s);
										var u = k.OptList[i];
										if(istrue){
											isex=false;
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
												} else {
													u.IsEn = false;
													u.IsChk = false;
												}
											}
										}
										else{
											if (s != null && s.length > 0) {
												if ($.inArray(u.OID.toString(), s) >= 0) {
													u.IsEn = true;
													if(isex){
														u.IsChk = true;
														isex = false;
													}
													else{
														u.IsChk = false;
													}
												} else {
													u.IsEn = false;
													u.IsChk = false;
												}
											}
										}
									});
								}
							});
						}
						else if (c==0&&b==0){
							var d = sinfo.q_a_props_json[c];//本级
							var cot = 0;
							
							//循环本级
							$.each(d.OptList, function (j) {
								var t = d.OptList[j];
								if(t.IsChk==true){
									t.IsChk = false;
								}
								else{
									if(cot==0){
										t.IsChk = true;
										n = t.OMod;
									}
									cot = 1;
								}
							});
						}
					}
					else{
						var d = sinfo.q_a_props_json[c];//本级
						var cot = 0;
						
						//循环本级
						$.each(d.OptList, function (j) {
							var t = d.OptList[j];
							if(t.IsChk==true){
								t.IsChk = false;
							}
							else{
								if(cot==0){
									t.IsChk = true;
									n = t.OMod;
								}
								cot = 1;
							}
						});
					}
				});
				n = n + "≌";
			}
			
			//显示本体信息
			einfo.Q_Ref_PropPart(sinfo.q_a_props_json, $("#Part_MainProp"));

			if (sinfo.q_element_json == "") {
				if (sinfo.q_element_price != "") {
					var priceinfo='';
					var appendix='';
					$.each(sinfo.q_element_price.Table, function (d) {
						var c = sinfo.q_element_price.Table[d];
						if(c.F_InnerModel==n){
							priceinfo=c.F_Price;
							if (typeof c.F_ProductAppendix_CustomID !== "undefined" || c.F_ProductAppendix_CustomID != null) {
								appendix=c.F_ProductAppendix_CustomID.toString();
							}
							return false;
						}
					});
					
					//初始化附件信息
					if(appendix != '' && appendix.length > 0 && appendix.indexOf("*")>0){
						var w;
						var cusids = appendix;
						var cusidarr=cusids.split(",");
						if (cusidarr != null && cusidarr.length > 0) {
							w = new Array();
							sinfo.q_elenent_ct.length = 0;
							sinfo.q_elenented_ct.length = 0;
							for (var h = 0; h < cusidarr.length; h++) {
								if(cusidarr[h].indexOf("*")>0){
									var comid= sinfo.q_mproplist_json[cusidarr[h].replace("*","")];
									w.push(comid + "*");
									sinfo.q_seled_attach_count++;
									sinfo.q_elenented_ct.push(cusidarr[h]);
								}
								else{
									var comid= sinfo.q_mproplist_json[cusidarr[h]];
									w.push(comid);
								}
								sinfo.q_elenent_ct.push(cusidarr[h].replace("*",""));
							}
						}
						$.each(sinfo.q_complist_json, function (d) {
							var c = sinfo.q_complist_json[d];
							if (c.IsMain == 1){
								return true;
							}
							if (w != null && w.length > 0) {
								if ($.inArray(c.CompId.toString(), w) >= 0) {
									//可选附件
									c.IsEnabled = true;
									c.IsChecked = false;
									c.IsShow = true;
								} else {
									var chk = c.CompId.toString() + "*";
									if ($.inArray(chk, w) >= 0) {
										//必选附件
										c.IsEnabled = false;
										c.IsChecked = true;
										c.IsShow = true;
										//初始化必选附件选型信息
										einfo.Q_InitCompAttach(c.CompProps,0,c.CompId);
									}
									else{
										c.IsEnabled = false;
										c.IsChecked = false;
										c.IsShow = false;
									}
								}
							}
						});
						
						if (sinfo.q_complist_json != null) {
							//循环附件分类
							$.each(sinfo.q_complist_json, function (h) {
								var g = sinfo.q_complist_json[h];
								if (!g.IsChecked) {
									return true;
								}
								
								//循环附件信息
								$.each(sinfo.q_comblist_json, function (l) {
									var k = sinfo.q_comblist_json[l];
									if(g.CompId == k.CompSet){
										if($.inArray(k.CtID.toString(), sinfo.q_elenent_ct) >= 0){
											if($.inArray(k.PropOptSet.toString(), sinfo.q_ct_id) >= 0){
												if($.inArray(k.CtID.toString() + "*", sinfo.q_elenented_ct) >= 0){
													//查询必选附件
													priceinfo = parseFloat(priceinfo) + parseFloat(k.Price);
												}
											}
										}
									}
								});
							});
						}
					}

					var c = einfo.SplitThePrice((priceinfo).toFixed(2));
					if (priceinfo==null) {
						$("#price_i").html("未定价");
						$("#price_b").html("");
					} else {
						$("#price_i").html(c[0]);
						$("#price_b").html(c[1]);
					}

					//隐藏loading
					myScroll.refreshP();
					$("#loading").hide();
				}
				
				sinfo.q_element_innermodel=n;
				
				var mydate=new Date();
				$.ajax({
					type : "POST",
					url : "../price/getelementinfojson.php?t="+mydate.getTime()+"&client=msg",
					data : "classid="+sinfo.q_series_json.SeriesID+"&innermodel="+encodeURIComponent(n),
					async : true,
					dataType : "json",
					success : function (e) {
						$("#samplelist").html("");
						if(e!=null){
							sinfo.q_element_json = e;
							var dt=einfo.jsonDateParser(sinfo.q_element_json.F_Issue_Date);
							$("#fissuedate").html(dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate());
						
							//初始化附件信息
							var w;
							var cusids = sinfo.q_element_json.F_ProductAppendix_CustomID.toString();
							var cusidarr=cusids.split(",");
							if (cusidarr != null && cusidarr.length > 0) {
								w = new Array();
								sinfo.q_elenent_ct.length = 0;
								sinfo.q_elenented_ct.length = 0;
								for (var h = 0; h < cusidarr.length; h++) {
									if(cusidarr[h].indexOf("*")>0){
										var comid= sinfo.q_mproplist_json[cusidarr[h].replace("*","")];
										w.push(comid + "*");
										sinfo.q_seled_attach_count++;
										sinfo.q_elenented_ct.push(cusidarr[h]);
									}
									else{
										var comid= sinfo.q_mproplist_json[cusidarr[h]];
										w.push(comid);
									}
									sinfo.q_elenent_ct.push(cusidarr[h].replace("*",""));
								}
							}
							$.each(sinfo.q_complist_json, function (d) {
								var c = sinfo.q_complist_json[d];
								if (c.IsMain == 1){
									return true;
								}
								if (w != null && w.length > 0) {
									if ($.inArray(c.CompId.toString(), w) >= 0) {
										//可选附件
										c.IsEnabled = true;
										c.IsChecked = false;
										c.IsShow = true;
									} else {
										var chk = c.CompId.toString() + "*";
										if ($.inArray(chk, w) >= 0) {
											//必选附件
											c.IsEnabled = false;
											c.IsChecked = true;
											c.IsShow = true;
											//初始化必选附件选型信息
											einfo.Q_InitCompAttach(c.CompProps,0,c.CompId);
										}
										else{
											c.IsEnabled = false;
											c.IsChecked = false;
											c.IsShow = false;
										}
									}
								}
							});
							//显示附件信息
							einfo.Q_Ref_CompTPart();
							//清空附件选型信息
							$("#q_comp_info").html("");
								
							//定时发送询价单引用统计
							einfo.staticprice(sinfo.q_element_json.F_Product_ID);

							//获取系列下元件价格缓存
							$.getJSON("../price/getseriespricefilezip.php?t="+mydate.getTime()+"&classid="+sinfo.q_series_json.SeriesID+"&client=msg", function (pdata) {
								if(pdata!=null){
									JSZipUtils.getBinaryContent("price/param/"+sinfo.q_series_json.SeriesID+"_price.zip?t="+pdata.hash, function(err, binarydata) {
										if(err) {
											$.getJSON("price/param/"+sinfo.q_series_json.SeriesID+"_price.js?t="+pdata.hash, function (data) {
												sinfo.q_element_price=data;
											});
										}
										else{
											var zip = new JSZip(binarydata);
											var zipdata = zip.file(sinfo.q_series_json.SeriesID+"_price.js").asText();
											var data=eval('('+zipdata+')');
											sinfo.q_element_price=data;
										}
									});
									
								}
							});
						}
						//隐藏loading
						myScroll.refreshP();
						$("#loading").hide();
					}
				});
			}
		},
		Q_Q_Product : function (a, b) {
			//本体选择初始化数据
			var z = "";
			$.each(sinfo.q_a_props_json, function (c) {
				if(c<b){
					var k = sinfo.q_a_props_json[c];//本级
					$.each(k.OptList, function (j) {
						var t = k.OptList[j];
						if(t.IsChk==true){
							if (z == "") {
								z = t.OID;
							} else {
								z = z + "+" + t.OID;
							}
						}
					});
				}
			});
			
			var u = "";
			//初始化本体信息
			$.each(sinfo.q_a_props_json, function (c) {
				if(sinfo.q_a_props_json.length>1){
					if(c>0&&c>b){
						var d = sinfo.q_a_props_json[c-1];//上级
						var k = sinfo.q_a_props_json[c];//本级
						var p = k.PropId + "|";
						
						var s;
						
						//循环上级
						$.each(d.OptList, function (j) {
							var t = d.OptList[j];
							if(t.IsChk==true){
								if (z == "") {
									z = t.OID;
								} else {
									z = z + "+" + t.OID;
								}
								var f = sinfo.q_rellist_json[p + z];
								if (f != null && f.length > 0) {
									s = new Array();
									for (var h = 0; h < f.length; h++) {
										s.push(f[h]);
									}
								}
								var isex=true;
								//循环本级
								$.each(k.OptList, function (i){
									var istrue = einfo.CheckSelectOpt(k.OptList, s);
									var n = k.OptList[i];
									if(istrue){
										isex=false;
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
									else{
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
												if(isex){
													n.IsChk = true;
													isex = false;
												}
												else{
													n.IsChk = false;
												}
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
								});
							}
						});
						var o = sinfo.q_a_props_json[0];//第一级
						$.each(o.OptList, function (j) {
							var t = o.OptList[j];
							if(t.IsChk==true){
								var x = t.OID;
								var f = sinfo.q_rellist_json[p + x];
								if (f != null && f.length > 0) {
									s = new Array();
									for (var h = 0; h < f.length; h++) {
										s.push(f[h]);
									}
								}
								var isex=true;
								$.each(k.OptList, function (i){
									var istrue = einfo.CheckSelectOpt(k.OptList, s);
									var n = k.OptList[i];
									if(istrue){
										isex=false;
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
									else{
										
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
												if(isex){
													n.IsChk = true;
													isex = false;
												}
												else{
													n.IsChk = false;
												}
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
								});
							}
						});
					}
					else if (c==0&&b==0){
						var d = sinfo.q_a_props_json[c];//本级
						var k = sinfo.q_a_props_json[c+1];//下级
						var p = k.PropId + "|";
						var x = "";
						var s;
						//循环本级
						$.each(d.OptList, function (j) {
							var t = d.OptList[j];
							if(t.IsChk==true){
								if (x == "") {
									x = t.OID;
								} else {
									x = x + "+" + t.OID;
								}
								
								var f = sinfo.q_rellist_json[p + x];
								if (f != null && f.length > 0) {
									s = new Array();
									for (var h = 0; h < f.length; h++) {
										s.push(f[h]);
									}
								}
								
								var isex=true;
								//循环第二级
								$.each(k.OptList, function (i){
									var istrue = einfo.CheckSelectOpt(k.OptList, s);
									var n = k.OptList[i];
									if(istrue){
										isex=false;
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
									else{
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
												if(isex){
													n.IsChk = true;
													isex = false;
												}
												else{
													n.IsChk = false;
												}
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
								});
							}
						});
					}
				}
				
				var du = sinfo.q_a_props_json[c];//本级
				$.each(du.OptList, function (j) {
					var tu = du.OptList[j];
					if(tu.IsChk==true){
						u = u + tu.OMod + "≌";
					}
				});
			});

			//显示本体信息
			einfo.Q_Ref_PropPart(sinfo.q_a_props_json, $("#Part_MainProp"));

			if (sinfo.q_element_price != "") {
				var priceinfo='';
				var appendix='';
				$.each(sinfo.q_element_price.Table, function (d) {
					var c = sinfo.q_element_price.Table[d];
					if(c.F_InnerModel==u){
						priceinfo=c.F_Price;
						if (typeof c.F_ProductAppendix_CustomID !== "undefined" || c.F_ProductAppendix_CustomID != null) {
							appendix=c.F_ProductAppendix_CustomID.toString();
						}
						return false;
					}
				});
				
				//初始化附件信息
				if(appendix != '' && appendix.length > 0 && appendix.indexOf("*")>0){
					var w;
					var cusids = appendix;
					var cusidarr=cusids.split(",");
					if (cusidarr != null && cusidarr.length > 0) {
						w = new Array();
						sinfo.q_elenent_ct.length = 0;
						sinfo.q_elenented_ct.length = 0;
						for (var h = 0; h < cusidarr.length; h++) {
							if(cusidarr[h].indexOf("*")>0){
								var comid= sinfo.q_mproplist_json[cusidarr[h].replace("*","")];
								w.push(comid + "*");
								sinfo.q_seled_attach_count++;
								sinfo.q_elenented_ct.push(cusidarr[h]);
							}
							else{
								var comid= sinfo.q_mproplist_json[cusidarr[h]];
								w.push(comid);
							}
							sinfo.q_elenent_ct.push(cusidarr[h].replace("*",""));
						}
					}
					$.each(sinfo.q_complist_json, function (d) {
						var c = sinfo.q_complist_json[d];
						if (c.IsMain == 1){
							return true;
						}
						if (w != null && w.length > 0) {
							if ($.inArray(c.CompId.toString(), w) >= 0) {
								//可选附件
								c.IsEnabled = true;
								c.IsChecked = false;
								c.IsShow = true;
							} else {
								var chk = c.CompId.toString() + "*";
								if ($.inArray(chk, w) >= 0) {
									//必选附件
									c.IsEnabled = false;
									c.IsChecked = true;
									c.IsShow = true;
									//初始化必选附件选型信息
									einfo.Q_InitCompAttach(c.CompProps,0,c.CompId);
								}
								else{
									c.IsEnabled = false;
									c.IsChecked = false;
									c.IsShow = false;
								}
							}
						}
					});
										
					if (sinfo.q_complist_json != null) {
						//循环附件分类
						$.each(sinfo.q_complist_json, function (h) {
							var g = sinfo.q_complist_json[h];
							if (!g.IsChecked) {
								return true;
							}
							
							//循环附件信息
							$.each(sinfo.q_comblist_json, function (l) {
								var k = sinfo.q_comblist_json[l];
								if(g.CompId == k.CompSet){
									if($.inArray(k.CtID.toString(), sinfo.q_elenent_ct) >= 0){
										if($.inArray(k.PropOptSet.toString(), sinfo.q_ct_id) >= 0){
											if($.inArray(k.CtID.toString() + "*", sinfo.q_elenented_ct) >= 0){
												//查询必选附件
												priceinfo = parseFloat(priceinfo) + parseFloat(k.Price);
											}
										}
									}
								}
							});
						});
					}
				}

				var c = einfo.SplitThePrice((priceinfo).toFixed(2));
				if (priceinfo==null) {
					$("#price_i").html("未定价");
					$("#price_b").html("");
				} else {
					$("#price_i").html(c[0]);
					$("#price_b").html(c[1]);
				}

				//隐藏loading
				$("#eleloading").hide();
				myScroll.refreshP();
			}
			
			sinfo.q_element_innermodel=u;
			
			sinfo.elementtimeout = window.setTimeout(function (){
				sinfo.q_element_json = "";
				var mydate=new Date();
				$.ajax({
					type : "POST",
					url : "../price/getelementinfojson.php?t="+mydate.getTime()+"&client=msg",
					data : "classid="+sinfo.q_series_json.SeriesID+"&innermodel="+encodeURIComponent(u),
					async : true,
					dataType : "json",
					success : function (e) {
						$("#samplelist").html("");
						if(e!=null){
							sinfo.q_element_json = e;
							var dt=einfo.jsonDateParser(sinfo.q_element_json.F_Issue_Date);
							$("#fissuedate").html(dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate());
							//初始化附件信息
							var w;
							var cusids = sinfo.q_element_json.F_ProductAppendix_CustomID.toString();
							var cusidarr=cusids.split(",");
							if (cusidarr != null && cusidarr.length > 0) {
								w = new Array();
								sinfo.q_elenent_ct.length = 0;
								sinfo.q_elenented_ct.length = 0;
								for (var h = 0; h < cusidarr.length; h++) {
									if(cusidarr[h].indexOf("*")>0){
										var comid= sinfo.q_mproplist_json[cusidarr[h].replace("*","")];
										w.push(comid + "*");
										sinfo.q_seled_attach_count++;
										sinfo.q_elenented_ct.push(cusidarr[h]);
									}
									else{
										var comid= sinfo.q_mproplist_json[cusidarr[h]];
										w.push(comid);
									}
									sinfo.q_elenent_ct.push(cusidarr[h].replace("*",""));
								}
							}
							$.each(sinfo.q_complist_json, function (d) {
								var c = sinfo.q_complist_json[d];
								if (c.IsMain == 1){
									return true;
								}
								if (w != null && w.length > 0) {
									if ($.inArray(c.CompId.toString(), w) >= 0) {
										//可选附件
										c.IsEnabled = true;
										c.IsChecked = false;
										c.IsShow = true;
									} else {
										var chk = c.CompId.toString() + "*";
										if ($.inArray(chk, w) >= 0) {
											//必选附件
											c.IsEnabled = false;
											c.IsChecked = true;
											c.IsShow = true;
											//初始化必选附件选型信息
											einfo.Q_InitCompAttach(c.CompProps,0,c.CompId);
										}
										else{
											c.IsEnabled = false;
											c.IsChecked = false;
											c.IsShow = false;
										}
									}
								}
							});
							//显示附件信息
							einfo.Q_Ref_CompTPart();
							//清空附件选型信息
							$("#q_comp_info").html("");
							
							//定时发送询价单引用统计
							sinfo.sendtimeout = window.setTimeout(function (){
									$.ajax({
										type : "POST",
										url : "../price/getpraisemicmsg.php?t="+mydate.getTime()+"&client=msg",
										data : "praise=1&optype=2&productid="+sinfo.q_element_json.F_Product_ID,
										async : true,
										dataType : "text",
										success : function (e) {
											window.clearTimeout(sinfo.sendtimeout);
										}
									});
								}, sinfo.stimeout);
						}
							
						//隐藏loading
						$("#eleloading").hide();
						myScroll.refreshP();
					}
				});
			}, sinfo.ltimeout);
		},
		CheckSelectOpt : function (a, s) {
			//查找选中的本体参数
			var isex=false;
			$.each(a, function (c) {
				var d = a[c];
				if (s != null && s.length > 0) {
					if (d.IsChk == true&&$.inArray(d.OID.toString(), s) >= 0) {
						isex = true;
						return;
					}
				}
				else{
					if (d.IsChk == true) {
						isex = true;
						return;
					}
				}
			});
			return isex;
		},
		Q_H_FindComp : function (a, b) {
			//查找附件分类
			var c;
			$.each(a, function (d) {
				if (a[d].CompId == b) {
					c = a[d];
					return false;
				}
			});
			return c;
		},
		Q_Ref_CompTPart : function () {
			//显示附件分类
			var a = "Part_CompT";
			var d = -1;
			var c = "";
			var b = 0;
			var typeids = new Array();
			var compids = new Array();
			$.each(sinfo.q_complist_json, function (g) {
				var e = sinfo.q_complist_json[g];
				
				if (e.IsMain != 0 || (!e.IsEnabled && !e.IsChecked)) {
					return true;
				}
				
				if($.inArray(e.TypeName, typeids) == -1){
					c = c + '<div class="ctype_menu"><span class=\'qp_flag ct_flag\'>&nbsp;</span><div class="ctype_title" onclick="">' + e.TypeName + '</div><div id="ctype_submenu_' + e.TypeName + '" class="ctype_submenu">';
					
					$.each(sinfo.q_complist_json, function (j) {
						var t = sinfo.q_complist_json[j];
						if(e.TypeName == t.TypeName && $.inArray(t.CompId, compids) == -1){
							compids.push(t.CompId);
							if (t.IsMain != 0 || (!t.IsEnabled && !t.IsChecked)) {
								return true
							}
							var h = " selected ";
							var f = 'ed';
							if (t.IsEnabled) {
								f = "";
							}
							if (!t.IsChecked) {
								h = "";
							}
							c = c + '<span name="epcomp_span" id="epcomp_span_' + t.CompId + '" class="chb_comp">';
							c = c + '<div class="attachChk' + f + h + '" data="' + t.TypeId + ',' + t.CompId + '" value="' + t.CompId + '"></div>';
							c = c + '<div class="attachA" data="' + t.CompId + ',0,true' + '">' + t.CompName + "</div></span>";
						}
					});
					
					c = c + "</div></div>";
				}
				typeids.push(e.TypeName);
			});

			if(c.length>0){
				$("#" + a).html(c);
			}
			else{
				$("#" + a).html("无附件!");
			}
			
			//附件勾选事件移除和绑定
			$("#Part_CompT").find(".attachChk").each(function (b, c) {
				$(c).unbind("click");
			});
			var exc=0;
			$("#Part_CompT").find(".attachChk").each(function (b, c) {
				$(c).click(function () {
					var mydate=new Date();
						if(mydate.getTime()-exc>500){
						exc = mydate.getTime();
						var idstr=$(this).attr("data");
						var idarr=idstr.split(",");
						if ($(this).hasClass("selected")) {
							$(this).removeClass("selected");
							einfo.Q_CheckComp(false,idarr[0],idarr[1]);	
						}
						else{
							$(this).addClass("selected");
							einfo.Q_CheckComp(true,idarr[0],idarr[1]);	
						}
					}
				});
			});
			//附件选型信息显示事件移除和绑定
			$("#Part_CompT").find(".attachA").each(function (b, c) {
				$(c).unbind("click");
			});
			$("#Part_CompT").find(".attachA").each(function (b, c) {
				$(c).click(function () {
					var idstr=$(this).attr("data");
					var idarr=idstr.split(",");
					var isclick=idarr[2] == 'true' ? true : false;
					einfo.Q_Ref_CompInfoChange(idarr[0],idarr[1],isclick);
				})
			});
			
			sinfo.q_curprod = einfo.Q_GetProduct("");
			sinfo.q_supp_discount={};
			einfo.Q_Ref_ProdPart(sinfo.q_curprod);
		},
		Q_InitCompAttach : function (a_compinfo_json, b, compid){
			//初始化显示附件信息
			var attarr = new Array();
			$.each(sinfo.q_comblist_json, function (c) {
				var k = sinfo.q_comblist_json[c];
				if(k.CompSet==compid && $.inArray(k.CtID.toString(), sinfo.q_elenent_ct) >= 0){
					attarr.push(k.PropOptSet);
				}
			});
			
			var att_rellist_json = new Object();
			for(var j=0;j<attarr.length;j++){
				var pos=attarr[j].split("-");
				var p = "";
				for(var i=0;i<pos.length;i++){
					if(i>0){
						if(i==1){
							p = pos[i-1];
						}
						else{
							p = p + "+" + pos[i-1];
						}
					}
					var attrelsid = i + "|" + p;
					if(att_rellist_json.hasOwnProperty(attrelsid)){
						if($.inArray(pos[i], att_rellist_json[attrelsid]) >= 0){
							
						}
						else{
							att_rellist_json[attrelsid].push(pos[i]);
						}
					}
					else{
						var attrelsarr = new Array(pos[i]);
						att_rellist_json[attrelsid] = attrelsarr;
					}
				}
			}

			var z = "";
			var u = "";
			$.each(a_compinfo_json, function (c) {
				if(c>0&&c>b){
					var d = a_compinfo_json[c-1];//上级
					var k = a_compinfo_json[c];//本级
					var p = k.PropId + "|";
					var s;
					var cot = 0;
					//循环上级
					$.each(d.OptList, function (j) {
						var t = d.OptList[j];
						if(t.IsChk==true){
							if (z == "") {
								z = t.OID;
							} else {
								z = z + "+" + t.OID;
							}
							
							var f = att_rellist_json[p + z];
							if (f != null && f.length > 0) {
								s = new Array();
								for (var h = 0; h < f.length; h++) {
									s.push(f[h]);
								}
							}
							var isex=true;
							//循环本级
							$.each(k.OptList, function (i){
								var istrue = einfo.CheckSelectOpt(k.OptList, s);
								var n = k.OptList[i];
								if(istrue){
									isex=false;
									
									if (s != null && s.length > 0) {
										if ($.inArray(n.OID.toString(), s) >= 0) {
											n.IsEn = true;
										} else {
											n.IsEn = false;
											n.IsChk = false;
										}
									}
								}
								else{
									if (s != null && s.length > 0) {
										if ($.inArray(n.OID.toString(), s) >= 0) {
											n.IsEn = true;
											if(isex){
												n.IsChk = true;
												isex = false;
											}
											else{
												n.IsChk = false;
											}
										} else {
											n.IsEn = false;
											n.IsChk = false;
										}
									}
								}
							});
						}
					});
				}
				else if (c==0&&b==0){
					var d = a_compinfo_json[c];//本级
					var k = a_compinfo_json[c+1];//下级
					
					//控制本级显示
					var dp = d.PropId + "|";
					var ds;
					var df = att_rellist_json[dp];
					if (df != null && df.length > 0) {
						ds = new Array();
						for (var h = 0; h < df.length; h++) {
							ds.push(df[h]);
						}
					}
					var isex=true;
					$.each(d.OptList, function (j) {
						var n = d.OptList[j];
						var istrue = einfo.CheckSelectOpt(d.OptList, ds);
						if(istrue){
							isex=false;
							if (ds != null && ds.length > 0) {
								if ($.inArray(n.OID.toString(), ds) >= 0) {
									n.IsEn = true;
								} else {
									n.IsEn = false;
									n.IsChk = false;
								}
							}
						}
						else{
							if (ds != null && ds.length > 0) {
								if ($.inArray(n.OID.toString(), ds) >= 0) {
									n.IsEn = true;
									if(isex){
										n.IsChk = true;
										isex = false;
									}
									else{
										n.IsChk = false;
									}
								} else {
									n.IsEn = false;
									n.IsChk = false;
								}
							}
						}
					});
					
					//控制下级显示
					if (k != null) {
						var p = k.PropId + "|";
						var x = "";
						var s;

						//循环本级
						$.each(d.OptList, function (j) {
							var t = d.OptList[j];
							if(t.IsChk==true){
								if (x == "") {
									x = t.OID;
								} else {
									//x = x + "+" + t.OID;
								}
								
								var f = att_rellist_json[p + x];
								if (f != null && f.length > 0) {
									s = new Array();
									for (var h = 0; h < f.length; h++) {
										s.push(f[h]);
									}
								}
								
								var isex=true;
								//循环第二级
								$.each(k.OptList, function (i){
									var istrue = einfo.CheckSelectOpt(k.OptList, s);
									var n = k.OptList[i];
									if(istrue){
										isex=false;
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
									else{
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
												if(isex){
													n.IsChk = true;
													isex = false;
												}
												else{
													n.IsChk = false;
												}
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
								});
							}
						});
					}
				}
				var cu = a_compinfo_json[c];//本级
				$.each(cu.OptList, function (j) {
					var tu = cu.OptList[j];
					if(tu.IsChk==true){
						if(c==0){
							u = tu.OID;
						}
						else{
							u = u + "-" + tu.OID;
						}
					}
				});
			});
			sinfo.q_ct_id.push(u);
		},
		Q_FindCombPrice : function (b, a) {
			//获取附件价格信息
			var c;
			$.each(b, function (d) {
				var e = b[d];
				if (e.PropOptSet == a) {
					c = e;
					return false;
				}
			});
			return c;
		},
		Q_GetProdComp : function (j, d) {
			//显示附件价格信息
			var a = "";
			var f = 100;
			var g = 0;
			var up = 0;
			var p = 0;
			$.each(j, function (l) {
				var k = j[l];
				$.each(k.OptList, function (h) {
					var t = k.OptList[h];
					if (t.IsChk==true) {
						a = (a == "") ? t.OID : a + "-" + t.OID
					}
				});
			});
			var c = "";
			if (sinfo.q_comblist_json != "" && sinfo.q_comblist_json) {
				c = einfo.Q_FindCombPrice(sinfo.q_comblist_json, a);
			}
			if (c && c != "") {
				g = c.Price;
				//p = g.toFixed(2);
				p = g;
				f = c.Discount;
				//up = (g * (f / 100)).toFixed(2);
				up = (g * (f / 100)).toFixed(2);
				
				
			} else {
				g = 0.0;
				p = g.toFixed(2);
				up = (g * (f / 100)).toFixed(2);
			}
		},
		SplitThePrice : function (c) {
			//格式化价格
			var b = "0";
			var d = ".00";
			if (c != 0) {
				var e = c.toString();
				var a = e.indexOf(".");
				b = (a <= 0) ? e : e.substring(0, a);
				d = (a <= 0) ? ".00" : e.substring(a, e.length);
			}
			var f = new Array();
			f.push(b);
			f.push(d);
			return f;
		},
		Q_Ref_ProdPart : function (b) {
			//显示明细列表
			$("#result_prodname").html(b.ProdName);
			var c = einfo.SplitThePrice((b.Total).toFixed(2));
			if (!b.Pricedflag) {
				$("#price_i").html("未定价");
				$("#price_b").html("");
			} else {
				if($("#price_i").html()!=c[0]){
					$("#price_i").html(c[0]);
				}
				if($("#price_b").html()!=c[1]){
					$("#price_b").html(c[1]);
				}
			}
			var a = "";
			if (b.CombList != null && b.CombList.length > 0) {
				$.each(b.CombList, function (f) {
					var d = b.CombList[f];
					var e = "";
					if(d.IsMain==1){
						e=" (本体)";
					}
					a = a + '<tr><td align="center">' + d.CombName + e + '</td><td align="center">￥' + parseFloat(d.Price).toFixed(2) + '</td></tr>';
				});
			}
			$("#Part_pdetail").html(a);
		},
		showSupplierDiscount : function (data,rt,at){
			//加载供应商折扣信息
			var modelval = $("#result_prodname").html();
			var priceval = $("#price_i").html() + $("#price_b").html();
			var facname = $("#factory-name").html();
			var sername = $("#series-name").html();
			var bodystr = "尊敬的dq123认证供应商，您好：制造商［"+facname+"］，型号规格［"+modelval+"］，品名［"+sername+"］，现诚意采购，请尽快给予报价。谢谢！［电气天下微信客户端］";
			$("#supplist").html("");
			var s="",v="",l="";
			$.each(data.Table, function (i) {
				var d = data.Table[i];
				var t=(parseFloat(rt) * parseFloat(d.F_Discount)+parseFloat(at) * parseFloat(d.F_Discount4Appendix));
				var ct = einfo.SplitThePrice((t).toFixed(2));
				var telarr = d.F_Tel.split("   ");
				var twostr = '';
				if(telarr.length>1){
					twostr = '&nbsp;&nbsp;<a class="telA" data="'+telarr[1].replace("-","")+'">'+telarr[1]+'</a>'
				}
				//供应商明细
				var dt=einfo.jsonDateParser(d.F_Issue_Date);
				var js=(parseFloat(rt) * (1-parseFloat(d.F_Discount))+parseFloat(at) * (1-parseFloat(d.F_Discount4Appendix))).toFixed(2);
				var sms='<a class="smsA" data="'+telarr[0].replace("-","")+'"><span class="sms"></span></a>';
				var ua = navigator.userAgent.toLowerCase();
				if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1){
					sms='';
				}
				l=$('<div class="cpic_rba"/>').html('<ul><li><span class="suptitle">'+d.F_Supplier_Name+'</span><span class="supprice">￥'+ct[0]+ct[1]+'</span></li><li><span>主体:'+(parseFloat(d.F_Discount)*100).toFixed(2).toString()+'%</span><span>附件:'+(parseFloat(d.F_Discount4Appendix)*100).toFixed(2).toString()+'%</span><span>节省:'+js.toString()+'</span></li><li><span>联系人:'+d.F_Contact+'</span><span>电话:<a class="telA" data="'+telarr[0].replace("-","")+'">'+telarr[0]+'</a>'+twostr+'</span><span>'+sms+'</span></li><li><span>地址:'+d.F_ADDRESS+'</span><span>发布日期:'+dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+'</span></li></ul>');
				l.appendTo($("#supplist"));
			});
			//电话点击事件
			$("#supplist").find(".telA").each(function (b, c) {
				$(c).unbind("click");
			});
			$("#supplist").find(".telA").each(function (b, c) {
				$(c).click(function () {
					var tel=$(this).attr("data");
					location.href = 'tel:'+tel;
				})
			});
			//短信点击事件
			$("#supplist").find(".smsA").each(function (b, c) {
				$(c).unbind("click");
			});
			$("#supplist").find(".smsA").each(function (b, c) {
				$(c).click(function () {
					var tel=$(this).attr("data");
					var ua = navigator.userAgent.toLowerCase();
					if (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1){
						url = "sms:"+ tel +";body=" + encodeURIComponent(bodystr);
					}
					else{
						url = "sms:"+ tel +"?body=" + bodystr;
					}
					location.href = url;
				})
			});
			myScroll.refreshP();
		},
		Q_GetProduct : function (compid) {
			//获取选中的元件及附件信息
			
			//更改已选中的必选附件
			if(compid!=""){
				var editedid;
				$.each(sinfo.q_seled_attach_json, function (l) {
					var k = sinfo.q_seled_attach_json[l];
					if(k.CompSet == compid){
						editedid = l;
						return true;
					}
				});
			
				//删除更改过的
				if(editedid!=null){
					sinfo.q_seled_attach_json.splice(editedid,1); 
				}
			}

			//更改已选中的可选附件
			if(compid!=""){
				var editid;
				$.each(sinfo.q_sel_attach_json, function (l) {
					var k = sinfo.q_sel_attach_json[l];
					if(k.CompSet == compid){
						editid = l;
						return true;
					}
				});
			
				//删除更改过的
				if(editid!=null){
					sinfo.q_sel_attach_json.splice(editid,1); 
				}
			}
			
			var seled = new Object();
			if (sinfo.q_complist_json != null) {
				//循环附件分类
				$.each(sinfo.q_complist_json, function (h) {
					var g = sinfo.q_complist_json[h];
					if (!g.IsChecked) {
						return true;
					}
					
					//循环附件信息
					$.each(sinfo.q_comblist_json, function (l) {
						var k = sinfo.q_comblist_json[l];
						if(g.CompId == k.CompSet){
							if($.inArray(k.CtID.toString(), sinfo.q_elenent_ct) >= 0){
								seled[k.CompSet] = k.CompSet;
								if($.inArray(k.PropOptSet.toString(), sinfo.q_ct_id) >= 0){
									k["IsMain"]=0;
									if($.inArray(k.CtID.toString() + "*", sinfo.q_elenented_ct) >= 0){
										//查询必选附件
										sinfo.q_seled_attach_json.push(k);
									}
									else{
										//查询可选附件
										sinfo.q_sel_attach_json.push(k);
									}
								}
							}
						}
					});
				});
			}
			
			var noseled = new Array();
			//循环附件信息
			$.each(sinfo.q_sel_attach_json, function (l) {
				var k = sinfo.q_sel_attach_json[l];
				if(!seled.hasOwnProperty(k.CompSet)){
					noseled.push(l);
				}
			});
			//删除取消选中的
			for(var z=0;z<noseled.length;z++){
				sinfo.q_sel_attach_json.splice(noseled[z],1); 
			}
			
			var a = einfo.Q_InitProduct();
			var f = 0;
			var b = "";
			var pk = "";

			$.each(sinfo.q_a_props_json, function (c) {
				var du = sinfo.q_a_props_json[c];//本级
				$.each(du.OptList, function (j) {
					var tu = du.OptList[j];
					if(tu.IsChk==true){
						if (a.Prodkey == null) {
							a.Prodkey = tu.OID.toString();
						} else {
							a.Prodkey = a.Prodkey + "+" + tu.OID;
						}
					}
				});
			});
			
			if (sinfo.q_complist_json != null) {
				a.CombList = new Array();
				
				//过滤本体名称中的必选附件名称
				var attarr = sinfo.q_element_json.F_ProductAppendix_CustomID.toString().split('*');
				var elename = sinfo.q_element_json.F_Model;
				var namearr = sinfo.q_element_json.F_Model.lastIndexOf('+');
				for(var z=0;z<attarr.length-1;z++){
					if(namearr>0){
						elename=elename.substring(0,namearr);
						namearr=elename.lastIndexOf('+');
					}
				}
				
				//添加本体元件明细
				var rk = einfo.Q_InitCombiantion();
				rk.CombName = elename;
				rk.IsMain = 1;
				var productprice=0;
				if(sinfo.q_element_json.F_Price!=null){
					productprice=sinfo.q_element_json.F_Price;
				}
				else{
					a.Pricedflag=false;
				}
				rk.Price = productprice;
				a.CombList.push(rk);
				
				//循环必选附件信息
				$.each(sinfo.q_seled_attach_json, function (l) {
					var k = sinfo.q_seled_attach_json[l];
					f = parseFloat(f) + parseFloat(k.Price);
					a.CombList.push(k);
				});
				
				//循环可选附件信息
				$.each(sinfo.q_sel_attach_json, function (l) {
					var k = sinfo.q_sel_attach_json[l];
					f = parseFloat(f) + parseFloat(k.Price);
					b = b + "+" + k.CombName;
					pk = pk + "+" + k.PropOptSet;
					a.CombList.push(k);
				});
				
				a.ProdDetailName = sinfo.q_element_json.F_Model;
				a.ProdName = sinfo.q_element_json.F_Model + b;
				a.FactName = sinfo.q_series_json.FactName;
				a.Unit = sinfo.q_element_json.F_Unit;
				a.CataName = sinfo.q_class_json[sinfo.q_element_json.F_Category_ID];
				
				a.Prodkey = a.Prodkey + "+" + pk + sinfo.q_series_json.SeriesID;
				a.Total = parseFloat(f) + parseFloat(productprice);
				a.Price = parseFloat(f) + parseFloat(productprice);
				a.PriceBeforeDisc = productprice;
			}
			return a;
		},
		Q_CheckComp : function (check_box, compTId, compId) {
			//显示附件信息点击事件
			var curcomp = einfo.Q_H_FindComp(sinfo.q_complist_json, compId);
			if (typeof curcomp === "undefined" || curcomp == null) {
				return "";
			}
			curcomp.IsChecked = check_box;
			einfo.Q_Ref_CompInfo(compId,0,check_box);
		},
		Q_Ref_CompInfo : function (c,d,e) {
			//生成附件选型信息
			var a = einfo.Q_H_FindComp(sinfo.q_complist_json, c);
			if (typeof a === "undefined" || a == null) {
				return "";
			}
			sinfo.q_ct_id.length=0;
			einfo.Q_InitCompAttach(a.CompProps,d,c);
			sinfo.q_curprod = einfo.Q_GetProduct("");
			einfo.Q_Ref_ProdPart(sinfo.q_curprod);
			var attachname=einfo.Q_Attach_CombName(a.CompProps);
			einfo.Q_GetProdComp(a.CompProps);
			$("#q_comp_info").html("");
			if(e){
				var b = "";
				b += '<div id="q_comp_props">';
				b += einfo.Q_Get_CompPropPart(c, a.CompProps, false,attachname);
				b += "</div>";
				$("#q_comp_info").html(b);
				myScroll.refreshP();
				
				//附件选择事件移除和绑定
				$("#q_comp_props").find(".attachClk").each(function (b, c) {
					$(c).unbind("click");
				});
				$("#q_comp_props").find(".attachClk").each(function (b, c) {
					$(c).click(function () {
						var idstr=$(this).attr("data");
						var idarr=idstr.split(",");
						einfo.Q_S_CompProp(idarr[0],idarr[1],idarr[2]);
						myScroll.refreshP();
					})
				});
			}
		},
		Q_Ref_CompInfoChange : function (c,d,e) {
			//点击附件名称生成附件选型信息
			var a = einfo.Q_H_FindComp(sinfo.q_complist_json, c);
			if (typeof a === "undefined" || a == null) {
				return "";
			}
			sinfo.q_ct_id.length=0;
			einfo.Q_InitCompAttach(a.CompProps,d,c);
			sinfo.q_curprod = einfo.Q_GetProduct(c);
			einfo.Q_Ref_ProdPart(sinfo.q_curprod);
			var attachname=einfo.Q_Attach_CombName(a.CompProps);
			einfo.Q_GetProdComp(a.CompProps);
			$("#q_comp_info").html("");
			if(e){
				var b = "";
				b += '<div id="q_comp_props">';
				b += einfo.Q_Get_CompPropPart(c, a.CompProps, false,attachname);
				b += "</div>";
				$("#q_comp_info").html(b);
				myScroll.refreshP();
				
				//附件选择事件移除和绑定
				$("#q_comp_props").find(".attachClk").each(function (b, c) {
					$(c).unbind("click");
				});
				$("#q_comp_props").find(".attachClk").each(function (b, c) {
					$(c).click(function () {
						var idstr=$(this).attr("data");
						var idarr=idstr.split(",");
						einfo.Q_S_CompProp(idarr[0],idarr[1],idarr[2]);
						myScroll.refreshP();
					})
				});
			}
		},
		Q_Attach_CombName : function (b) {
			//获取指定附件名称
			var combname = '';
			var a = "";
			$.each(b, function (l) {
				var k = b[l];
				$.each(k.OptList, function (h) {
					var t = k.OptList[h];
					if (t.IsChk==true) {
						a = (a == "") ? t.OID : a + "-" + t.OID
					}
				});
			});
			var c = einfo.Q_FindCombPrice(sinfo.q_comblist_json, a);
			return c.CombName;
		},
		Q_Get_CompPropPart : function (c, e, d,attname) {
			//生成附件选型详细信息
			var a = '<div class="prop_part pro_part_name"><h1>'+ attname +'</h1></div>';
			if (e != null && e.length > 0) {
				var b = 0;
				$.each(e, function (j) {
					var f = e[j];
					if (f.Jlbs == 1 || f.Jlbs == 3 || f.IsShow == 0) {
						return true;
					}
					if (!d && f.Jlbs == 2) {
						return true;
					}
					var g = false;
					var h;
					if (f.OptList != null && f.OptList.length > 0) {
						h = einfo.Q_H_FindPropOptList(f.OptList, true);
						if (h.length > 0) {
							g = true;
						}
					}
					if (g) {
						b++;
						var l = (b % 2 == 0) ? "prop_part_bg2" : "prop_part_bg1";
						var k = '<div id="q_prop_' + f.PropId + '" class="prop_part ' + l + '"><div class="prop_title"><span class="qp_flag cp_flag">&nbsp;</span><label>' + f.PropName + "</label></div><div class='prop_list'>";
						$.each(h, function (n) {
							var o = h[n];
							var m = (o.IsChk) ? "opt_s opt_s_ch" : "opt_s opt_s_nch attachClk";
							if (d) {
								k = k + '<span id="q_opt_' + o.OID + '" class="opt_s ' + m + '">' + o.OName + "</span>";
							} else {
								k = k + '<span id="q_opt_' + o.OID + '" class="opt_s ' + m + '" data="' + c + ',' + f.PropId + ',' + o.OID + '">' + o.OName + "</span>";
							}
						});
						k = k + "</div></div>";
						a += k;
					}
				});
			}
			return a;
		},
		Q_H_FindPropById : function (b, a) {
			//查找附件参数信息
			var c;
			$.each(b, function (d) {
				if (b[d].PropId == a) {
					c = b[d];
					return false;
				}
			});
			return c;
		},
		Q_SelectedCompAttach : function (a_compinfo_json, b, compid){
			//附件选型显示附件信息
			var attarr = new Array();
			$.each(sinfo.q_comblist_json, function (c) {
				var k = sinfo.q_comblist_json[c];
				if(k.CompSet==compid && $.inArray(k.CtID.toString(), sinfo.q_elenent_ct) >= 0){
					attarr.push(k.PropOptSet);
				}
			});
			
			var att_rellist_json = new Object();
			for(var j=0;j<attarr.length;j++){
				var pos=attarr[j].split("-");
				var p = "";
				for(var i=0;i<pos.length;i++){
					if(i>0){
						if(i==1){
							p = pos[i-1];
						}
						else{
							p = p + "+" + pos[i-1];
						}
					}
					var attrelsid = i + "|" + p;
					if(att_rellist_json.hasOwnProperty(attrelsid)){
						if($.inArray(pos[i], att_rellist_json[attrelsid]) >= 0){
							
						}
						else{
							att_rellist_json[attrelsid].push(pos[i]);
						}
					}
					else{
						var attrelsarr = new Array(pos[i]);
						att_rellist_json[attrelsid] = attrelsarr;
					}
				}
			}
			
			var z = "";
			$.each(a_compinfo_json, function (c) {
				if(c<b){
					var k = a_compinfo_json[c];//本级
					$.each(k.OptList, function (j) {
						var t = k.OptList[j];
						if(t.IsChk==true){
							if (z == "") {
								z = t.OID;
							} else {
								z = z + "+" + t.OID;
							}
						}
					});
				}
			});
			var u = "";
			$.each(a_compinfo_json, function (c) {
				if(c>0&&c>b){
					var d = a_compinfo_json[c-1];//上级
					var k = a_compinfo_json[c];//本级
					var p = k.PropId + "|";
					var s;
					
					//循环上级
					$.each(d.OptList, function (j) {
						var t = d.OptList[j];
						if(t.IsChk==true){
							if (z == "") {
								z = t.OID;
							} else {
								z = z + "+" + t.OID;
							}
							
							var f = att_rellist_json[p + z];
							if (f != null && f.length > 0) {
								s = new Array();
								for (var h = 0; h < f.length; h++) {
									s.push(f[h]);
								}
							}
							var isex=true;
							//循环本级
							$.each(k.OptList, function (i){
								var istrue = einfo.CheckSelectOpt(k.OptList, s);
								var n = k.OptList[i];
								if(istrue){
									isex=false;
									if (s != null && s.length > 0) {
										if ($.inArray(n.OID.toString(), s) >= 0) {
											n.IsEn = true;
										} else {
											n.IsEn = false;
											n.IsChk = false;
										}
									}
								}
								else{
									if (s != null && s.length > 0) {
										if ($.inArray(n.OID.toString(), s) >= 0) {
											n.IsEn = true;
											if(isex){
												n.IsChk = true;
												isex = false;
											}
											else{
												n.IsChk = false;
											}
										} else {
											n.IsEn = false;
											n.IsChk = false;
										}
									}
								}
							});
						}
					});
				}
				else if (c==0&&b==0){
					var d = a_compinfo_json[c];//本级
					var k = a_compinfo_json[c+1];//下级
					
					//控制本级显示
					var dp = d.PropId + "|";
					var ds;
					var df = att_rellist_json[dp];
					if (df != null && df.length > 0) {
						ds = new Array();
						for (var h = 0; h < df.length; h++) {
							ds.push(df[h]);
						}
					}
					var isex=true;
					$.each(d.OptList, function (j) {
						var n = d.OptList[j];
						var istrue = einfo.CheckSelectOpt(d.OptList, ds);
						if(istrue){
							isex=false;
							if (ds != null && ds.length > 0) {
								if ($.inArray(n.OID.toString(), ds) >= 0) {
									n.IsEn = true;
								} else {
									n.IsEn = false;
									n.IsChk = false;
								}
							}
						}
						else{
							if (ds != null && ds.length > 0) {
								if ($.inArray(n.OID.toString(), ds) >= 0) {
									n.IsEn = true;
									if(isex){
										n.IsChk = true;
										isex = false;
									}
									else{
										n.IsChk = false;
									}
								} else {
									n.IsEn = false;
									n.IsChk = false;
								}
							}
						}
					});
					
					//控制下级显示
					if (k != null) {
						var p = k.PropId + "|";
						var x = "";
						var s;
						//循环本级
						$.each(d.OptList, function (j) {
							var t = d.OptList[j];
							if(t.IsChk==true){
								if (x == "") {
									x = t.OID;
								} else {
									x = x + "+" + t.OID;
								}
								
								var f = att_rellist_json[p + x];
								if (f != null && f.length > 0) {
									s = new Array();
									for (var h = 0; h < f.length; h++) {
										s.push(f[h]);
									}
								}
								
								var isex=true;
								//循环第二级
								$.each(k.OptList, function (i){
									var istrue = einfo.CheckSelectOpt(k.OptList, s);
									var n = k.OptList[i];
									if(istrue){
										isex=false;
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
									else{
										if (s != null && s.length > 0) {
											if ($.inArray(n.OID.toString(), s) >= 0) {
												n.IsEn = true;
												if(isex){
													n.IsChk = true;
													isex = false;
												}
												else{
													n.IsChk = false;
												}
											} else {
												n.IsEn = false;
												n.IsChk = false;
											}
										}
									}
								});
							}
						});
					}
				}
				var cu = a_compinfo_json[c];//本级
				$.each(cu.OptList, function (j) {
					var tu = cu.OptList[j];
					if(tu.IsChk==true){
						if(c==0){
							u = tu.OID;
						}
						else{
							u = u + "-" + tu.OID;
						}
					}
				});
			});
			sinfo.q_ct_id.push(u);
		},
		Q_S_CompProp : function (compId, propId, optId) {
			//附件选择事件
			var curcomp = einfo.Q_H_FindComp(sinfo.q_complist_json, compId);
			if (curcomp != null) {
				var curprop = einfo.Q_H_FindPropById(curcomp.CompProps, propId);
				einfo.Q_ST_CheckOpt(curprop, optId);
				einfo.Q_Selected_CompInfo(compId,propId);
			}
		},
		Q_Selected_CompInfo : function (c,d) {
			//生成附件选型信息
			var b = "";
			$("#q_comp_info").html("");
			var a = einfo.Q_H_FindComp(sinfo.q_complist_json, c);
			if (typeof a === "undefined" || a == null) {
				return "";
			}
			sinfo.q_ct_id.length=0;
			einfo.Q_SelectedCompAttach(a.CompProps,d,c);
			sinfo.q_curprod = einfo.Q_GetProduct(c);
			einfo.Q_Ref_ProdPart(sinfo.q_curprod);
			var attachname=einfo.Q_Attach_CombName(a.CompProps);
			einfo.Q_GetProdComp(a.CompProps);
			b += '<div id="q_comp_props">';
			b += einfo.Q_Get_CompPropPart(c, a.CompProps, false,attachname);
			b += "</div>";
			$("#q_comp_info").html(b);
			myScroll.refreshP();
			
			//附件选择事件移除和绑定
			$("#q_comp_props").find(".attachClk").each(function (b, c) {
				$(c).unbind("click");
			});
			$("#q_comp_props").find(".attachClk").each(function (b, c) {
				$(c).click(function () {
					var idstr=$(this).attr("data");
					var idarr=idstr.split(",");
					einfo.Q_S_CompProp(idarr[0],idarr[1],idarr[2]);
					myScroll.refreshP();
				})
			});
		},
		Q_Ref_PropPart : function (c, a) {
			//生成本体数据
			a.html("");
			if (c != null && c.length > 0) {
				var b = 0;
				$.each(c, function (g) {
					var d = c[g];
					if (d.Jlbs == 0 && d.IsShow == 1) {
						var e = false;
						var f;
						if (d.OptList != null && d.OptList.length > 0) {
							f = einfo.Q_H_FindPropOptList(d.OptList, true);
							if (f.length > 0) {
								e = true;
							}
						}
						if (e) {
							b++;
							var j = (b % 2 == 0) ? "prop_part_bg2" : "prop_part_bg1";
							var h = '<div id="q_prop_' + d.PropId + '" class="prop_part ' + j + '"><div class="prop_title"><span class="qp_flag cp_flag">&nbsp;</span><label>' + d.PropName + '</label></div><div class="prop_list">';
							$.each(f, function (l) {
								var m = f[l];
								var k = (m.IsChk) ? "opt_s opt_s_ch" : "opt_s opt_s_nch bodyClk";
								h = h + '<span id="q_opt_' + m.OID + '" class="opt_s ' + k + '" data="'+ m.OID + ',' + m.IsChk + ',' + g +'">' + m.OName + '</span>';
							});
							h = h + '</div></div>';
							a.append(h);
						}
					}
				});
				
				//本体选择事件移除和绑定
				$("#Part_MainProp").find(".bodyClk").each(function (b, c) {
					$(c).unbind("click");
				});
				$("#Part_MainProp").find(".bodyClk").each(function (b, c) {
					$(c).click(function () {
						//显示loading
						$("#eleloading").show();
						var idstr=$(this).attr("data");
						var idarr=idstr.split(",");
						var isclick=idarr[1] == 'false' ? false : true;
						einfo.Q_S_PropMain(idarr[0],isclick,idarr[2]);
					})
				});
			}
		},
		Q_S_PropMain : function (optId, isch, propIndex) {
			//本体选择事件
			if (isch) {
				return;
			}
			
			//清除计时器
			window.clearTimeout(sinfo.elementtimeout);
			window.clearTimeout(sinfo.sendtimeout);
			
			//showBlockWhiteUI();
			//必选、可选附件信息清空
			sinfo.q_seled_attach_json.length = 0;
			sinfo.q_sel_attach_json.length = 0;
			sinfo.q_ct_id.length=0;
			var curprop = sinfo.q_proplist_json[propIndex];
			einfo.Q_ST_CheckOpt(curprop, optId);//修改当前选中的本体
			
			einfo.Q_Q_Product(curprop, propIndex);
		},
		Q_ST_CheckOpt : function (a, b) {
			//修改当前选中的本体
			$.each(a.OptList, function (c) {
				var d = a.OptList[c];
				if (d.OID == b) {
					d.IsChk = true;
				} else {
					d.IsChk = false;
				}
			});
		},
		Q_H_FindPropOptList : function (b, a) {
			//查找本体选中项
			var c = 0;
			var d = new Array();
			$.each(b, function (e) {
				if (a != null && b[e].IsEn == a) {
					c++;
					d.push(b[e]);
				}
			});
			return d;
		},
		Q_InitProduct : function () {
			//显示明细信息结构初始化
			return eval('({"SeriesID":0,"ProdName":null,"ProdDetailName":null,"CombList":null,"Price":0,"Total":0,"PriceBeforeDisc":0,"Discount":100,"Prodkey":null,"Prodcount":0,"ErpId":null,"Pricedflag":true,"FactName":null,"Unit":null,"CataName":null})');
		},
		Q_InitCombiantion : function () {	
			//元件明细结构初始化
			return eval('({"CombID":0,"CombName":null,"CompSet":null,"CtID":null,"Discount":100,"IsMain":0,"Price":0,"PropOptSet":null})');
		},
		jsonDateParser : function (value) {
			//格式化JSON时间
			if (typeof value === 'string' ) {   
				var a = (/^\/Date\((\d+)(([\+\-])(\d\d)(\d\d))?\)/gi).exec(value);   
				if (a) { 
					return new Date(parseInt(a[1])); 
				}   
			}   
			return value;   
		},
		getParentClassId : function (factoryid,classid){
			//加载系列树获取上级系列id
			var pclassid="";
			var mydate=new Date();
			$.ajax({
				type : "GET",
				url : "price/" + factoryid + ".js?t="+mydate.getTime(),
				timeout : 5e4,
				dataType : "json",
				async : false,
				beforeSend : function(){
				},
				success : function (mNodes) {
					//格式化数据
					var i,l,
					cid = "cid",
					pcid = "pcid";
					if (!mNodes) return pclassid;

					if ($.isArray(mNodes)) {
						for (i=0, l=mNodes.length; i<l; i++) {
							if(mNodes[i][cid] == classid){
								pclassid = mNodes[i][pcid];
								return;
							}
						}
						return pclassid;
					}else {
						return pclassid;
					}
				},
				complete : function(){
				},
				error : function (a) {
				}
			});
			return pclassid;
		},
		get_Samplefile : function (factoryid,preclassid,classid,innermode){
			//获取样本文件
			$("#samplelist").html('<tr><td colspan="2" align="center">正在加载中...</td></tr>');
			//获取上级系列ID
			if(preclassid.length==0){
				preclassid=einfo.getParentClassId(factoryid,classid);
			}
			var mydate=new Date();
			$.ajax({
				type : "GET",
				url : "../price/getsamplefile.php?t="+mydate.getTime()+"&client=msg",
				data : "factoryid="+factoryid+"&preclassid="+preclassid+"&classid="+classid+"&innermode="+encodeURIComponent(innermode),
				timeout : 5e4,
				dataType : "json",
				success : function (e) {
					$("#samplelist").html('');
					if(e!='' && e!=null){
						var slist='';
						$.each(e, function (i) {
							slist += '<tr><td align="center"><a class="download" data="'+e[i].url+e[i].filename+e[i].option+'"><span class="downioc">'+e[i].filename+'</span></a></td><td align="center">'+e[i].size+'</td></tr>';
						});
						$("#samplelist").html(slist);
						
						//点击下载事件
						$("#samplelist").find(".download").each(function (b, c) {
							$(c).unbind("click");
						});
						$("#samplelist").find(".download").each(function (b, c) {
							$(c).click(function () {
								var url=$(this).attr("data");
								var ua = navigator.userAgent.toLowerCase();
								if(/micromessenger/.test(ua)){
									// $("#copyInput").val(url);
									// $(".action_panels").css({
										// top : ($(window).height() - 153) / 2,
										// left : ($(window).width() - 234) / 2
									// });
									// $(".action_panels").show();
									location.href = "download.php?url="+encodeURIComponent(url);
								}
								else if(ua.match(/uc|ucbrowser|ucweb/i) || ua.match(/baidu|baidubrowser/i) || ua.match(/360|360browser/i) || ua.match(/opr|opera/i) || ua.match(/firefox\/([\d.]+)/) || ua.match(/micromessenger/i) || ua.match(/chrome\/([\d.]+)/) || ua.match(/safari\/([\d.]+)/)){
									location.href = url;
								}
								else if(ua.match(/qq|mqqbrowser/i)){
									location.href = url;
								}
								else{
									location.href = url;
								}
							})
						});
						//提示关闭事件
						$(".action_panel_close").unbind("click");
						$(".action_panel_close").click(function () {
							$(".action_panels").hide();
						});
						//点击复制事件
						$(".copy_share_tip").unbind("click");
						$(".copy_share_tip").click(function () {
							
						});
						myScroll.refreshP();
					}
					else{
						$("#samplelist").html('<tr><td colspan="2" align="center">暂无样本！</td></tr>');
					}
				}
			});
		},
		staticprice : function (pdtid){
			//询价单点击统计
			var mydate=new Date();
			$.ajax({
				type : "POST",
				url : "../price/getpraisemicmsg.php?t="+mydate.getTime()+"&client=msg",
				data : "praise=1&optype=2&productid="+pdtid,
				async : true,
				dataType : "text",
				success : function (e) {
					
				}
			});
		}
	};
	b.ShowPrice = priceinfo;
	
	var Samplefile  = function (factoryid,preclassid,classid,innermode){
		einfo.get_Samplefile(factoryid,preclassid,classid,innermode);
	};
	b.getSamplefile = Samplefile;
	
	var Supplierlist  = function (data,rt,at){
		einfo.showSupplierDiscount(data,rt,at);
	};
	b.getSupplier = Supplierlist;
	
	b.getSinfo = sinfo;
}
//加载厂家数据
(window, window.lib || (window.lib = {})), function (a, b) {
	var sinfo = {
		getSinfo : function (){
			return b.getSinfo;
		}
	}
	var einfo = {
		getSamplefile : function (factoryid,preclassid,classid,innermode){
			b.getSamplefile(factoryid,preclassid,classid,innermode);
		},
		getSupplier : function (data,rt,at){
			b.getSupplier(data,rt,at);
		}
	}
	//加载选型页面
	var showp = {
		contShow : $("#elementTop"),
		swipeTabCont : $("#elementTopCont"),
		priceInfo : $("#priceInfo"),
		wrap : $("#wrap"),
		leftCate : $("#selection"),
		leftmask : $(".selmask"),
		bodyH : b.windowH.height,
		init : function (fname,sname) {
			//返回事件
			$("#se-goback").off("click");
			$("#se-goback").on("click", function () {
				showp.hideLeft(),
				$(".action_panels").hide();
			});
			//加载厂家和系列名称
			$(".banners").html("<span id='factory-name'>" + fname + "</span> &gt;&gt; <span id='series-name'>" + sname + "</span>");
			//选项卡切换事件
			$("#myTab").find("span").each(function (b, c) {
				$(c).click(function () {
					$(this).addClass("active").removeClass("normal").siblings().addClass("normal").removeClass("active"),
					$("#myTab_Content" + b).show().siblings().hide();
					if(b==4){
						if($("#samplelist").html().length==0){
							//获取样本文件
							einfo.getSamplefile(sinfo.getSinfo().q_series_json.FactoryID,sinfo.getSinfo().q_pclassid,sinfo.getSinfo().q_element_json.F_Class_ID,sinfo.getSinfo().q_element_innermodel);
						}
					}
					else if(b==3){
						var rt=0;
						var at=0;
						if (sinfo.getSinfo().q_curprod.CombList != null && sinfo.getSinfo().q_curprod.CombList.length > 0) {
							$.each(sinfo.getSinfo().q_curprod.CombList, function (f) {
								var d = sinfo.getSinfo().q_curprod.CombList[f];
								if(d.IsMain==1){
									rt=parseFloat(rt)+parseFloat(d.Price);
								}
								else{
									at=parseFloat(at)+parseFloat(d.Price);
								}
							});
						}
						//加载供应商折扣信息
						if($.isEmptyObject(sinfo.getSinfo().q_supp_discount)){
							$("#supplist").html('<div style="text-align:center;">正在加载中...</div>');
							var mydate=new Date();
							$.getJSON("../price/getsupplierlist.php?t="+mydate.getTime()+"&classid="+sinfo.getSinfo().q_element_json.F_Class_ID+"&client=msg", function (data) {
								sinfo.getSinfo().q_supp_discount=data;
								einfo.getSupplier(sinfo.getSinfo().q_supp_discount,rt,at);
							});
						}
						else{
							einfo.getSupplier(sinfo.getSinfo().q_supp_discount,rt,at);
						}
					}
					myScroll.refreshP();
					myScroll.PScrollToInit();
				})
			});
		},
		showLeft : function (n) {
			//显示选型页和隐藏按钮
			var shp = this;
			shp.leftCate.show(),
			shp.contShow.css({
				"-webkit-backface-visibility" : "hidden",
				"-webkit-prespective" : "1000",
				"-webkit-transform-style" : "preserve-3d",
				"width" : $(window).width()
			}),
			shp.leftCate.css({
				height : shp.bodyH,
				width : "100%",
				top : "0px"
			}),
			shp.priceInfo.css({
				height : b.windowH.height - $("#se-bar").height() - 23 - 66 - $(".TabTitle").height()
			}),
			shp.leftmask.css({
				top : "0px"
			}),
			b.trans2d.translation(shp.contShow[0], {
				x : 0
			}, function () {
				shp.leftmask.css({
					height : shp.leftCate.height()
				})
			})
		},
		hideLeft : function () {
			var shp = this;
			b.trans2d.translation(shp.leftCate[0], {
				x : $(window).width(),
				duration : "0.4s"
			}, function () {
				shp.leftmask.hide(),
				shp.leftCate.hide(),
				shp.leftCate.attr("style", ""),
				shp.contShow.attr("style", "")
			})
		},
		refresh : function () {
			var shp = this,
			b = null;
			b = setTimeout(function () {
					var b = shp.swipeTabCont.height() + 70;
					shp.wrap.css({
						"min-height" : b
					}),
					shp.leftCate.css({
						"min-height" : b
					}),
					shp.leftmask.css({
						height : shp.wrap.height()
					})
				}, 500)
		}
	};
	b.ShowEle = showp;
	var se = {
		ShowElement : function(innermodel,classid,pclassid,initTab){
			//系列树页面滑动
			new b.ShowPrice(innermodel,classid,pclassid,initTab);
		}
	};
	//常量
	var consts = {
		className: {
			BUTTON: "button",
			LEVEL: "level",
			ICO_LOADING: "ico_loading",
			SWITCH: "switch"
		},
		event: {
			NODECREATED: "ztree_nodeCreated",
			CLICK: "ztree_click",
			EXPAND: "ztree_expand",
			COLLAPSE: "ztree_collapse",
			ASYNC_SUCCESS: "ztree_async_success",
			ASYNC_ERROR: "ztree_async_error",
			REMOVE: "ztree_remove"
		},
		id: {
			A: "_a",
			ICON: "_ico",
			SPAN: "_span",
			SWITCH: "_switch",
			UL: "_ul"
		},
		line: {
			ROOT: "root",
			ROOTS: "roots",
			CENTER: "center",
			BOTTOM: "bottom",
			NOLINE: "noline",
			LINE: "line"
		},
		folder: {
			OPEN: "open",
			CLOSE: "close",
			DOCU: "docu"
		},
		node: {
			CURSELECTED: "curSelectedNode"
		}
	};
	//系列树形配置
	var setting = {
			treeId: "mTree",
			treeObj: $("#mTree"),
			view: {
				addDiyDom: null,
				autoCancelSelected: true,
				dblClickExpand: true,
				expandSpeed: "fast",
				fontCss: {},
				nameIsHTML: false,
				selectedMulti: true,
				showIcon: true,
				showLine: false,
				showTitle: false,
				txtSelectedEnable: false
			},
			data: {
				key: {
					children: "children",
					name: "name",
					title: "",
					url: "url"
				},
				simpleData: {
					enable: true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: null
				}
			}
	};
	var roots = {};
	roots[setting.data.key.children] = [];
	roots.expandTriggerFlag = false;
	roots.curSelectedList = [];
	roots.noSelection = true;
	roots.createdNodes = [];
	roots.zId = 0;
	roots._ver = (new Date()).getTime();
	var mtrees = [];
	mtrees["mTree"] = roots;
	var firstopen = true;
	var tools = {
		apply: function(fun, param, defaultValue) {
			if ((typeof fun) == "function") {
				return fun.apply(zt, param?param:[]);
			}
			return defaultValue;
		},
		eqs: function(str1, str2) {
			return str1.toLowerCase() === str2.toLowerCase();
		}
	};
	//生成树形
	var mTree = {
		setRoot: function(setting, root) {
			mtrees[setting.treeId] = root;
		},
		getRoot: function(setting) {
			return setting ? mtrees[setting.treeId] : null;
		},
		transformTomTreeFormat: function(setting, mNodes) {
			//格式化数据
			var i,l,
			key = setting.data.simpleData.idKey,
			parentKey = setting.data.simpleData.pIdKey,
			childKey = setting.data.key.children;
			if (!key || key=="" || !mNodes) return [];

			if ($.isArray(mNodes)) {
				var r = [];
				var tmpMap = [];
				for (i=0, l=mNodes.length; i<l; i++) {
					tmpMap[mNodes[i][key]] = mNodes[i];
				}
				for (i=0, l=mNodes.length; i<l; i++) {
					if (tmpMap[mNodes[i][parentKey]] && mNodes[i][key] != mNodes[i][parentKey]) {
						if (!tmpMap[mNodes[i][parentKey]][childKey])
							tmpMap[mNodes[i][parentKey]][childKey] = [];
						tmpMap[mNodes[i][parentKey]][childKey].push(mNodes[i]);
					} else {
						r.push(mNodes[i]);
					}
				}
				return r;
			}else {
				return [mNodes];
			}
		},
		getNodeTitle: function(setting, node) {
			var t = setting.data.key.title === "" ? setting.data.key.name : setting.data.key.title;
			return "" + node[t];
		},
		getNodeName: function(setting, node) {
			var nameKey = setting.data.key.name;
			return "" + node[nameKey];
		},
		makeNodeFontCss: function(setting, node) {
			var fontCss = tools.apply(setting.view.fontCss, [setting.treeId, node], setting.view.fontCss);
			return (fontCss && ((typeof fontCss) != "function")) ? fontCss : {};
		},
		makeDOMNodeIcon: function(html, setting, node) {
			//加载图标和名称
			var nameStr = mTree.getNodeName(setting, node),
			name = setting.view.nameIsHTML ? nameStr : nameStr.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
			html.push("<span id='", node.tId, consts.id.ICON,
				"' title='' treeNode", consts.id.ICON," class='", mTree.makeNodeIcoClass(setting, node),
				"' style='", mTree.makeNodeIcoStyle(setting, node), "'></span><span class='ser-name' id='", node.tId, consts.id.SPAN,
				"'>",name,"</span>");
		},
		makeDOMNodeLine: function(html, setting, node) {
			html.push("<span id='", node.id, consts.id.SWITCH,	"' title='' class='", mTree.makeNodeLineClass(setting, node), "' treeNode", consts.id.SWITCH,"></span>");
		},
		makeDOMNodeMainAfter: function(html, setting, node) {
			html.push("</li>");
		},
		makeDOMNodeMainBefore: function(html, setting, node) {
			html.push("<li id='", node.id, "' class='", consts.className.LEVEL, node.level,"' cid='", node.cid, "'>");
		},
		makeDOMNodeNameAfter: function(html, setting, node) {
			html.push("</a>");
		},
		makeDOMNodeNameBefore: function(html, setting, node) {
			var title = mTree.getNodeTitle(setting, node),
			url = mTree.makeNodeUrl(setting, node),
			fontcss = mTree.makeNodeFontCss(setting, node),
			fontStyle = [];
			for (var f in fontcss) {
				fontStyle.push(f, ":", fontcss[f], ";");
			}
			html.push("<a id='", node.tId, consts.id.A, "' class='", consts.className.LEVEL, node.level,"' treeNode", consts.id.A, ((url != null && url.length > 0) ? "href='" + url + "'" : ""), " style='", fontStyle.join(''),
				"'");
			if (tools.apply(setting.view.showTitle, [setting.treeId, node], setting.view.showTitle) && title) {html.push("title='", title.replace(/'/g,"&#39;").replace(/</g,'&lt;').replace(/>/g,'&gt;'),"'");}
			html.push(">");
		},
		makeNodeFontCss: function(setting, node) {
			var fontCss = tools.apply(setting.view.fontCss, [setting.treeId, node], setting.view.fontCss);
			return (fontCss && ((typeof fontCss) != "function")) ? fontCss : {};
		},
		makeNodeIcoClass: function(setting, node) {
			//控制文件夹展开图标
			var icoCss = ["ico"];
			if (!node.isAjaxing) {
				icoCss[0] = (node.iconSkin ? node.iconSkin + "_" : "") + icoCss[0];
				if (node.isParent) {
					icoCss.push(node.open ? node.isopen ? consts.folder.OPEN : consts.folder.CLOSE : consts.folder.CLOSE);
				} else {
					icoCss.push(consts.folder.DOCU);
				}
			}
			return consts.className.BUTTON + " " + icoCss.join('_');
		},
		makeNodeIcoStyle: function(setting, node) {
			//控制ioc图标显示
			var icoStyle = [];
			if (!node.isAjaxing) {
				var icon = (node.isParent && node.iconOpen && node.iconClose) ? (node.open ? node.iconOpen : node.iconClose) : node.icon;
				if (icon) icoStyle.push("background:url(", icon, ") 0 0 no-repeat;");
				if (node.isParent || (setting.view.showIcon == false || !tools.apply(setting.view.showIcon, [setting.treeId, node], true))) {
					icoStyle.push("width:0px;height:0px;");
				}
			}
			return icoStyle.join('');
		},
		makeNodeLineClass: function(setting, node) {
			//控制第一个展开图标
			var lineClass = [];
			if (setting.view.showLine) {
				if (node.level == 0 && node.isFirstNode && node.isLastNode) {
					lineClass.push(consts.line.ROOT);
				} else if (node.level == 0 && node.isFirstNode) {
					lineClass.push(consts.line.ROOTS);
				} else if (node.isLastNode) {
					lineClass.push(consts.line.BOTTOM);
				} else {
					lineClass.push(consts.line.CENTER);
				}
			} else {
				lineClass.push(consts.line.NOLINE);
			}
			if (node.isParent) {
				lineClass.push(node.open ? node.isopen ? consts.folder.OPEN : consts.folder.CLOSE : consts.folder.CLOSE);
			} else {
				lineClass.push(consts.folder.DOCU);
			}
			return mTree.makeNodeLineClassEx(node) + lineClass.join('_');
		},
		makeNodeLineClassEx: function(node) {
			return consts.className.BUTTON + " " + consts.className.LEVEL + node.level + " " + consts.className.SWITCH + " ";
		},
		makeNodeTarget: function(node) {
			return (node.target || "_blank");
		},
		makeNodeUrl: function(setting, node) {
			var urlKey = setting.data.key.url;
			return node[urlKey] ? node[urlKey] : null;
		},
		makeUlHtml: function(setting, node, html, content) {
			//控制子节点显示
			html.push("<ul id='", node.tId, consts.id.UL, "' class='", consts.className.LEVEL, node.level, mTree.makeUlLineClass(setting, node), "' style='display:", (node.open ? (node.isopen ? "block" : "none") : "none"), "'>");
			html.push(content);
			html.push("</ul>");
		},
		makeUlLineClass: function(setting, node) {
			return ((setting.view.showLine && !node.isLastNode) ? consts.line.LINE : "");
		},
		initNode: function(setting, level, n, parentNode, isFirstNode, isLastNode, openFlag) {
			if (!n) return;
			var r = mTree.getRoot(setting),
			childKey = setting.data.key.children;
			n.level = level;
			n.tId = setting.treeId + "_" + (++r.zId);
			n.parentTId = parentNode ? parentNode.tId : null;
			n.open = (typeof n.open == "string") ? tools.eqs(n.open, "true") : !!n.open;
			n.open = true;
			n.isopen = false;
			if (n[childKey] && n[childKey].length > 0) {
				n.isParent = true;
				n.zAsync = true;
				if (firstopen){
					n.isopen = true;
				}
				else{
					n.isopen = false;
				}
			} else {
				if (firstopen){
					n.isopen = true;
					firstopen = false;
				}
				else{
					n.isopen = false;
				}
				n.isParent = (typeof n.isParent == "string") ? tools.eqs(n.isParent, "true") : !!n.isParent;
				n.open = (n.isParent && !setting.async.enable) ? n.open : false;
				n.zAsync = !n.isParent;
			}
			n.isFirstNode = isFirstNode;
			n.isLastNode = isLastNode;
		},
		addCreatedNode: function(setting, node) {
			if (!!setting.view.addDiyDom) {
				var root = mTree.getRoot(setting);
				root.createdNodes.push(node);
			}
		},
		appendNodes: function(setting, level, nodes, parentNode, initFlag, openFlag) {
			if (!nodes) return [];
			var html = [],
			childKey = setting.data.key.children;
			for (var i = 0, l = nodes.length; i < l; i++) {
				var node = nodes[i];
				if(node.id != 1){
					if (initFlag) {
						var tmpPNode = (parentNode) ? parentNode: mTree.getRoot(setting),
						tmpPChild = tmpPNode[childKey],
						isFirstNode = ((tmpPChild.length == nodes.length) && (i == 0)),
						isLastNode = (i == (nodes.length - 1));
						mTree.initNode(setting, level, node, parentNode, isFirstNode, isLastNode, openFlag);
					}

					var childHtml = [];
					if (node[childKey] && node[childKey].length > 0) {
						//递归循环生成html
						childHtml = mTree.appendNodes(setting, level + 1, node[childKey], node, initFlag, openFlag && node.open);
					}
					if (openFlag) {
						mTree.makeDOMNodeMainBefore(html, setting, node);
						mTree.makeDOMNodeLine(html, setting, node);
						mTree.makeDOMNodeNameBefore(html, setting, node);
						mTree.makeDOMNodeIcon(html, setting, node);
						mTree.makeDOMNodeNameAfter(html, setting, node);
						if (node.isParent && node.open) {
							mTree.makeUlHtml(setting, node, html, childHtml.join(''));
						}
						mTree.makeDOMNodeMainAfter(html, setting, node);
						mTree.addCreatedNode(setting, node);
					}
				}
			}
			return html;
		},
		createNodeCallback: function(setting) {
			if (!!setting.view.addDiyDom) {
				var root = mTree.getRoot(setting);
				while (root.createdNodes.length>0) {
					var node = root.createdNodes.shift();
					tools.apply(setting.view.addDiyDom, [setting.treeId, node]);
					if (!!setting.callback.onNodeCreated) {
						setting.treeObj.trigger(consts.event.NODECREATED, [setting.treeId, node]);
					}
				}
			}
		},
		createNodes: function(setting, level, nodes, parentNode) {
			//生成html
			if (!nodes || nodes.length == 0) return;
			var root = mTree.getRoot(setting),
			childKey = setting.data.key.children,
			openFlag = !parentNode || parentNode.open || !!$$(parentNode[childKey][0], setting).get(0);
			openFlag = true;
			root.createdNodes = [];
			var zTreeHtml = mTree.appendNodes(setting, level, nodes, parentNode, true, openFlag);
			if (!parentNode) {
				setting.treeObj.append(zTreeHtml.join(''));
			} else {
				var ulObj = $$(parentNode, consts.id.UL, setting);
				if (ulObj.get(0)) {
					ulObj.append(zTreeHtml.join(''));
				}
			}
			mTree.createNodeCallback(setting);
		},
		init: function(mNodes) {
			//初始化
			//展开第一个子菜单
			firstopen = true;
			setting.treeObj.empty();
			var root = mTree.getRoot(setting),
			childKey = setting.data.key.children;
			if (setting.data.simpleData.enable) {
				root[childKey] = mTree.transformTomTreeFormat(setting, mNodes);
			}
			if (root[childKey] && root[childKey].length > 0) {
				mTree.createNodes(setting, 0, root[childKey]);
			}
			//绑定事件
			var exc=0;
			setting.treeObj.find("li a").each(function (b, c) {
				$(c).prev().unbind("click");
				$(c).unbind("click");
			});
			setting.treeObj.find("li a").each(function (b, c) {
				$(c).prev().click(function (e) {
					//图标点击事件
					e.preventDefault(),
					e.stopPropagation();
					var p = $(this).parent();
					if(p.find("ul").size()>0){
						//计时器
						var mydate=new Date();
						if(mydate.getTime()-exc>500){
							exc = mydate.getTime();
							var plid=p.attr("id");
							if(p.find("ul").first().css("display") == "none"){
								p.find("ul").first().show();
								$("#"+plid+"_switch").removeClass("noline_close").addClass("noline_open");
								$("#mTree_"+plid+"_ico").removeClass("ico_close").addClass("ico_open");
							}
							else{
								p.find("ul").first().hide();
								$("#"+plid+"_switch").removeClass("noline_open").addClass("noline_close");
								$("#mTree_"+plid+"_ico").removeClass("ico_open").addClass("ico_close");
							}
							myScroll.refreshS();
						}
					}
				});
				$(c).click(function (e) {
					//文字点击事件
					e.preventDefault(),
					e.stopPropagation();
					var p = $(this).parent();
					if(p.find("ul").size()>0){
						//计时器
						var mydate=new Date();
						if(mydate.getTime()-exc>500){
							exc = mydate.getTime();
							var plid=p.attr("id");
							if(p.find("ul").first().css("display") == "none"){
								p.find("ul").first().show();
								$("#"+plid+"_switch").removeClass("noline_close").addClass("noline_open");
								$("#mTree_"+plid+"_ico").removeClass("ico_close").addClass("ico_open");
							}
							else{
								p.find("ul").first().hide();
								$("#"+plid+"_switch").removeClass("noline_open").addClass("noline_close");
								$("#mTree_"+plid+"_ico").removeClass("ico_open").addClass("ico_close");
							}
							myScroll.refreshS();
						}
					}
					else{
						$("#loading").show();
						//选中状态
						setting.treeObj.find("li a").removeClass("curSelectedNode");
						$(this).addClass("curSelectedNode");
						//获取系列id
						var classid=p.attr("cid");
						var pp = $(this).parent().parent().parent();
						var pclassid = pp.attr("cid");
						se.ShowElement('',classid,pclassid,0);
						var fname = $("#f-name").html();
						var sname = $(this).find(".ser-name").html();
						//初始化系列页面偏移量
						myScroll.PScrollToInit();
						//显示选型页面
						showp.init(fname,sname);
						showp.showLeft();
					}
				})
			});
		}
	};
	//加载系列页面
	var lc = {
		swipeTree : $("#swipeTree"),
		contShow : $("#swipeTop"),
		swipeTabCont : $("#swipeTopCont"),
		wrap : $("#wrap"),
		leftCate : $("#leftCate"),
		leftmask : $(".leftmask"),
		bodyH : b.windowH.height,
		init : function () {
		
		},
		showLeft : function (n) {
			//显示系列树和隐藏按钮
			var lcs = this;
			$("#f-name").html(n),
			lcs.leftmask.show(),
			lcs.leftCate.show(),
			lcs.contShow.css({
				"-webkit-backface-visibility" : "hidden",
				"-webkit-prespective" : "1000",
				"-webkit-transform-style" : "preserve-3d",
				"width" : "100%"
			}),
			lcs.leftCate.css({
				"width" : (($(window).width() - 50)/$(window).width())*100+"%",
				"height" : lcs.bodyH,
				"top" : "0px"
			}),
			lcs.swipeTree.css({
				height : b.windowH.height - $("#f-title").height()
			}),
			lcs.leftmask.css({
				top : "0px"
			}),
			b.trans2d.translation(lcs.contShow[0], {
				x : 0
			}, function () {
				lcs.leftmask.css({
					height : lcs.leftCate.height()
				})
			})
		},
		hideLeft : function () {
			var lcs = this;
			b.trans2d.translation(lcs.leftCate[0], {
				x : $(window).width() - 50,
				duration : "0.4s"
			}, function () {
				lcs.leftmask.hide(),
				lcs.leftCate.hide(),
				lcs.leftCate.attr("style", ""),
				lcs.contShow.attr("style", "")
			})
		},
		refresh : function () {
			var lcs = this,
			b = null;
			b = setTimeout(function () {
					var b = lcs.swipeTabCont.height() + 70;
					lcs.wrap.css({
						"min-height" : b
					}),
					lcs.leftCate.css({
						"min-height" : b
					}),
					lcs.leftmask.css({
						height : lcs.wrap.height()
					})
				}, 500)
		}
	};
	var share = {
		prefacid : ''
	};
	var myScroll = {
		refreshF : function(){
			//重置厂家页面区域大小
			b.myScroll.myFScroll.refresh();
		},
		refreshS : function(){
			//重置系列页面区域大小
			b.myScroll.mySScroll.refresh();
		},
		refreshP : function(){
			$("#priceInfo").css({
				height : b.windowH.height - $("#se-bar").height() - $(".banners").height() - $(".product").height() - $(".TabTitle").height()
			});
			//重置选型页面区域大小
			b.myScroll.myPScroll.refresh();
		},
		refreshC : function(){
			//重置搜索页面区域大小
			b.myScroll.myCScroll.refresh();
		},
		refreshE : function(){
			//重置搜索页面区域大小
			b.myScroll.myEScroll.refresh();
		},
		SScrollToInit : function(){
			return b.myScroll.mySScroll.scrollTo(0, b.myScroll.mySScroll.y, 0, true);
		},
		PScrollToInit : function(){
			return b.myScroll.myPScroll.scrollTo(0, b.myScroll.myPScroll.y, 0, true);
		},
		CScrollToInit : function(){
			return b.myScroll.myCScroll.scrollTo(0, b.myScroll.myCScroll.y, 0, true);
		},
		EScrollToInit : function(){
			return b.myScroll.myEScroll.scrollTo(0, b.myScroll.myEScroll.y, 0, true);
		}
	};
	//加载系列侧边栏和排序
	var g = {
		layout : function (a) {
			//加载生产厂家列表
			this.firstView(a);
			var e = $("#J_Header");
			//厂家点击事件
			$("#factory").on("click","li",function(e){
				e.preventDefault();
				var b = $(this),
				n = b.html(),
				c = b.attr("data");
				//判断是都是字母行
				if(c.length>0){
					loadSeriesTree.init(n,c);
				}
			});
		},
		firstView : function (a) {
			var b = "";
			var t = "";
			var s = "";
			if (a && a.length){
				for (var c = 0; c < a.length; c++) {
					var d = a[c];
					if(c==1){
						t += '<li class="top ' + d.name + '" data="">' + d.name + '</li>';
					}
					else if(c>1 && c<12){
						if(d.open){
							//字母
							t += '<li class="light ' + d.name + '" data="">' + d.name + '</li>';
						}
						else{
							if (d.n == 1) {
								t += '<li data="' + d.fid + '">' + d.name + '<span class="fnew"></span></li>';
							}
							else{
								t += '<li data="' + d.fid + '">' + d.name + '</li>';
							}
						}
					}
					else if(c>=12){
						if(d.open){
							//字母
							b += '<li class="light ' + d.name + '" data="">' + d.name + '</li>';
							s += '<li class="ui-li-static"><span>' + d.name + '</span></li>';
						}
						else{
							if (d.n == 1) {
								b += '<li data="' + d.fid + '">' + d.name + '<span class="fnew"></span></li>';
							}
							else{
								b += '<li data="' + d.fid + '">' + d.name + '</li>';
							}
						}
					}
				}
				$("#factory").html('<div class="rellkey"><ul>' + t + '</ul><ul id="alllist">' + b + '</ul></div>');
				$("#sorter").html('<ul class="ui-listview">' + s + '</ul>');
				myScroll.refreshF();
			}
		}
	};
	
	//加载系列数据
	var loadSeriesTree={
		init : function(n,c){
			//显示loading
			$("#loading").show();
			if(share.prefacid.length>0 && c==share.prefacid){
				lc.showLeft(n);
				$("#loading").hide();
			}
			else{
				//加载系列树
				var mydate=new Date();
				var d = {
					type : "GET",
					url : "price/" + c + ".js?t="+mydate.getTime(),
					timeout : 5e4,
					dataType : "json",
					beforeSend : function(){
						//初始化系列页面偏移量
						myScroll.SScrollToInit(),
						$("#mTree").empty(),
						$("#mTree").html('<li>正在为您加载...</li>'),
						lc.showLeft(n);
					},
					success : function (a) {
						mTree.init(a);
						lc.init();
						share.prefacid=c;
						myScroll.refreshS();
						$("#loading").hide();
					},
					complete : function(){
						$("#loading").hide();
					},
					error : function (a) {
						$("#mTree").html("网络连接失败，请刷新页面重试");
						$("#loading").hide();
					}
				};
				$.ajax(d);
			}
		},
		hideSeriesTree : function(){
			$(".leftmask").hide();
			lc.hideLeft();
		}
	};
	b.SeriesTree=loadSeriesTree;
	
	var mydate=new Date();
	var d = {
		type : "GET",
		url : "price/factory.js?t="+mydate.getTime(),
		timeout : 5e4,
		dataType : "json",
		success : function (fdata) {
			//加载系列树
			b.FactoryJson = fdata;
			g.layout(fdata);
			$(".leftmask").on("click", function () {
				var a = $(this);
				a.hide(),
				lc.hideLeft();
			});
			$("#loading").hide();
		},
		error : function (fdata) {
			$("#factory").html("网络连接失败，请刷新页面重试");
		}
	};
	$.ajax(d);
}
//绑定搜索事件
(window, window.lib || (window.lib = {})), function (a, b) {
	var factoryJson = {
		//获取厂家数据
		getFactoryJson : function(){
			return b.FactoryJson;
		}
	};
	var myScroll = {
		refreshP : function(){
			//重置选型页面区域大小
			b.myScroll.myPScroll.refresh();
		},
		refreshC : function(){
			//重置搜索页面区域大小
			b.myScroll.myCScroll.refresh();
		},
		refreshE : function(){
			//重置搜索页面区域大小
			b.myScroll.myEScroll.refresh();
		},
		refreshH : function(){
			//重置搜索页面区域大小
			b.myScroll.myHScroll.refresh();
		},
		refreshA : function(){
			//重置搜索页面区域大小
			b.myScroll.myAScroll.refresh();
		},
		refreshT : function(){
			//重置搜索页面区域大小
			b.myScroll.myTScroll.refresh();
		},
		PScrollToInit : function(){
			return b.myScroll.myPScroll.scrollTo(0, b.myScroll.myPScroll.y, 0, true);
		},
		CScrollToInit : function(){
			return b.myScroll.myCScroll.scrollTo(0, b.myScroll.myCScroll.y, 0, true);
		},
		EScrollToInit : function(){
			return b.myScroll.myEScroll.scrollTo(0, b.myScroll.myEScroll.y, 0, true);
		},
		HScrollToInit : function(){
			return b.myScroll.myHScroll.scrollTo(0, b.myScroll.myHScroll.y, 0, true);
		},
		AScrollToInit : function(){
			return b.myScroll.myAScroll.scrollTo(0, b.myScroll.myAScroll.y, 0, true);
		},
		TScrollToInit : function(){
			return b.myScroll.myTScroll.scrollTo(0, b.myScroll.myTScroll.y, 0, true);
		}
	};
	var se = {
		ShowElement : function(innermodel,classid,pclassid,initTab){
			//系列树页面滑动
			new b.ShowPrice(innermodel,classid,pclassid,initTab);
		},
		InitElementPage : function(fname,sname){
			//初始化选型页面
			b.ShowEle.init(fname,sname);
		},
		ShowElementPage : function(){
			//显示选型页面
			b.ShowEle.showLeft();
		},
		HideElementPage : function(){
			//隐藏选型页面
			b.ShowEle.hideLeft();
		}
	};

	//本地存储
	var storage={
		ls : window.localStorage,
		setItem : function(key,value){
			storage.ls.setItem(key,value);
		},
		getItem : function(key){
			return storage.ls.getItem(key);
		},
		clearItem : function(key){
			storage.ls.setItem(key,"");
		},
		addHistory : function(key,id,name){
			var s_record = eval('({"id":"' + id + '","name":"' + name + '"})');
			var r_list = new Array();
			r_list.push(s_record);
			var history = storage.getItem(key);
			if (history != "" && history !=null) {
				var json = JSON.parse(history);
				$.each(json, function (i) {
					var s = json[i];
					if(id.length>0){
						if (s.id != s_record.id) {
							r_list.push(s);
						}
					}
					else{
						if (s.name != s_record.name) {
							r_list.push(s);
						}
					}
				})
			}
			storage.setItem(key, JSON.stringify(r_list));
			storage.getHistory(key);
		},
		getHistory : function(key){
			$("#historylist").html("");
			myScroll.HScrollToInit();
			var history = storage.getItem(key);
			if (history != "" && history !=null) {
				var json = JSON.parse(history);
				$.each(json, function (i) {
					var s = json[i];
					if(key!='factory'){
						if (s.name != "") {
							$("<li/>").appendTo($("#historylist")).html('<i class="text-icon"></i><span>'+s.name+'</span>').attr("class","sp-li").attr("data",s.name).click(function(){
								$("#sp-text").blur();
								$(".btn-reset").show();
								var searchstr=$(this).attr("data");
								$("#sp-text").val(searchstr);
								search.searchLoad(true);
							});
						}
					}
					else{
						if (s.id != "") {
							$("<li/>").appendTo($("#historylist")).html('<i class="text-icon"></i><span>'+s.name+'</span>').attr("class","sp-li").attr("data",s.id).click(function(){
								$("#sf-text").blur();
								$(".btn-reset").show();
								var searchstr=$(this).find("span").text();
								var factoryid=$(this).attr("data");
								b.SeriesTree.init(searchstr,factoryid);
							});
						}
					}
				});
				$("#sp-trash").show();
				myScroll.refreshH();
			}
			else{
				$("#sp-trash").hide();
			}
		}
	}

	//搜索元件------------------------------------------------------------------------------
	var ssetting ={
		dtype:'',
		sortkey:'',
		sortrule:false,
		mfname:'',
		mfother:' ',
		isother:false,
		epageindex:1,
		spageindex:1,
		brandOpen : false,
		factoryName : '',
		fullName : '',
		shortName : '',
		count : 0,
		timeout : 0,
		option : 0
	};
	var search = {
		initElement : function (initscroll) {
			//初始化元件搜索
			$("#downmenu").show();
			$("#searchtitle").hide();
			ssetting.count = 0;
			search.closeMask();
			var modstr=$.trim($("#sp-text").val());
			$("#searchkw").html(modstr);
			var dtype=ssetting.dtype;
			var mfname=ssetting.mfname;
			if(initscroll){
				$("#e-content").empty();
				ssetting.epageindex=1;
			}
			else{
				ssetting.epageindex++;
			}
			$("#sp-text").val(modstr);
			var ordertype = ssetting.sortrule ? "false" : "true";
			var mydate=new Date();
			$.ajax({
				type : "POST",
				url : "../price/getpriceelesearchjson.php?t="+mydate.getTime(),
				data : "modstr="+modstr+"&dtype="+dtype+"&mfname="+mfname+"&orderstr="+ssetting.sortkey+"&ordertype="+ordertype+"&pageindex="+ssetting.epageindex+"&client=msg",
				timeout : 5e4,
				dataType : "json",
				beforeSend : function(){
					if(initscroll){
						$("#e-content").empty();
					}
				},
				success : function (e) {
					if(e==null || e.Table.length==0){
						if(initscroll){
							$("#searchcount").html("0");
							$("#e-content").empty();
							$("#sales-model").off("click");
							$("#sales-price").off("click");
							$("#e-content").html('<span style="margin:43px;line-height:43px;">很抱歉，没有找到与<strong>' + modstr + '...</strong>相符的元件。</span>');
						}
					}
					else{
						ssetting.count = e.T_Count[0].Count;
						$("#searchcount").html(e.T_Count[0].Count);
						$("#searchtitle").show();
						$("#brand").off("click");
						$("#brand").on("click", function () {
							if (ssetting.brandOpen) {
								search.closeMask()
							} else {
								search.openMask()
							}
						});
						//显示元件列表
						search.showElementList(e.Table);
						
						//排序事件
						$("#sales-model").off("click");
						$("#sales-model").on("click", function () {
							//型号排序
							$("#loading").show();
							search.closeMask();
							search.sortShow(this);
							ssetting.sortkey="p.F_Model";
							search.initElement(true);
						});
						$("#sales-price").off("click");
						$("#sales-price").on("click", function () {
							//价格排序
							$("#loading").show();
							search.closeMask();
							search.sortShow(this);
							ssetting.sortkey="p.F_TotalPrice";
							search.initElement(true);
						});
						//读取过滤厂家
						if(ssetting.mfname.length==0 && ssetting.epageindex==1){
							ssetting.isother=false;
							var ff = $("#factoryfilter");
							ff.empty();
							$("<li/>").appendTo(ff).html("不限").addClass("active").click(function(){
								//厂家查询
								$("#factoryfilter").find("li").removeClass("active");
								$(this).addClass("active");
								$("#loading").show();
								ssetting.mfname='';
								search.sortHide();
								search.showElement();
								search.initElement(true);
							});
							if (typeof e.T_ManufacturerName !== "undefined" || e.T_ManufacturerName != null) {
								ssetting.shortName='';
								var sarray=new Array();
								var farray=new Array();
								$.each(e.T_ManufacturerName,function(i){
									var f = e.T_ManufacturerName[i];
									if($.inArray(f.F_ManufacturerName, sarray) == -1){
										sarray.push(f.F_ManufacturerName);
										var fid=search.getFactoryID(f.F_ManufacturerName);
										if(fid.length>0){
											if($.inArray(fid, farray) == -1){
												farray.push(fid);
												$("<li/>").appendTo(ff).html(ssetting.shortName).attr("data",ssetting.fullName).click(function(){
													//厂家查询
													$("#factoryfilter").find("li").removeClass("active");
													$(this).addClass("active");
													$("#loading").show();
													ssetting.mfname = $(this).html() + '∪' + $(this).attr("data");
													ssetting.dtype='';
													search.sortHide();
													search.showElement();
													search.initElement(true);
												});
											}
										}
										else{
											ssetting.isother=true;
											ssetting.mfother = ssetting.mfother + '∪' + f.F_ManufacturerName;
										}
									}
								});
								if(e.T_Count2[0].Count>0){
									if(ssetting.isother){
										$("<li/>").appendTo(ff).html("其它").click(function(){
											//其它查询
											$("#factoryfilter").find("li").removeClass("active");
											$(this).addClass("active");
											$("#loading").show();
											ssetting.mfname=ssetting.mfother;
											ssetting.dtype='';
											search.sortHide();
											search.showElement();
											search.initElement(true);
										});
									}
								}
							}
						}
					}
					
					myScroll.refreshE();
					if(initscroll){
						myScroll.EScrollToInit();
					}
					$("#loading").hide();
					//加入历史搜索记录
					storage.addHistory("element",'',modstr);
				},
				complete : function(){
					$("#loading").hide();
				},
				error : function (a) {
					if(initscroll){
						$("#searchcount").html("0");
						$("#e-content").empty();
						$("#factoryfilter").empty();
						$("#sales-model").off("click");
						$("#brand").off("click");
						$("#sales-price").off("click");
						$("#e-content").html('<span style="margin:43px;line-height:43px;">网络连接失败，请刷新页面重试</span>');
					}
					$("#loading").hide();
					//加入历史搜索记录
					storage.addHistory("element",'',modstr);
				}
			});
		},
		showElementList : function(e){
			ssetting.factoryName='';
			ssetting.shortName='';
			$.each(e,function(i){
				var u = e[i];
				search.showElementHtml(u);
			});
			
			if(ssetting.count>0){
				if(ssetting.epageindex*50>ssetting.count){
					var s = $("#e-content");
					$("<div/>").appendTo(s).html('<span>没有更多信息</span>').attr("class","searchtip");
				}
			}
		},
		showElementHtml : function(u){
			//显示元件列表html
			var s = $("#e-content");
			var cataname='';
			if(u.F_CategoryName!=null){
				cataname=u.F_CategoryName;
			}

			//替换厂家简称
			if(ssetting.factoryName!=u.F_ManufacturerName){
				var fname=search.getFactoryName(u.F_ManufacturerName);
				if(fname.length>0){
					ssetting.shortName=fname;
				}
				else{
					ssetting.shortName=u.F_ManufacturerName;
				}
				ssetting.factoryName=u.F_ManufacturerName;
			}

			if(u.F_type==2){
				//UGC数据
				$("<div/>").appendTo(s).html('<div><span class="model bluec">'+u.F_Model+'</span><div class="clear"></div></div><div><span class="categ">'+cataname+'</span><span class="price bluec">￥<b>'+parseFloat(u.F_Price).toFixed(2)+'</b></span><div class="clear"></div></div><div><span class="brand bluec">'+ssetting.shortName+'</span><span class="findsup"><b>UGC</b></span><div class="clear"></div></div>').attr("class","elelist").attr("cid",u.F_Class_ID).attr("data",u.F_InnerModel).attr("fname",u.F_ManufacturerName).attr("sname",u.F_ClassName);
			}
			else{
				$("<div/>").appendTo(s).html('<div><span class="model">'+u.F_Model+'</span><div class="clear"></div></div><div><span class="categ">'+cataname+'</span><span class="price">￥<b>'+parseFloat(u.F_Price).toFixed(2)+'</b></span><div class="clear"></div></div><div><span class="brand">'+ssetting.shortName+'</span><span class="findsup"><b></b></span><div class="clear"></div></div>').attr("class","elelist").attr("cid",u.F_Class_ID).attr("data",u.F_InnerModel).attr("fname",u.F_ManufacturerName).attr("sname",u.F_ClassName).click(function(){
					//元件搜索结果点击事件
					$(".elelist").removeClass("over");
					$(this).addClass("over");
					$("#loading").show();
					var model=$(this).attr("data");
					var classid=$(this).attr("cid");
					se.ShowElement(model,classid,'',0);
					var fname = $(this).attr("fname");
					var sname = $(this).attr("sname");
					//显示选型页面
					se.InitElementPage(fname,sname);
					se.ShowElementPage();
				});
			}
		},
		getFactoryID : function(n){
			//获取厂家ID
			var f=factoryJson.getFactoryJson();
			var d = '';
			$.each(f, function (e) {
				var fname = f[e].name.split('-');
				if (n != null && (f[e].s == n || fname[0] == n)) {
					d=f[e].fid;
					ssetting.fullName = fname[0];
					ssetting.shortName = f[e].s;
					return false;
				}
			});
			return d;
		},
		getFactoryName : function(n){
			//获取厂家简称
			var f=factoryJson.getFactoryJson();
			var d = '';
			$.each(f, function (e) {
				var fname = f[e].name.split('-');
				if (n != null && fname[0] == n) {
					d=f[e].s;
					return false;
				}
			});
			return d;
		},
		sortShow : function (c){
			$(".search-tab span").removeClass("rowsort");
			$(".search-tab span").removeClass("active");
			$(c).addClass("rowsort");
			$(c).addClass("active");
			if(ssetting.sortrule){
				$(c).find("a").removeClass("arrow-down");
				$(c).find("a").addClass("arrow-up");
				ssetting.sortrule=false;
			}
			else{
				$(c).find("a").removeClass("arrow-up");
				$(c).find("a").addClass("arrow-down");
				ssetting.sortrule=true;
			}
		},
		sortHide : function (){
			ssetting.sortkey='';
			$(".search-tab span").removeClass("rowsort");
			$(".search-tab span").removeClass("active");
		},
		closeMask : function () {
			$("#sub-tab").hide();
			$("#brand-mask").css({
				height : "0px;",
				"margin-top" : "0px;"
			});
			ssetting.brandOpen = false;
		},
		openMask : function () {
			$(".search-tab span").removeClass("rowsort");
			$(".search-tab span").removeClass("active");
			$("#brand").addClass("active");
			$("#sub-tab").show();
			$("#brand-mask").css({
				height : b.windowH.height,
				top : "0px"
			});
			ssetting.brandOpen = true;
			myScroll.TScrollToInit();
			myScroll.refreshT();
		},
		showElement : function (){
			//返回事件
			$(".sr-goback").off("click");
			$(".sr-goback").on("click", function () {
				search.hideElement();
			});
			
			$("#e-content").css({
				"min-height" : b.windowH.height - 44
			});
			$("#searchele").css({
				height : b.windowH.height - 44
			});
			$("#sresult").show(),
			$("#erTop").show(),
			$("#erTop").css({
				"-webkit-backface-visibility" : "hidden",
				"-webkit-prespective" : "1000",
				"-webkit-transform-style" : "preserve-3d",
				"width" : "100%"
			}),
			$("#sresult").css({
				height : b.windowH.height,
				width : "100%",
				top : "0px"
			}),
			b.trans2d.translation($("#erTop")[0], {
				x : 0
			}, function () {
				
			});
		},
		hideElement : function () {
			b.trans2d.translation($("#erTop")[0], {
				x : $(window).width(),
				duration : "0.4s"
			}, function () {
				$("#erTop").hide(),
				$("#erTop").attr("style", ""),
				$("#sresult").attr("style", "");
			});
		},
		initSeries : function (initscroll) {
			//初始化系列搜索
			var seri=$.trim($("#sp-text").val());
			if(initscroll){
				$("#s-content").html("");
				ssetting.spageindex=1;
			}
			else{
				ssetting.spageindex++;
			}
			$("#sp-text").val(seri);
			var mydate=new Date();
			$.ajax({
				type : "POST",
				url : "../price/getsearchclassjson.php?t="+mydate.getTime(),
				data : "series="+seri+"&pageindex="+ssetting.spageindex+"&client=msg",
				timeout : 5e4,
				dataType : "json",
				beforeSend : function(){
					if(initscroll){
						$("#s-content").empty();
					}
				},
				success : function (e) {
					if(e==null || e.Table.length==0){
						if(initscroll){
							$("#spullUp").hide();
							$("#s-content").empty();
							$("#s-content").html('<span style="margin:43px;line-height:43px;">很抱歉，在系列中没有找到与<strong>' + seri + '</strong>相关的结果。</span>');
						}
					}
					else{
						var s = $("#s-content");
						s.empty();
						$.each(e.Table,function(i){
							var u = e.Table[i];
							$("<div/>").appendTo(s).html('<i class="serioc text-icon"></i>'+u.F_Class_Name + ' --- ' + u.F_Manufacturer_Name).attr("class","serlist").attr("data",u.F_Class_ID).attr("fname",u.F_Manufacturer_Name).attr("sname",u.F_Class_Name).click(function(){
								//系列搜索结果点击事件
								$(".serlist").removeClass("over");
								$(this).addClass("over");
								$("#loading").show();
								var classid=$(this).attr("data");
								se.ShowElement('',classid,'',0);
								var fname = $(this).attr("fname");
								var sname = $(this).attr("sname");
								//显示选型页面
								se.InitElementPage(fname,sname);
								se.ShowElementPage();
							});
						});
					}

					myScroll.refreshC();
					if(initscroll){
						myScroll.CScrollToInit();
					}
					$("#loading").hide();
					//加入历史搜索记录
					storage.addHistory("series",'',seri);
				},
				complete : function(){
					$("#loading").hide();
				},
				error : function (a) {
					if(initscroll){
						$("#s-content").empty();
						$("#s-content").html('<span style="margin:43px;line-height:43px;">网络连接失败，请刷新页面重试</span>');
					}
					$("#loading").hide();
					//加入历史搜索记录
					storage.addHistory("series",'',seri);
				}
			});
		},
		showSeries : function (){
			//返回事件
			$(".sr-goback").off("click");
			$(".sr-goback").on("click", function () {
				search.hideSeries();
			});

			$("#spullUp").hide();
			
			$("#searchser").css({
				height : b.windowH.height - 44
			});
			$("#sresult").show(),
			$("#srTop").show(),
			$("#srTop").css({
				"-webkit-backface-visibility" : "hidden",
				"-webkit-prespective" : "1000",
				"-webkit-transform-style" : "preserve-3d",
				"width" : "100%"
			}),
			$("#sresult").css({
				height : b.windowH.height,
				width : "100%",
				top : "0px"
			}),
			b.trans2d.translation($("#srTop")[0], {
				x : 0
			}, function () {
				
			});
		},
		hideSeries : function (){
			b.trans2d.translation($("#srTop")[0], {
				x : $(window).width(),
				duration : "0.4s"
			}, function () {
				$("#srTop").hide(),
				$("#srTop").attr("style", ""),
				$("#sresult").attr("style", "");
			});
		},
		setInputStatus : function() {
			var key = $("#sp-text").val(),
				word = key.replace(/( |[\s　])/g, "");
			if (word !== '') {
				clearTimeout(ssetting.timeout);
				ssetting.timeout = setTimeout(function () {
					$(".btn-reset").show();
				}, 100);
			} else {
				$(".btn-reset").hide();
			}
		},
		searchLoad : function(init){
			//加载搜索数据
			$("#sp-text").blur();
			var kw=$.trim($("#sp-text").val());
			if(ssetting.option=="0"){
				//加载元件全部数据参数为空
				if (kw.length > 0 && kw != '输型号...查价格') {
					$("#loading").show(),
					$("#erTop").show();
					if(init){
						ssetting.mfname='';
					}
					search.sortHide(),
					search.showElement(),
					search.initElement(true);
					//元件筛选菜单位置
					$("#downmenu").css({
						"top" : b.windowH.height - $("#downmenu").height()
					});
				}
				else{
					$("#sresult").hide();
					$("#sp-text").focus();
					$("#loading").hide();
				}
			}
			else if(ssetting.option=="1"){
				//加载系列数据
				if (kw.length > 0 && kw != '查系列') {
					$("#loading").show(),
					$("#srTop").show(),
					search.showSeries();
					search.initSeries(true);
				}
				else{
					$("#sresult").hide();
					$("#sp-text").focus();
					$("#loading").hide();
				}
			}
			else if(ssetting.option=="2"){
				//厂家搜索
				var fkw=$.trim($("#sf-text").val());
				if (fkw.length > 0 && fkw != '搜品牌') {
					$("#ac_results").show();
					$("#ac_results").find(".scroller").show();
				}
				else{
					$("#ac_results").hide();
					$("#ac_results").find(".scroller").hide();
					$("#sf-text").focus();
				}
			}
		},
		autocompleteClick : function(event, rdata, factoryid){
			//厂家搜索点击事件,显示系列页面
			$("#sf-text").blur();
			b.SeriesTree.init(rdata,factoryid);
			//加入历史搜索记录
			storage.addHistory("factory",factoryid,rdata);
		},
		refresh : function(){
			//厂家搜索初始化滚动条
			myScroll.AScrollToInit();
			myScroll.refreshA();
		}
	}
	
	b.Search=search;
	
	b.SearchSetting=ssetting;
	
	//搜索按钮绑定点击事件
	$("#sp-submit").on("click", function (e) {
		search.searchLoad(true);
	});
	//手机键盘前往按键事件
	$("#sp-text,#sf-text").on("keydown", function (e) {
		if (e.keyCode == 13) {
			search.searchLoad(true);
		}
	});
	
	//显示搜索页面
	$("#sb-box").on("click", function(e){		
		//加载搜索历史
		$("#searchpage").show();
		if(ssetting.option=="0"){
			$("#sf-text").hide();
			$("#sp-text").show();
			$("#history").css({
				height : b.windowH.height - $("#sp-bar").height() - $("#sp-input").height()
			});
			storage.getHistory("element");
			$("#sp-text").focus();
		} else if(ssetting.option=="1"){
			$("#sf-text").hide();
			$("#sp-text").show();
			$("#history").css({
				height : b.windowH.height - $("#sp-bar").height() - $("#sp-input").height()
			});
			storage.getHistory("series");
			$("#sp-text").focus();
		} else {
			$("#sp-text").hide();
			$("#sf-text").show();
			$("#sf-text").unautocomplete();
			$("#history").css({
				height : b.windowH.height - $("#sp-bar").height() - $("#sp-input").height()
			});
			storage.getHistory("factory");
			//厂家渐进式查询
			var options = {
				minChars: 1,
				max: 500,
				width: "100%",
				height: b.windowH.height,
				top : $("#sp-bar").height() + $("#sp-input").height() + 1,
				matchContains: true,
				tipText:"搜品牌",
				reset:".btn-reset",
				formatItem: function(row, rowNum, rowCount, searchItem){
					//显示
					return row.name;
				},
				formatMatch: function(row, rowNum, rowCount){
					//查询条件
					return row.id + "_" + row.py + "_" + row.name;
				},
				formatResult: function(row, rowNum, rowCount){
					return row.name;
				} 
			};
			var scdata = new Array();
			$.each(b.FactoryJson, function (d) {
				var sc = b.FactoryJson[d];
				if(sc.fid != 1){
					if (sc.pId != 2) {
						scdata.push(sc);
					}
				}
			});
			$("#sf-text").autocomplete(scdata,options);
			$("#sf-text").result(search.autocompleteClick);
			$("#sf-text").refresh(search.refresh);
			$("#sf-text").focus();
		}
	});

	//关闭搜索页面
	$("#sp-goback").on("click",function (e){
		$(".ac_results").hide();
		$("#searchpage").hide();
	});
	
	//刷新元件搜索
	$("#sr-bar-refresh").on("click",function (e){
		search.searchLoad(false);
	});
	
	//搜索元件返回主页
	$("#sr-bar-home").on("click",function (e){
		$(".ac_results").hide();
		$("#searchpage").hide();
		search.hideElement();
	});
	
	//刷新系列搜索
	$("#ss-bar-refresh").on("click",function (e){
		search.searchLoad(true);
	});
	
	//搜索系列返回主页
	$("#ss-bar-home").on("click",function (e){
		$(".ac_results").hide();
		$("#searchpage").hide();
		search.hideSeries();
	});
	
	//选型返回主页
	$("#se-bar-home").on("click",function (e){
		$(".ac_results").hide();
		$("#searchpage").hide();
		search.hideElement();
		search.hideSeries();
		b.SeriesTree.hideSeriesTree();
		se.HideElementPage();
	});
	
	//搜索选项切换
	$(".block-group").find("span").on("click", function (e) {
		$(".block-group").find("a").removeClass("btn-weak");
		$(this).find("a").addClass("btn-weak");
		search.hideElement();
		search.hideSeries();
		$(".sp-ctop").hide();
		var option=$(this).attr("data-index");
		ssetting.option=option;
		switch(option){
			case "0":
				$("#sf-text").hide();
				$("#sp-text").show();
				$("#sp-title").html("搜元件");
				$("#searchtip").html("输型号,查价格");
				$("#sp-text").attr("placeholder","输型号,查价格");
				$("#se-top").show();
				$("#sp-text").val("");
				break;
			case "1":
				$("#sf-text").hide();
				$("#sp-text").show();
				$("#sp-title").html("搜系列");
				$("#searchtip").html("查系列");
				$("#sp-text").attr("placeholder","查系列");
				$("#ss-top").show();
				$("#sp-text").val("");
				break;
			case "2":
				$("#sf-text").hide();
				$(".btn-reset").hide();
				$("#sp-text").show();
				$("#sp-title").html("搜品牌");
				$("#searchtip").html("搜品牌");
				$("#sf-top").show();
				$("#sf-text").val("");
				break;
		}
		$(".btn-reset").hide();
	});
	
	//热门搜索点击事件
	$("#se-top").find("span").on("click", function (e){
		$("#loading").show();
		var model=$(this).attr("data");
		var classid=$(this).attr("cid");
		se.ShowElement(model,classid,'',0);
		var fname = $(this).attr("fname");
		var sname = $(this).attr("sname");
		//显示选型页面
		se.InitElementPage(fname,sname);
		se.ShowElementPage();
	});
	$("#ss-top").find("span").on("click", function (e){
		$("#loading").show();
		var classid=$(this).attr("data");
		se.ShowElement('',classid,'',0);
		var fname = $(this).attr("fname");
		var sname = $(this).attr("sname");
		//显示选型页面
		se.InitElementPage(fname,sname);
		se.ShowElementPage();
	});
	$("#sf-top").find("span").on("click", function (e){
		var factoryid=$(this).attr("data");
		var name=$(this).text();
		//厂家搜索点击事件,显示系列页面
		b.SeriesTree.init(name,factoryid);
	});
	
	//清空历史搜索
	$("#clearhistory").on("click", function (e){
		if(ssetting.option=="0"){
			storage.clearItem("element");
		} else if(ssetting.option=="1"){
			storage.clearItem("series");
		} else if(ssetting.option=="2"){
			storage.clearItem("factory");
		}
		$("#historylist").html("");
		$("#sp-trash").hide();
	});
	
	//显示重置
	$("#sp-text").bind("input", search.setInputStatus);
	//重置事件
	$(".btn-reset").on("click", function (e) {
		if(ssetting.option=="2"){
			$("#sf-text").val("");
			$("#sf-text").focus();
		}
		else{
			$("#sp-text").val("");
			$("#sp-text").focus();
		}
		$(this).hide();
		$("#ac_results").hide();
	});
	
	//关闭厂家筛选
	$("#sub-tab-close,#brand-mask").on("click", function (e) {
		search.closeMask();
	});
}

//控制滚动条
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (a, b){
	if(document.body.scrollTop>0){
		$("#sorter").hide();
		(app&&app.scroll)? app.scroll.scrollTo(0):scroll(0,0);
	}
}
//滚动条
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var Search = {
		initElement : function(initscroll){
			$("#loading").show();
			b.Search.initElement(initscroll);
		},
		initSeries : function(initscroll){
			$("#loading").show();
			b.Search.initSeries(initscroll);
		},
		setting : function(){
			return b.SearchSetting;
		}
	};
	var myScroll = {
		myFScroll : null,
		mySScroll : null,
		myPScroll : null,
		myCScroll : null,
		myEScroll : null,
		myHScroll : null,
		myTScroll : null,
		myAScroll : null,
		isShowSort : true
	};
	myScroll.myFScroll = new iScroll('wrap',{hScroll:false,hScrollbar:false,vScrollbar:false,useTransform:false,useTransition:false,snap:false,
		onScrollEnd : function(){
			//在滚动完成后的回调事件
			if(myScroll.isShowSort){
				if (this.y < -200){
					myScroll.isShowSort = false;
					$("#sorter").show();
					var vtop = parseInt((b.windowH.height - $("#sorter").height()) / 2);
					var btop = $("#bar").height();
					$("#sorter").css({
						top : vtop > btop ? vtop : btop + 10
					});
				}
				else{
					return false;
				}
			}
			else{
				return false;
			}
		}
	});
	myScroll.mySScroll = new iScroll('swipeTree',{hScrollbar:false,vScrollbar:false,useTransform:false,useTransition:false,snap:false});
	myScroll.myPScroll = new iScroll('priceInfo',{hScroll:false,hScrollbar:false,vScrollbar:false,useTransform:false,useTransition:false,snap:false,
		onBeforeScrollStart : function(e){
			//开始滚动前的事件回调,默认是阻止浏览器默认行为
			var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase():(e.target ? e.target.nodeName.toLowerCase():'');
			if(nodeType !='input'&& nodeType!='a') {
				e.preventDefault();
		   }
		}
	});
	//元件搜索列表滚动加载、刷新
	var pullUpEl = $("#epullUp"),
	pullUpElTip = $("#epullUpTip");
	//pullUpOffset = 23;
	var moveoffset = 0;
	myScroll.myEScroll = new iScroll('searchele',{hScroll:false,useTransition:true,topOffset:0,
		onRefresh: function () {
			if (pullUpEl.hasClass('loading')) {
				pullUpEl.removeClass('loading flip');
				pullUpEl.find('.pullUpLabel').html('向上滑动加载更多...');
			}
		},
		onScrollMove: function () {
			if(Search.setting().count>0){
				if(Search.setting().epageindex*50<Search.setting().count){
					pullUpElTip.hide();
					pullUpEl.show();
					if (this.y < (this.maxScrollY - 30) && !pullUpEl.hasClass('flip')) {
						pullUpEl.addClass('flip');
						pullUpEl.find('.pullUpLabel').html('释放加载下一页...');
						//this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 30) && pullUpEl.hasClass('flip')) {
						pullUpEl.removeClass('loading flip');
						pullUpEl.find('.pullUpLabel').html('向上滑动加载更多...');
						//this.maxScrollY = pullUpOffset;
					}

					//滚动时隐藏菜单
					if (this.y < moveoffset){
						$("#downmenu").hide();
						$("#searchele").css({
							height : b.windowH.height - $("#ser-bar").height()
						});
					}else if (this.y > moveoffset){
						$("#searchele").css({
							height : b.windowH.height - $("#ser-bar").height()
						});
						$("#downmenu").hide();
					}
					moveoffset=this.y;
				}
				else{
					pullUpEl.hide();
					pullUpElTip.show();
				}
			}
			else{
				pullUpEl.hide();
				pullUpElTip.show();
			}
		},
		onScrollEnd: function () {
			if(Search.setting().count>0){
				if(Search.setting().epageindex*50<Search.setting().count){
					pullUpElTip.hide();
					pullUpEl.show();
					if (pullUpEl.hasClass('flip')) {
						pullUpEl.addClass('loading');
						pullUpEl.find('.pullUpLabel').html('Loading...');			
						Search.initElement(false);
					}
					//滚动停止显示菜单
					$("#searchele").css({
						height : b.windowH.height - $("#ser-bar").height()
					});
					$("#downmenu").show();
				}
				else{
					pullUpEl.hide();
					pullUpElTip.show();
				}
			}
			else{
				pullUpEl.hide();
				pullUpElTip.show();
			}
		}
	});
	//系列搜索列表滚动加载、刷新
	var pullUpSe = $("#spullUp");
	//pullUpOffset = 23;
	myScroll.myCScroll = new iScroll('searchser',{hScroll:false,hScrollbar:false,vScrollbar:false,useTransform:false,useTransition:false,snap:false,topOffset:0,
		onRefresh: function () {
			if (pullUpSe.hasClass('loading')) {
				pullUpSe.removeClass('loading flip');
				pullUpSe.find('.pullUpLabel').html('向上滑动加载更多...');
			}
		},
		onScrollMove: function () {
			if (this.y < (this.maxScrollY - 30) && !pullUpSe.hasClass('flip')) {
				pullUpSe.addClass('flip');
				pullUpSe.find('.pullUpLabel').html('释放加载下一页...');
				//this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 30) && pullUpSe.hasClass('flip')) {
				pullUpSe.removeClass('loading flip');
				pullUpSe.find('.pullUpLabel').html('向上滑动加载更多...');
				//this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullUpSe.hasClass('flip')) {
				pullUpSe.addClass('loading');
				pullUpSe.find('.pullUpLabel').html('Loading...');			
				//Search.initSeries(false);
			}
		}
	});
	//搜索历史
	myScroll.myHScroll = new iScroll('history',{hScroll:false,hScrollbar:false,vScrollbar:false,useTransform:false,useTransition:false,snap:false});
	myScroll.myTScroll = new iScroll('sub-tab',{hScroll:false,hScrollbar:false,vScrollbar:false,useTransform:false,useTransition:false,snap:false});
	myScroll.myAScroll = new iScroll('ac_results',{hScroll:false,hScrollbar:false,vScrollbar:false,useTransform:false,useTransition:false,snap:false});
	myScroll.loaded = function (){
		myScroll.myFScroll;
		myScroll.mySScroll;
		myScroll.myPScroll;
		myScroll.myCScroll;
		myScroll.myEScroll;
		myScroll.myHScroll;
		myScroll.myTScroll;
		myScroll.myAScroll;
	}
	//绑定滚动条事件
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	document.addEventListener('DOMContentLoaded', function () { setTimeout(myScroll.loaded,200);}, false);
	b.myScroll = myScroll;
	
	//排序侧边栏点击事件
	$("#sorter").on("click","li",function(e){
		var top,
		letter = $(this).find("span").html(),
		divider = $("#factory").find("li.light." + letter);
		if (divider.length > 0 && divider.html() == letter) {
			top = divider.offset().top - $("#bar").height();
			myScroll.myFScroll.refresh();
			myScroll.myFScroll.scrollTo(0, top, 200, true);
		} else {
			return false;
		}
	});
	//top事件
	$("#J_GoTop").on("click", function () {
		var scrollH = "-" + $("#scroller").height();
		myScroll.myFScroll.scrollTo(0, scrollH, 200, true);
	})
}

//获取用户信息
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var ls = window.localStorage,
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
	
	//内部统计
	var mydate=new Date();
	var obj = document.getElementById('tongji');
	if(obj == null || typeof(obj) == 'undefined') {
		var d=document, g=d.createElement('iframe'), s=d.getElementsByTagName('body')[0];
		g.src='t.html?t='+mydate.getTime(); g.style.display='none'; g.id='tongji'; s.appendChild(g);
	}
	else{
		obj.src='t.html?t='+mydate.getTime();
	}
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {}));
