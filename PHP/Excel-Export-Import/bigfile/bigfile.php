<?php

header("Content-Type: text/html; charset=UTF-8");
require '../../PDO_link_database.php';
include_once __DIR__ . '/../../Third/PHPExcel/Classes/PHPExcel.php';

if (isset($_GET['parent']) || isset($_GET['bigname'])) {
    $json ['retval'] = false;
    $json ['data'] = [];
    $dbconfig = new dbtemplate();
    $query = $dbconfig->queryrows("SELECT parent_code,area_code,name  FROM `lov_area` WHERE `parent_code` !='' ORDER BY `parent_code` ASC");
    if (count($query) > 0) {
        $FromExcel = new FromExcel();
        $setTreeData = $FromExcel->cateListLg($query);
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
    } else {
        echo json_encode($json);
        die();
    }
}

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

if (isset($_FILES['excelfile']) && $_FILES['excelfile']) {
    $filepath = __DIR__ . '/data/excel/' . date('Y/m/d', time()) . '/';
    $FromExcel = new FromExcel();
    if ($FromExcel->mkDirs($filepath)) {
        $randExcelname = $FromExcel->generateRandFileName();
        $fileSuffixName = $FromExcel->fileext($_FILES['excelfile']['name']);
        $uploadfile = $filepath . $randExcelname . "." . $fileSuffixName;

        if (move_uploaded_file($_FILES['excelfile']['tmp_name'], $uploadfile)) {
            $result = $FromExcel->readFromExcel($uploadfile, 5, 6);
            echo "<pre>";
            var_dump($result);
            die;


            $excelDatas = [];
            if (count($result) > 0) {
                $excelDatas = $FromExcel->getArrayData($result, $_POST);
            }

            echo "<pre>";
            var_dump($excelDatas);
            die;
        } else {
            echo "error1";
            die;
        }
    } else {
        echo "error2";
        die;
    }
}

class FromExcel {

    public function getArrayData($data, $areadatas) {
        //用户id
        $data[1][2] = "马凯";
        $opp_owner = $data[1][2];
        $dbconfig = new dbtemplate();
        $user_id = $dbconfig->queryforobject("SELECT user_id  FROM `user` WHERE `full_name` LIKE '" . $opp_owner . "'");
        $opp_idTemp = $dbconfig->queryforobject("SELECT MAX(opp_id) FROM `opportunity`");
        foreach ($data as $key => $value) {
            $opp_idTemp++;
            if ($key > 5) {
                /*                 * *************************************************************************************************************** */
                //表 opportunity
                $opportunity__stage_number = 1;
                $opportunity__status_code = 1;
                $opportunity__so_flag = 0;
                $opportunity__sc_flag = 0;
                $opportunity__sf_sync_flag = 1;
                $opportunity__track_stage = "01";
                $opportunity__channel_type = "2";
                $opportunity__in_forecast_flag = 0;
                $opportunity__valid = 1;
                $opportunity__vcp_bid_authorize_flag = 0;
                $opportunity__fs_flag = 0;
                $opportunity__sf_opp_type = "standard";
                $opportunity__opp_name = "NS-" . date("Y", strtotime("+1 month")) . "-CR-" . $user_id . "-" . $value[2] . "-" . $value[2]; //项目名称
                $opportunity__sec_project_name = $value[2]; //项目名称
                $opportunity__end_user_project_name = $value[2]; //最终用户项目名称
                $opportunity__individual_project_name = $value[2]; //个人项目OPP辅助名称
                $opportunity__fiscal_year = date("Y", strtotime("+1 month"));
                $opportunity__finish_date = date("Y-m-d H:i:s", strtotime("+1 month")); //项目完工日期
                $opportunity__create_date = date("Y-m-d H:i:s", time());
                $opportunity__update_date = date("Y-m-d H:i:s", time());
                $opportunity__county = $dbconfig->queryforobject(" SELECT area_code FROM `lov_area` WHERE `name` LIKE '%" . $value[3] . "%' LIMIT 1"); //业务机会所在县级市 区域
                $opportunity__country = 0; //业务机会所在国家
                $opportunity__city = $areadatas['smallname']; //业务机会所在地级市 城市 id
                $opportunity__province = $areadatas['bigname']; //业务机会所在省 省份id
                $opportunity__address = $value[4]; //具体地址 地址
                $opportunity__opp_source = "oppSource_09"; //业务机会来源
                //表 account  SELECT * FROM `account` WHERE `id` = 792 ORDER BY `id` DESC
                $opportunity__acct_id = "792"; //项目投资方/最终用户
                //表lov ：SELECT * FROM `lov` WHERE `lov_code` LIKE 'A0100'
                $opportunity__sec_seg_lv1 = "A0000"; //行业属性一级
                $opportunity__sec_seg_lv2 = "A0100"; //行业属性二级



                $sqltxt_opportunity = "INSERT INTO `opportunity` (`opp_id`,`acct_id`,`user_id`,`stage_number`,`status_code`,`so_flag`,`sc_flag`,"
                        . "`sf_sync_flag`,`opp_owner`,`opp_source`,`sec_seg_lv1`,`sec_seg_lv2`,`country`,"
                        . "`province`,`city`,`county`,`address`,`track_stage`,`channel_type`,`in_forecast_flag`,"
                        . "`opp_name`,`sec_project_name`,`end_user_project_name`,`individual_project_name`,`finish_date`,`fiscal_year`,"
                        . "`create_date`,`update_date`,`create_by`,`valid`,`vcp_bid_authorize_flag`,`fs_flag`,`sf_opp_type`) "
                        . "VALUES "
                        . "('" . $opp_idTemp . "','" . $opportunity__acct_id . "' ,'" . $user_id . "' ,'" . $opportunity__stage_number . "' ,'" . $opportunity__status_code . "' ," . $opportunity__so_flag . " ," . $opportunity__sc_flag . "  ,"
                        . "" . $opportunity__sf_sync_flag . ",'" . $opp_owner . "','" . $opportunity__opp_source . "','" . $opportunity__sec_seg_lv1 . "','" . $opportunity__sec_seg_lv2 . "','" . $opportunity__country . "',"
                        . "'" . $opportunity__province . "','" . $opportunity__city . "','" . $opportunity__county . "','" . $opportunity__address . "','" . $opportunity__track_stage . "','" . $opportunity__channel_type . "'," . $opportunity__in_forecast_flag . ","
                        . "'" . $opportunity__opp_name . "','" . $opportunity__sec_project_name . "','" . $opportunity__end_user_project_name . "','" . $opportunity__individual_project_name . "','" . $opportunity__finish_date . "','" . $opportunity__fiscal_year . "'"
                        . ",'" . $opportunity__create_date . "','" . $opportunity__update_date . "','" . $user_id . "'," . $opportunity__valid . "," . $opportunity__vcp_bid_authorize_flag . "," . $opportunity__fs_flag . ",'" . $opportunity__sf_opp_type . "');";
                $dbconfig->update($sqltxt_opportunity);
                //opp_name  

                /*                 * *************************************************************************************************************** */
                //表 opp_probability
                $opp_probability_probability1 = 51; //Probability Rate
                $opp_probability_probability2 = 0;
                $opp_probability_probability3 = 0;
                $opp_probability_probability4 = 30;
                $opp_probability_probability5 = 50;
                $opp_probability_probability6 = 50;
                $opp_probability_probability7 = 100;
                $opp_probability_probability8 = 100;
                $opp_probability_probability9 = 0;
                $opp_probability_create_date = date("Y-m-d H:i:s", time());
                $opp_probability_update_date = date("Y-m-d H:i:s", time());
                $opp_probability_valid = 1;
                $sqltxt_opp_probability = "INSERT INTO `opp_probability` ("
                        . "`id`, `opp_id`, `probability1`, `probability2`, `probability3`, `probability4`, `probability5`, `probability6`, "
                        . "`probability7`, `probability8`, `probability9`, `create_date`, `update_date`, `create_by`,`valid`)"
                        . " VALUES"
                        . " (NULL, '" . $opp_idTemp . "',  '" . $opp_probability_probability1 . "',  '" . $opp_probability_probability2 . "',  '" . $opp_probability_probability3 . "',  '" . $opp_probability_probability4 . "',  '" . $opp_probability_probability5 . "',  '" . $opp_probability_probability6 . "',"
                        . "  '" . $opp_probability_probability7 . "',  '" . $opp_probability_probability8 . "',  '" . $opp_probability_probability9 . "', '" . $opp_probability_create_date . "', '" . $opp_probability_update_date . "', '" . $user_id . "'," . $opp_probability_valid . ");";
                $dbconfig->update($sqltxt_opp_probability);


                /*                 * *************************************************************************************************************** */
                //表 opp_stage_log
                $opp_stage_log_biz_unit = "NS"; //OPP机会名称  
                $opp_stage_log_main_role = "Others";
                $opp_stage_log_biz_main_role = "CR";   //OPP机会名称  
                $opp_stage_log_stage_number = 1;
                $opp_stage_log_status_code = 1;
                $opp_stage_log_track_stage = "01";
                $opp_stage_log_valid = 1;
                $opp_stage_log_create_date = date("Y-m-d H:i:s", time());

                $sqltxt_opp_stage_log = "INSERT INTO `opp_stage_log` ("
                        . "`id`, `opp_id`, `user_id`, `biz_unit`, `main_role`, `biz_main_role`, "
                        . "`stage_number`, `status_code`, `track_stage`, `create_date`, `create_by`, `valid`) "
                        . "VALUES ("
                        . "NULL, '" . $opp_idTemp . "', '" . $user_id . "', '" . $opp_stage_log_biz_unit . "', '" . $opp_stage_log_main_role . "', '" . $opp_stage_log_biz_main_role . "',"
                        . " '" . $opp_stage_log_stage_number . "', '" . $opp_stage_log_status_code . "', '" . $opp_stage_log_track_stage . "', '" . $opp_stage_log_create_date . "', '" . $user_id . "'," . $opp_stage_log_valid . ");";

                $dbconfig->update($sqltxt_opp_stage_log);


                /*                 * *************************************************************************************************************** */
                //表 opportunity_team
                $opportunity_team_permission = "1";
                $opportunity_team_create_date = date("Y-m-d H:i:s", time());
                $opportunity_team_valid = 1;
                $sqltxt_opportunity_team = "INSERT INTO `opportunity_team` ("
                        . "`id`, `opp_id`, `user_id`, `permission`, `create_date`, "
                        . "`create_by`, `update_date`, `update_by`, `valid`) "
                        . "VALUES ("
                        . "NULL, '" . $opp_idTemp . "', '" . $user_id . "', '" . $opportunity_team_permission . "', '" . $opportunity_team_create_date . "', "
                        . "'" . $user_id . "', '" . $opportunity_team_create_date . "', NULL, " . $opportunity_team_valid . ");";

                $dbconfig->update($sqltxt_opportunity_team);

                /**
                 * 获取 中压、低压柜、三箱 数据
                 */
                //INSERT INTO  opportunity_line
                $this->getfromdatas($value, $opp_idTemp);
            }
        }


        echo "1111111ok";
        die;
    }

    /**
     * 读取excel转换成数组
     * @param string $excelFile 文件路径
     * @param int $startRow 开始读取的行数
     * @param int $endRow 结束读取的行数
     * @retunr array
     */
    public function readFromExcel($excelFile, $startRow = 1, $endRow = null) {
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

    public function mkDirs($dir) {
        if (!is_dir($dir)) {
            if (!$this->mkDirs(dirname($dir))) {
                return false;
            }
            if (!mkdir($dir, 0777)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 生成随机文件名
     */
    public function generateRandFileName() {
        $tokenLen = 40;
        if (@file_exists('/dev/urandom')) { // Get 100 bytes of random data
            $randomData = file_get_contents('/dev/urandom', false, null, 0, 100) . uniqid(mt_rand(), true);
        } else {
            $randomData = mt_rand() . mt_rand() . mt_rand() . mt_rand() . microtime(true) . uniqid(mt_rand(), true);
        }
        return substr(hash('sha512', $randomData), 0, $tokenLen);
    }

    public function fileext($filename) {
        return substr(strrchr($filename, '.'), 1);
    }

    public function cateListLg($list) {
        $items = array();
        foreach ($list as $k => $v) {
            $items[$v['area_code']] = $v;
        }
        $tree = array();
        foreach ($items as $it) {
            if (isset($items[$it['parent_code']])) {
                $items[$it['parent_code']]['child'][] = &$items[$it['area_code']];
            } else {
                $tree[] = &$items[$it['area_code']];
            }
        }
        return $tree;
    }

    public function getfromdatas($v, $opp_idTemp) {

        $dbconfig = new dbtemplate();
        $opportunity_line_i = 0;

        /*         * 中压 */
        //
        /*         * 低压柜 */
        //ATMT-3A/3B $v[26]
        //数量  $v[27]
        //万高推荐型号  $v[28]
        //竞争对手  $v[29]
        //预计采购金额(K)  $v[31]
        if ($v[28]) {
            //ATMT => ATMT
            if ($v[28] == "ATMT") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'ATMT'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, $v[29], $v[27], $v[31]);
            $opportunity_line_i++;
        }

        //
        //首端ATS $v[34]
        //数量  $v[35]
        //万高推荐型号  $v[36]
        //竞争对手  $v[37]
        //预计采购金额(K)  $v[39]
        if ($v[36]) {
            //ATMT => ATMT ATMT2A=> ATMT 
            if ($v[36] == "ATMT" || $v[36] == "ATMT2A") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'ATMT'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            //WTS
            if ($v[36] == "WTS") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WTS'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }

            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, $v[37], $v[35], $v[39]);
            $opportunity_line_i++;
        }
        //
        //WEFP/WEFD $v[42]
        //数量  $v[43]
        //万高推荐型号  $v[44]
        //竞争对手  $v[45]
        //预计采购金额(K)  $v[47]
        if ($v[44]) {
            
        }
        //
        //iSCB $v[50]
        //数量  $v[51]
        //万高推荐型号  $v[52]
        //竞争对手  $v[53]
        //预计采购金额(K)  $v[55]
        if ($v[52]) {
            
        }
        //
        //SPD $v[58]
        //数量  $v[59]
        //万高推荐型号  $v[60]
        //竞争对手  $v[61]
        //预计采购金额(K)  $v[63]
        if ($v[60]) {
            
        }
        //
        //WGR/WG $v[66]
        //数量  $v[67]
        //万高推荐型号  $v[68]
        //竞争对手  $v[69]
        //预计采购金额(K)  $v[71]
        if ($v[68]) {
            
        }
        /*         * 三箱 */
        //末端ATS $v[84]
        //数量  $v[85]
        //万高推荐型号  $v[86]
        //竞争对手  $v[87]
        //预计采购金额(K)  $v[89]

        if ($v[86]) {
            //WATSN => WATSN-MCCB
            if ($v[86] == "WATSN") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WATSN-MCCB'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            //WTS => WTS
            if ($v[86] == "WTS") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WTS'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            //G => WATSG  WATSG=> WATSG
            if ($v[86] == "G" || $v[86] == "WATSG") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WATSG'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            //S => ATS   KTS=> ATS 
            if ($v[86] == "S" || $v[86] == "KTS") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'ATS'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            //N => WATSN-iINT  WTSN=> WATSN-iINT
            if ($v[86] == "N" || $v[86] == "WTSN") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WATSN-iINT'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }

            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, $v[87], $v[85], $v[89]);
            $opportunity_line_i++;
        }


        //
        //WEFP/WEFD/WAFD $v[92]
        //数量  $v[93]
        //万高推荐型号  $v[94]
        //竞争对手  $v[95]
        //预计采购金额(K)  $v[97]
        if ($v[94]) {
            //WEFP => WEFP  EFP=>WEFP
            if ($v[94] == "WEFP" || $v[94] == "EFP") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WEFP'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            //WEFD=> WEFDS  EFD=> WEFDS 
            if ($v[94] == "WEFD" || $v[94] == "EFD") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WEFDS'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }


            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, $v[95], $v[93], $v[97]);
            $opportunity_line_i++;
        }


        //
        //
        //WPFP $v[100]
        //数量  $v[101]
        //万高推荐型号  $v[102]
        //竞争对手  $v[103]
        //预计采购金额(K)  $v[105]
        if ($v[102]) {
            //WEFP => WEFP
            if ($v[102] == "WEFP") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WEFP'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, $v[103], $v[101], $v[105]);
            $opportunity_line_i++;
        }



        //
        //ISCB $v[108]
        //数量  $v[109]
        //万高推荐型号  $v[110]
        //竞争对手  $v[111]
        //预计采购金额(K)  $v[113]
        if ($v[110]) {
            //ISCB => WATSE-MCCB
            if ($v[110] == "ISCB") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WATSE-MCCB'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, $v[111], $v[109], $v[113]);
            $opportunity_line_i++;
        }
        //
        //SPD/SPMS $v[116]
        //数量  $v[117]
        //万高推荐型号  $v[118]
        //竞争对手  $v[119]
        //预计采购金额(K)  $v[121]
        if ($v[118]) {
            //IPRU => iPRU   PRD => iPRU 
            if ($v[118] == "iPRU" || $v[118] == "PRD") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'iPRU'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }
            //iST => iST   
            if ($v[118] == "iST") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'iST'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }


            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, $v[119], $v[117], $v[121]);
            $opportunity_line_i++;
        }

        //WGR/WG $v[124]
        //数量  $v[125]
        //万高推荐型号  $v[126]
        //竞争对手  $v[127]
        //预计采购金额(K)  $v[129]
        if ($v[126]) {
            //IPRU => iPRU
            if ($v[126] == "WG") {
                $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WG'"); //Product Line id
                $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            }

            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, $v[127], $v[125], $v[129]);
            $opportunity_line_i++;
        }
        if (0 == $opportunity_line_i) {
            $product_arr = $dbconfig->queryrow(" SELECT product_id,product_name,parent_id,competitor,business_type  FROM `product` WHERE `product_name` = 'WTS'"); //Product Line id
            $product_parentarr = $dbconfig->queryrow(" SELECT product_name,basket  FROM `product` WHERE `product_id` = " . $product_arr["parent_id"]); //Product Line id
            $this->setproductdata($opp_idTemp, $product_arr, $product_parentarr, "ABB", 1, 1);
        }

//        echo $opportunity_line_i;
//        die;
    }

    public function setproductdata($opp_idTemp, $product_arr, $product_parentarr, $competitor, $forecast_quantity, $forecast_amt) {
        $dbconfig = new dbtemplate();
        $dbconfig->update(" UPDATE `opportunity` SET `opp_type` = '" . $product_arr['business_type'] . "' WHERE `opportunity`.`opp_id` =" . $opp_idTemp);

        //竞争对手
        if ($competitor) {
            if (stristr($product_arr['competitor'], $competitor)) {
                $opportunity_line_arr["opp_lv2_competitor"] = $competitor;
            } else {
                $opp_lv2_competitorarr = explode(",", $product_arr['competitor']);
                $opportunity_line_arr["opp_lv2_competitor"] = $opp_lv2_competitorarr[0];
            }
        }
        $opportunity_line_arr["product_id"] = $product_arr["parent_id"];
        $opportunity_line_arr["product_family_1_id"] = $product_arr["product_id"];
        //数量
        $opportunity_line_arr["forecast_quantity"] = $forecast_quantity ? $forecast_quantity : 1;
        //预计采购金额
        $opportunity_line_arr["forecast_amt"] = $forecast_amt ? $forecast_amt : 1;
        // 
        $opportunity_line_arr["name"] = $product_parentarr["basket"] . "-" . $product_parentarr["product_name"] . "-" . $product_arr["product_name"];
        $opportunity_line_arr["valid"] = 1;
        $opportunity_line_arr["sf_sync_flag"] = 1;


        $opportunity_line_arr["create_date"] = date("Y-m-d H:i:s", time());
        $opportunity_line_arr["update_date"] = date("Y-m-d H:i:s", time());


        $sqltxt_opportunity_line = "INSERT INTO `opportunity_line` ("
                . "`opp_line_id`, `sf_id`, `opp_id`, `product_id`, `product_family_1_id`,"
                . " `product_family_2_id`, `name`, `forecast_amt`, `pd_request_amt`, `forecast_quantity`, "
                . "`win_flag`, `sf_sync_flag`, `basket`, `offer_package_id`, `offer_package_name`, "
                . "`opp_lv2_competitor`, `opp_lv2_competitor_other`, `create_date`, `update_date`, `create_by`, "
                . "`update_by`, `valid`, `total_count`, `total_amt`, `forecast_amt_after_bid`, `win_lock_flag`) "
                . "VALUES ("
                . "NULL, NULL, " . $opp_idTemp . ", '" . $opportunity_line_arr["product_id"] . "', '" . $opportunity_line_arr["product_family_1_id"] . "', "
                . "NULL, '" . $opportunity_line_arr["name"] . "', " . $opportunity_line_arr["forecast_amt"] . ", NULL, " . $opportunity_line_arr["forecast_quantity"] . ", "
                . "NULL, " . $opportunity_line_arr["sf_sync_flag"] . ", NULL, NULL, NULL,"
                . " '" . $opportunity_line_arr["opp_lv2_competitor"] . "', NULL, '" . $opportunity_line_arr["create_date"] . "', '" . $opportunity_line_arr["update_date"] . "', NULL,"
                . " NULL," . $opportunity_line_arr["valid"] . ", NULL, NULL, NULL, NULL);";

        $dbconfig->update($sqltxt_opportunity_line);
    }

}
