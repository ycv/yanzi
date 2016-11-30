<?php

//echo date("Y-m-d H:i:s", 1476633600);die;
header("Content-Type:text/html;charset=UTF-8");
if (isset($_POST['zhoustart']) && $_POST['zhouend']) {
    $json ['retval'] = false;
    $zhd = array();
    if ($_POST['zhoustart'] === $_POST['zhouend']) {
        $zhd = getPdatasoneday(strtotime($_POST['zhoustart']));
    } else {
        $zhd = getPdatasoneweek(strtotime($_POST['zhoustart']), strtotime($_POST['zhouend']));
    }

    $json ['retval'] = true;
    $json ['data'] = $zhd;
    echo json_encode($json);
    die();
}

function getPdatasoneweek($start, $end) {
    $weekdatas = array();
    $weekdatastemps = array();
    $weekdatastempe = array();
    for ($ij = 0; $ij <= 5; $ij++) {
        $setswdt = strtotime('-' . $ij . ' week', $start);
        $enetswdt = strtotime('-' . $ij . ' week', $end);
        $weekdatas[$ij]['zhou'] = date('Y', $setswdt) . "年  第" . date('W', $setswdt) . "周";
        $weekdatas[$ij]['s'] = $setswdt;
        $weekdatas[$ij]['e'] = $enetswdt;

        $weekdatas[$ij]['zhouname'] = date("Y年m月d日", $setswdt) . "~" . date("Y年m月d日", $enetswdt);
        $weekdatas[$ij]['num'] = 0;
        $weekdatastemps[] = $setswdt;
        $weekdatastempe[] = $enetswdt;
    }






    $p_s = min($weekdatastemps);
    $p_e = max($weekdatastempe);
    $sqltxt = "SELECT (  `pv_exwinner` +  `pv_pcdian` +  `pv_mobdian` +  `pv_dqdian` +  `pv_sw`) AS yhfw,  `at` FROM  `echarts_line_selection_total` WHERE  `at` >=" . $p_s . " AND  `at` <=" . $p_e . " ORDER BY  `echarts_line_selection_total`.`at` DESC ";
    $pdatas = getdatasmsql($sqltxt);
    foreach ($pdatas as $k => $v) {
        foreach ($weekdatas as $wda => $wdv) {
            if ($v["at"] >= $wdv["s"] && $v["at"] <= $wdv["e"]) {
                $weekdatas[$wda]['num']+=$v["yhfw"];
            }
        }
    }
    return $weekdatas;
}

function getPdatasoneday($time) {
    $d = array();
    $setqutime = array();
    for ($jj = 0; $jj < 10; $jj++) {
        $tti = strtotime('-' . $jj . ' day', $time);
        $setqutime[] = strtotime(date('Y-m-d H:i:s', $tti));
        $d[$tti]['yhfw'] = 0;
        $d[$tti]['at'] = date('Y-m-d', $tti);
    }
    //IN ( 1478620800, 1478534400 ) 
//    $sqltxt = "SELECT `pv_exwinner`,`pv_pcdian`,`pv_mobdian`,`pv_dqdian`,`pv_sw`,`at` FROM `echarts_line_selection_total` where `at`= " . $time;
    $sqltxt = "SELECT (`pv_exwinner`+`pv_pcdian`+`pv_mobdian`+`pv_dqdian`+`pv_sw` )as yhfw,`at` FROM `echarts_line_selection_total` where `at` IN (" . implode(",", $setqutime) . ")  ORDER BY  `at` ASC  ";
//    echo $sqltxt;die;

    $pdatas = getdatasmsql($sqltxt);

    foreach ($pdatas as $k => $v) {
        if (array_key_exists($v["at"], $d)) {
            $d[$v["at"]]['yhfw'] = $v["yhfw"];
        }
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
