<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <title>简单有效的多重css3漂亮下拉样式 -- demo2</title>
        <link rel="stylesheet" type="text/css" href="newCascadeStyleSheet.css" />
        <script src="js/modernizr.custom.63321.js"></script>
    </head>
    <body>
        <div class="fleft">
            <select id="cd-dropdown" class="cd-select">
                <option value="-1" selected>啊实打实所</option>
                <option value="1" class="icon-google-plus">Google Plus</option>
                <option value="2" class="icon-facebook">Facebook</option>
                <option value="3" class="icon-twitter">Twitter</option>
                <option value="4" class="icon-github">GitHub</option>


                <option value="1" class="icon-google-plus">Google Plus</option>
                <option value="2" class="icon-facebook">Facebook</option>
                <option value="3" class="icon-twitter">Twitter</option>
                <option value="4" class="icon-github">GitHub</option>
                <option value="1" class="icon-google-plus">Google Plus</option>
                <option value="2" class="icon-facebook">Facebook</option>
                <option value="3" class="icon-twitter">Twitter</option>
                <option value="4" class="icon-github">GitHub</option>
                <option value="1" class="icon-google-plus">Google Plus</option>
                <option value="2" class="icon-facebook">Facebook</option>
                <option value="3" class="icon-twitter">Twitter</option>
                <option value="4" class="icon-github">GitHub</option>
                <option value="1" class="icon-google-plus">Google Plus</option>
                <option value="2" class="icon-facebook">Facebook</option>
                <option value="3" class="icon-twitter">Twitter</option>
                <option value="4" class="icon-github">GitHub</option>

            </select>
        </div>
        <script src="js/jquery.min.js"></script>
        <script src="js/jquery.dropdown.js"></script>
        <script>
            $(function () {
                $('#cd-dropdown').dropdown({
                    gutter: 5,
                    delay: 10,
                    random: true
                });
            });
        </script>
    </body>
</html>
