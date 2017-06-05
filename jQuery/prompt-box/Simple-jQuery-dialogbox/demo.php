<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>扁平简约风格jQuery对话框插件 gDialog</title>

        <link rel="stylesheet" href="css/animate.min.css"/>
        <link rel="stylesheet" href="src/jquery.gDialog.css"/>

        <style>
            button { border:0;}
        </style>

    </head>

    <body>
        <input hidden2 value="" name="prompt_VAL"/>

        <button class="  demo-1">Alert Dialog Box</button>
        <button class="  demo-2">Prompt Dialog Box</button>
        <button class="  demo-3">Prompt Dialog Box</button>

        <script type="text/javascript" src="../../jquery-1.11.3.js"></script>
        <script type="text/javascript" src="src/jquery.gDialog.js"></script>
        <script type="text/javascript">
            $('.demo-1').click(function () {
                $.gDialog.alert("2222222222222.", {
                    title: "111",
                    animateIn: "bounceIn",
                    animateOut: "bounceOut"
                });
            });
            $('.demo-2').click(function () {
                $.gDialog.prompt("Your website", "asdcom", {
                    title: "Prompt Dialog Box",
                    required: true,
                    animateIn: "rollIn",
                    animateOut: "rollOut"
                });
            });

            function promptEvent_T(v) {
                $("input[name='prompt_VAL']").val(v);
                console.log("22");
                console.log(v);
            }
            function promptEvent_F() {
                console.log("11");
            }

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
