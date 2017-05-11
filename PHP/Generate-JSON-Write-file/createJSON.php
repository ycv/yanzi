<?php

header("Content-Type: text/html; charset=UTF-8");
require '../PDO_link_database.php';
$dbconfig = new dbtemplate();
$input = "SS";
if (strlen($input) > 0) {
    $query = $dbconfig->queryrows("SELECT * FROM  `employees`  LIMIT 0 , 3000");
    if (count($query) > 0) {
        $jsonData = array();
        foreach ($query as $key => $value) {
            $jsonData[$key]["a"] = $value['birth_date'];
            $jsonData[$key]["b"] = $value['last_name'];
            $jsonData[$key]["c"] = $value['first_name'];
        }
//        echo "<pre>";
//        var_dump($jsonData);
//        echo "</pre>";
//        print_r($jsonData);
//        die;
        echo file_put_contents("../../jQuery/Incremental-query/data/test.js", json_encode($jsonData));
        die;
    } else {
        echo '';
    }
}

/**
 * 当设置 flags 参数值为 FILE_APPEND 时，表示在已有文件内容后面追加内容的方式写入新数据：
 file_put_contents("test.txt", "This is another something.", FILE_APPEND); 
 */
