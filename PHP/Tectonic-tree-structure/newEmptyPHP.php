<?php

header("Content-Type: text/html; charset=UTF-8");
require '../PDO_link_database.php';
$dbconfig = new dbtemplate();
$TreeData = new TreeData();
$query = $dbconfig->queryrows("SELECT parent_code,area_code,name  FROM `lov_area` WHERE `parent_code` !='' ORDER BY `parent_code` ASC");
if (count($query) > 0) {

    $setTreeData = $TreeData->cateListLg($query);
    //截取数组元素
    $setTreeData_new = array_splice($setTreeData, 0, 34);
    echo "<pre>";
    print_r($setTreeData_new);
    die;
} else {
    echo '11';
    die;
}

class TreeData {

    public function cateListLg($list) {
        //先对数组基本的转换
        $items = array();
        //id => 自身id； parentId => 父级id；
        foreach ($list as $k => $v) {
//            $items[$v['id']] = $v;
            $items[$v['area_code']] = $v;
        }
        //将所有分类设置为无限级分类的形式
        $tree = array(); //格式化好的树
        foreach ($items as $it) {
//            if (isset($items[$it['parentId']])) {
//                $items[$it['parentId']]['child'][] = &$items[$it['id']];
//            } else {
//                $tree[] = &$items[$it['id']];
//            }

            if (isset($items[$it['parent_code']])) {
                $items[$it['parent_code']]['child'][] = &$items[$it['area_code']];
            } else {
                $tree[] = &$items[$it['area_code']];
            }
        }

        return $tree;
    }

}
