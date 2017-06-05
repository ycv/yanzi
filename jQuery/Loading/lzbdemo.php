<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>jQuery制作Loading动画特效</title>
        <style type="text/css">
            *{padding:0; margin:0;}
            body {background:#F5FAFD;}
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
                background: url("loadingIMG/hei.png") repeat;
                z-index: 111112;
            }
            .Hidden_Layer_IMG {
                display: none;
                width: 300px;
                padding: 20px;
                position: fixed;
                top: 45%;
                left: 0;
                right: 0;
                z-index: 111113;
                -moz-border-radius: 20px;
                -webkit-border-radius: 20px;
                border-radius: 20px;
                margin:0 auto;
            }
        </style>
        <script type="text/javascript" src="../jquery-1.11.3.js"></script>
    </head>
    <body>
        <div class="Hidden_Layer_DIV"></div>
        <div class="Hidden_Layer_IMG"><img src="loadingIMG/loading.gif" style="width:100%;height: 100%;"/></div>



        <div>
        </div>
        <table id="t_data"></table>

        <div style="margin:0 auto;text-align: center;"> 
            <button id="ssa"  >获取数据</button>
        </div>
    </body>

    <script language="javascript">
        $(function () {
            getdata();
            Hidden_Layer_ON();
            function getdata() {
                $.ajax({
                    type: 'POST',
                    url: './ajaxdata.php',
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
                        Hidden_Layer_OFF();
                        t_dataHTML = "网络连接飒飒 失败请重试！";
                        $("#t_data").html(t_dataHTML);
                        console.log(t_dataHTML);
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
            $(".Hidden_Layer_IMG").show();
        }
        function Hidden_Layer_OFF() {
            $(".Hidden_Layer_DIV").hide();
            $(".Hidden_Layer_IMG").hide();
        }
    </script>
</html>