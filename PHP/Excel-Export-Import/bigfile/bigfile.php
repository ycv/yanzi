<?php

header("Content-Type: text/html; charset=UTF-8");
require '../../PDO_link_database.php';
$dbconfig = new dbtemplate();
//phpexcel读取大文件demo
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
            //时间 格式 转换
            //更新日期  加入TOP10   退出Top10  
            if (($col == 82) || ($col == 24) || ($col == 15) || ($col == 148) || ($col == 150) || ($col == 151)) {
                if ($activeSheet->getCellByColumnAndRow($col, $row)->getDataType() == PHPExcel_Cell_DataType::TYPE_NUMERIC) {
                    $data[$row][] = PHPExcel_Shared_Date::ExcelToPHP($activeSheet->getCellByColumnAndRow($col, $row)->getValue());
                } else {
                    $data[$row][] = (string) $activeSheet->getCellByColumnAndRow($col, $row)->getValue();
                }
            } else {
                $data[$row][] = (string) $activeSheet->getCellByColumnAndRow($col, $row)->getValue();
            }
        }
    }
    return $data;
}

echo "<pre>";
if (isset($_FILES["excelfile"]) && $_FILES["excelfile"]) {
    $filepath = __DIR__ . '/data/excel/' . date('Y/m/d', time()) . '/';
    if (mkDirs($filepath)) {
        //生成随机文件名
        $ad_randname = generateRandFileName();
        //获取文件后缀名
        $fileSuffixName = fileext($_FILES['excelfile']['name']);
        //文件生成路径
        $uploadfile = $filepath . $ad_randname . "." . $fileSuffixName;
        if (move_uploaded_file($_FILES['excelfile']['tmp_name'], $uploadfile)) {
            $result = readFromExcel($uploadfile, null, 4, 9);
            foreach ($result as $key => $value) {
                //中压
                //WMTS => 17
                //
                //低压柜
                //ATMT-3A/3B => 26                  万高推荐型号 => 28
                //首端ATS => 34                     万高推荐型号 => 36 
                //WEFP/WEFD =>  42                  万高推荐型号 =>  44
                //iSCB =>  50                       万高推荐型号 =>  52
                //SPD =>  58                        万高推荐型号 =>  60
                //WGR/WG =>  66                     万高推荐型号 =>  68
                //
                //三箱
                //末端ATS => 84                     万高推荐型号 => 86
                //WEFP/WEFD/WAFD => 92              万高推荐型号 => 94
                //WPFP => 100                       万高推荐型号 => 102
                //ISCB => 108                       万高推荐型号 => 110
                //SPD/SPMS => 116                   万高推荐型号 => 118
                //WGR/WG => 124                     万高推荐型号 => 126
                //iARC => 132                       万高推荐型号 => 134

                echo "<pre>";
                print_r($result);
                die;
            }
            echo count($result);
            die;
        } else {
            echo "上传失败!";
            die;
        }
    } else {
        echo "error";
        die;
    }
}


//echo memory_get_usage();

foreach ($result as $key => $value) {
    if ($key > 4) {
        //中压
        $sqltxt_mediumvoltage = "INSERT INTO `yii2test_mediumvoltage` "
                . "(`id`, `Disk_factory_situation`, `Estimated_time_of_purchase`, `Picture_above`, `WMTS`, "
                . "`Number`, `Competitor`, `Tracking_progress`, `Estimated_amount_of_purchase`, `Actual_purchase_amount`) "
                . "VALUES "
                . "(NULL, '" . $value[14] . "', '" . date('Y-m-d', $value[15]) . "', '" . $value[16] . "', '" . $value[17] . "',"
                . " '" . $value[18] . "', '" . $value[19] . "', '" . $value[20] . "', '" . $value[21] . "', '" . $value[22] . "');";
        $dbconfig->update($sqltxt_mediumvoltage);
        //中压 id
        $yii2test_mediumvoltage_ID = $dbconfig->queryforint("SELECT max(id) FROM `yii2test_mediumvoltage`");
        //低压柜
        $sqltxt_lowvoltagecabinet = "INSERT INTO `yii2test_lowvoltagecabinet` ("
                . "`id`, `Disk_factory_situation`, `Estimated_time_of_purchase`, `ATMT`, `Picture_above_ATMT`,"
                . " `Number_ATMT`, `Recommended_model_ATMT`, `Competitor_ATMT`, `Tracking_progress_ATMT`, `Estimated_amount_of_purchase_ATMT`,"
                . " `Actual_purchase_amount_ATMT`, `ATS`, `Picture_above_ATS`, `Number_ATS`, `Recommended_model_ATS`,"
                . " `Competitor_ATS`, `Tracking_progress_ATS`, `Estimated_amount_of_purchase_ATS`, `Actual_purchase_amount_ATS`, `WEFP`,"
                . " `Picture_above_WEFP`, `Number_WEFP`, `Recommended_model_WEFP`, `Competitor_WEFP`, `Tracking_progress_WEFP`,"
                . " `Estimated_amount_of_purchase_WEFP`, `Actual_purchase_amount_WEFP`, `iSCB`, `Picture_above_iSCB`, `Number_iSCB`,"
                . " `Recommended_model_iSCB`, `Competitor_iSCB`, `Tracking_progress_iSCB`, `Estimated_amount_of_purchase_iSCB`, `Actual_purchase_amount_iSCB`,"
                . " `SPD`, `Picture_above_SPD`, `Number_SPD`, `Recommended_model_SPD`, `Competitor_SPD`, "
                . "`Tracking_progress_SPD`, `Estimated_amount_of_purchase_SPD`, `Actual_purchase_amount_SPD`, `WGR`, `Picture_above_WGR`,"
                . "`Number_WGR`, `Recommended_model_WGR`, `Competitor_WGR`, `Tracking_progress_WGR`, `Estimated_amount_of_purchase_WGR`,"
                . " `Actual_purchase_amount_WGR`) VALUES ("
                . "NULL, '" . $value[23] . "', '" . date('Y-m-d', $value[24]) . "', '" . $value[26] . "', '" . $value[25] . "',"
                . " '" . $value[27] . "', '" . $value[28] . "', '" . $value[29] . "', '" . $value[30] . "', '" . $value[31] . "',"
                . " '" . $value[32] . "', '" . $value[34] . "', '" . $value[33] . "', '" . $value[35] . "', '" . $value[36] . "',"
                . " '" . $value[37] . "', '" . $value[38] . "', '" . $value[39] . "', '" . $value[40] . "', '" . $value[42] . "',"
                . " '" . $value[41] . "', '" . $value[43] . "', '" . $value[44] . "', '" . $value[45] . "', '" . $value[46] . "',"
                . " '" . $value[47] . "', '" . $value[48] . "', '" . $value[50] . "', '" . $value[49] . "', '" . $value[51] . "',"
                . " '" . $value[52] . "', '" . $value[53] . "', '" . $value[54] . "', '" . $value[55] . "', '" . $value[56] . "',"
                . " '" . $value[58] . "', '" . $value[57] . "', '" . $value[59] . "', '" . $value[60] . "', '" . $value[61] . "',"
                . " '" . $value[62] . "', '" . $value[63] . "', '" . $value[64] . "', '" . $value[66] . "', '" . $value[65] . "',"
                . " '" . $value[67] . "', '" . $value[68] . "', '" . $value[69] . "', '" . $value[70] . "', '" . $value[71] . "',"
                . " '" . $value[72] . "');";
        $dbconfig->update($sqltxt_lowvoltagecabinet);
        //低压柜 id
        $yii2test_lowvoltagecabinet_ID = $dbconfig->queryforint("SELECT max(id) FROM `yii2test_lowvoltagecabinet`");
        //三箱
        $sqltxt_boxthree = "INSERT INTO `yii2test_boxthree` ("
                . "`id`, `Disk_factory_situation`, `Estimated_time_of_purchase`, `ATS`, `Picture_above`,"
                . " `Number`, `Recommended_model`, `Competitor`, `Tracking_progress`, `Estimated_amount_of_purchase`,"
                . " `Actual_purchase_amount`, `WEFP`, `Picture_above_WEFP`, `Number_WEFP`, `Recommended_model_WEFP`,"
                . " `Competitor_WEFP`, `Tracking_progress_WEFP`, `Estimated_amount_of_purchase_WEFP`, `Actual_purchase_amount_WEFP`, `WPFP`,"
                . " `Picture_above_WPFP`, `Number_WPFP`, `Recommended_model_WPFP`, `Competitor_WPFP`, `Tracking_progress_WPFP`,"
                . " `Estimated_amount_of_purchase_WPFP`, `Actual_purchase_amount_WPFP`, `ISCB`, `Picture_above_ISCB`, `Number_ISCB`,"
                . " `Recommended_model_ISCB`, `Competitor_ISCB`, `Tracking_progress_ISCB`, `Estimated_amount_of_purchase_ISCB`, `Actual_purchase_amount_ISCB`,"
                . " `SPD`, `Picture_above_SPD`, `Number_SPD`, `Recommended_model_SPD`, `Competitor_SPD`, "
                . "`Tracking_progress_SPD`, `Estimated_amount_of_purchase_SPD`, `Actual_purchase_amount_SPD`, `WGR`, `Picture_above_WGR`,"
                . " `Number_WGR`, `Recommended_model_WGR`, `Competitor_WGR`, `Tracking_progress_WGR`, `Estimated_amount_of_purchase_WGR`, "
                . "`Actual_purchase_amount_WGR`, `iARC`, `Picture_above_iARC`, `Number_iARC`, `Recommended_model_iARC`,"
                . " `Competitor_iARC`, `Tracking_progress_iARC`, `Estimated_amount_of_purchase_iARC`, `Actual_purchase_amount_iARC`) "
                . "VALUES "
                . "(NULL, '" . $value[81] . "', '" . date('Y-m-d', $value[82]) . "', '" . $value[84] . "', '" . $value[83] . "',"
                . " '" . $value[85] . "', '" . $value[86] . "', '" . $value[87] . "', '" . $value[88] . "', '" . $value[89] . "', "
                . "'" . $value[90] . "', '" . $value[92] . "', '" . $value[91] . "', '" . $value[93] . "', '" . $value[94] . "', "
                . "'" . $value[95] . "', '" . $value[96] . "', '" . $value[97] . "', '" . $value[98] . "', '" . $value[100] . "',"
                . " '" . $value[99] . "', '" . $value[101] . "', '" . $value[102] . "', '" . $value[103] . "', '" . $value[104] . "',"
                . " '" . $value[105] . "', '" . $value[106] . "', '" . $value[108] . "', '" . $value[107] . "', '" . $value[109] . "',"
                . " '" . $value[110] . "', '" . $value[111] . "', '" . $value[112] . "', '" . $value[113] . "', '" . $value[114] . "',"
                . " '" . $value[116] . "', '" . $value[115] . "', '" . $value[117] . "', '" . $value[118] . "', '" . $value[119] . "',"
                . " '" . $value[120] . "', '" . $value[121] . "', '" . $value[122] . "', '" . $value[124] . "', '" . $value[123] . "',"
                . " '" . $value[125] . "', '" . $value[126] . "', '" . $value[127] . "', '" . $value[128] . "', '" . $value[129] . "', "
                . "'" . $value[130] . "', '" . $value[132] . "', '" . $value[131] . "', '" . $value[133] . "', '" . $value[134] . "',"
                . " '" . $value[135] . "', '" . $value[136] . "', '" . $value[137] . "', '" . $value[138] . "');";

        $dbconfig->update($sqltxt_boxthree);
        //三箱 id
        $yii2test_boxthree_ID = $dbconfig->queryforint("SELECT max(id) FROM `yii2test_boxthree`");

        $sqltxt = "INSERT INTO `yanzi`.`yii2test_projectreport` "
                . "(`id`, `number`, `entry_name`, `region`, `address`, `Industry_owned`, "
                . "`Investment_unit`, `Scale`, `Party_a_contact`, `Telephone`, `Design_unit`, "
                . "`Designer`, `Design_Institute_tracking_people`, `Engineering_progress`,"
                . " `medium_voltage_id`, `Low_voltage_cabinet_id`, `Box_three_id`, `Visiting_record`, "
                . "`Update_date`, `KA_estate_agent`, `Join_TOP`, `Exit_Top`) VALUES "
                . "(NULL, '" . $value[1] . "', '" . $value[2] . "', '" . $value[3] . "', '" . $value[4] . "', '" . $value[5] . "',"
                . " '" . $value[6] . "', '" . $value[7] . "', '" . $value[8] . "', '" . $value[9] . "', '" . $value[10] . "',"
                . " '" . $value[11] . "', '" . $value[12] . "', '" . $value[13] . "',"
                . " '" . $yii2test_mediumvoltage_ID . "', '" . $yii2test_lowvoltagecabinet_ID . "', '" . $yii2test_boxthree_ID . "', '" . $value[147] . "',"
                . " '" . date('Y-m-d', $value[148]) . "', '" . $value[149] . "', '" . date('Y-m-d', $value[150]) . "', '" . date('Y-m-d', $value[151]) . "');";

        $dbconfig->update($sqltxt);
    }
}


echo "<pre>";
print_r($result);
die;

function mkDirs($path) {
    if (!is_dir($path)) {
        $res = mkdir(iconv("UTF-8", "GBK", $path), 0777, true);
        if ($res) {
            return true;
        } else {
            return false;
        }
    }
    return true;
}

function generateRandFileName() {
    $tokenLen = 40;
    if (@file_exists('/dev/urandom')) { // Get 100 bytes of random data
        $randomData = file_get_contents('/dev/urandom', false, null, 0, 100) . uniqid(mt_rand(), true);
    } else {
        $randomData = mt_rand() . mt_rand() . mt_rand() . mt_rand() . microtime(true) . uniqid(mt_rand(), true);
    }
    return substr(hash('sha512', $randomData), 0, $tokenLen);
}

function fileext($filename) {
    return substr(strrchr($filename, '.'), 1);
}
