<?php

/*
  include_once '../../../PHP/Chinese-characters-to-Pinyin-Class/Pinyin.php';
  echo Pinyin::getPinyin("腾讯网QQ");
  echo "<hr>";
  echo Pinyin::getShortPinyin("腾讯网QQ");
  echo "<hr>";
 */
$setd = array();
if ($_GET['xllb'] == "2") {
    $sdatas = getdatasmsql();
    for ($i = 0; $i < count($sdatas); $i++) {
        $setd[$i]["name"] = $sdatas[$i];
        $setd[$i]["value"] = ($i + 1) * 97;
        $setd[$i]["selected"] = false;
    }
    //print_r($setd);die;
}
if ($_GET['xllb'] == "1") {
    
}

$json ['retval'] = true;
$json ['msg'] = "aaaaaaaaaadads";
$json ['data'] = $setd;

echo json_encode($json);
die();

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