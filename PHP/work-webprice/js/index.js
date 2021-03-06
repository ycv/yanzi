//设置默认高度
(window, window.lib || (window.lib = {})), function (a, b, c) {
	$("#wrap").css({
		height : $(window).height() - $("#bar").height()
	})
}
//选型
(window, window.lib || (window.lib = {}));
!function (a, b) {
	var myScroll = {
		refreshP : function(){
			//重置选型页面区域大小
			b.myScroll.myPScroll.refresh();
		}
	};
	var priceinfo  = function (m,a, b){
		einfo.init(m,a,b);
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
		q_seled_attach_count : 0,
		stimeout : 5000,
		sendtimeout : 0
	};
	var einfo = {
		init : function(innermodel,classid,pclassid){
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
			sinfo.q_seled_attach_count = 0,
			//上级系列ID
			q_pclassid = pclassid;
			//初始化加载选型信息
			var mydate=new Date();
			$.getJSON("../price/getseriesfile.php?t="+mydate.getTime()+"&classid="+classid, function (cdata) {
				if(cdata>0){
					$.getJSON("price/classjson.js?t="+mydate.getTime(), function (data) {
						sinfo.q_class_json = data;
					});
					$.getJSON("price/param/"+classid+".js?t="+mydate.getTime(), function (data) {
						sinfo.q_series_json = data.SERIES_INFO,
						sinfo.q_proplist_json = data.PROPS_INFO,
						sinfo.q_complist_json = data.COMPS_INFO,
						sinfo.q_rellist_json = data.RELS_INFO,
						sinfo.q_mproplist_json = data.MPROPS_INFO,
						sinfo.q_comblist_json = data.ATTACH_INFO,
						einfo.showMainContent();
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
				var mydate=new Date();
				$.ajax({
					type : "POST",
					url : "../price/getelementinfojson.php?t="+mydate.getTime(),
					data : "classid="+sinfo.q_series_json.SeriesID+"&innermodel="+encodeURIComponent(n),
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
						//获取样本文件
						einfo.get_Samplefile(sinfo.q_series_json.FactoryID,q_pclassid,sinfo.q_element_json.F_Class_ID,sinfo.q_element_json.F_InnerModel);
						
						//定时发送询价单引用统计
						einfo.staticprice(sinfo.q_element_json.F_Product_ID);
						
						//隐藏loading
						$("#loading").hide();
						myScroll.refreshP();
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
				data : "classid="+sinfo.q_series_json.SeriesID+"&innermodel="+encodeURIComponent(u),
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
					//获取样本文件
					einfo.get_Samplefile(sinfo.q_series_json.FactoryID,q_pclassid,sinfo.q_element_json.F_Class_ID,sinfo.q_element_json.F_InnerModel);
					
					//定时发送询价单引用统计
					sinfo.sendtimeout = window.setTimeout(function (){
																$.ajax({
																	type : "POST",
																	url : "../price/getpraisemicmsg.php?t="+mydate.getTime(),
																	data : "praise=1&optype=1&productid="+sinfo.q_element_json.F_Product_ID,
																	async : true,
																	dataType : "text",
																	success : function (e) {
																		window.clearTimeout(sinfo.sendtimeout);
																	}
																});
															}, sinfo.stimeout);
						
					//隐藏loading
					$("#loading").hide();
					myScroll.refreshP();
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
							var h = " selected ";
							var f = 'ed';
							if (t.IsEnabled) {
								f = "";
							}
							if (!t.IsChecked) {
								h = "";
							}
							c = c + '<span name="epcomp_span" id="epcomp_span_' + t.CompId + '" class="chb_comp">';
							c = c + '<a href="javascript:;" class="attachChk' + f + h + '" data="' + t.TypeId + ',' + t.CompId + '" value="' + t.CompId + '"></a>';
							c = c + '<a href="javascript:;" class="attachA" data="' + t.CompId + ',0,true' + '">' + t.CompName + "</a></span>";
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
					a = a + '<tr><td align="center">' + d.CombName + e + '</td><td align="center">￥' + parseFloat(d.Price).toFixed(2) + '</td></tr>';
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
				l=$('<div class="cpic_rba"/>').html('<ul><li><span class="suptitle">'+d.F_Supplier_Name+'</span><span class="supprice">￥'+ct[0]+ct[1]+'</span></li><li><span>主体:'+(parseFloat(d.F_Discount)*100).toFixed(2).toString()+'%</span><span>附件:'+(parseFloat(d.F_Discount4Appendix)*100).toFixed(2).toString()+'%</span><span>节省:'+js.toString()+'</span></li><li><span>联系人:'+d.F_Contact+'</span><span>电话:<a class="telA" data="'+telarr[0].replace("-","")+'">'+telarr[0]+'</a>'+twostr+'</span><span><a class="smsA" data="'+telarr[0].replace("-","")+'"><span class="sms"></span></a></span></li><li><span>地址:'+d.F_ADDRESS+'</span><span>发布日期:'+dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+'</span></li></ul>');
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
						url = "sms:"+ tel +";body=" + bodystr;
					}
					else{
						url = "sms:"+ tel +"?body=" + bodystr;
					}
					location.href = url;
				})
			});
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
			
			//清除计时器
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
				timeout : 2e4,
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
				url : "../price/getsamplefile.php?t="+mydate.getTime(),
				data : "factoryid="+factoryid+"&preclassid="+preclassid+"&classid="+classid+"&innermode="+encodeURIComponent(innermode),
				timeout : 2e4,
				dataType : "json",
				success : function (e) {
					$("#samplelist").html('');
					if(e!=''){
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
				url : "../price/getpraisemicmsg.php?t="+mydate.getTime(),
				data : "praise=1&optype=1&productid="+pdtid,
				async : true,
				dataType : "text",
				success : function (e) {
					
				}
			});
		}
	};
	b.ShowPrice = priceinfo
}
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
					c === 0 ? b += '<span class="cur"></span>' : b += '<span class=""></span>';
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
	
	var myScroll = {
		refreshF : function(){
			//重置厂家页面区域大小
			b.myScroll.myFScroll.refresh();
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
			myScroll.refreshF();
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
		isVisible : false,
		contShow : $("#elementTop"),
		swipeTabCont : $("#elementTopCont"),
		priceInfo : $("#priceInfo"),
		wrap : $("#wrap"),
		leftCate : $("#selection"),
		leftmask : $(".selmask"),
		bodyH : $(window).height() - $("#bar").height(),
		bodyW : $(window).width(),
		init : function (fname,sname) {
			//加载厂家和系列名称
			$(".banners").html("<span id='factory-name'>" + fname + "</span> &gt;&gt; <span id='series-name'>" + sname + "</span>");
			//选项卡切换事件
			$("#myTab").find("li").each(function (b, c) {
				$(c).click(function () {
					$(this).addClass("active").removeClass("normal").siblings().addClass("normal").removeClass("active"),
					$("#myTab_Content" + b).show().siblings().hide(),
					myScroll.refreshP();
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
				width : shp.bodyW,
				top : $("#bar").height()
			}),
			shp.priceInfo.css({
				height : $(window).height() - $("#bar").height() - $(".banners").height()
			}),
			shp.leftmask.css({
				top : $("#bar").height()
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
				x : shp.bodyW,
				duration : "0.4s"
			}, function () {
				shp.leftmask.hide(),
				shp.leftCate.hide(),
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
	b.ShowEle = showp;
	var se = {
		ShowElement : function(innermodel,classid,pclassid){
			//系列树页面滑动
			new b.ShowPrice(innermodel,classid,pclassid);
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
						se.ShowElement('',classid,pclassid);
						var fname = $("#f-name").html();
						var sname = $(this).find(".ser-name").html();
						//初始化系列页面偏移量
						myScroll.PScrollToInit();
						//返回事件
						$("#elementgoback").off("click");
						$("#elementgoback").on("click", function () {
							showp.isVisible=false;
							showp.hideLeft(),
							$(".action_panels").hide();
						});
						//显示选型页面
						showp.isVisible=true;
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
		bodyH : $(window).height(),
		bodyW : $(window).width() - $("#logodiv").width(),
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
				"width" : lcs.bodyW
			}),
			lcs.leftCate.css({
				"width" : lcs.bodyW,
				"height" : lcs.bodyH,
				"top" : $("#bar").height()
			}),
			lcs.swipeTree.css({
				height : $(window).height() - $("#bar").height() - $("#f-title").height()
			}),
			lcs.leftmask.css({
				top : $("#bar").height()
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
				x : lcs.bodyW,
				duration : "0.4s"
			}, function () {
				lcs.leftmask.hide(),
				lcs.leftCate.hide(),
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
				c = b.attr("data");
				//判断是都是字母行
				if(c.length>0){
					//显示loading
					$("#loading").show();
					n = b.html();
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
							timeout : 2e4,
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
								$("#loading").hide();
								share.prefacid=c;
								myScroll.refreshS();
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
							if (d.n == 1) {
								t += '<li data="' + d.fid + '">' + d.name + '<span class="fnew"></span></li>';
							}
							else{
								t += '<li data="' + d.fid + '">' + d.name + '</li>';
							}
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
	
	var mydate=new Date();
	var d = {
		type : "GET",
		url : "price/factory.js?t="+mydate.getTime(),
		timeout : 2e4,
		dataType : "json",
		success : function (fdata) {
			//加载系列树
			b.FactoryJson = fdata;
			g.layout(fdata);
			$(".leftmask").on("click", function () {
				var a = $(this);
				a.hide(),
				lc.hideLeft()
			});
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
	var se = {
		ShowElement : function(innermodel,classid,pclassid){
			//系列树页面滑动
			new b.ShowPrice(innermodel,classid,pclassid);
		},
		InitElementPage : function(fname,sname){
			//返回事件
			$("#elementgoback").off("click");
			$("#elementgoback").on("click", function () {
				if(ssetting.isopen){
					switch(ssetting.goback){
						case 0:
							se.HideElementPage(),
							$(".action_panels").hide();
							search.showElement();
							break;
						case 1:
							se.HideElementPage(),
							$(".action_panels").hide();
							search.showSeries();
							break;
					}
				}
			});
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
		},
		ElementIsVisible : function(){
			return b.ShowEle.isVisible;
		}
	};


	//搜索元件------------------------------------------------------------------------------
	var sortJson = {
		init:function (arry, parm, sortby) {
			this.obj = arry,
			this.parm = parm,
			this.b = sortby;
		},

		sortarr:function () {
			var $this = this;
			var down = function (x, y) {
				return (eval("x." + $this.parm) > eval("y." + $this.parm)) ? -1 : 1;
			}//通过eval对json对象的键值传参
			var up = function (x, y) {
				return (eval("x." + $this.parm) < eval("y." + $this.parm)) ? -1 : 1;
			}
			if (this.b == "down") {
				this.obj.sort(down);
			}
			else {
				this.obj.sort(up);
			}
		}
	};
	var ssetting ={
		dtype:'',
		sortkey:'',
		sortrule:true,
		mfname:'',
		mfother:' ',
		epageindex:1,
		spageindex:1,
		brandOpen : false,
		stypeOpen : false,
		sortArr : [],
		timeout : 0,
		goback : -1,
		isopen : false,
		option : 0
	};
	var search = {
		initElement : function (initscroll) {
			//初始化元件搜索
			search.closeMask();
			var modstr=$.trim($("#s-text").val());
			var dtype=ssetting.dtype;
			var mfname=ssetting.mfname;
			if (modstr.length > 0 && modstr != '输型号...查价格') {
				if(initscroll){
					$("#e-content").html("");
					ssetting.epageindex=1;
					ssetting.sortArr.length=0;
				}
				else{
					ssetting.epageindex++;
				}
				$("#s-text").val(modstr);
				var mydate=new Date();
				$.ajax({
					type : "GET",
					url : "../price/getpriceelesearchjson.php?t="+mydate.getTime()+"&modstr="+encodeURIComponent(modstr)+"&dtype="+dtype+"&mfname="+encodeURIComponent(mfname)+"&pageindex="+ssetting.epageindex,
					timeout : 2e4,
					dataType : "json",
					beforeSend : function(){
						if(initscroll){
							$("#e-content").empty();
						}
					},
					success : function (e) {
						if(e==null || e.Table.length==0){
							if(initscroll){
								$("#epullUp").hide();
								$("#e-content").empty();
								$("#e-content").html('<span style="margin-left:43px;">很抱歉，没有找到与<strong>' + modstr + '...</strong>相符的元件。</span>');
							}
						}
						else{
							$("#brand").off("click");
							$("#brand").on("click", function () {
								if (ssetting.brandOpen) {
									search.closeMask()
								} else {
									search.openMask()
								}
							});
							//统计数据
							$("#daydata").unbind("click");
							if(e.T_Count2[1].Count>0){
								$("#daydata").html(e.T_Count2[1].Count).click(function(){
									//加载天下数据参数=1
									ssetting.dtype=1;
									ssetting.mfname='';
									search.sortHide();
									search.showElement();
								});
							}
							else{
								$("#daydata").html('');
							}
							$("#ugcdata").unbind("click");
							if(e.T_Count2[2].Count>0){
								$("#ugcdata").html(e.T_Count2[2].Count).click(function(){
									//加载UGC数据参数=2
									ssetting.dtype=2;
									ssetting.mfname='';
									search.sortHide();
									search.showElement();
								});
							}
							else{
								$("#ugcdata").html('');
							}
							$("#countdata").unbind("click");
							if(e.T_Count[0].Count>0){
								$("#countdata").html(e.T_Count[0].Count).click(function(){
									//加载全部数据参数为空
									ssetting.dtype='';
									ssetting.mfname='';
									search.sortHide();
									search.showElement();
								});
							}
							else{
								$("#countdata").html('');
							}
							//显示元件列表
							search.showElementList(false,e.Table);
							
							//排序事件
							$("#sales-model").off("click");
							$("#sales-model").on("click", function () {
								//型号排序
								search.sortShow(this);
								ssetting.sortkey="F_Model";
								search.showElementList(true,ssetting.sortArr);
							});
							$("#sales-price").off("click");
							$("#sales-price").on("click", function () {
								//价格排序
								search.sortShow(this);
								ssetting.sortkey="F_Price";
								search.showElementList(true,ssetting.sortArr);
							});
							//读取过滤厂家
							if(ssetting.mfname.length==0){
								var ff = $("#factoryfilter");
								ff.empty();
								$("<li/>").appendTo(ff).html("不限").click(function(){
									//厂家查询
									ssetting.mfname='';
									search.sortHide();
									search.showElement();
								});
								if(e.T_ManufacturerName){
									var sarray=new Array();
									$.each(e.T_ManufacturerName,function(i){
										var f = e.T_ManufacturerName[i];
										if($.inArray(f.F_ManufacturerName, sarray) == -1){
											sarray.push(f.F_ManufacturerName);
											var fid=search.getFactoryID(f.F_ManufacturerName);
											if(fid.length>0){
												$("<li/>").appendTo(ff).html(f.F_ManufacturerName).click(function(){
													//厂家查询
													ssetting.mfname=$(this).html();
													ssetting.dtype='';
													search.sortHide();
													search.showElement();
												});
											}
											else{
												ssetting.mfother=ssetting.mfother+'∪'+f.F_ManufacturerName;
											}
										}
									});
								}
								$("<li/>").appendTo(ff).html("其他").click(function(){
									//其他查询
									ssetting.mfname=ssetting.mfother;
									ssetting.dtype='';
									search.sortHide();
									search.showElement();
								});
							}
							$("#epullUp").show();
						}
						
						$("#loading").hide();
						myScroll.refreshE();
						if(initscroll){
							myScroll.EScrollToInit();
						}
					},
					complete : function(){
						$("#loading").hide();
					},
					error : function (a) {
						if(initscroll){
							$("#e-content").empty();
							$("#e-content").html("网络连接失败，请刷新页面重试");
						}
						$("#loading").hide();
					}
				});
			}
			else{
				$("#sresult").hide()
				$("#loading").hide();
				$("#s-text").focus()
				alert("请输入元件型号!");
			}
		},
		showElementList : function(issort,e){
			//排序
			if(ssetting.sortkey.length>0){
				$("#e-content").empty();
				//下一页先加入，后排序
				if(!issort){
					$.each(e,function(i){
						var u = e[i];
						ssetting.sortArr.push(u);
					});
				}
				sortJson.init(ssetting.sortArr, ssetting.sortkey, ssetting.sortrule?"up":"down");
				sortJson.sortarr();
				//显示元件列表
				$.each(ssetting.sortArr,function(i){
					var u = ssetting.sortArr[i];
					search.showElementHtml(u);
				});
			}
			else{
				$.each(e,function(i){
					var u = e[i];
					search.showElementHtml(u);
					ssetting.sortArr.push(u);
				});
			}
		},
		showElementHtml : function(u){
			//显示元件列表html
			var s = $("#e-content");
			var usecount=0;
			if(u.F_UseCount!=null){
				usecount=u.F_UseCount;
			}
			if(u.F_type==2){
				//UGC数据
				$("<div/>").unbind("click");
				$("<div/>").appendTo(s).html('<div><span class="model bluec">'+u.F_Model+'</span><span class="pricetip bluec">表价</span><div class="clear"></div></div><div><span class="categ">'+u.F_CategoryName+'</span><span class="price bluec">￥<b>'+parseFloat(u.F_Price).toFixed(2)+'</b></span><div class="clear"></div></div><div><span class="brand bluec">'+u.F_ManufacturerName+'</span><span class="findsel">(<b>'+usecount+'</b>次查看)</span><div class="clear"></div></div>').attr("class","elelist").attr("cid",u.F_Class_ID).attr("data",u.F_InnerModel).attr("fname",u.F_ManufacturerName).attr("sname",u.F_ClassName);
			}
			else{
				$("<div/>").unbind("click");
				$("<div/>").appendTo(s).html('<div><span class="model">'+u.F_Model+'</span><span class="pricetip">表价</span><div class="clear"></div></div><div><span class="categ">'+u.F_CategoryName+'</span><span class="price">￥<b>'+parseFloat(u.F_Price).toFixed(2)+'</b></span><div class="clear"></div></div><div><span class="brand">'+u.F_ManufacturerName+'</span><span class="findsel">(<b>'+usecount+'</b>次查看)</span><div class="clear"></div></div>').attr("class","elelist").attr("cid",u.F_Class_ID).attr("data",u.F_InnerModel).attr("fname",u.F_ManufacturerName).attr("sname",u.F_ClassName).click(function(){
					//元件搜索结果点击事件
					ssetting.isopen=true;
					ssetting.goback=0;
					$("#loading").show();
					var model=$(this).attr("data");
					var classid=$(this).attr("cid");
					search.hideElement();
					se.ShowElement(model,classid,'');
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
				if (n != null && f[e].s == n) {
					d=f[e].fid;
				}
			});
			return d;
		},
		sortShow : function (c){
			$(".search-tab li").removeClass("rowsort");
			$(".search-tab li").find("a").removeClass("active");
			$(".search-tab li").removeClass("active");
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
			$(".search-tab li").removeClass("rowsort");
			$(".search-tab li").find("a").removeClass("active");
			$(".search-tab li").removeClass("active");
		},
		closeMask : function () {
			$("#brand-menu").removeClass("show");
			$("#brand-menu").hide();
			$("#brand-mask").css({
				height : "0px;",
				"margin-top" : "0px;"
			});
			ssetting.brandOpen = false;
		},
		openMask : function () {
			$("#brand").addClass("active");
			$("#brand-menu").addClass("show");
			$("#brand-menu").show();
			$("#brand-mask").css({
				height : $("#sresult").height()-$("#brand-menu").height()-$(".downmenu").height(),
				top : "0px"
			});
			ssetting.brandOpen = true;
		},
		stcloseMask : function () {
			$("#se-menu").removeClass("barmask-open");
			$("#logodiv").find("a").removeClass("more-open");
			ssetting.stypeOpen = false;
		},
		stopenMask : function () {
			$("#logodiv").find("a").addClass("more-open");
			$("#se-menu").addClass("barmask-open");
			ssetting.stypeOpen = true;
		},
		showElement : function (){
			//显示元件搜索页面
			if(se.ElementIsVisible()){
				ssetting.isopen=true;
			}
			//隐藏选型页面
			se.HideElementPage();
			//返回事件
			$("#searchgoback").off("click");
			$("#searchgoback").on("click", function () {
				search.hideElement();
			});
			var windowH = $(window).height();
			$("#epullUp").hide();
			
			$("#searchele").css({
				height : windowH - $("#bar").height() - $("#e-title").height()
			});
			$("#sresult").show(),
			$("#erTop").show(),
			$("#erTop").css({
				"-webkit-backface-visibility" : "hidden",
				"-webkit-prespective" : "1000",
				"-webkit-transform-style" : "preserve-3d",
				"width" : $(window).width()
			}),
			$("#sresult").css({
				height : windowH - $("#bar").height(),
				width : $(window).width(),
				top : $("#bar").height()
			}),
			search.translation($("#erTop")[0], {
				x : 0
			}, function () {
				
			});
		},
		hideElement : function () {
			//隐藏元件搜索页面
			if(ssetting.isopen){
				se.ShowElementPage();
			}
			search.translation($("#erTop")[0], {
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
			var seri=$.trim($("#s-text").val());
			if (seri.length > 0 && seri != '查系列') {
				if(initscroll){
					$("#s-content").html("");
					ssetting.spageindex=1;
				}
				else{
					ssetting.spageindex++;
				}
				$("#s-text").val(seri);
				var mydate=new Date();
				$.ajax({
					type : "GET",
					url : "../price/getsearchclassjson.php?t="+mydate.getTime()+"&series="+encodeURIComponent(seri)+"&pageindex="+ssetting.spageindex,
					timeout : 2e4,
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
								$("#s-content").html('<span style="margin-left:43px;">很抱歉，在系列中没有找到与<strong>' + seri + '</strong>相关的结果。</span>');
							}
						}
						else{
							var s = $("#s-content");
							s.empty();
							$.each(e.Table,function(i){
								var u = e.Table[i];
								$("<div/>").appendTo(s).html('<span class="serioc">'+u.F_Class_Name + ' --- ' + u.F_Manufacturer_Name+'</span>').attr("class","serlist").attr("data",u.F_Class_ID).attr("fname",u.F_Manufacturer_Name).attr("sname",u.F_Class_Name).click(function(){
									//系列搜索结果点击事件
									ssetting.isopen=true;
									ssetting.goback=1;
									$("#loading").show();
									var classid=$(this).attr("data");
									search.hideSeries();
									se.ShowElement('',classid,'');
									var fname = $(this).attr("fname");
									var sname = $(this).attr("sname");
									//显示选型页面
									se.InitElementPage(fname,sname);
									se.ShowElementPage();
								});
							});
						}
						$("#loading").hide();
						myScroll.refreshC();
						if(initscroll){
							myScroll.CScrollToInit();
						}
					},
					complete : function(){
						$("#loading").hide();
					},
					error : function (a) {
						if(initscroll){
							$("#s-content").empty();
							$("#s-content").html("网络连接失败，请刷新页面重试");
						}
						$("#loading").hide();
					}
				});
			}
			else{
				$("#s-result").hide()
				$("#loading").hide();
				$("#s-text").focus()
				alert("请输入系列名称!");
			}
		},
		showSeries : function (){
			//显示系列搜索页面
			if(se.ElementIsVisible()){
				ssetting.isopen=true;
			}
			//隐藏选型页面
			se.HideElementPage();
			//返回事件
			$("#searchgoback").off("click");
			$("#searchgoback").on("click", function () {
				search.hideSeries();
			});
			var windowH = $(window).height();
			$("#spullUp").hide();
			
			$("#searchser").css({
				height : windowH - $("#bar").height() - $("#s-title").height()
			});
			$("#sresult").show(),
			$("#srTop").show(),
			$("#srTop").css({
				"-webkit-backface-visibility" : "hidden",
				"-webkit-prespective" : "1000",
				"-webkit-transform-style" : "preserve-3d",
				"width" : $(window).width()
			}),
			$("#sresult").css({
				height : windowH - $("#bar").height(),
				width : $(window).width(),
				top : $("#bar").height()
			}),
			search.translation($("#srTop")[0], {
				x : 0
			}, function () {
				
			});
		},
		hideSeries : function (){
			//隐藏系列搜索页面
			if(ssetting.isopen){
				se.ShowElementPage();
			}
			search.translation($("#srTop")[0], {
				x : $(window).width(),
				duration : "0.4s"
			}, function () {
				$("#srTop").hide(),
				$("#srTop").attr("style", ""),
				$("#sresult").attr("style", "");
			});
		},
		setInputStatus : function() {
			var key = $("#s-text").val(),
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
	
	b.Search=search;
	
	//搜索按钮绑定点击事件
	$("#se-submit").on("click", function (e) {
		if(ssetting.option=="0"){
			//加载元件全部数据参数为空
			$("#loading").show(),
			$("#erTop").show(),
			ssetting.mfname='',
			search.sortHide(),
			search.showElement(),
			search.initElement(true);
		}
		else if(ssetting.option=="1"){
			//加载系列数据
			$("#loading").show(),
			$("#srTop").show(),
			search.showSeries();
			search.initSeries(true);
		}
	});
	//手机键盘前往按键事件
	$("#s-text").on("keydown", function (e) {
		if (e.keyCode == 13) {
			if(ssetting.option=="0"){
				$("#loading").show(),
				$("#erTop").show(),
				ssetting.mfname='',
				search.sortHide(),
				search.showElement(),
				search.initElement(true);
			}
			else if(ssetting.option=="1"){
				//加载系列数据
				$("#loading").show(),
				$("#srTop").show(),
				search.showSeries();
				search.initSeries(true);
			}
		}
	});
	
	//搜索选项开关
	$("#logodiv").on("click", function (e) {
		if (ssetting.stypeOpen) {
			search.stcloseMask();
		} else {
			search.stopenMask();
		}
		
	});
	//关闭搜索选项
	$("#se-menu-close").on("click", function (e) {
		search.stcloseMask();
	});
	

	//输入框内容清除
	$("#s-text").bind("blur", function () {
		var $this = $(this),
		$thisVal = $.trim($this.val());
		if ($thisVal !== '') {
			return;
		}
		else{
			switch(ssetting.option){
				case "0":
					$(this).val("输型号...查价格");
					break;
				case "1":
					$(this).val("查系列");
					break;
				case "2":
					$(this).val("搜品牌");
					break;
			}
		}
	}).bind("focus", function () {
		var $this = $(this),
		$thisVal = $.trim($this.val());
		if(ssetting.option=="0"){
			if ($thisVal !== ''&&$thisVal=='输型号...查价格') {
				$(this).val("");
			}
			else{
				$(this).val("输型号...查价格");
			}
		}
		else if(ssetting.option=="1"){
			if ($thisVal !== ''&&$thisVal=='查系列') {
				$(this).val("");
			}
			else{
				$(this).val("查系列");
			}
		}
		else{
			if ($thisVal !== ''&&$thisVal=='搜品牌') {
				$(this).val("");
			}
			else{
				$(this).val("搜品牌");
			}
		}
	}).bind("input", search.setInputStatus);
	
	//搜索选项切换
	$(".block-group").find("a").on("click", function (e) {
		search.hideElement();
		search.hideSeries();
		var option=$(this).attr("data-index");
		ssetting.option=option;
		switch(option){
			case "0":
				$("#searchtip").html("元件");
				$("#s-text").val("输型号...查价格");
				break;
			case "1":
				$("#searchtip").html("系列");
				$("#s-text").val("查系列");
				break;
			case "2":
				$("#searchtip").html("品牌");
				$("#s-text").val("搜品牌");
				break;
		}
		search.stcloseMask();
	});
	//清空输入框
	$(".btn-reset").on("click", function (e) {
		$("#s-text").val("");
		$("#s-text").focus();
		search.setInputStatus();
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
		}
	};
	var myScroll = {
		myFScroll : null,
		mySScroll : null,
		myPScroll : null,
		myCScroll : null,
		myEScroll : null,
		isShowSort : true
	};
	myScroll.myFScroll = new iScroll('wrap',{
		onScrollEnd : function(){
			//在滚动完成后的回调事件
			if(myScroll.isShowSort){
				if (this.y < -200){
					myScroll.isShowSort = false;
					$("#sorter").show();
					var vtop = parseInt(($(window).height() - $("#sorter").height()) / 2);
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
	myScroll.mySScroll = new iScroll('swipeTree');
	myScroll.myPScroll = new iScroll('priceInfo',{
		onBeforeScrollStart : function(e){
			//开始滚动前的事件回调,默认是阻止浏览器默认行为
			var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase():(e.target ? e.target.nodeName.toLowerCase():'');
			if(nodeType !='input'&& nodeType!='a') {
				e.preventDefault();
		   }
		}
	});
	//元件搜索列表滚动加载、刷新
	var pullUpEl = $("#epullUp");	
	//pullUpOffset = 23;
	myScroll.myEScroll = new iScroll('searchele',{hScroll:false,useTransition: true,topOffset:0,
		onRefresh: function () {
			if (pullUpEl.hasClass('loading')) {
				pullUpEl.removeClass('loading flip');
				pullUpEl.find('.pullUpLabel').html('向上滑动加载更多...');
			}
		},
		onScrollMove: function () {
			if (this.y < (this.maxScrollY - 20) && !pullUpEl.hasClass('flip')) {
				pullUpEl.addClass('flip');
				pullUpEl.find('.pullUpLabel').html('释放加载下一页...');
				//this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 20) && pullUpEl.hasClass('flip')) {
				pullUpEl.removeClass('loading flip');
				pullUpEl.find('.pullUpLabel').html('向上滑动加载更多...');
				//this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullUpEl.hasClass('flip')) {
				pullUpEl.addClass('loading');
				pullUpEl.find('.pullUpLabel').html('Loading...');			
				Search.initElement(false);
			}
		}
	});
	//系列搜索列表滚动加载、刷新
	var pullUpSe = $("#spullUp");	
	//pullUpOffset = 23;
	myScroll.myCScroll = new iScroll('searchser',{hScroll:false,useTransition: true,topOffset:0,
		onRefresh: function () {
			if (pullUpSe.hasClass('loading')) {
				pullUpSe.removeClass('loading flip');
				pullUpSe.find('.pullUpLabel').html('向上滑动加载更多...');
			}
		},
		onScrollMove: function () {
			if (this.y < (this.maxScrollY - 20) && !pullUpSe.hasClass('flip')) {
				pullUpSe.addClass('flip');
				pullUpSe.find('.pullUpLabel').html('释放加载下一页...');
				//this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 20) && pullUpSe.hasClass('flip')) {
				pullUpSe.removeClass('loading flip');
				pullUpSe.find('.pullUpLabel').html('向上滑动加载更多...');
				//this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullUpSe.hasClass('flip')) {
				pullUpSe.addClass('loading');
				pullUpSe.find('.pullUpLabel').html('Loading...');			
				Search.initSeries(false);
			}
		}
	});
	myScroll.loaded = function (){
		myScroll.myFScroll;
		myScroll.mySScroll;
		myScroll.myPScroll;
		myScroll.myCScroll;
		myScroll.myEScroll;
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
		var scrollH = "-" + $(".scroller").height();
		myScroll.myFScroll.scrollTo(0, scrollH, 200, true);
	})
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
				timeout : 2e4,
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
				alert(2);
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
