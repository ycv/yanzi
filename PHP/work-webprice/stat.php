<?php
define('DT_REWRITE', true);
require 'config.inc.php';
require '../common.inc.php';
$module='webprice';
require DT_ROOT.'/'.$module.'/common.inc.php';

//获取ip地址
if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
	$ip = getenv('HTTP_CLIENT_IP');
} elseif(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
	$ip = getenv('HTTP_X_FORWARDED_FOR');
} elseif(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
	$ip = getenv('REMOTE_ADDR');
} elseif(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
	$ip = $_SERVER['REMOTE_ADDR'];
}  

//获取，后面的IP段,如果只有一个IP段（即，电脑访问方式）则不进行截取，否则截取
$arr_ip = explode(",","$ip");           
if($arr_ip[1]!=""){
	$ip=$arr_ip[1];
}
//解析提交数据
$infostr = str_replace("\\","",$info);
$statinfo=json_decode($infostr);
$osplatform=$statinfo->osplatform;
$osversion=$statinfo->osversion;
$language=$statinfo->language;
$ismobiledevice=$statinfo->ismobiledevice;
$defaultbrowser=$statinfo->defaultbrowser;
$devicepixelratio=$statinfo->devicepixelratio;
$micromessager=$statinfo->micromessager;
$useridentifier=$statinfo->useridentifier;
$latitude=$statinfo->latitude;
$longitude=$statinfo->longitude;
$screenW=$statinfo->screenW;
$screenH=$statinfo->screenH;
$deviceresolution=$screenW.'*'.$screenH;

$user_agent=$_SERVER['HTTP_USER_AGENT'];

$result = $db->query("INSERT INTO {$DT_PRE}mprice_clientdata(osplatform,osversion,language,ismobiledevice,devicename,deviceid,devicepixelratio,deviceresolution,defaultbrowser,date,clientip,latitude,longitude,network,useridentifier,micromessager,user_agent) VALUES('$osplatform','$osversion','$language','$ismobiledevice','','','$devicepixelratio','$deviceresolution','$defaultbrowser','$DT_TIME','$ip','$latitude','$longitude','','$useridentifier','$micromessager','$user_agent');");
$statid = $db->insert_id();
echo $statid;exit;
?>