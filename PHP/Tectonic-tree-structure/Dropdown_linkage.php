<script src="../../HTML/jquery-1.7.2.js" type="text/javascript"></script>
<script type="text/javascript">
    function getSelectVal() {
//        console.log($("#bigname").val());
//        return;
        $.getJSON("Dropdown_data.php", {bigname: $("#bigname").val()}, function (json) {
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
        $.getJSON("Dropdown_data.php", {parent: 1}, function (json) {
            if (json.retval) {
                var bigname = $("#bigname");
                $.each(json.data, function (index, array) {
                    var option = "<option value='" + array['area_code'] + "'>" + array['name'] + "</option>";
                    bigname.append(option);
                });
            }

        });
    }
    getSelectParentVal();
</script>

<label>大类：</label> 
<select name="bigname" id="bigname" onchange="getSelectVal()"> 
</select> 
<label>小类：</label> 
<select name="smallname" id="smallname"> 
</select>