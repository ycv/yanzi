(window, window.lib || (window.lib = {})), function (a, b, c) {
	$("#wrap").css({
		height : $(window).height() - $("#bar").height()
	})
}
//选型
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var priceinfo  = function (a, b){
		einfo.init(a);
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
		q_elenent_ct : new Array(),//附件ID
		q_elenented_ct : new Array(),//必选附件ID
		q_ct_id : new Array(),//附件选型明细
		q_seled_attach_json : new Array(),//必选附件明细
		q_sel_attach_json : new Array(),//可选附件明细
		q_supp_discount : {},
		q_seled_attach_count : 0
	};
	var einfo = {
		init : function(classid){
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
			sinfo.q_elenent_ct = new Array(),
			sinfo.q_elenented_ct = new Array(),
			sinfo.q_ct_id = new Array(),
			sinfo.q_seled_attach_json = new Array(),
			sinfo.q_sel_attach_json = new Array(),
			sinfo.q_supp_discount = {},
			sinfo.q_seled_attach_count = 0;
			//初始化加载选型信息
			var mydate=new Date();
			$.getJSON("../price/getseriesfile.php?t="+mydate.getTime()+"&classid="+classid, function (cdata) {
				if(cdata>0){
					$("#loading").show();
					$.getJSON("price/classjson.js?t="+mydate.getTime(), function (data) {
						sinfo.q_class_json = data;
					});
					$.getJSON("price/param/"+classid+".js?t="+mydate.getTime(), function (data) {
						sinfo.q_series_json = data.SERIES_INFO;
						sinfo.q_proplist_json = data.PROPS_INFO;
						sinfo.q_complist_json = data.COMPS_INFO;
						sinfo.q_rellist_json = data.RELS_INFO;
						sinfo.q_mproplist_json = data.MPROPS_INFO;
						sinfo.q_comblist_json = data.ATTACH_INFO;
						einfo.showMainContent();
						if (sinfo.q_series_json != null && sinfo.q_proplist_json.length > 0 && sinfo.q_complist_json != "") {
							//初始化
							einfo.Q_InitData();
							einfo.Q_InitQuery('');
							//加载厂家和系列名称
							$("#FactName").html(sinfo.q_series_json.FactName);
							$("#SeriesName").html(sinfo.q_series_json.SeriesName);
						}
					});
				}
			});
		},
		showMainContent : function (){
			//初始化选项卡显示
			$("#myTab").find("li").first().addClass("active").removeClass("normal").siblings().addClass("normal").removeClass("active"),
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
								}
								cot = 1;
							}
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
				var mydate=new Date();
				$.ajax({
					type : "POST",
					url : "../price/getelementinfojson.php?t="+mydate.getTime(),
					data : "classid="+sinfo.q_series_json.SeriesID+"&innermodel="+n,
					async : true,
					dataType : "json",
					success : function (e) {
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
						//隐藏loading
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

			sinfo.q_element_json == ""
			var mydate=new Date();
			$.ajax({
				type : "POST",
				url : "../price/getelementinfojson.php?t="+mydate.getTime(),
				data : "classid="+sinfo.q_series_json.SeriesID+"&innermodel="+u,
				async : true,
				dataType : "json",
				success : function (e) {
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
					//隐藏loading
					$("#loading").hide();
				}
			});
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
							var h = " checked ";
							var f = ' disabled="disabled" ';
							if (t.IsEnabled) {
								f = " ";
							}
							if (!t.IsChecked) {
								h = " ";
							}
							c = c + '<span name="epcomp_span" id="epcomp_span_' + t.CompId + '" class="chb_comp">';
							c = c + '<input type="checkbox"' + h + f + ' class="attachChk" data="' + t.TypeId + ',' + t.CompId + '" value="' + t.CompId + '"/>';
							c = c + '<span><a href="javascript:void(0);" class="attachA" data="' + t.CompId + ',0,true' + '">' + t.CompName + "</a></span></span>";
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
			$("#Part_CompT").find(".attachChk").each(function (b, c) {
				$(c).click(function () {
					var idstr=$(this).attr("data");
					var idarr=idstr.split(",");
					einfo.Q_CheckComp(this,idarr[0],idarr[1]);
				})
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
				$("#price_i").html(c[0]);
				$("#price_b").html(c[1]);
			}
			var a = "";
			var rt=0;
			var at=0;
			if (b.CombList != null && b.CombList.length > 0) {
				$.each(b.CombList, function (f) {
					var d = b.CombList[f];
					var e = "";
					if(d.IsMain==1){
						rt=parseFloat(rt)+parseFloat(d.Price);
						e=" (本体)";
					}
					else{
						at=parseFloat(at)+parseFloat(d.Price);
					}
					a = a + '<tr><td class="bujian_td_l">' + d.CombName + e + '</td><td class="bujian_td_r">￥' + parseFloat(d.Price).toFixed(2) + '</td></tr>';
				});
			}
			$("#Part_pdetail").html(a);
			
			//加载供应商折扣信息
			if($.isEmptyObject(sinfo.q_supp_discount)){
				var mydate=new Date();
				$.getJSON("../price/getsupplierlist.php?t="+mydate.getTime()+"&classid="+sinfo.q_element_json.F_Class_ID, function (data) {
					sinfo.q_supp_discount=data;
					einfo.showSupplierDiscount(sinfo.q_supp_discount,rt,at);
				});
			}
			else{
				einfo.showSupplierDiscount(sinfo.q_supp_discount,rt,at);
			}
		},
		showSupplierDiscount : function (data,rt,at){
			//加载供应商折扣信息
			$("#supplist").html("");
			var s="",v="",l="";
			$.each(data.Table, function (i) {
				var d = data.Table[i];
				var t=(parseFloat(rt) * parseFloat(d.F_Discount)+parseFloat(at) * parseFloat(d.F_Discount4Appendix));
				var ct = einfo.SplitThePrice((t).toFixed(2));

				//供应商明细
				var dt=einfo.jsonDateParser(d.F_Issue_Date);
				var js=(parseFloat(rt) * (1-parseFloat(d.F_Discount))+parseFloat(at) * (1-parseFloat(d.F_Discount4Appendix))).toFixed(2);
				l=$('<div class="cpic_rba"/>').html('<ul><li><span class="suptitle">'+d.F_Supplier_Name+'</span><span class="supprice">￥'+ct[0]+ct[1]+'</span></li><li><span>主体:'+(parseFloat(d.F_Discount)*100).toFixed(2).toString()+'%</span><span>附件:'+(parseFloat(d.F_Discount4Appendix)*100).toFixed(2).toString()+'%</span><span>节省:'+js.toString()+'</span></li><li><span>联系人:'+d.F_Contact+'</span><span>电话:'+d.F_Tel+'</span></li><li><span>地址:'+d.F_ADDRESS+'</span><span>发布日期:'+dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+'</span></li></ul>').click(function(){$("#supplist").find(".divcss").removeClass("gys_cc");$(this).find(".divcss").addClass("gys_cc");}).mouseover(function(){$(this).find(".divcss").addClass("gys_bb");}).mouseout(function(){$(this).find(".divcss").removeClass("gys_bb");});
				l.appendTo($("#supplist"));
			});
			if(data.Table.length>3){$("#suppliermore").show();}
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
				
				//添加本体元件明细
				var rk = einfo.Q_InitCombiantion();
				rk.CombName = sinfo.q_element_json.F_Model;
				rk.IsMain = 1;
				rk.Price = sinfo.q_element_json.F_Price.toString();
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
				a.Total = parseFloat(f) + parseFloat(sinfo.q_element_json.F_Price.toString());
				a.Price = parseFloat(f) + parseFloat(sinfo.q_element_json.F_Price.toString());
				a.PriceBeforeDisc = sinfo.q_element_json.F_Price.toString();
			}
			return a;
		},
		Q_CheckComp : function (check_box, compTId, compId) {
			//显示附件信息点击事件
			var curcomp = einfo.Q_H_FindComp(sinfo.q_complist_json, compId);
			if (typeof curcomp === "undefined" || curcomp == null) {
				return "";
			}
			curcomp.IsChecked = check_box.checked;
			einfo.Q_Ref_CompInfo(compId,0,check_box.checked);
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
				
				//附件选择事件移除和绑定
				$("#q_comp_props").find(".attachClk").each(function (b, c) {
					$(c).unbind("click");
				});
				$("#q_comp_props").find(".attachClk").each(function (b, c) {
					$(c).click(function () {
						var idstr=$(this).attr("data");
						var idarr=idstr.split(",");
						einfo.Q_S_CompProp(idarr[0],idarr[1],idarr[2]);
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
				
				//附件选择事件移除和绑定
				$("#q_comp_props").find(".attachClk").each(function (b, c) {
					$(c).unbind("click");
				});
				$("#q_comp_props").find(".attachClk").each(function (b, c) {
					$(c).click(function () {
						var idstr=$(this).attr("data");
						var idarr=idstr.split(",");
						einfo.Q_S_CompProp(idarr[0],idarr[1],idarr[2]);
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
						var k = '<div id="q_prop_' + f.PropId + '" class="prop_part ' + l + '"><div><span class="qp_flag cp_flag">&nbsp;</span><label>' + f.PropName + "</label></div><ul>";
						$.each(h, function (n) {
							var o = h[n];
							var m = (o.IsChk) ? "opt_s opt_s_ch" : "opt_s opt_s_nch attachClk";
							if (d) {
								k = k + '<li id="q_opt_' + o.OID + '" class="opt_s ' + m + '">' + o.OName + "</li>";
							} else {
								k = k + '<li id="q_opt_' + o.OID + '" class="opt_s ' + m + '" data="' + c + ',' + f.PropId + ',' + o.OID + '">' + o.OName + "</li>";
							}
						});
						k = k + "</ul></div>";
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
			
			//附件选择事件移除和绑定
			$("#q_comp_props").find(".attachClk").each(function (b, c) {
				$(c).unbind("click");
			});
			$("#q_comp_props").find(".attachClk").each(function (b, c) {
				$(c).click(function () {
					var idstr=$(this).attr("data");
					var idarr=idstr.split(",");
					einfo.Q_S_CompProp(idarr[0],idarr[1],idarr[2]);
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
							var h = '<div id="q_prop_' + d.PropId + '" class="prop_part ' + j + '"><div><span class="qp_flag cp_flag">&nbsp;</span><label>' + d.PropName + '</label></div><ul>';
							$.each(f, function (l) {
								var m = f[l];
								var k = (m.IsChk) ? "opt_s opt_s_ch" : "opt_s opt_s_nch bodyClk";
								h = h + '<li id="q_opt_' + m.OID + '" class="opt_s ' + k + '" data="'+ m.OID + ',' + m.IsChk + ',' + g +'">' + m.OName + '</li>';
							});
							h = h + '</ul></div>';
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
						$("#loading").show();
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
		}
	};
	b.ShowPrice = priceinfo
}
//页面滑动插件
/*
(window, window.lib || (window.lib = {}));
!function (a, b) {
	//配置信息
	var tPoint = {
		self:{},
		count:0,
		speed:300,
		iniL:30,
		iniT:200,
		iniAngle:180,
		touch:false,
		mutiTouch:false,
		vendor:"",
		has3d:true,
		hasTouch:true,
		hasTransform:true,
		bLeft:0,
		bTop:0,
		bWidth:0,
		bHeight:0,
		setAttr:function(name,value){
			tPoint[name]=value;
		}
	};
	s = function (a, b){
		//触摸滑动初始化
		tPoint.self=a;
		tPoint.self.get(0).removeEventListener('touchstart',sp.startFun);
		tPoint.self.get(0).removeEventListener('touchmove',sp.moveFun);
		tPoint.self.get(0).removeEventListener('touchend',sp.endFun);
		sp.init();
	};
	var sp = {
		init : function(){
			//init初始化		
			//浏览器特性检测
			tPoint.vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
				(/firefox/i).test(navigator.userAgent) ? 'Moz' :
				'opera' in window ? 'O' : '';
			//是否支持3D
			tPoint.has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
			//是否支持触摸
			tPoint.hasTouch = 'ontouchstart' in window;
			//是否支持动画效果
			tPoint.hasTransform = tPoint.vendor + 'Transform' in document.documentElement.style;
			
			
			var _offset=tPoint.self.offset();
			//左边距
			tPoint.bLeft=_offset.left - 280;
			//上边距
			tPoint.bTop=_offset.top;
			//宽度
			tPoint.bWidth=tPoint.self.width();
			//高度
			tPoint.bHeight=tPoint.self.height();
			//右边界
			tPoint.bRb=tPoint.bLeft+tPoint.bWidth;
			//下边界
			tPoint.bBb=tPoint.bTop+tPoint.bHeight;
			tPoint.total=tPoint.self.children().children().length;	
			
			//添加Touch事件监听
			tPoint.self.die("touchstart,touchmove,touchend");
			tPoint.self.get(0).addEventListener('touchstart',sp.startFun);
			tPoint.self.get(0).addEventListener('touchmove',sp.moveFun);
			tPoint.self.get(0).addEventListener('touchend',sp.endFun);
		},
		directionDetect : function (l,t){
			//方向检测(左移距离，上移距离)
			if(Math.abs(t)<tPoint.iniT&&Math.abs(l)>tPoint.iniL){
				var rStr=l<0?'left':'right';
				return rStr;
			}
			return false;
		},
		borderDetect : function (x,y){
			//边界检测
			return (x<tPoint.bLeft||x>tPoint.bRb||y<tPoint.bTop||y>tPoint.bBb);	
		},
		getAngle : function (n){
			//获取夹角(通过arctant反三角函数)
			return Math.atan(n)*180/Math.PI;
		},
		getDis : function (xLen,yLen){
			//获取距离(通过两边计算第三边)
			return Math.sqrt(Math.pow(xLen,2)+Math.pow(yLen,2));
		},
		multiTouchDetect : function (e){
			//多点触摸检测(只检测两点触摸)
			tPoint.tLen=e.touches.length;
			if(tPoint.tLen>1){
				var point0=e.touches[0],
					point1=e.touches[1],
					xLen=point1.pageX-point0.pageX,
					yLen=point1.pageY-point0.pageY,
					angle=sp.getAngle(yLen/xLen),
					gDis=sp.getDis(xLen,yLen);
				if(!tPoint.mutiTouch){
					tPoint.gStartDis=gDis;
					tPoint.gStartAngle=angle;
				}else{
					tPoint.gEndDis=gDis;
					tPoint.gEndAngle=angle;
					tPoint.scale=gDis/tPoint.gStartDis;
					tPoint.rotation=angle-tPoint.gStartAngle;
				}
				tPoint.mutiTouch=true;
			}else{
				tPoint.mutiTouch=false;
			};	
		},
		setPointData : function (point, setList){
			//设置tPoint的改变数据（默认设置改变数据，如果setList存在，则遍历setList设置属性）
			if(setList){
				for(var o in setList){
					tPoint.setAttr(o,setList[o]);
				}
			}else{
				var t = new Date();
				tPoint.endX=point.pageX;
				tPoint.endY=point.pageY;
				tPoint.moveX=point.pageX-tPoint.startX;//滑动距离
				tPoint.moveY=point.pageY-tPoint.startY;
				tPoint.direction=sp.directionDetect(tPoint.moveX,tPoint.moveY);		
				tPoint.angle=sp.getAngle(tPoint.moveY/tPoint.moveX);
			}
		},
		startFun : function (e){
			//触摸开始事件
			var point = e.touches[0],
			t = new Date();
			var setList={
				startX:point.pageX,
				startY:point.pageY,
				identifier:point.identifier
			};
			sp.setPointData(point,setList);
			tPoint.touch=true;
			
			_inner=tPoint.self.children();
			tPoint.setAttr("startOffsetX",sp.getTransX(_inner));
			tPoint.setAttr("startOffsetY",sp.getTransY(_inner));
		},
		moveFun : function (e){
			//触摸移动事件
			var point = e.touches[0];
			//alert(x);alert(tPoint.bLeft);alert(tPoint.bRb);alert(y);alert(tPoint.bTop);alert(tPoint.bBb);
			if(sp.borderDetect(point.pageX,point.pageY)){
				tPoint.touch=false;
				return false;
			}
			if(tPoint.touch){
				sp.setPointData(point);
				sp.multiTouchDetect(e);
				
				var _inner=tPoint.self.children(),
				innerW=_inner.width(),
				innerH=_inner.height();
				var transY=sp.getTransY(_inner);
				//判断是否已到左右边界
				var offsetX=tPoint.moveX+tPoint.startOffsetX;
				if(Math.abs(offsetX)>innerW-tPoint.self.width()+50){
					offsetX=-(innerW-tPoint.self.width()+50);	
				}
				if(offsetX>0){
					offsetX=0;
				}
				//判断是否已到上下边界
				var offsetY=tPoint.moveY+tPoint.startOffsetY;
				if(Math.abs(offsetY)>innerH-tPoint.self.height()){
					offsetY=-(innerH-tPoint.self.height());	
				}
				if(offsetY>0){
					offsetY=0;
				}
				//设置偏移量
				sp.transformBox(_inner,offsetX,offsetY,tPoint.has3d);
				//$("#showT").html(offsetX + "-" + offsetY + "宽:" + innerW + "高:" + innerH + " translateY:"+transY+"<br>X-Y轴移动:"+tPoint.moveX+"px | "+tPoint.moveY);
			}
			if(Math.abs(tPoint.angle)<tPoint.iniAngle){
				e.preventDefault();	
			}
		},
		endFun : function (e){
			//触摸结束事件
			tPoint.touch=false;
			tPoint.mutiTouch=false;
		},
		transformBox : function (obj,offsetX,offsetY,has3d){
			//设置3D移动距离
			var transl=has3d?"translate3d("+offsetX+"px,"+offsetY+"px,0px)":"translate("+offsetX+"px,"+offsetY+"px)";
			obj.css({'-webkit-transform':transl});		
		},
		getTransX : function (objs){
			//获取上次X轴移动位置
			var transform=objs.css("-webkit-transform"),
				trans=transform.match(/\((.+)\)/),
				transX=0;
			if(trans){
				var transArr=trans[1].split(","),
					len=transArr.length;
				transX=transArr[len-3].replace("px","");
			}
			return Number(transX);
		},
		getTransY : function (objs){
			//获取上次Y轴移动位置
			var transform=objs.css("-webkit-transform"),
				trans=transform.match(/\((.+)\)/),
				transY=0;
			if(trans){
				var transArr=trans[1].split(","),
					len=transArr.length;
				transY=transArr[len-2].replace("px","");
			}
			return Number(transY);
		}
	};
	b.Swipe = s
}*/
//幻灯片方法
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var c = a.Zepto || a.$,
	d = function () {
		var a = "WebkitTransform" in document.documentElement.style ? !0 : !1;
		return a
	},
	e = function () {
		var a,
		b = !1,
		c = document.createElement("div"),
		a = ["&#173;", '<style id="smodernizr">', "@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", "</style>"].join(""),
		d = document.documentElement.style;
		return c.id = "modernizr",
		c.innerHTML += a,
		document.body.appendChild(c),
		"WebkitPerspective" in d && "webkitPerspective" in d && (b = 9 === c.offsetLeft && 3 === c.offsetHeight),
		c.parentNode.removeChild(c),
		b
	},
	f = e ? "translate3d(" : "translate(",
	g = e ? ",0)" : ")",
	h = function (a, b) {
		return a ? (b ? b.container = a : b = "string" == typeof a ? {
				container : a
			}
			 : a, c.extend(this, {
				container : ".slider",
				wrap : null,
				panel : null,
				trigger : null,
				activeTriggerCls : "sel",
				hasTrigger : !1,
				steps : 0,
				left : 0,
				visible : 1,
				margin : 0,
				curIndex : 0,
				duration : 300,
				loop : !1,
				play : !1,
				interval : 5e3,
				useTransform : e ? !0 : !1,
				lazy : ".lazyimg",
				lazyIndex : 1,
				callback : null,
				prev : null,
				next : null,
				activePnCls : "none"
			}, b), this.findEl() && this.init() && this.increaseEvent(), void 0) : null
	};
	c.extend(h.prototype, {
		reset : function (a) {
			c.extend(this, a || {}),
			this.init()
		},
		findEl : function () {
			var a = this.container = c(this.container);
			return a.length ? (this.wrap = this.wrap && a.find(this.wrap) || a.children().first(), this.wrap.length ? (this.panel = this.panel && a.find(this.panel) || this.wrap.children().first(), this.panel.length ? (this.panels = this.panel.children(), this.panels.length ? (this.trigger = this.trigger && a.find(this.trigger), this.prev = this.prev && a.find(this.prev), this.next = this.next && a.find(this.next), this) : (this.container.hide(), null)) : null) : null) : null
		},
		init : function () {
			var a = this.wrap,
			b = this.panel,
			c = this.panels,
			f = this.trigger,
			g = this.len = c.length,
			h = this.margin,
			i = 0,
			j = this.visible,
			k = this.useTransform = d ? this.useTransform : !1;
			this.steps = this.steps || a.width(),
			c.each(function (a, b) {
				i += b.offsetWidth
			}),
			h && "number" == typeof h && (i += (g - 1) * h, this.steps += h),
			j > 1 && (this.loop = !1);
			var l = this.left;
			l -= this.curIndex * this.steps,
			this.setCoord(b, l),
			k && (e && a.css({
					"-webkit-transform" : "translateZ(0)"
				}), b.css({
					"-webkit-backface-visibility" : "hidden"
				}));
			var m = this._pages = Math.ceil(g / j);
			if (this._minpage = 0, this._maxpage = this._pages - 1, this.loadImg(), this.updateArrow(), 1 >= m)
				return this.getImg(c[0]), f && f.hide(), null;
			if (this.loop) {
				b.append(c[0].cloneNode(!0));
				var n = c[g - 1].cloneNode(!0);
				b.append(n),
				this.getImg(n),
				n.style.cssText += "position:relative;left:" + -this.steps * (g + 2) + "px;",
				i += c[0].offsetWidth,
				i += c[g - 1].offsetWidth
			}
			if (b.css("width", i), f && f.length) {
				var o = "",
				p = f.children();
				if (!p.length) {
					for (var q = 0; m > q; q++)
						o += "<span" + (q == this.curIndex ? " class=" + this.activeTriggerCls : "") + "></span>";
					f.html(o)
				}
				this.triggers = f.children(),
				this.triggerSel = this.triggers[this.curIndex]
			} else
				this.hasTrigger = !1;
			return this
		},
		increaseEvent : function () {
			var a = this,
			b = a.wrap[0],
			d = a.prev,
			e = a.next,
			f = a.triggers;
			b.addEventListener && (b.addEventListener("touchstart", a, !1), b.addEventListener("touchmove", a, !1), b.addEventListener("touchend", a, !1), b.addEventListener("webkitTransitionEnd", a, !1), b.addEventListener("msTransitionEnd", a, !1), b.addEventListener("oTransitionEnd", a, !1), b.addEventListener("transitionend", a, !1)),
			a.play && a.begin(),
			d && d.length && d.on("click", function (b) {
				a.backward.call(a, b)
			}),
			e && e.length && e.on("click", function (b) {
				a.forward.call(a, b)
			}),
			a.hasTrigger && f && f.each(function (b, d) {
				c(d).on("click", function () {
					a.slideTo(b)
				})
			})
		},
		handleEvent : function (a) {
			switch (a.type) {
			case "touchstart":
				this.start(a);
				break;
			case "touchmove":
				this.move(a);
				break;
			case "touchend":
			case "touchcancel":
				this.end(a);
				break;
			case "webkitTransitionEnd":
			case "msTransitionEnd":
			case "oTransitionEnd":
			case "transitionend":
				this.transitionEnd(a)
			}
		},
		loadImg : function (a) {
			a = a || 0,
			a < this._minpage ? a = this._maxpage : a > this._maxpage && (a = this._minpage);
			var b = this.visible,
			c = this.lazyIndex - 1,
			d = c + a;
			if (!(d > this._maxpage)) {
				d += 1;
				var e = (a && c + a || a) * b,
				f = d * b,
				g = this.panels;
				f = Math.min(g.length, f);
				for (var h = e; f > h; h++)
					this.getImg(g[h])
			}
		},
		getImg : function (a) {
			if (a && (a = c(a), !a.attr("l"))) {
				var b = this,
				d = b.lazy,
				e = "img" + d;
				d = d.replace(/^\.|#/g, ""),
				a.find(e).each(function (a, b) {
					var e = c(b);
					src = e.attr("dataimg"),
					src && e.attr("src", src).removeAttr("dataimg").removeClass(d)
				}),
				a.attr("l", "1")
			}
		},
		start : function (a) {
			var b = a.touches[0];
			this._movestart = void 0,
			this._disX = 0,
			this._coord = {
				x : b.pageX,
				y : b.pageY
			}
		},
		move : function (a) {
			if (!(a.touches.length > 1 || a.scale && 1 !== a.scale)) {
				var b,
				c = a.touches[0],
				d = this._disX = c.pageX - this._coord.x,
				e = this.left;
				"undefined" == typeof this._movestart && (this._movestart = !!(this._movestart || Math.abs(d) < Math.abs(c.pageY - this._coord.y))),
				this._movestart || (a.preventDefault(), this.stop(), this.loop || (d /= !this.curIndex && d > 0 || this.curIndex == this._maxpage && 0 > d ? Math.abs(d) / this.steps + 1 : 1), b = e - this.curIndex * this.steps + d, this.setCoord(this.panel, b), this._disX = d)
			}
		},
		end : function (a) {
			if (!this._movestart) {
				var b = this._disX;
				-10 > b ? (a.preventDefault(), this.forward()) : b > 10 && (a.preventDefault(), this.backward()),
				b = null
			}
		},
		backward : function (a) {
			a && a.preventDefault && a.preventDefault();
			var b = this.curIndex,
			c = this._minpage;
			b -= 1,
			c > b && (b = this.loop ? c - 1 : c),
			this.slideTo(b),
			this.callback && this.callback(Math.max(b, c), -1)
		},
		forward : function (a) {
			a && a.preventDefault && a.preventDefault();
			var b = this.curIndex,
			c = this._maxpage;
			b += 1,
			b > c && (b = this.loop ? c + 1 : c),
			this.slideTo(b),
			this.callback && this.callback(Math.min(b, c), 1)
		},
		setCoord : function (a, b) {
			this.useTransform && a.css("-webkit-transform", f + b + "px,0" + g) || a.css("left", b)
		},
		slideTo : function (a, b) {
			a = a || 0,
			this.curIndex = a;
			var c = this.panel,
			d = c[0].style,
			e = this.left - a * this.steps;
			d.webkitTransitionDuration = d.MozTransitionDuration = d.msTransitionDuration = d.OTransitionDuration = d.transitionDuration = (b || this.duration) + "ms",
			this.setCoord(c, e),
			this.loadImg(a)
		},
		transitionEnd : function () {
			var a = this.panel,
			b = a[0].style,
			c = this.loop,
			d = this.curIndex;
			c && (d > this._maxpage ? this.curIndex = 0 : d < this._minpage && (this.curIndex = this._maxpage), this.setCoord(a, this.left - this.curIndex * this.steps)),
			c || d != this._maxpage ? this.begin() : (this.stop(), this.play = !1),
			this.update(),
			this.updateArrow(),
			b.webkitTransitionDuration = b.MozTransitionDuration = b.msTransitionDuration = b.OTransitionDuration = b.transitionDuration = 0
		},
		update : function () {
			var a = this.triggers,
			b = this.activeTriggerCls,
			c = this.curIndex;
			a && a[c] && (this.triggerSel && (this.triggerSel.className = ""), a[c].className = b, this.triggerSel = a[c])
		},
		updateArrow : function () {
			var a = this.prev,
			b = this.next;
			if (a && a.length && b && b.length && !this.loop) {
				var c = this.curIndex,
				d = this.activePnCls;
				0 >= c && a.addClass(d) || a.removeClass(d),
				c >= this._maxpage && b.addClass(d) || b.removeClass(d)
			}
		},
		begin : function () {
			var a = this;
			a.play && !a._playTimer && (a.stop(), a._playTimer = setInterval(function () {
						a.forward()
					}, a.interval))
		},
		stop : function () {
			var a = this;
			a.play && a._playTimer && (clearInterval(a._playTimer), a._playTimer = null)
		},
		destroy : function () {
			var a = this,
			b = a.wrap[0],
			d = a.prev,
			e = a.next,
			f = a.triggers;
			b.removeEventListener && (b.removeEventListener("touchstart", a, !1), b.removeEventListener("touchmove", a, !1), b.removeEventListener("touchend", a, !1), b.removeEventListener("webkitTransitionEnd", a, !1), b.removeEventListener("msTransitionEnd", a, !1), b.removeEventListener("oTransitionEnd", a, !1), b.removeEventListener("transitionend", a, !1)),
			d && d.length && d.off("click"),
			e && e.length && e.off("click"),
			a.hasTrigger && f && f.each(function (a, b) {
				c(b).off("click")
			})
		},
		attachTo : function (a, b) {
			return a = c(a),
			a.each(function (a, c) {
				c.getAttribute("l") || (c.setAttribute("l", !0), h.cache.push(new h(c, b)))
			})
		}
	}),
	h.cache = [],
	h.destroy = function () {
		var a = h.cache,
		b = a.length;
		if (!(1 > b)) {
			for (var c = 0; b > c; c++)
				a[c].destroy();
			h.cache = []
		}
	},
	b.Slider = h
}
//加载幻灯片数据
(window, window.lib || (window.lib = {})), function (a, b, c) {
	var g = {
		layout : function (a) {
			var c = "";
			return '<div id="first-view"><div class="sliderwrap"><ul>' + this.firstView(a) + '</ul></div><div class="indicator">' + this.indicator(a) + '</div></div>'
		},
		firstView : function (a) {
			var b = "";
			if (a && a.items && a.items.length)
				for (var c = 0; c < a.items.length; c++) {
					var d = a.items[c];
					b += '<li index="' + c + '" l="1"><a href="' + d.targetUrl + '"><img class="" src="' + d.imageUrl + '" height="100%"></a></li>';
				}
			return b
		},
		indicator : function (a) {
			var b = "";
			if (a && a.items && a.items.length)
				for (var c = 0; c < a.items.length; c++) {
					var d = a.items[c];
					c === 0 && (b += '<span class="cur"></span>'),b += '<span class=""></span>'
				}
			return b
		},
		sliderAuto : function() {
			new b.Slider($("#first-view"), {
				trigger : ".indicator",
				activeTriggerCls : "cur",
				play : !0,
				loop : !0
			})
		}
	};
	
	
	var d = {
		type : "GET",
		url : "getdata.php",
		timeout : 2e4,
		dataType : "json",
		success : function (a) {
			$("#guide").html(g.layout(a));
			g.sliderAuto();
		},
		error : function (a) {
			$("#guide").html("网络连接失败，请刷新页面重试");
		}
	};
	$.ajax(d);
}
//加载厂家数据
(window, window.lib || (window.lib = {})), function (a, b) {
	//加载选型页面
	var showp = {
		contShow : $("#elementTop"),
		swipeTabCont : $("#elementTopCont"),
		priceInfo : $("#priceInfo"),
		wrap : $("#wrap"),
		leftCate : $("#selection"),
		leftmask : $(".selmask"),
		left : -290,
		bodyH : $("#wrap").height(),
		init : function () {
			// var shp = this;
			// shp.contShow.find(".tab-2 li").each(function (b, c) {
				// $(c).click(function () {
					// $(this).addClass("cur").siblings().removeClass("cur"),
					// $("#elementCont-" + (b + 1)).show().siblings().hide(),
					// shp.refresh()
				// })
			// });
			$("#logo").on("click", function (e) {
				$(this).addClass("dq123-logo").removeClass("dq123-back").unbind("click"),
				showp.hideLeft()
			});
			//选项卡切换事件
			$("#myTab").find("li").each(function (b, c) {
				$(c).click(function () {
					$(this).addClass("active").removeClass("normal").siblings().addClass("normal").removeClass("active"),
					$("#myTab_Content" + b).show().siblings().hide()
				})
			});
		},
		showLeft : function (n) {
			//显示系列树和隐藏按钮
			var shp = this;
			//shp.contShow.find(".c-tcate-title").html(n + '-系列');
			$("#logo").addClass("dq123-back").removeClass("dq123-logo"),
			//shp.leftmask.show(),
			shp.leftCate.show(),
			shp.contShow.css({
				"-webkit-backface-visibility" : "hidden",
				"-webkit-prespective" : "1000",
				"-webkit-transform-style" : "preserve-3d",
				"width" : $(window).width()
			}),
			/*shp.wrap.css({
				"min-height" : shp.swipeTabCont.height()
			}),*/
			shp.leftCate.css({
				height : $(window).height() - $("#bar").height(),
				width : $(window).width(),
				top : shp.wrap.offset().top
			}),
			shp.priceInfo.css({
				height : $(window).height() - $("#bar").height() - $(".banners").height()
			}),
			shp.leftmask.css({
				top : shp.wrap.offset().top
			}),
			shp.translation(shp.contShow[0], {
				x : 0
			}, function () {
				shp.leftmask.css({
					height : shp.leftCate.height()
				})
			})
		},
		hideLeft : function () {
			var shp = this;
			shp.translation(shp.leftCate[0], {
				x : 280,
				duration : "0.4s"
			}, function () {
				shp.leftmask.hide(),
				shp.leftCate.hide(),
				//shp.wrap.attr("style", "position:relative"),
				shp.leftCate.attr("style", ""),
				shp.contShow.attr("style", ""),
				shp.onHide()
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
		},
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
		},
		onHide : function () {},
		onShow : function () {}
	};
	var se = {
		ShowElement : function(classid){
			//系列树页面滑动
			new b.ShowPrice(classid);
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
			var nameStr = mTree.getNodeName(setting, node),
			name = setting.view.nameIsHTML ? nameStr : nameStr.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
			html.push("<span id='", node.tId, consts.id.ICON,
				"' title='' treeNode", consts.id.ICON," class='", mTree.makeNodeIcoClass(setting, node),
				"' style='", mTree.makeNodeIcoStyle(setting, node), "'></span><span id='", node.tId, consts.id.SPAN,
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
			html.push("<a id='", node.tId, consts.id.A, "' class='", consts.className.LEVEL, node.level,"' treeNode", consts.id.A," onclick=\"", (node.click || ''),
				"\" ", ((url != null && url.length > 0) ? "href='" + url + "'" : ""), " target='",mTree.makeNodeTarget(node),"' style='", fontStyle.join(''),
				"'");
			if (tools.apply(setting.view.showTitle, [setting.treeId, node], setting.view.showTitle) && title) {html.push("title='", title.replace(/'/g,"&#39;").replace(/</g,'&lt;').replace(/>/g,'&gt;'),"'");}
			html.push(">");
		},
		makeNodeFontCss: function(setting, node) {
			var fontCss = tools.apply(setting.view.fontCss, [setting.treeId, node], setting.view.fontCss);
			return (fontCss && ((typeof fontCss) != "function")) ? fontCss : {};
		},
		makeNodeIcoClass: function(setting, node) {
			var icoCss = ["ico"];
			if (!node.isAjaxing) {
				icoCss[0] = (node.iconSkin ? node.iconSkin + "_" : "") + icoCss[0];
				if (node.isParent) {
					icoCss.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE);
				} else {
					icoCss.push(consts.folder.DOCU);
				}
			}
			return consts.className.BUTTON + " " + icoCss.join('_');
		},
		makeNodeIcoStyle: function(setting, node) {
			var icoStyle = [];
			if (!node.isAjaxing) {
				var icon = (node.isParent && node.iconOpen && node.iconClose) ? (node.open ? node.iconOpen : node.iconClose) : node.icon;
				if (icon) icoStyle.push("background:url(", icon, ") 0 0 no-repeat;");
				if (setting.view.showIcon == false || !tools.apply(setting.view.showIcon, [setting.treeId, node], true)) {
					icoStyle.push("width:0px;height:0px;");
				}
			}
			return icoStyle.join('');
		},
		makeNodeLineClass: function(setting, node) {
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
				lineClass.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE);
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
			html.push("<ul id='", node.tId, consts.id.UL, "' class='", consts.className.LEVEL, node.level, " ", mTree.makeUlLineClass(setting, node), "' style='display:", (node.open ? "block": "none"),"'>");
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
			if (n[childKey] && n[childKey].length > 0) {
				n.isParent = true;
				n.zAsync = true;
			} else {
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
			setting.treeObj.find("li a").each(function (b, c) {
				$(c).prev().click(function () {
					var p = $(this).parent();
					if(p.find("ul").size()>0){
						var plid=p.attr("id");
						if(p.find("ul").css("display") == "none"){
							p.find("ul").show();
							$("#"+plid+"_switch").removeClass("noline_close").addClass("noline_open");
							$("#mTree_"+plid+"_ico").removeClass("ico_close").addClass("ico_open");
						}
						else{
							p.find("ul").hide();
							$("#"+plid+"_switch").removeClass("noline_open").addClass("noline_close");
							$("#mTree_"+plid+"_ico").removeClass("ico_open").addClass("ico_close");
						}
					}
				});
				$(c).click(function () {
					var p = $(this).parent();
					if(p.find("ul").size()>0){
						var plid=p.attr("id");
						if(p.find("ul").css("display") == "none"){
							p.find("ul").show();
							$("#"+plid+"_switch").removeClass("noline_close").addClass("noline_open");
							$("#mTree_"+plid+"_ico").removeClass("ico_close").addClass("ico_open");
						}
						else{
							p.find("ul").hide();
							$("#"+plid+"_switch").removeClass("noline_open").addClass("noline_close");
							$("#mTree_"+plid+"_ico").removeClass("ico_open").addClass("ico_close");
						}
					}
					else{
						setting.treeObj.find("li a").removeClass("curSelectedNode");
						$(this).addClass("curSelectedNode");
						//获取系列id
						var classid=p.attr("cid");
						se.ShowElement(classid);
						//显示选型页面
						showp.init();
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
		left : -290,
		bodyH : $("#wrap").height(),
		init : function () {
			// var lcs = this;
			// lcs.contShow.find(".tab-2 li").each(function (b, c) {
				// $(c).click(function () {
					// $(this).addClass("cur").siblings().removeClass("cur"),
					// $("#swipeCont-" + (b + 1)).show().siblings().hide(),
					// lcs.refresh()
				// })
			// })
		},
		showLeft : function (n) {
			//显示系列树和隐藏按钮
			var lcs = this;
			lcs.contShow.find(".c-tcate-title").html(n + '-系列');
			lcs.leftmask.show(),
			lcs.leftCate.show(),
			lcs.contShow.css({
				"-webkit-backface-visibility" : "hidden",
				"-webkit-prespective" : "1000",
				"-webkit-transform-style" : "preserve-3d"
			}),
			/*lcs.wrap.css({
				"min-height" : lcs.swipeTabCont.height()
			}),*/
			lcs.leftCate.css({
				height : $(window).height() - $("#bar").height(),
				top : lcs.wrap.offset().top
			}),
			lcs.swipeTree.css({
				height : $(window).height() - $("#bar").height() - $(".c-tcate-title").height()
			}),
			lcs.leftmask.css({
				top : lcs.wrap.offset().top
			}),
			lcs.translation(lcs.contShow[0], {
				x : 0
			}, function () {
				lcs.leftmask.css({
					height : lcs.leftCate.height()
				})
			})
		},
		hideLeft : function () {
			var lcs = this;
			lcs.translation(lcs.leftCate[0], {
				x : 280,
				duration : "0.4s"
			}, function () {
				lcs.leftmask.hide(),
				lcs.leftCate.hide(),
				//lcs.wrap.attr("style", "position:relative"),
				lcs.leftCate.attr("style", ""),
				lcs.contShow.attr("style", ""),
				lcs.onHide()
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
		},
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
		},
		onHide : function () {},
		onShow : function () {}
	};
	/*var w = {
		swipemove : function(){
			//系列树页面滑动
			new b.Swipe($("#swipeTree"));
		}
	};*/
	var share = {
		prefacid : ''
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
				//显示loading
				$("#loading").show();
				var b = $(this),
				c = b.attr("data");
				//判断是都是字母行
				if(c.length>0){
					n = b.html();
					if(share.prefacid.length>0 && c==share.prefacid){
						lc.showLeft(n);
						$("#loading").hide();
					}
					else{
						//加载系列树
						var d = {
							type : "GET",
							url : "price/" + c + ".js",
							timeout : 2e4,
							dataType : "json",
							beforeSend : function(){
								//设置系列树形滑动回到原点
								//$("#swipeTree").children().css({'-webkit-transform':'translate3d(0px,0px,0px)'});	
								$("#mTree").empty();
								$("#mTree").html('<li>正在为您加载...</li>');
								lc.showLeft(n);
							},
							success : function (a) {
								mTree.init(a);
								lc.init();
								//系列页面滑动初始化
								/*w.swipemove();*/
								$("#loading").hide();
								share.prefacid=c;
							},
							complete : function(){
								$("#loading").hide();
							},
							error : function (a) {
								$("#factory").html("网络连接失败，请刷新页面重试");
								$("#loading").hide();
							}
						};
						$.ajax(d);
					}
				}
			});
			//排序侧边栏点击事件
			$("#sorter").on("click","li",function(e){
				var top,
				letter = $(this).find("span").html(),
				divider = $("#factory").find("li.light." + letter);

				if (divider.length > 0 && divider.html() == letter) {
					top = divider.offset().top - $("#wrap").offset().top + $("#wrap").scrollTop();
					$('#wrap').scrollTop(top);
				} else {
					return false;
				}
			});
		},
		firstView : function (a) {
			var b = "";
			var t = "";
			var s = "";
			if (a && a.length){
				for (var c = 0; c < a.length; c++) {
					if(c>1 && c<12){
						var d = a[c];
						if(d.open){
							//字母
							t += '<li class="light ' + d.name + '" data="">' + d.name + '</li>';
						}
						else{
							t += '<li data="' + d.fid + '">' + d.name + '</li>';
						}
					}
					else if(c>=12){
						var d = a[c];
						if(d.open){
							//字母
							b += '<li class="light ' + d.name + '" data="">' + d.name + '</li>';
							s += '<li class="ui-li-static"><span>' + d.name + '</span></li>';
						}
						else{
							b += '<li data="' + d.fid + '">' + d.name + '</li>';
						}
					}
				}
				$("#factory").html('<div class="rellkey"><ul>' + t + '</ul><ul id="alllist">' + b + '</ul></div>');
				$("#sorter").html('<ul class="ui-listview">' + s + '</ul>');
			}
		}
	};
	
	var d = {
		type : "GET",
		url : "price/factory.js",
		timeout : 2e4,
		dataType : "json",
		success : function (a) {
			//隐藏滚动条
			//$("html,body").css({'overflow':'hidden'});
			//加载系列树
			g.layout(a);
			$("#wrap").on("click", ".leftmask", function () {
				//$("html,body").css({'overflow':''});
				var a = $(this);
				a.hide(),
				lc.hideLeft()
			});
		},
		error : function (a) {
			$("#factory").html("网络连接失败，请刷新页面重试");
		}
	};
	$.ajax(d);
}
//绑定搜索事件
(window, window.lib || (window.lib = {})), function (a, b) {
	var search = {
		init : function () {
			var seri=$.trim($("#sb-text").val());
			var hidetext=$("#h-text").val();
			if(seri != hidetext){
				$("#r-content").html("");
				$("#h-text").val(seri);
				var mydate=new Date();
				$.ajax({
					type : "GET",
					url : "../price/getsearchclassjson.php?t="+mydate.getTime()+"&series="+encodeURIComponent(seri),
					timeout : 2e4,
					dataType : "json",
					beforeSend : function(){
						$("#r-content").empty();
						$("#r-content").html('正在为您加载...');
					},
					success : function (e) {
						if(e.Table.length==0){
							$("#r-content").html('<li>抱歉，在系列中没有找到与<strong>' + seri + '</strong>相关的结果。</li>');
						}
						else{
							var s = $("#r-content");
							s.empty();
							$.each(e.Table,function(i){
								var u = e.Table[i];
								$("<li/>").appendTo(s).html(u.F_Class_Name + ' --- ' + u.F_Manufacturer_Name).attr("data",u.F_Class_ID).click(function(){
									//搜索结果点击事件
									var classid=$(this).attr("data");
									alert(classid);
								});
							});
						}
						$("#loading").hide();
					},
					complete : function(){
						$("#loading").hide();
					},
					error : function (a) {
						$("#r-content").html("网络连接失败，请刷新页面重试");
						$("#loading").hide();
					}
				});
			}
			else{
				$("#loading").hide();
			}
		}
	}
	//搜索按钮绑定点击事件
	$("#sb-submit").on("click", function (e) {
		$("#loading").show(),
		$("#s-result").show(),
		$("#s-result").css({
			height : $(window).height() - $("#bar").height(),
			top : $("#wrap").offset().top
		}),
		$("#r-content").css({
			height : $(window).height() - $("#wrap").offset().top - $(".title-top").height()
		}),
		search.init();
	});
	$("#r-close").on("click", function (e) {
		$("#s-result").hide();
	});
}
//控制滚动条
(window, window.lib || (window.lib = {}), window.app || (window.app = {})), function (a, b){
	var s = {
		events : function () {
			$("#wrap").on("scroll", this._scrollEvent)
		},
		_scrollEvent : function () {
			var a = $(window).height();
			if($("#copyright").offset().top < a){
				$("#loadtip").hide();
				$("#alllist").show();
				$("#sorter").show();
				$("#wrap").off("scroll", this._scrollEvent);
			}
		}
	}
	if(document.body.scrollTop>0){
		$("#alllist").hide();
		$("#sorter").hide();
		(app&&app.scroll)? app.scroll.scrollTo(0):scroll(0,0);
	}
	s.events()
}

(window, window.lib || (window.lib = {}));
//加载footer
!function (a, b) {
	var c ='<footer class="footer c-footer "><section class="footer-t c-footer-t"><p class="user-info c-user-info">';
		c += '<span></span><span></span></p><p class="gotop c-gotop"><a id="J_GoTop">top<b> </b></a></p></section>';
		c += '<nav class="footer-l c-footer-l">';
		c += '<a href="http://www.dq123.com/price/index.php" target="_blank">电脑版</a>';
		c += '<a id="J_imgViewType" href="javascript:void(0)" class="J_dps" data-dps="hdedition%23h%23" style="display:none;"></a></nav>';
		c += '<p class="copyright c-copyright">&#169; 2014 沪ICP备05019069号</p></footer>';
	$("#copyright").html(c);
	$("#J_GoTop").on("click", function () {
		$('#wrap').scrollTop(0);
	})
}

(window, window.lib || (window.lib = {})), function (a, b, c) {
	$("#loading").hide();
}
(window, window.lib || (window.lib = {}), window.app || (window.app = {}));
