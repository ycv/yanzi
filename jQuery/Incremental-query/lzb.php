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
            .dqn_finded{ 
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

            //获取seriesDATA 缓存数据
            var seriesDATA = localStorage.getItem("seriesDATA");
            if (seriesDATA && seriesDATA != null) {
            } else {
                //设置 seriesDATA 缓存数据
                $.getJSON("data/s.js", function (data) {
                    //JSON.stringify(data);
                    localStorage.setItem('seriesDATA', JSON.stringify(data));
                    seriesDATA = localStorage.getItem("seriesDATA");
                });
            }



            $(function () {
                $("#search_kw").keyup(function () {
                    if ($.trim($(this).val()) != "") {
                        clearTimeout(lzbtimeout);
                        lzbtimeout = setTimeout("getdatas('" + $(this).val() + "')", 500);
                    }
                });
            });
            function getdatas(key) {
                console.log(key);
//                console.log(JSON.parse(seriesDATA));
            }
        </script>
    </head>
    <body>
        <div class="dqn_find">
            <ul>
                <li>
                    <button id="search_btn">搜&nbsp;&nbsp;索</button>
                    <input type="text" id="search_kw" title="222233" class="dqn_finded"   onkeydown="if (event.keyCode == 13) {
                            }" onblur="if (this.value == '')
                                        value = '输型号…查价格';" onfocus="if (this.value == '输型号…查价格')
                                                    value = '';"   value="输型号…查价格" />
                </li>
            </ul>
        </div>
    </body>
</html>