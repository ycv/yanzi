<?php

header("Content-Type:text/html;charset=UTF-8");
$setd = array();

if ($_GET['xllb'] == "2") {
    //得到全部省 数据
    $d_pdo = getPdatas();
    
    //print_r($d_pdo);die;

    foreach ($d_pdo as $key => $value) {
        $setd[$key]["nameall"] = $value['provincename'];
        if (strstr($value['provincename'], '黑龙江') || strstr($value['provincename'], '内蒙古')) {
            //$value['provincename'] = str_replace("市", "", $value['provincename']);
            $value['provincename'] = substr($value['provincename'], 0, 9);
        } else {
            $value['provincename'] = substr($value['provincename'], 0, 6);
        }
        $setd[$key]["name"] = $value['provincename'];
        $setd[$key]["value"] = ($key + 1) * 97;
        $setd[$key]["provinceID"] = $value['provinceID'];
        $setd[$key]["selected"] = false;
    }
}
if ($_GET['xllb'] == "1") {
    
}

$json ['retval'] = true;
$json ['msg'] = "aaaaaaaaaadads";
$json ['data'] = $setd;

echo json_encode($json);
die();

//得到全部省 数据
function getPdatas() {
    $d = array();
    //在操作sql
    $sqltxt = "SELECT * FROM `hat_province` ";
    $pdatas = getdatasmsql($sqltxt);
    foreach ($pdatas as $k => $v) {
        $d[$k]['provincename'] = $v["province"];
        $d[$k]['provinceID'] = $v["provinceID"];
    }
    return $d;
}

//PDO
function getdatasmsql($sqltxt) {
    $d = array();
    //连接数据库
    $pdo = new PDO("mysql:host=127.0.0.1; dbname=yanzi", "root", "111111");
    $pdo->query("SET NAMES utf8");  // $_pdo->exec('SET NAMES utf8');  //设置数据库编码，两种方法都可以  
    //操作sql 使用查询语句
    $sr = $pdo->query($sqltxt);
    //将查询的结果循环输出显示
    while ($row = $sr->fetch()) {
        $d[] = $row;
    }
    return $d;
}
