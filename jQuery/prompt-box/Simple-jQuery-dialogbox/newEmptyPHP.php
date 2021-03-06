<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>扁平简约风格jQuery对话框插件 gDialog</title>

        <link href="css/normalize.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="css/animate.min.css"/>
        <link rel="stylesheet" href="src/jquery.gDialog.css"/>

        <style>
            button { border:0;}
            .container { margin:50px auto; max-width:728px;text-align:center;font-family:Arial;}
            .btn {background-color:#ED5565; color:#fff; padding:20px; margin:10px 30px; border-radius:5px; border-bottom:3px solid #DA4453;}
        </style>

    </head>

    <body>

        <div class="container">
            <h1>jQuery gDialog Plugin Exampels</h1>
            <button class="btn demo-1">Alert Dialog Box</button>
            <button class="btn demo-2">Prompt Dialog Box</button>
            <button class="btn demo-3">Prompt Dialog Box</button>
        </div>

        <script type="text/javascript" src="../../jquery-1.11.3.js"></script>
        <script type="text/javascript" src="src/jquery.gDialog.min.js"></script>
        <script type="text/javascript">
            $('.demo-1').click(function () {
                $.gDialog.alert("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse libero erat, scelerisque sit amet dolor nec, euismod feugiat massa.", {
                    title: "Alert Dialog Box",
                    animateIn: "bounceIn",
                    animateOut: "bounceOut"
                });
            });
            $('.demo-2').click(function () {
                $.gDialog.prompt("Your website", "www.17sucai.com", {
                    title: "Prompt Dialog Box",
                    required: true,
                    animateIn: "rollIn",
                    animateOut: "rollOut"
                });
            });
            $('.demo-3').click(function () {
                $.gDialog.confirm("Are You Sure?", {
                    title: "Confirm Dialog Box",
                    animateIn: "bounceInDown",
                    animateOut: "bounceOutUp"
                });
            });
        </script>

    </body>
</html>
