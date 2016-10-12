<?php
define('DT_REWRITE', true);
require 'config.inc.php';
require '../common.inc.php';
$module='webprice';
require DT_ROOT.'/'.$module.'/common.inc.php';

echo '{"items": [{"imageUrl": "a1.jpg?v=201406061019","targetUrl": "javascript:void(0);"},{"imageUrl": "b1.jpg?v=201406061019","targetUrl": "javascript:void(0);"}]}';
exit;

?>