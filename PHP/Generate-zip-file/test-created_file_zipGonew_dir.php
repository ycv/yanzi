<?php

//网站路径 
define('ROOTPATH', dirname(__FILE__));
$files_to_zip = ROOTPATH . DIRECTORY_SEPARATOR . 'zip_test' . DIRECTORY_SEPARATOR;

if (is_dir($files_to_zip)) {
    $zip = new ZipArchive();
    $zip->open($files_to_zip . 'creatNew22.zip', ZipArchive::CREATE);
    $file_old = ROOTPATH . DIRECTORY_SEPARATOR . 'zip_test' . DIRECTORY_SEPARATOR . 'fff1.php';
    if (file_exists($file_old)) {
        $file_info_arr = pathinfo($file_old);
        //去掉层级目录
        $zip->addFile($file_old, $file_info_arr['basename']);
        $zip->close();
    }
} else {
    echo "目录不存在";
}
