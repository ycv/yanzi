<?php

header("Content-Type: text/html; charset=UTF-8");
require '../PDO_link_database.php';
$dbconfig = new dbtemplate();
$TreeData = new TreeData();


if (isset($_GET['parent']) || isset($_GET['bigname'])) {
    $json ['retval'] = false;
    $json ['data'] = [];
    $query = $dbconfig->queryrows("SELECT parent_code,area_code,name  FROM `lov_area` WHERE `parent_code` !='' ORDER BY `parent_code` ASC");
    if (count($query) > 0) {
        $setTreeData = $TreeData->cateListLg($query);
        //截取数组元素
        $setTreeData_new = array_splice($setTreeData, 0, 34);

        if (isset($_GET['parent'])) {
            foreach ($setTreeData_new as $key => $value) {
                $json ['data'][$key]['name'] = $value['name'];
                $json ['data'][$key]['area_code'] = $value['area_code'];
            }
            $json ['retval'] = true;
        }

        if (isset($_GET['bigname'])) {
            foreach ($setTreeData_new as $key => $value) {
                if ($value['area_code'] == $_GET['bigname']) {
                    foreach ($value['child'] as $k => $v) {
                        $json ['data'][$k]['name'] = $v['name'];
                        $json ['data'][$k]['area_code'] = $v['area_code'];
                    }
                }
            }
            $json ['retval'] = true;
        }

        echo json_encode($json);
        die();
//        echo "<pre>";
//        print_r($json ['data']);
//        die;
    } else {
        echo json_encode($json);
        die();
    }
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
