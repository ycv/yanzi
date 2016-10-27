<?php

echo ";;<hr><pre>";
//$d_mysqli = getdatas();
$d_pdo = getdatasmsql();
var_dump($d_pdo);
die;

//mysqli
function getdatas() {
    $d = array();
    //创建对象并打开连接，最后一个参数是选择的数据库名称
    $mysqli = new mysqli('127.0.0.1', 'root', '111111', 'dq');
    //检查连接是否成功
    if (mysqli_connect_errno()) {
        //注意mysqli_connect_error()新特性
        die('Unable to connect!') . mysqli_connect_error();
    }
    $mysqli->set_charset("utf8");
    $sqltxt = "SELECT * FROM `destoon_area_copy` WHERE `parentid` = 0 and areaid<50 ";
    $result = $mysqli->query($sqltxt);
    while ($row = $result->fetch_array()) {
        $d[] = $row['areaname'];
    }
    /* 关闭连接 */
    mysqli_close($mysqli);
    return $d;
}

//PDO
function getdatasmsql() {
    $d = array();
    //连接数据库
    $pdo = new PDO("mysql:host=127.0.0.1; dbname=dq", "root", "111111");
    //在操作sql
    $sqltxt = "SELECT * FROM `destoon_area_copy` WHERE `parentid` = 0 and areaid<50 ";
    //使用查询语句
    $sr = $pdo->query($sqltxt);
    //将查询的结果循环输出显示
    while ($row = $sr->fetch()) {
        $d[] = $row['areaname'];
    }
    return $d;
}
