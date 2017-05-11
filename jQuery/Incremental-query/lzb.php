<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <style>
            *{ margin:0; padding:0;}
            ul li{ list-style:none;}
            .dqn_find{ width:80%; margin-top:10px; padding-left:180px; overflow:hidden;}
            .dqn_find ul li{ width:680px; height:50px; background-color:#ff5d00; padding:1px;}
            .dqn_find ul li button{ 
                float:right; 
                width:111px; 
                text-align:center; 
                font-size:18px; 
                color:#fff; 
                line-height:50px;
                background-color:transparent;
                border:none;
                display:block; 
                cursor:pointer; 
                font-family:"Microsoft Yahei";
            }
            .dqn_find .dqn_finded{ 
                border-width:0px; 
                background:url(images/dqn_all.png) -155px 0 no-repeat #fff; 
                display:block; 
                color:#999; 
                font-size:16px; 
                line-height:50px; 
                height:50px; 
                width:530px; 
                padding-left:35px; 
                font-family:"Microsoft Yahei";
            }
        </style>
        <script type="text/javascript" src="../jquery-1.7.2.js"></script>
        <script type="text/javascript" >
            var lzbtimeout;

            //获取seriesDATA 缓存数据   把字符串转换成JSON对象  
            var seriesDATA = JSON.parse(localStorage.getItem("seriesDATA"));
            if (seriesDATA && seriesDATA != null) {
                setAutocompleteData(seriesDATA);
            } else {
                //设置 seriesDATA 缓存数据
                $.ajaxSettings.async = false;//同步
                $.getJSON("data/s.js", function (data) {
                    //将JSON对象转化成字符串  JSON.stringify(data);
                    localStorage.setItem('seriesDATA', JSON.stringify(data));
                    //把字符串转换成JSON对象
                    seriesDATA = JSON.parse(localStorage.getItem("seriesDATA"));
                    setAutocompleteData(seriesDATA);
                });

            }


            function setAutocompleteData(autocompleteData) {
                var setting = {
                    data: autocompleteData,
                    url: null,
                    cacheLength: 10, //缓存的长度.即缓存多少条记录.设成1为不缓存
                    matchContains: true, //决定比较时是否要在字符串内部查看匹配
                    matchCase: false, //是否开启大小写敏感
                    matchSubset: true, //是否启用缓存
                    max: 50, //下拉项目的个数
                    minChars: 1, //至少输入的字符数。
                    mustMatch: false, //如果设置为true,只会允许匹配的结果出现在输入框,当用户输入的是非法字符时,将被清除
                    formatMatch: function (row, rowNum, rowCount) {
                        return row.b;
                    },
                    formatResult: function (row, rowNum, rowCount) {
                        return row.b;
                    }
                };
                console.log(seriesDATA);
            }


            $(function () {
                $("#search_kw").keyup(function () {
                    if ($.trim($(this).val()) != "") {
                        clearTimeout(lzbtimeout);
                        lzbtimeout = setTimeout("getdatas('" + $(this).val() + "')", 500);
                    }
                });
            });
            //获取 搜索数据
            function getdatas(key) {
                console.log(key);
            }
        </script>
    </head>
    <body>
        <div class="dqn_find">
            <ul>
                <li>
                    <button id="search_btn">搜&nbsp;&nbsp;索</button>
                    <input type="text" id="search_kw" title="傻妞" class="dqn_finded"   onkeydown="if (event.keyCode == 13) {
                            }" onblur="if (this.value == '')
                                        value = '输型号…查价格';"onfocus="if (this.value == '输型号…查价格')
                                                    value = '';" value="输型号…查价格" />
                </li>
            </ul>
        </div>
    </body>
    <script type="text/javascript" >
        //手工  JS原生态
        //渐进式查询插件 
        function Autocomplete(setting) {
            //默认配置
            var c = {
                data: setting.data,
                url: setting.url,
                //缓存的长度.即缓存多少条记录.设成1为不缓存
                cacheLength: setting.cacheLength,
                //决定比较时是否要在字符串内部查看匹配
                matchContains: setting.matchContains,
                //是否开启大小写敏感
                matchCase: setting.matchCase,
                //是否启用缓存
                matchSubset: setting.matchSubset,
                //下拉项目的个数
                max: setting.max,
                //至少输入的字符数。
                minChars: setting.minChars,
                //如果设置为true,只会允许匹配的结果出现在输入框,当用户输入的是非法字符时,将被清除
                mustMatch: setting.mustMatch,
                formatMatch: setting.formatMatch,
                formatResult: setting.formatResult
            };

            //缓存数据
            var f = {};
            var d = 1;
            var h = function (l, k) {
                if (!c.matchCase) {
                    l = l.toLowerCase();
                }
                var j = l.indexOf(k);
                if (c.matchContains == "word") {
                    j = l.toLowerCase().search("\\b" + k.toLowerCase());
                }
                if (j == -1) {
                    return false;
                }
                return j == 0 || c.matchContains;
            };
            var g = function (j, i) {
                if (d > c.cacheLength) {
                    b();
                }
                if (!f[j]) {
                    d++;
                }
                f[j] = i;
            };
            var e = function () {
                if (!c.data) {
                    return false;
                }
                var k = {},
                        j = 0;
                if (!c.url) {
                    c.cacheLength = 1;
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
                        k[n] = [];
                    }
                    var q = {
                        value: o,
                        data: p,
                        result: c.formatResult && c.formatResult(p) || o
                    };
                    k[n].push(q);
                    if (j++ < c.max) {
                        k[""].push(q);
                    }
                }
                for (var r in k) {
                    c.cacheLength++;
                    g(r, k[r]);
                }
            };
            var b = function () {
                f = {};
                d = 0;
            };
            e();
            //搜索
            this.search = function (n) {
                n = n.toLowerCase();
                if (!c.cacheLength || !d) {
                    return null;
                }
                if (!c.url && c.matchContains) {
                    var m = [];
                    for (var j in f) {
                        if (j.length > 0 && m.length < c.max) {
                            var o = f[j];
                            for (var p in o) {
                                if (h(o[p].value, n)) {
                                    m.push(o[p]);
                                }
                            }
                        }
                    }
                    return m;
                } else {
                    if (f[n]) {
                        return f[n];
                    } else {
                        if (c.matchSubset) {
                            for (var l = n.length - 1; l >= c.minChars; l--) {
                                var o = f[n.substr(0, l)];
                                if (o) {
                                    var m = [];
                                    for (var p in o) {
                                        if (h(o[p].value, n)) {
                                            m[m.length] = o[p];
                                        }
                                    }
                                    return m;
                                }
                            }
                        }
                    }
                }
                return null;
            };
        }
    </script>
</html>

<!-- 
====================================================================================================================================
localStorage.setItem("key","value");//存储变量名为key，值为value的变量  
   
localStorage.key = "value"//存储变量名为key，值为value的变量  
   
localStorage.getItem("key");//获取存储的变量key的值www.it165.net  
   
localStorage.key;//获取存储的变量key的值  
   
localStorage.removeItem("key")//删除变量名为key的存储变量  
====================================================================================================================================
//以上即为localStorage调用的方法。下面介绍存储JSON对象的方法。  
var students =   
{  
    liyang:{name:"liyang",age:17},  
  
    lilei:{name:"lilei",age:18}  
  
}//要存储的JSON对象  
  
  
students = JSON.stringify(students);//将JSON对象转化成字符串  
  
localStorage.setItem("students",students);//用localStorage保存转化好的的字符串 
====================================================================================================================================
//上面即可保存JSON对象，接下来我们在要使用的时候再将存储好的students变量取回  
   
var students = localStorage.getItem("students");//取回students变量  
   
students = JSON.parse(students);//把字符串转换成JSON对象  
   
//以上即可得到存储的students的JSON对象了  
====================================================================================================================================
====================================================================================================================================
====================================================================================================================================
====================================================================================================================================

-->