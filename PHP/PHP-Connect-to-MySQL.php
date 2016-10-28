<?php

header("Content-Type:text/html;charset=UTF-8");

echo(rand(1, 22));
die;
echo "<pre>";
//得到全部省 数据
$d_pdo = getPdatas();
//print_r($d_pdo);die;

foreach ($d_pdo as $k => $v) {
    if ("140000" == $v['provinceID']) {
        getcitybypid($v['provinceID']);
        echo $v['areaid'];
        echo "<br>";
    }
}
print_r($d_pdo);
die;

//INTO `dept_emp` VALUES (10001,'d005','1986-06-26','9999-01-01'
//
//
//
//
//
//INSERT INTO `employees` VALUES (10001,'1953-09-02','Georgi','Facello','M','1986-06-26')
//INSERT INTO `departments` VALUES ('d001','Marketing')
//
//
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

//得到 省内 市数据
function getcitybypid($pid, $cid) {
    print_r($pid);
    echo "<pre>";
    print_r($cid);
    die;
}

/*
 MyISAM：
 每个MyISAM在磁盘上存储成三个文件。第一个文件的名字以表的名字开始，扩展名指出文件类型。
  .frm文件存储表定义。
  数据文件的扩展名为.MYD (MYData)。
  索引文件的扩展名是.MYI (MYIndex)。


InnoDB：
  基于磁盘的资源是InnoDB表空间数据文件和它的日志文件，InnoDB 表的大小只受限于操作系统文件的大小，一般为 2GB
 */