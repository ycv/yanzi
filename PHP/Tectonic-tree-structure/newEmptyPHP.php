<?php

header("Content-Type: text/html; charset=UTF-8");
require '../PDO_link_database.php';
$dbconfig = new dbtemplate();
$TreeData = new TreeData();
$query = $dbconfig->queryrows("SELECT * FROM  `tree_demo_data`  LIMIT 0 , 3000");
if (count($query) > 0) {
//    echo "<pre>";
//    print_r($query);
//    die;
    $setTreeData = $TreeData->cateListLg($query);
    echo "<pre>";
    print_r($setTreeData);
    die;
} else {
    echo '11';
    die;
}

class TreeData {

    public function cateListLg($list) {
        //先对数组基本的转换
        $items = array();
        foreach ($list as $k => $v) {
            $items[$v['id']] = $v;
        }
        //将所有分类设置为无限级分类的形式
        $tree = array(); //格式化好的树
        foreach ($items as $it) {
            if (isset($items[$it['parentId']])) {
                $items[$it['parentId']]['child'][] = &$items[$it['id']];
            } else {
                $tree[] = &$items[$it['id']];
            }
        }

        return $tree;
    }

}
