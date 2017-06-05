<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>zxzxz</title>
        <style type="text/css">
            *{padding:0; margin:0;}
            body {background:#F5FAFD;padding:50px 0 0 0;}

            table{
                font-size:12px;  
                color:#666; 
                table-layout:fixed; 
                empty-cells:show; 
                border-collapse: collapse; 
                margin:0 auto; 
            } 
            td{
                height:30px; 
            }


            .Hidden_Layer_DIV {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url("../loadingIMG//hei.png") repeat;
                z-index: 111112;
            }
            .Hidden_Layer{
                z-index: 111113;
                display: none;
            }
            .Hidden_Layer .mvBox{height:15px; background:#F5FAFD url(images/test2.jpg) no-repeat left center; width:471px; position:relative; padding:0 30px; margin:0 auto;}
            .Hidden_Layer .mvBtn{position:absolute; left:50px; top:0;}
            .Hidden_Layer .mvTxt{height:50px; line-height:50px; width:531px; text-align:center; font-size:30px; color:#29B6FF; font-family:Arial; margin:0 auto;}
        </style>

        <script type="text/javascript" src="../../jquery-1.11.3.js"></script>

    </head>
    <body>
        <div class="Hidden_Layer_DIV"></div>
        <div class="Hidden_Layer">
            <div class="mvTxt">加载中<span class="mvSq">.</span><span class="mvSq">.</span><span class="mvSq">.</span></div>
            <div class="mvBox">
                <img class="mvBtn" src="images/test1.jpg" />
            </div>
        </div>
        <table id="t_data"></table>
        <div style="margin:0 auto;text-align: center;"> 
            <button id="ssa"  >获取数据</button>
        </div>

    </body>

    <script language="javascript">
        $(function () {

            Hidden_Layer_ON();
            getdata();
            function getdata() {
                $.ajax({
                    type: 'POST',
                    url: '../ajaxdata.php',
                    data: {
                    },
                    dataType: 'json',
                    success: function (json) {
                        var t_dataHTML = '';
                        if (json.length > 0) {
                            $.each(json, function (i, v) {
                                t_dataHTML += '<tr>';
                                t_dataHTML += '<td>' + v.name + '</td>';
                                t_dataHTML += '<td>' + v.age + '</td>';
                                t_dataHTML += '<td>' + v.hz + '</td>';
                                t_dataHTML += '</tr>';
                            });
                        } else {
                            t_dataHTML += '<tr>';
                            t_dataHTML += '<td>没数据</td>';
                            t_dataHTML += '</tr>';
                        }
                        $("#t_data").html(t_dataHTML);
                        Hidden_Layer_OFF();
                    },
                    error: function () {
                        console.log("网络连接飒飒 失败请重试！");
                    }
                });
            }


            $("#ssa").click(function () {
                Hidden_Layer_ON();
                getdata();
            });
        });
        function Hidden_Layer_ON() {
            $(".Hidden_Layer_DIV").show();
            $(".Hidden_Layer").show();
            var delVal = 50;
            function autoMove() {
                delVal++;
                if (delVal > 400) {
                    delVal = 50;
                }
                $(".mvBtn").css("left", delVal);
            }
            setInterval(autoMove, 8);
            var deNum = 0;
            function autoTsq() {
                $(".mvSq").css("color", "#F5FAFD");
                setTimeout(function () {
                    $(".mvSq").eq(0).css("color", "#29B6FF")
                }, 0);
                setTimeout(function () {
                    $(".mvSq").eq(1).css("color", "#29B6FF")
                }, 500);
                setTimeout(function () {
                    $(".mvSq").eq(2).css("color", "#29B6FF")
                }, 1000);
            }
            setInterval(autoTsq, 1500);
        }

        function Hidden_Layer_OFF() {
            $(".Hidden_Layer_DIV").hide();
            $(".Hidden_Layer").hide();
        }
    </script>
</html>