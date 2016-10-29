<?php

header("Content-Type:text/html;charset=UTF-8");
$setd = array();




$pmaxnum = 0;
if (isset($_GET['xllb']) && $_GET['xllb'] == "2") {
    //得到全部省 数据
    $d_pdo = getPdatas();

    $ff = 0;
    foreach ($d_pdo as $key => $value) {
        $setd[$key]["nameall"] = $value['provincename'];
        if (strstr($value['provincename'], '黑龙江') || strstr($value['provincename'], '内蒙古')) {
            //$value['provincename'] = str_replace("市", "", $value['provincename']);
            $value['provincename'] = substr($value['provincename'], 0, 9);
        } else {
            $value['provincename'] = substr($value['provincename'], 0, 6);
        }
        $setd[$key]["name"] = $value['provincename'];

        $cdatasbypid = getdatasmsql("SELECT COUNT(id) as num   FROM `employees` WHERE `provinceCode` = '" . $value['provinceID'] . "'");

        //print_r($cdatasbypid[0]['num']);die;
        //省 最大人数
        $setd[$key]["value"] = $cdatasbypid[0]['num'];
        if ($setd[$key]["value"] > $pmaxnum) {
            $pmaxnum = $setd[$key]["value"];
        }
        //全国总人数
        $ff+=$cdatasbypid[0]['num'];

        $setd[$key]["provinceID"] = $value['provinceID'];
        $setd[$key]["selected"] = false;
    }
    //print_r($setd); die;

    $json ['retval'] = true;
    $json ['pmaxnum'] = $pmaxnum + 2000;
    $json ['data'] = $setd;

    echo json_encode($json);
    die();
}
if (isset($_POST['xllb']) && $_POST['xllb'] === "3") {
    //市 最大人数
    $cmaxnum = 0;
    //省总人数
    $cCount = 0;

    $cdatas = array();
    //得到该省 市数据
    //根据省ID得到 该省下市数据
    $citydataspID = getdatasmsql("SELECT id,cityID,city  FROM `hat_city` WHERE `fatherID` = " . $_POST['provinceID']);
    foreach ($citydataspID as $ckey => $cvalue) {
        $cdatasbycid = getdatasmsql("SELECT COUNT(id) as num   FROM `employees` WHERE `cityCode` = '" . $cvalue['cityID'] . "'");
        $cdatas[$ckey]["value"] = $cdatasbycid[0]['num'];
        if ($cdatas[$ckey]["value"] > $cmaxnum) {
            $cmaxnum = $cdatas[$ckey]["value"];
        }
        $cdatas[$ckey]["cityID"] = $cvalue['cityID'];
        $cdatas[$ckey]["name"] = $cvalue['city'];
        $cdatas[$ckey]["selected"] = false;
        //省总人数
        $cCount+=$cdatasbycid[0]['num'];
    }

    //echo $cCount;
    //print_r($cdatas);
    //die;

    $json ['retval'] = true;
    $json ['pmaxnum'] = $cCount + 1000;
    $json ['data'] = $cdatas;

    echo json_encode($json);
    die();
}

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
