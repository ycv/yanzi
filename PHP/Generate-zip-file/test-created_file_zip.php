<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
<?php
/* 生成zip 压缩文件 */

function create_zip($files = array(), $destination = '', $overwrite = false) {
    //if the zip file already exists and overwrite is false, return false 
    if (file_exists($destination) && !$overwrite) {
        return false;
    }
    //vars 
    $valid_files = array();
    //if files were passed in... 
    if (is_array($files)) {
        //cycle through each file 
        foreach ($files as $file) {
            //make sure the file exists 
            if (file_exists($file)) {
                $valid_files[] = $file;
            }
        }
    }
    //if we have good files... 
    if (count($valid_files)) {
        //create the archive 
        $zip = new ZipArchive();
        if ($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
            return false;
        }
        //add the files 
        foreach ($valid_files as $file) {
            $file_info_arr = pathinfo($file);
            $zip->addFile($file, $file_info_arr['basename']); //去掉层级目录
        }
        //debug 
        //echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status; 
        //close the zip -- done! 
        $zip->close();

        //check to make sure the file exists 
        return file_exists($destination);
    } else {
        return "没有对应的文件";
    }
}

define('ROOTPATH', dirname(__FILE__)); //网站路径 
$files_to_zip = array(
    ROOTPATH . DIRECTORY_SEPARATOR . 'zip_test/fff1.php',
    ROOTPATH . DIRECTORY_SEPARATOR . 'zip_test/fff2.php',
);
//if true, good; if false, zip creation failed 
$filename = 'my-archive3.zip';
$result = create_zip($files_to_zip, $filename);
echo $result;
