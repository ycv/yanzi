<?php

$setd = array();
if ($_GET['xllb'] == "2") {
     
    //创建对象并打开连接，最后一个参数是选择的数据库名称
    $mysqli = new mysqli('localhost', 'root', '111111', 'dq');
    //检查连接是否成功
    if (mysqli_connect_errno()) {
        //注意mysqli_connect_error()新特性
        die('Unable to connect!') . mysqli_connect_error();
    }
    $sqltxt = "SELECT * FROM `destoon_area_copy` WHERE `parentid` = 0";
    //执行sql语句，完全面向对象的
    $result = $mysqli->query($sqltxt);
    while ($row = $result->fetch_array()) {
        echo $row['areaname'];
        die;
    }
    /* 关闭连接 */
    mysqli_close($mysqli);

    for ($i = 0; $i < 10; $i++) {
        $setd[$i] = $i * 997;
    }
}
if ($_GET['xllb'] == "1") {
    
}

//var_dump($setd); die;

$json ['retval'] = true;
$json ['msg'] = "aaaaaaaaaadads";
$json ['data'] = $setd;

echo json_encode($json);
die();
