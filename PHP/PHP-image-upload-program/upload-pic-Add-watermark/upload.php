<?PHP

/* $target = "upload/";
  $target = $target.basename($_FILES['uploaded']['name']);
  $ok = 1;
  if(move_uploaded_file($_FILES['uploaded']['temp_name'], $target))
  {
  echo "The file ". basename( $_FILES['uploadedfile']['name']). " has been uploaded";
  }
  else
  {
  echo "Sorry, there was a problem uploading your file.";
  } */

require_once 'inc_thumb.php';
$pp = "upload/";
$FileID = date("Ymd-His") . '-' . rand(100, 999);
/* $typeName = basename($_FILES['uploaded']['name']);
  $indexFrom = strpos($typeName, ".");
  $jpgLength =  strlen($typeName); */
$target = $pp . $FileID; //.substr($typeName, $indexFrom, $jpgLength-$indexFrom);//basename($_FILES['uploaded']['name']);
$thumb = $pp . $FileID . "th" . basename($_FILES['uploaded']['name']);

$target = $target . ".jpg";
$ok = 1;
//echo "------".substr($typeName, $indexFrom, $jpgLength-$indexFrom)."---".$target."--";
if (move_uploaded_file($_FILES['uploaded']['tmp_name'], $target)) {
    makethumb($target, $thumb, "534", "675", "100", "   sss        真的", null);
    echo "The file " . basename($_FILES['uploaded']['name']) . " has been uploaded successful.";
} else {
    echo "Sorry, there was a problem uploading your file.failed";
}
