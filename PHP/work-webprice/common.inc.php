<?php 
defined('IN_DESTOON') or exit('Access Denied');
define('MD_ROOT', DT_ROOT.'/'.$module);
require MD_ROOT.'/global.func.php';
require DT_ROOT.'/include/module.func.php';

$table = $DT_PRE.$module;
$table_data = $DT_PRE.$module.'_data';


?>