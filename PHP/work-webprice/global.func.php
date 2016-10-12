<?php
defined('IN_DESTOON') or exit('Access Denied');
require DT_ROOT.'/config.inc.php';
function ext_select($name, $value, $extend = '') {
	include DT_ROOT.'/file/config/filetype.inc.php';
	$value or $value = 'oth';
	$select = '<select name="'.$name.'" '.$extend.'>';
	foreach($FILETYPE as $k=>$v) {
		$select .= '<option value="'.$k.'"'.($k == $value ? ' selected' : '').'>'.$v.'</option>';
	}
	$select .= '</select>';
	return $select;
}

function unit_select($name, $value, $extend = '') {
	$UNIT = array('K', 'M', 'G', 'T');
	$value or $value = 'M';
	$select = '<select name="'.$name.'" '.$extend.'>';
	foreach($UNIT as $k=>$v) {
		$select .= '<option value="'.$v.'"'.($v == $value ? ' selected' : '').'>'.$v.'</option>';
	}
	$select .= '</select>';
	return $select;
}



/**
 * @param unknown_type $F_Category_ID
 * @return boolean
 */
function get_count($F_Category_ID)
{

	global $pricemsdb;

	$resultvalue=true;
	$condition = " F_ParentID='".$F_Category_ID."' and F_isShow=1";
	
	$result = $pricemsdb->query("select count(F_Category_ID)as c from [T_Category] WHERE $condition ",'CACHE');
	$count_array = $pricemsdb->fetch_array($result);

	
	if($count_array['c'] >0)
	{
		$resultvalue=true;
	}
	else
	{
		$resultvalue=false;
	}
	
	return $resultvalue;
	
}
/**
 * 
 * @param unknown_type $F_Category_ID
 * @param unknown_type $F_ParentID
 * @return multitype:unknown
 */
function get_msmaincat($F_Category_ID, $F_ParentID) {

	global $pricemsdb;
	if($F_ParentID=="")
	{
		$condition =" F_ParentID is null and F_isShow=1";
		
		
	}
	else
	{
		$condition ="F_ParentID in ('".$F_Category_ID."') and F_isShow=1";
	
		
	}

	//if($level >= 0) $condition .= " AND level=$level";
	$cat = array();
	$result = $pricemsdb->query("select CONVERT(varchar(36),F_Category_ID,36) as F_Category_ID,[F_Name],CONVERT(varchar(36),F_ParentID,36) as F_ParentID from [T_Category] WHERE $condition ORDER BY F_OrderID ASC",'CACHE');
	
	while($r = $pricemsdb->fetch_array($result)) {
		
		$cat[] = $r;
	}
	
	return $cat;
}


function getproductcount()
{
	global $pricemsdb;
	$cat = array();
	//$condition = "F_isShow=1";
	//$result = $pricemsdb->query("select count(*)as c from T_Product where $condition",'CACHE');
	$result = $pricemsdb->query("select count(*)as c from T_Product",'CACHE');
	$count_array = $pricemsdb->fetch_array($result);
	return $count_array;
}

function getmanufacturercount()
{
	global $pricemsdb;
	$cat = array();
	
	$result = $pricemsdb->query("select count(distinct F_Manufacturer_ID)as c from T_Class",'CACHE');
	$count_array = $pricemsdb->fetch_array($result);
	return $count_array;
}
function getdatanew()
{
	global $pricemsdb;
	$cat = array();
	$condition = "F_isShow=1";
	$result = $pricemsdb->query("select top 1 F_Create_Time from T_Product order by  F_Create_Time desc",'CACHE');
	$new_array = $pricemsdb->fetch_array($result);
	
	
	
	return $new_array;
}
function getprodcutnew()
{
	global $pricemsdb;
	$cat = array();
	$newdate= getdatanew();
	$data= HandleDate($newdate[F_Create_Time]);
	
	
	$result = $pricemsdb->query("select count(*)as c from T_Product where F_Create_Time >'$data'",'CACHE');
	$new_count = $pricemsdb->fetch_array($result);
	return $new_count;
}

function HandleDate($time)
 {
	
	if($time!=null)
	{
		$ShortDate=explode(" ", $time);
		$M=$ShortDate[0];
		$D=$ShortDate[1];
		$Y=$ShortDate[2];
		$H=$ShortDate[3];
		if($ShortDate[3]=="")
		{
			$H=$ShortDate[4];
		}
		
		$Datetime=explode(":", $H);
		$Hour=$Datetime[0];
		$Min=$Datetime[1];
		//$lengthvalue= substr($H,lang($Datetime)-2);
		
		if(strstr($Min, "PM"))
		{
			$Hour=$Hour+12;
			if($Hour==24)
			{
				$Hour='00';
			}
		}
		$time=substr($Min,0,2);
		
		$newtime=$Y."-".$M."-".$D." ".$Hour.":".$time;
		
	}
	
	return $newtime;
}
function  SearchList($kw)
{
	
	global $pricemsdb;
	$term="";
	$searchvalues=$kw;
	
	if($searchvalues!=''&& $searchvalues!=null)
	{
	
		$Shortsearch=explode(" ", trim($searchvalues));
		$arrayserch=array();
		for($i=0;$i<count($Shortsearch);$i++)
		{
			if($Shortsearch[$i])
			{
				$arrayserch[]=$Shortsearch[$i];
			}
			
		}
	    
		if(count($arrayserch)>1)
		{
			$companyterm=$arrayserch[0];
			$searchresult = $pricemsdb->query("select count(*)as c from T_Manufacturer where F_Name like '%".iconv('UTF-8','gb2312',$companyterm)."%'",'CACHE');
			
			$searchcount = $pricemsdb->fetch_array($searchresult);
			if($searchcount[c]>0)
			{
				for($y=1;$y<count($arrayserch);$y++)
				{
					$newarry.=$arrayserch[$y]." ";
				}
				$newarry=rtrim($newarry," ");
				$term=" F_Model like '%".iconv('UTF-8','gb2312',$newarry)."%' and c.F_Name like '%".iconv('UTF-8','gb2312',$companyterm)."%' ";
			}
			else
			{
				$searchresult = $pricemsdb->query("select count(*)as c from T_Manufacturer where F_Name like '%".iconv('UTF-8','gb2312',$arrayserch[count($arrayserch)-1])."%'",'CACHE');
				
				$searchcount = $pricemsdb->fetch_array($searchresult);
				if($searchcount[c]>0)
				{
					for($y=0;$y<count($arrayserch)-1;$y++)
					{
					$newarry.=$arrayserch[$y]." ";
					}
					$newarry=rtrim($newarry," ");
					$term=" F_Model like '%".iconv('UTF-8','gb2312',$newarry)."%' and c.F_Name like '%".iconv('UTF-8','gb2312',$arrayserch[count($arrayserch)-1])."%' ";
				}
				else 
				{
					$term=" F_Model like '%".iconv('UTF-8','gb2312',rtrim($searchvalues,' '))."%'";
				}
				
				
			}
		}
// 		else if(count($arrayserch)==2)
// 		{
// 		  $companyterm=$arrayserch[0];
// 		  $searchresult = $pricemsdb->query("select count(*)as c from T_Manufacturer where F_Name like '%".iconv('UTF-8','gb2312',$companyterm)."%'",'CACHE');
		  
// 		  $searchcount = $pricemsdb->fetch_array($searchresult);
// 		  if($searchcount[c]>0)
// 		  {
// 		  	$term=" F_Model like '%".iconv('UTF-8','gb2312',$arrayserch[1])."%' and c.F_Name like '%".iconv('UTF-8','gb2312',$arrayserch[0])."%' ";
// 		  }
// 		  else
// 		  {
// 		  	$term=" F_Model like '%".iconv('UTF-8','gb2312',$arrayserch[0])."%' and c.F_Name like '%".iconv('UTF-8','gb2312',$arrayserch[1])."%' ";
// 		  }
				
// 		}
		else 
		{
			$searchresult = $pricemsdb->get_one("select count(*)as c from T_Manufacturer where F_Name like '%".iconv('UTF-8','gb2312',trim($arrayserch[0]))."%'",'CACHE');
			
			
			if($searchresult[c]>0)
			{
				$term=" c.F_Name like '%".iconv('UTF-8','gb2312',$arrayserch[0])."%' ";
			
			}
			else
			{
				$term=" F_Model like '%".iconv('UTF-8','gb2312',$arrayserch[0])."%' ";
			}
		}
		
	}
	
	return $term;
}







function  SearchCompany($cid,$treeid)
{

	//global $pricemsdb;
	$term="";
	//$searchvalues=$kw;
	if($cid!=''&&$treeid=="")
	{

		//$Shortsearch=explode(",", trim($cid));
        $classid=$cid;
        $term.="c.F_Manufacturer_ID='$classid'";
		
			
	}
	else if($cid!=""&&$treeid!="") 
	{
		$term="b.F_Class_ID='$treeid' and c.F_Manufacturer_ID='$cid'";
	}
	

	return $term;
}




function companyinfos($pid)
{
	global $pricemsdb;
	$cat = array();
	$condition = "F_Manufacturer_ID=(select F_Manufacturer_ID from T_Class where F_Class_ID = (select F_Class_ID from T_Product where F_Product_ID ='$pid'))";
	$result = $pricemsdb->query("select F_Manufacturer_ID,F_Name,F_Brand,F_Logo,F_Email,F_URL,F_ADDRESS,F_Tel from T_Manufacturer where $condition",'CACHE');
	
	while($r = $pricemsdb->fetch_array($result)) {
	
		$cat[] = $r;
	}
	return $cat;
}

function GetVenter($pid)
{
	global $pricemsdb;
	$cat = array();
	$condition = " p.F_Class_ID=c.F_Class_ID and c.F_Manufacturer_ID=M.F_Manufacturer_ID and M.F_Manufacturer_ID=t.F_Manufacturer_ID and s.F_Supplier_ID=t.F_Supplier_ID and P.F_Product_ID='$pid'";
	$result = $pricemsdb->query("select s.F_Name,s.F_Logo,s.F_Email,s.F_Tel,s.F_Address,s.F_URL from T_Manufacturer m,T_Class c,T_Product p,T_Supplier s,T_ManufacturerDiscount t where $condition",'CACHE');

	while($r = $pricemsdb->fetch_array($result)) {

		$cat[] = $r;
	}
	return $cat;
}

/**
 * 商品历史浏览记录
 * $pid 商品记录信息id
 */
 function _history($pid)
{
	$url= $CFG['addressurl'];
	if($pid==''||$pid==null)
		{
			
			return false;
		}
		
		//判断cookie类里面是否有浏览记录
		if(getCookie('history'))
			{
				$history = unserialize(getCookie('history'));
				array_unshift($history, $pid); //在浏览记录顶部加入
				/* 去除重复记录 */
				$rows = array();
				foreach ($history as $v)
					{
						if(in_array($v, $rows))
							{
								continue;
							}	
							$rows[] = $v;			
					}
				
					/* 如果记录数量多余5则去除 */
					while (count($rows) > 5)
					{
						array_pop($rows); //弹出
					}
					//set_cookie('username', $user['username'], $DT_TIME + 86400*365);
				
					setcookie('history',serialize($rows),time() + 3600 * 24 * 30,'/',$url);
					}
					else
					{
							
						$history = serialize(array($pid));
					
						setcookie('history',$history,time() + 3600 * 24 * 30,'/',$url);
					}
					global $pricemsdb;
					$cat = array();
				
		  
		   foreach ($rows as $c)
		   {
		     $productid.="'".$c."'".',';
		   }
		   $productid = substr($productid,0,-1);
		   if($productid!=""&&$productid!=null)
		   {
		   	$condition = " p.F_Class_ID=c.F_Class_ID and p.F_Product_ID in ($productid)";
		   	$result = $pricemsdb->query("select p.F_Pic,c.F_Name,p.F_Model,p.F_Price,CONVERT(varchar(36),c.F_Manufacturer_ID,36)as F_Manufacturer_ID,CONVERT(varchar(36),c.F_Class_ID,36)as F_Class_ID,CONVERT(varchar(36),p.F_Product_ID,36)as F_Product_ID from dbo.T_Product p,T_Class c  where $condition",'CACHE');
		   	while($r = $pricemsdb->fetch_array($result))
		   	{
		   		$cat[] = $r;
		   	}
		   }
		  
		  
			return $cat;
				
}
function getCookie($pid)
{
	$cookie=$_COOKIE[$pid];
	return $cookie;
}

 function getxmldata($pid)
 {

 	
  if($pid!=""&&$pid!=null)
  {
  	global $pricemsdb,$CFG;
  	$cat = array();
  
  	$serverName =$CFG['mssqldb_host1'] ;
  	
  	$connectionInfo = array( "Database"=>$CFG['mssqldb_name1'], "UID"=>$CFG['mssqldb_user1'], "PWD"=>$CFG['mssqldb_pass1'],"CharacterSet" => "UTF-8");
  	$conn = sqlsrv_connect($serverName, $connectionInfo);
  	
  	if( $conn ) {
  		// 		echo "Connection established.<br />";
  	}else{
  		//echo "Connection could not be established.<br />";
  		die( print_r( sqlsrv_errors(), true));
  	}
  	
  	$sql = "SELECT  F_MoreInfo FROM T_Product where F_Product_ID='$pid'";
  	$stmt = sqlsrv_query($conn, $sql);
  	
  //	$result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
  	$xml = new DOMDocument();
  	if (sqlsrv_fetch($stmt)) {
  	
  		$data = sqlsrv_get_field($stmt, 0 );
  		$filecontent=stream_get_contents($data);
  		
  		//$dom->encoding = 'UTF-8';
  		$xml->loadXML($filecontent);
  	}

  	$groups = $xml->getElementsByTagName('group');
  	
  	$hemldate.='<table width="100%" border="0" cellpadding="0" cellspacing="1">';
  	foreach ($groups as $group) {
  		$as=$group -> getAttribute('name');
  		$hemldate.='<tr>';
  		$hemldate.='<td colspan="2"  id="xj"  class="title_new_class">'.'<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>'.$as.'</td></tr>';
  		$hemldate.='<tr><td>';
  		$hemldate.='<table width="100%" border="0" cellpadding="0" cellspacing="1" style="border-collapse: collapse;"><tr style="font-weight: bolder;">';
  		$hemldate.='<td>参数名称</td><td>参数值</td>';
  		$hemldate.='</tr>';
        $itmesnames=$group->getElementsByTagName('item');
  		//$itmesnames=$group->firstChild->nodeValue;
  		$ii=$itmesnames->length;
  		
  		foreach ($itmesnames as $itmesname) {

  			$infonames=$itmesname->firstChild->nodeValue; 			
  			$info= $itmesname->lastChild->nodeValue;
  			$hemldate.='<tr onmousemove="this.className=\'bg\'" onmouseout="this.className=\'normal\'">  <td style="border-bottom: 1px solid #d9e9e7; width: 400px; padding: 3px; border-right: 1px solid #d9e9e7;">';
  			$hemldate.=$infonames.'</td>';
  			$hemldate.='<td style="border-bottom: 1px solid #d9e9e7;">';
  			$hemldate.=$info.'</td>';
  			$hemldate.='</tr>';
  		}
  		$hemldate.='</table></td></tr>';
  	
  		//echo  $a=$book -> getAttribute('infoName');
  			
  	}
  	$hemldate.='</table>';
  }	
  sqlsrv_free_stmt( $stmt);
  
  sqlsrv_close($conn);
 	
 	return $hemldate;
 }
 //替换原件
 function GetReplaceProduct($pid)
 {
 	global $pricemsdb;
 	$modelcat = array();
 	$facturerecat = array();
 	$condition = "F_Product_ID='$pid'";
 	$result = $pricemsdb->get_one("select F_Model   from dbo.T_Product  where $condition",'CACHE');
 	$fmodel= iconv('gb2312', 'UTF-8', $result["F_Model"]);
 	$isEqual=false;
 	$conditions = " F_Model='$result[F_Model]'";
 	$replacelist= $pricemsdb->query("select convert(varchar(MAX),F_Replace)as F_Replace  from dbo.T_Product_Replace where $conditions",'CACHE');
 	
 	while($r = $pricemsdb->fetch_array($replacelist))
 	{
 		$xml = new DOMDocument();
 		$xml->loadXML(iconv('gb2312', 'UTF-8', $r["F_Replace"]));
 		$manufacturerNames = $xml->getElementsByTagName('ManufacturerName');
 		$models = $xml->getElementsByTagName('Model');
 		$i=0;
 		$y=0;
 		$x=0;
 		foreach ($models as $model)
 		{
 			$modelvalue=$model->firstChild->nodeValue;
 			
 				$isEqual=true;
 				$x=$i;
 			
 			
 				$modelcat[]=$modelvalue;
 			
 			
 			$i++;
 		
 		}
 		foreach ($manufacturerNames as $manufacturerName)
 		{
 			$manufactuevalue=$manufacturerName->firstChild->nodeValue;
 			
 		    $facturerecat[]=$manufactuevalue;
 		
 			$y++;
 		}
 		if(!$isEqual)
 		{
 			unset($modelcat);
 			unset($facturerecat);
 			
 		}
 		else
 		{	
 			break;	
 		}
 		
 	
 	}
 	$coundmodel= count($modelcat);
 	$htmlreplace="";
 	if($coundmodel>0)
 	{
 		$htmlreplace="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" style=\"border-collapse: collapse;\">";
 		$htmlreplace.="<tr align=\"center\" class=\"table_class\"; width=\"100%\">";
 		$htmlreplace.="<td class=\"td_class\" align=\"center\">序号</td>";
 		$htmlreplace.="<td   class=\"td_class\" align=\"center\" >型号</td>";
 		$htmlreplace.="<td class=\"td_class\"  align=\"center\" >厂家 </td>";
 		$htmlreplace.="<td  class=\"td_class\" align=\"center\">￥表价</td>";
 		$htmlreplace.="</tr>";
 		
 		for($j=0;$j<count($modelcat);$j++)
 		{
 			
 		$modelinfos=$modelcat[$j];
 			
 		$condition = "F_Model ='".iconv('UTF-8','gb2312',$modelinfos)."'";
 		$priceinfo= $pricemsdb->get_one("select F_Model,F_Price  from dbo.T_Product where $condition",'CACHE');
 			
 		$htmlreplace.="<tr  onmousemove=\"this.className='bg'\" onmouseout=\"this.className='normal'\">";
 		$index=$j+1;
 				$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$index</td>";
 				$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$modelcat[$j]</td>";
 				$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$facturerecat[$j]</td>";
 					
 				if (in_array($priceinfo[F_Model], $modelcat))
 				{
 		
 				$price=$priceinfo[F_Price];
 				}
 					else
 					{
 						
 						$price="暂无信息";
 				}
 					
 				$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$price</td>";
 				$htmlreplace.="</tr>";
 				//alert($j+"<br>");
 				}
 		
 	$htmlreplace.="</table>";
 	}
 	
 	
    return $htmlreplace;
 }

 
 function GetSample($pid)
 {
 	global $pricemsdb;
 	$modelcat = array();
 	$condition="F_Class_ID =(select F_Class_ID from dbo.T_Product where F_Product_ID='$pid')";
 	$sample= $pricemsdb->query("select F_Sample from T_Class where $condition ",'CACHE');
 	$samplefile="../file/upload/samplefile/";
 	$htmlsample="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" style=\"border-collapse: collapse;\">";
 	$htmlsample.="<tr align=\"center\" class=\"table_class\"; width=\"100%\">";
 	$htmlsample.="<td class=\"td_class\" align=\"center\">名称</td>";
 	$htmlsample.="<td  align=\"center\" class=\"td_class\">大小</td>";
 	$htmlsample.="<td  align=\"center\" class=\"td_class\">下载</td>";
 	$htmlsample.="</tr>";
 	while($r = $pricemsdb->fetch_array($sample))
 	{
 		$fname = $r[F_Sample];
 		if(strstr($fname,'|'))
 		{
 			$samplename=explode('|',$fname);
 		}
 		else 
 		{
 			$samplename[]=$fname;
 		}
// 		$samplename=explode('|',$fname);
 		if(count($samplename)>0)
 		{
 			for($i=0;$i<count($samplename);$i++)
 			{
 				$htmlsample.="<tr>";
 				$filename= iconv('gb2312', 'UTF-8', $samplename[$i]);
 				$htmlsample.="<td class=\"td_class_name\" align=\"center\">".$filename."</td>";
 				if(file_exists($samplefile.$samplename[$i]))
 				{
 					
 					$file= filesize($samplefile.$samplename[$i]);
 					$filesizes=_format_bytes($file);
 				}
 				else
 				{
 				
 					$filesizes="文件不存在";
 				}
 				
 				$filedir="../file/upload/samplefile/{$filename}";
 				$titles=explode('.', $filename)	;
 				$htmlsample.="<td class=\"td_class_name\" align=\"center\">$filesizes</td>";
 			    if($filesizes=="文件不存在")
 				{
 					$htmlsample.="<td class=\"td_class_name\" align=\"center\">暂时不能下载</td>";
 				}
 				else 
 				{
 					$htmlsample.="<td class=\"td_class_name\" align=\"center\"><a href=\"http://127.0.0.1:8181/price/show.php?auth={$filedir}&title={$titles[0]}&pid={$pid}\" class=\"downurlprice\">文件下载</a></td>";
 				}
 				
 				$htmlsample.="</tr>";
 			}
 		}
 		
 	}
 	if($fname)
 	{
 		$htmlsample.="</table>";
 	}
 	else
 	{
 		$htmlsample="";
 	}
 	
 	return $htmlsample;
 	
 }
 

 
 
 function getDiscount($discount,$price)
 {
 	$c=number_format((1-$discount)*$price,2);
 	
 	return $c;
 }
 
 function discountprice($discount,$price)
 {
 	$c=number_format($discount*$price, 2, '.', '');

 
 	return $c;
 }
 
 function Productinfo($pid)
 {
 	global $pricemsdb;
 	
 	$condition="p.F_Class_ID=c.F_Class_ID and c.F_Manufacturer_ID=M.F_Manufacturer_ID and M.F_Manufacturer_ID=t.F_Manufacturer_ID and P.F_Product_ID='$pid' ";
 	$product= $pricemsdb->get_one("select top 1 p.F_Price,CONVERT(varchar(36),t.F_Manufacturer_ID,36)as F_Manufacturer_ID,CONVERT(varchar(36),c.F_Class_ID,36)as F_Class_ID,t.F_Discount,p.F_Pic,p.F_Model from T_Manufacturer m,T_Class c,T_Product p,T_ManufacturerDiscount t where $condition order by F_Discount asc",'CACHE');
    if($product['F_Model']==""||$product['F_Model']==null)
    {
    	$condition=" p.F_Class_ID=c.F_Class_ID and p.F_Product_ID='$pid' ";
    	$product= $pricemsdb->get_one("select p.F_Pic,c.F_Name,p.F_Model,p.F_Price,CONVERT(varchar(36),c.F_Manufacturer_ID,36)as F_Manufacturer_ID,CONVERT(varchar(36),c.F_Class_ID,36)as F_Class_ID,CONVERT(varchar(36),p.F_Product_ID,36)as F_Product_ID from dbo.T_Product p,T_Class c where $condition",'CACHE');
    }
 	return $product;
 	
 	
 }
 
 function pricedownload($file_dir,$file_name)
 //参数说明：
 //file_dir:文件所在目录
 //file_name:文件名
 {
 	$file_dir = chop($file_dir);//去掉路径中多余的空格
 	//得出要下载的文件的路径
 	if($file_dir !="")
 	{
 		$file_path = $file_dir;
 		if(substr($file_dir,strlen($file_dir)-1,strlen($file_dir)) != "")
 				$file_path .= "";
 				$file_path .= $file_name;
 	}
 	else
 		$file_path = $file_name;
 
 	//判断要下载的文件是否存在
 	if(!file_exists($file_path))
 	{
 		echo "对不起,你要下载的文件不存在";
 		return false;
 	}
 
 	$file_size = filesize($file_path);
 
 	header("Content-type: application/octet-stream");
 	header("Accept-Ranges: bytes");
 	header("Accept-Length: $file_size");
 	header("Content-Disposition: attachment; filename=".$file_name);
 
 	$fp = fopen($file_path,"r");
 	$buffer_size = 1024;
 	$cur_pos = 0;
 
 	while(!feof($fp)&&$file_size-$cur_pos>$buffer_size)
 	{
 		$buffer = fread($fp,$buffer_size);
 		echo $buffer;
 		$cur_pos += $buffer_size;
 	}
 
 	$buffer = fread($fp,$file_size-$cur_pos);
 	echo $buffer;
 	fclose($fp);
 	return true;
 
 }

  function companyurl($pid)
  {
  	global $pricemsdb;
  	global $db;
  	
  	$condition="F_Manufacturer_ID=(select F_Manufacturer_ID from T_Class where F_Class_ID = (select F_Class_ID from T_Product where F_Product_ID ='$pid'))";
  	$companyname= $pricemsdb->get_one("select F_Manufacturer_ID,F_Name,F_Brand,F_Logo,F_Email,F_URL,F_ADDRESS,F_Tel from T_Manufacturer where $condition ",'CACHE');
  	$name= iconv('gbk', 'UTF-8',$companyname['F_Name']);
  	if($name!=""&&$name!=null)
  	{
  		//$mysqlname=iconv('gb2312','UTF-8', $companyname['F_Name']);
  		$condition="company='$name'";
  	
  		$company= $db->get_one("select username from destoon_company where $condition ",'CACHE');
  		
  	}
  	return $company;
  }
  
  /**
   * @param unknown_type $pid
   * @return string
   */
  function attachmentslist($pid)
  {
  	global $pricemsdb;
   $modelcat = array();
   $arraylist = array();
   $condition="F_Product_ID='$pid' and F_ProductAppendix_CustomID <> ''";
   $companyname= $pricemsdb->get_one("select F_ProductAppendix_CustomID from T_Product  where $condition ",'CACHE');
   if($companyname!=""&&$companyname!=null)
   {
   	$customlist=explode(',', $companyname['F_ProductAppendix_CustomID']);
  
   	for($i=0;$i<count($customlist);$i++)
   	{
   		if(strpos($customlist[$i],"*"))
   		{
   			$containsstring.= "'".rtrim($customlist[$i],"*")."',";
   			$selecttype.=rtrim($customlist[$i],"*").",";
   		}
   		else
   		{	
   			$customid.= "'".$customlist[$i]."',";
   			$qtype.=$customlist[$i].",";
   		}
   	}
   	$qtype=rtrim($qtype,",");
   	$containsstring=rtrim($containsstring,",");
   	$selecttype=rtrim($selecttype,",");
   	$customid=rtrim($customid,",");
   	$modelcat[]=$containsstring;
   	$modelcat[]=$customid;
   
   }
 
   $calssinfos="";
   //判断是否是必须附件
   if(count($modelcat)>0)
   {
   	$m=0;
   	for($j=0;$j<count($modelcat);$j++)
   	{
   		if($modelcat[$j]!="")
   		{
   			$conditions="F_CustomID in ( $modelcat[$j])and F_Class_ID in (select F_Class_ID from T_Class where F_ParentID=(select F_Class_ID from T_Product where F_Product_ID='$pid'))";
   			$customs= $pricemsdb->query("select  CONVERT(varchar(36),F_Class_ID,36)as F_Class_ID,F_InnerModel,F_Model,F_CustomID from T_ProductAppendix where $conditions ",'CACHE');
   		    if($customs!=""&&$customs!=null)
   		    {
   		    	$classid="";
   		    	while($r = $pricemsdb->fetch_array($customs))
   		    	{
   		    		if(!strstr($classid,$r['F_Class_ID']))
   		    		{
   		    			$classid.="'".$r['F_Class_ID']."',";
   		    		}		
   		    	}
   		    	 
   		    	$classid=rtrim($classid,",");
   		    	if($j==0)
   		    	{
   		    		$calssinfos=$classid;
   		    	}
   		    	if($classid!=""&&$classid!=null)
   		    	{
   		    		$wy=" F_Class_ID in($classid)order by F_ProductAppendix_TypeName";
   		    		$custombyinfo= $pricemsdb->query("select F_Name,CONVERT(varchar(36),F_Class_ID,36)as F_Class_ID,F_ParentID,F_ProductAppendix_TypeName from T_Class where $wy ",'CACHE');
   		    		
   		    		$table=array();
   		    		while($l = $pricemsdb->fetch_array($custombyinfo))
   		    		{
   		    			$table[]=$l;
   		    		}
   		    		 
   		    		for($x=0;$x<count($table);$x++)
   		    		{
   		    		$typeName =iconv('gb2312', 'UTF-8', $table[$x][F_ProductAppendix_TypeName]);
   		    		$checkvalue =iconv('gb2312', 'UTF-8', $table[$x][F_Name]);
   		 
   		    		if ($x == 0|| $x > 0 && iconv('gb2312', 'UTF-8', $table[$x - 1]['F_ProductAppendix_TypeName'])!= $typeName)
   		    		{
   		    		
   		    			$ret.="<span  style=\"font-size:12px;font-weight:bold;line-height:30px;  \"><img src=\"../file/image/rightg.gif\" border=\"0\" />&nbsp;$typeName</span><br/>";
   		    		   		    			 
   		    		   $ret.="<span>";
   		    		}
   		    		if ( $j== 0)
   		    		{
   		    		$ret.="<input class=\"checkspanclass\" id=\"chbox{$table[$x]['F_Class_ID']}\" checked=\"checked\" type=\"checkbox\" name=\"cb$table[$x][F_Class_ID']\" 	disabled=\"disabled\" value=\"$checkvalue\"  />&nbsp;<span class=\"pricespan\"   onclick=\"getClickChange('{$table[$x]['F_Class_ID']}','$pid','{$selecttype}','',1,0);\" >".iconv('gb2312', 'UTF-8', $table[$x]['F_Name'])."</span>&nbsp;";
   		    		}
   		    		else
   		    		{
   		    		$ret.="<input id=\"chbox{$table[$x]['F_Class_ID']}\"  type=\"checkbox\" name=\"cb{$table[$x]['F_Class_ID']}\" value=\"$checkvalue\"  onclick=\"getClickChange('{$table[$x]['F_Class_ID']}','$pid','{$qtype}','',1,1);\" />&nbsp;<span class=\"pricespan\"  onclick=\"getClickChange('{$table[$x]['F_Class_ID']}','$pid','{$qtype}','',1,2);\" >".iconv('gb2312', 'UTF-8',$table[$x]['F_Name'])."</span>&nbsp;";
   		    		 
   		 
   		    		}
   		    		 
   		    		if ($x == Count($table) - 1 ||iconv('gb2312', 'UTF-8', $table[$x + 1]['F_ProductAppendix_TypeName'])!= $typeName)
   		    		{
   		    		
   		    		$ret.="</span><br/>";
   		    		}
   		    		 
   		    		}
   		    	}
   		    	
   		    }
   		


   		}

   }
   }
   $arraylist=array(
   	"ret"=>$ret,
	"qtype"=>$containsstring,
   	
   );
     return $arraylist;
  }
  
  function ManyImage($pid)
  {
  	global $pricemsdb;
  	$conditions=" F_Product_ID='$pid'";
  	$customs= $pricemsdb->get_one("select  F_Pic,F_FrontView,F_SideView,F_LayoutView,F_Shape_Diagram,F_Install_Diagram,F_Wiring_Diagram,F_Opening_Pote_Diagram  from T_Product where $conditions ",'CACHE');
  	$productimage=iconv('gb2312', 'UTF-8', $customs["F_Pic"]);
  	$htmlinfo=" <img alt=\"\" src=\"../file/upload/ProductImage/{$productimage}\" style=\"width:200px;height:250px\";/>";
  	return $htmlinfo;
  }
  
  
  function islevel($pid)
  {
  	global $pricemsdb;
  	$conditions=" F_ParentID='$pid'";
  	$table="T_Category";
  	$customs= $pricemsdb->count($table,$conditions);
  	return $customs;
  }
  
  function priceopen()
  {
  	global $db;
    $result = $db->get_one("select HotSpot from  destoon_price_hot where Type=3 and HotSpot!=''");
    $openurl="";
    if($result['HotSpot']!="")
    {
    	$openurl=$result['HotSpot'];
    }
   
    
    return $openurl;
    
  }

  
  
  
  function getinfos($pid,$type)
  {
  	global $pricemsdb;
  	$modelcat = array();
  	$facturerecat = array();
  	$classprice=0;
  	$namelist="";
  	$pricelist=0;
  	$condition = "F_Product_ID='$pid'";
  	$result = $pricemsdb->get_one("select F_Model,F_Price,F_Issue_Date   from dbo.T_Product  where $condition",'CACHE');
  	$fmodel= iconv('gb2312', 'UTF-8', $result["F_Model"]);
  	$fprice=number_format($result["F_Price"],2);
  	$fdate= $result["F_Issue_Date"];
  	$isEqual=false;
  	
  	
  	

  	$htmlreplace="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\" style=\"border-collapse: collapse;\">";
  	$htmlreplace.="<tr align=\"center\" class=\"table_class\"; width=\"100%\">";
  	$htmlreplace.="<td class=\"td_class\" align=\"center\">部件</td>";
  	$htmlreplace.="<td   class=\"td_class\" align=\"center\" >￥价格</td>";
  	//$htmlreplace.="<td class=\"td_class\"  align=\"center\" >发布时间 </td>";
  
  	$htmlreplace.="</tr>";
  	$htmlreplace.="<tr  onmousemove=\"this.className='bg'\" onmouseout=\"this.className='normal'\">";
  	
  	$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$fmodel</td>";
  	$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$fprice</td>";
  //	$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$fdate</td>";
  	$htmlreplace.="</tr>";
  	$namelist=$fmodel.",";
  	if(strstr($fprice,','))
  	{
  	 $fprice=str_replace(',','',$fprice);
  	}
  	$pricelist=$fprice.",";
  	
  	$issole=array();
   if($type!=""&&$type!=null)
   {
   	$conditions="F_CustomID in ($type)and F_Class_ID in (select F_Class_ID from T_Class where F_ParentID=(select F_Class_ID from T_Product where F_Product_ID='$pid'))";
   	$customs= $pricemsdb->query("select  CONVERT(varchar(36),F_Class_ID,36)as F_Class_ID,F_InnerModel,F_Model,F_Issue_Date,F_CustomID,F_Price from T_ProductAppendix where $conditions ",'CACHE');
   	 
   	while($l = $pricemsdb->fetch_array($customs))
   	{
   		if(!in_array($l['F_Class_ID'],$issole))
   		{
   			$accessoriesmodel= iconv('gb2312', 'UTF-8', $l['F_Model']);
   			$accessoriesdate= $l['F_Issue_Date'];
   			$accessoriesprice=number_format($l['F_Price'],2);
   			$htmlreplace.="<tr  onmousemove=\"this.className='bg'\" onmouseout=\"this.className='normal'\">";
   				
   			$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$accessoriesmodel</td>";
   			$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$accessoriesprice</td>";
   		//	$htmlreplace.="<td  align=\"center\" class=\"td_class_name\">$accessoriesdate</td>";
   			$htmlreplace.="</tr>";
   			$issole[]=$l['F_Class_ID'];
   			
   			$namelist.=$accessoriesmodel.",";
   			if(strstr($accessoriesprice,','))
   			{
   				$accessoriesprice=str_replace(',','',$accessoriesprice);
   			}
   			$pricelist.=$accessoriesprice.",";
   			$classprice+=$accessoriesprice;
   		}
   		
   	}
   }
   $namelist=rtrim($namelist,",");
   $pricelist=rtrim($pricelist,",");
  
  	$htmlreplace.="</table>";
  	
  	
  	$arrlist=array(
  			"htmlreplace"=>$htmlreplace,
  			"namelist"=>$namelist,
  			"pricelist"=>$pricelist,
  			"classprice"=>$classprice
  			);
  
   	return $arrlist;
  }
  
  function GetCidandTreed($pid)
  {
  	global $pricemsdb;
  	$condition = "F_Product_ID='$pid'";
  	$result = $pricemsdb->get_one("select  a.F_Product_ID,a.F_Unit, a.F_Model, a.F_Price,a.F_Issue_Date,a.F_Visit_Numbers,c.F_Name,a.F_Pic,CONVERT(varchar(36),c.F_Manufacturer_ID,36)as F_Manufacturer_ID,CONVERT(varchar(36),b.F_Class_ID,36)as F_Class_ID from T_Product a left join T_Class b on a.F_Class_ID = b.F_Class_ID left join T_Manufacturer c on b.F_Manufacturer_ID=c.F_Manufacturer_ID  where $condition",'CACHE');
  	if($result!=null)
  	{
  		$arrlist=array(
  				"aid"=>$result['F_Manufacturer_ID'],
  				"treeid"=>$result['F_Class_ID']
  		);
  	}
  	
  	return $arrlist;
  }
 
 
 function getModelDate($date)
 {
 	if($date)
 	{
 		$newdate=explode(' ', $date);
 		return $newdate[0];
 	}
 }
 //元件库首页
 function getclasschild($classarray,$i,$pi,$classjsonstr){
 	
 	foreach ($classarray as $r){
 		$i++;
 		if(count($r[children])==0){
	 		if($i==2){
				$classjsonstr.='{"id":'.$i.',"pId":'.$pi.',"name":"'.$r[cname].'","cid":"'.$r[cid].'","pcid":"'.$r[pid].'","fid":"0"}';
	 		}
	 		else{
	 			$classjsonstr.=',{"id":'.$i.',"pId":'.$pi.',"name":"'.$r[cname].'","cid":"'.$r[cid].'","pcid":"'.$r[pid].'","fid":"0"}';
	 		}
 		}
 		else{
 			if($i==2){
 				$classjsonstr.='{"id":'.$i.',"pId":'.$pi.',"name":"'.$r[cname].'","open":false,"cid":"'.$r[cid].'","fid":"1"}';
 			}
 			else{
 				$classjsonstr.=',{"id":'.$i.',"pId":'.$pi.',"name":"'.$r[cname].'","open":false,"cid":"'.$r[cid].'","fid":"1"}';
 			}
 		}
 		$pid=$i;
 		getclasschild($r[children],&$i,$pid,&$classjsonstr);
	}
 }
 //选型界面
 function getclasselementchild($classarray,$i,$pi,$classjsonstr){
 
 	foreach ($classarray as $r){
 		$i++;
 		if(count($r[children])==0){
 			if($i==2){
 				$classjsonstr.='{"id":'.$i.',"pId":'.$pi.',"name":"'.$r[cname].'","cid":"'.$r[cid].'","pcid":"'.$r[pid].'"}';
 			}
 			else{
 				$classjsonstr.=',{"id":'.$i.',"pId":'.$pi.',"name":"'.$r[cname].'","cid":"'.$r[cid].'","pcid":"'.$r[pid].'"}';
 			}
 		}
 		else{
 			if($i==2){
 				$classjsonstr.='{"id":'.$i.',"pId":'.$pi.',"name":"'.$r[cname].'","open":false,"cid":"'.$r[cid].'","pcid":"'.$r[pid].'"}';
 			}
 			else{
 				$classjsonstr.=',{"id":'.$i.',"pId":'.$pi.',"name":"'.$r[cname].'","open":false,"cid":"'.$r[cid].'","pcid":"'.$r[pid].'"}';
 			}
 		}
 		$pid=$i;
 		getclasselementchild($r[children],&$i,$pid,&$classjsonstr);
 	}
 }
 //系列搜索
 function getsearchclasschild($classarray,$i,$pi,$classjsonstr){
 
 	foreach ($classarray as $r){
 		$i++;
 		if(count($r[children])==0){
 			if(strlen($classjsonstr)==1){
 				$classjsonstr.='{"id":'.$i.',"name":"'.$r[cname].'","py":"'.$r[py].'"}';
 			}
 			else{
 				$classjsonstr.=',{"id":'.$i.',"name":"'.$r[cname].'","py":"'.$r[py].'"}';
 			}
 		}
 		else{
 			
 		}
 		$pid=$i;
 		getsearchclasschild($r[children],&$i,$pid,&$classjsonstr);
 	}
 }
 
 function classArrayloop($arr,$pid='') {
 	$ret = array();
 	foreach($arr as $k => $v) {
 		if($v['pid'] == $pid) {
 			$tmp = $arr[$k];unset($arr[$k]);
 			$tmp['children'] = classArrayloop($arr,$v['cid']);
 			$ret[] = $tmp;
 		}
 	}
 	return $ret;
 }
 
 
 /**
  * @param string 汉字
  * @return 返回汉字拼音首字母
  */
 function getfirstchar($s0){
 	$fchar = ord($s0{0});
 	if($fchar >= ord("A") and $fchar <= ord("z") )return strtoupper($s0{0});
 	$s1 = iconv("UTF-8","gb2312", $s0);
 	$s2 = iconv("gb2312","UTF-8", $s1);
 	if($s2 == $s0){$s = $s1;}else{$s = $s0;}
 	$asc = ord($s{0}) * 256 + ord($s{1}) - 65536;
 	if($asc >= -20319 and $asc <= -20284) return "A";
 	if($asc >= -20283 and $asc <= -19776) return "B";
 	if($asc >= -19775 and $asc <= -19219) return "C";
 	if($asc >= -19218 and $asc <= -18711) return "D";
 	if($asc >= -18710 and $asc <= -18527) return "E";
 	if($asc >= -18526 and $asc <= -18240) return "F";
 	if($asc >= -18239 and $asc <= -17923) return "G";
 	if($asc >= -17922 and $asc <= -17418) return "H";
 	if($asc >= -17417 and $asc <= -16475) return "J";
 	if($asc >= -16474 and $asc <= -16213) return "K";
 	if($asc >= -16212 and $asc <= -15641) return "L";
 	if($asc >= -15640 and $asc <= -15166) return "M";
 	if($asc >= -15165 and $asc <= -14923) return "N";
 	if($asc >= -14922 and $asc <= -14915) return "O";
 	if($asc >= -14914 and $asc <= -14631) return "P";
 	if($asc >= -14630 and $asc <= -14150) return "Q";
 	if($asc >= -14149 and $asc <= -14091) return "R";
 	if($asc >= -14090 and $asc <= -13319) return "S";
 	if($asc >= -13318 and $asc <= -12839) return "T";
 	if($asc >= -12838 and $asc <= -12557) return "W";
 	if($asc >= -12556 and $asc <= -11848) return "X";
 	if($asc >= -11847 and $asc <= -11056) return "Y";
 	if($asc >= -11055 and $asc <= -10247) return "Z";
 	return null;
 }
  
?>