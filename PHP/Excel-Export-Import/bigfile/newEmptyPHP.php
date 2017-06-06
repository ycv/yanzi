<script src="../../../jQuery/jquery-1.11.0.js" type="text/javascript"></script>
<script type="text/javascript">

    function getSelectP() {
        getSelectVal($("#bigname").val());
    }
    function getSelectVal(areaId) {
        $.getJSON("bigfile.php", {bigname: areaId}, function (json) {
            if (json.retval) {
                var smallname = $("#smallname");
                smallname.empty(); //清空原有的选项 
                $.each(json.data, function (index, array) {
                    var option = "<option value='" + array['area_code'] + "'>" + array['name'] + "</option>";
                    smallname.append(option);
                });
            }
        });
    }

    function getSelectParentVal() {
        $.getJSON("bigfile.php", {parent: 1}, function (json) {
            if (json.retval) {
                var bigname = $("#bigname");
                $.each(json.data, function (index, array) {
                    if ('5325' == array['area_code']) {
                        var option = "<option value='" + array['area_code'] + "' selected='selected'>" + array['name'] + "</option>";
                    } else {
                        var option = "<option value='" + array['area_code'] + "'>" + array['name'] + "</option>";
                    }

                    bigname.append(option);
                });
            }


        });
        getSelectVal('5325');
    }
    getSelectParentVal();
</script>
<form enctype="multipart/form-data" action="bigfile.php" method="post">
    <table>
        <label>省份：</label> 
        <select name="bigname" id="bigname" onchange="getSelectP()"> 
        </select> 
        <label>城市：</label> 
        <select name="smallname" id="smallname"> 
        </select>
        <tr>
            <td><label for="txtname">账号：</label></td>
            <td><input type="file" id="txtname" name="excelfile" /></td>
        </tr>

        <tr>
            <td colspan=2>
                <input type="reset" />
                <input type="submit" />
            </td>
        </tr>
    </table>
</form>