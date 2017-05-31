<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>jQuery弹出层页面分享插件 - 站长素材</title>
        <link href="css/share.css" rel="stylesheet" type="text/css">
    </head>
    <body>
    <center>
        <a href="javascript:void(0)" class="sharecc"><img src="images/share-ico.png"/></a>
        <script src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" src="js/lzbshare.js"></script>
        <script  type="text/javascript">
            $('.sharecc').shareConfig({
                Shade: true, //是否显示遮罩层
                Event: 'click', //触发事件
                Content: 'Share', //内容DIV ID
                Title: '选择性别' //显示标题
            });
            function setsex(k) {
                console.log("ss" + k);
            }
        </script>
    </center>
</body>
</html>
