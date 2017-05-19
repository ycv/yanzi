<?php

header("Content-Type: text/html; charset=UTF-8");
require '../../PDO_link_database.php';
$dbconfig = new dbtemplate();
/*
  phpexcel读取大文件demo
  Author URI: http://www.01happy.com
 */
//memory_get_usage — 返回分配给 PHP 的内存量 
//返回当前分配给你的 PHP 脚本的内存量，单位是字节（byte）。 
//echo memory_get_usage();

include_once __DIR__ . '/../../Third/PHPExcel/Classes/PHPExcel.php';

/**
 * 读取excel过滤器
 */
class PHPExcelReadFilter implements PHPExcel_Reader_IReadFilter {

    public $startRow = 1;
    public $endRow;

    public function readCell($column, $row, $worksheetName = '') {
        //如果endRow没有设置表示读取全部
        if (!$this->endRow) {
            return true;
        }
        //只读取指定的行
        if ($row >= $this->startRow && $row <= $this->endRow) {
            return true;
        }

        return false;
    }

}

/**
 * 读取excel转换成数组
 * 
 * @param string $excelFile 文件路径
 * @param string $excelType excel后缀格式
 * @param int $startRow 开始读取的行数
 * @param int $endRow 结束读取的行数
 * @retunr array
 */
function readFromExcel($excelFile, $excelType = null, $startRow = 1, $endRow = null) {
    $excelReader = \PHPExcel_IOFactory::createReader("Excel2007");
    $excelReader->setReadDataOnly(true);
    //如果有指定行数，则设置过滤器
    if ($startRow && $endRow) {
        $perf = new PHPExcelReadFilter();
        $perf->startRow = $startRow;
        $perf->endRow = $endRow;
        $excelReader->setReadFilter($perf);
    }

    $phpexcel = $excelReader->load($excelFile);
    $activeSheet = $phpexcel->getActiveSheet();
    if (!$endRow) {
        $endRow = $activeSheet->getHighestRow(); //总行数
    }

    $highestColumn = $activeSheet->getHighestColumn(); //最后列数所对应的字母，例如第2行就是B
    $highestColumnIndex = \PHPExcel_Cell::columnIndexFromString($highestColumn); //总列数

    $data = array();
    for ($row = $startRow; $row <= $endRow; $row++) {
        for ($col = 0; $col < $highestColumnIndex; $col++) {
            $data[$row][] = (string) $activeSheet->getCellByColumnAndRow($col, $row)->getValue();
        }
    }
    return $data;
}

$excelFile = __DIR__ . '/data/payment.xlsx';
$excelFile = __DIR__ . '/data/ssss.xlsx';
$result = readFromExcel($excelFile, null, 1, 5);
//echo "<br />";
//echo memory_get_usage();
echo "<pre>";
//print_r($result);



foreach ($result as $key => $value) {
    if ($key > 4) {
        $sqltxt = "INSERT INTO `yanzi`.`yii2test_projectreport` "
                . "(`id`, `number`, `entry_name`, `region`, `address`, `Industry_owned`, "
                . "`Investment_unit`, `Scale`, `Party_a_contact`, `Telephone`, `Design_unit`, "
                . "`Designer`, `Design_Institute_tracking_people`, `Engineering_progress`,"
                . " `medium_voltage_id`, `Low_voltage_cabinet_id`, `Box_three_id`, `Visiting_record`, "
                . "`Update_date`, `KA_estate_agent`, `Join_TOP`, `Exit_Top`) VALUES "
                . "(NULL, '" . $value[1] . "', '" . $value[2] . "', '" . $value[3] . "', '" . $value[4] . "', '" . $value[5] . "',"
                . " '" . $value[6] . "', '" . $value[7] . "', '" . $value[8] . "', '" . $value[9] . "', '" . $value[10] . "',"
                . " '" . $value[11] . "', '" . $value[12] . "', '" . $value[13] . "',"
                . " '1', '1', '1', '" . $value[147] . "',"
                . " '" . $value[148] . "', '" . $value[149] . "', '" . $value[150] . "', '" . $value[151] . "');";
//        $query = $dbconfig->update($sqltxt);
        print_r($value);
        die;
    }
}








