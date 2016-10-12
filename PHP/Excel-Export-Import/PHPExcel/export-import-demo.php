<?php

header('Content-Type:text/html;Charset=utf-8');
date_default_timezone_set('Asia/Shanghai');
require_once './PHPExcel/Classes/PHPExcel.php';

$filePath = 'tIP2.xlsx';
$PHPExcel = new PHPExcel();
/* * 默认用excel2007读取excel，若格式不对，则用之前的版本进行读取 */
$PHPReader = new PHPExcel_Reader_Excel2007();
if (!$PHPReader->canRead($filePath)) {
    $PHPReader = new PHPExcel_Reader_Excel5();
    if (!$PHPReader->canRead($filePath)) {
        echo 'no Excel';
        return;
    }
}
$PHPExcel = $PHPReader->load($filePath);
/* * 读取excel文件中的第一个工作表 */
$currentSheet = $PHPExcel->getSheet(0);
/* * 取得最大的列号 */
$allColumn = $currentSheet->getHighestColumn();
/* * 取得一共有多少行 */
$allRow = $currentSheet->getHighestRow();
$data = array();

/* * 从第二行开始输出，因为excel表中第一行为列名 */
for ($currentRow = 1; $currentRow <= $allRow; $currentRow++) {
    /*     * 从第A列开始输出 */
    for ($currentColumn = 'A'; $currentColumn <= $allColumn; $currentColumn++) {
        $val = $currentSheet->getCellByColumnAndRow(ord($currentColumn) - 65, $currentRow)->getValue();
        $ipInfos = GetIpLookup($val); //baidu.com IP地址  
        //echo $val."-----------------".$ipInfos["province"];echo "<hr>";
        // echo "<hr>";
        $data[$currentRow]["ip"] = $val;
        $data[$currentRow]["province"] = $ipInfos["province"];
        $data[$currentRow]["city"] = $ipInfos["city"];
    }
}




$i = 2;
//echo "<pre>";var_dump($data);die;
$objPHPExcel = new PHPExcel();
$objPHPExcel->getProperties()->setCreator('http://www.jb51.net')
        ->setLastModifiedBy('http://www.jb51.net')
        ->setTitle('Office 2007 XLSX Document')
        ->setSubject('Office 2007 XLSX Document')
        ->setDescription('Document for Office 2007 XLSX, generated using PHP classes.')
        ->setKeywords('office 2007 openxml php')
        ->setCategory('Result file');
foreach ($data as $k => $v) {
    $objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A' . $i, $v['ip'])
            ->setCellValue('B' . $i, $v['province'])
            ->setCellValue('C' . $i, $v['city']);
    $i++;
}

$objPHPExcel->getActiveSheet()->setTitle('三年级2班');
$objPHPExcel->setActiveSheetIndex(0);
$filename = urlencode('学生信息统计表') . '_' . date('Y-m-dHis');


//生成xlsx文件
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="' . $filename . '.xlsx"');
header('Cache-Control: max-age=0');
$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

/*
 * 生成xls文件
  header('Content-Type: application/vnd.ms-excel');
  header('Content-Disposition: attachment;filename="'.$filename.'.xls"');
  header('Cache-Control: max-age=0');
  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
 */
$objWriter->save('php://output');
exit;

function GetIp() {
    $realip = '';
    $unknown = 'unknown';
    if (isset($_SERVER)) {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && !empty($_SERVER['HTTP_X_FORWARDED_FOR']) && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], $unknown)) {
            $arr = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            foreach ($arr as $ip) {
                $ip = trim($ip);
                if ($ip != 'unknown') {
                    $realip = $ip;
                    break;
                }
            }
        } else if (isset($_SERVER['HTTP_CLIENT_IP']) && !empty($_SERVER['HTTP_CLIENT_IP']) && strcasecmp($_SERVER['HTTP_CLIENT_IP'], $unknown)) {
            $realip = $_SERVER['HTTP_CLIENT_IP'];
        } else if (isset($_SERVER['REMOTE_ADDR']) && !empty($_SERVER['REMOTE_ADDR']) && strcasecmp($_SERVER['REMOTE_ADDR'], $unknown)) {
            $realip = $_SERVER['REMOTE_ADDR'];
        } else {
            $realip = $unknown;
        }
    } else {
        if (getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), $unknown)) {
            $realip = getenv("HTTP_X_FORWARDED_FOR");
        } else if (getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), $unknown)) {
            $realip = getenv("HTTP_CLIENT_IP");
        } else if (getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), $unknown)) {
            $realip = getenv("REMOTE_ADDR");
        } else {
            $realip = $unknown;
        }
    }
    $realip = preg_match("/[\d\.]{7,15}/", $realip, $matches) ? $matches[0] : $unknown;
    return $realip;
}

function GetIpLookup($ip = '') {
    if (empty($ip)) {
        $ip = GetIp();
    }
    $res = @file_get_contents('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' . $ip);
    if (empty($res)) {
        return false;
    }
    $jsonMatches = array();
    preg_match('#\{.+?\}#', $res, $jsonMatches);
    if (!isset($jsonMatches[0])) {
        return false;
    }
    $json = json_decode($jsonMatches[0], true);
    if (isset($json['ret']) && $json['ret'] == 1) {
        $json['ip'] = $ip;
        unset($json['ret']);
    } else {
        return false;
    }
    return $json;
}

?>