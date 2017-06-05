<?php

$d = array();

//sleep(秒) usleep(毫秒) 让它睡上一会。
sleep(3);
for ($i = 0; $i < 20; $i++) {
    $d[$i]["name"] = GetRandStr(5);
    $d[$i]["age"] = rand(1, 99);
    $d[$i]["hz"] = getRndWords("", 4);
}
//echo "<pre>";
//var_dump($d);
echo json_encode($d);
die();

function GetRandStr($len) {
    $chars = array(
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    $charsLen = count($chars) - 1;
    shuffle($chars);
    $output = '';
    for ($i = 0; $i < $len; $i++) {
        $output .= $chars[mt_rand(0, $charsLen)];
    }
    return $output;
}

/**
 * 随机生成N个汉字 
 * @param  string $giveStr  必须含有的字 
 * @param  int $num 需要生成多少个汉字 
 * @return string 返回生成的字符串 
 */
function getRndWords($giveStr = "", $num) {
    //# 字库  
    $str = "北京澜声科技有限公司的主要产品是听见啦金玉良缘冰清玉"
            . "洁继往开来锦绣山河冰雪聪明功成名就桃花潭水深千尺"
            . "不及汪伦送我情先帝创业未半而中道今天下三分益州疲"
            . "弊此诚危急存亡之秋也然侍卫之臣不懈于内忠志之士忘身"
            . "于外者盖追先帝之殊遇欲报之于陛下也诚宜开张圣听";
    $newStr = "";       # 随机生成的包含答案的字符串  
    $anLo = array();  # 设定的答案所在的位置。  
    $bit = 3;        # 位数，在本系统中是utf-8编码，一个中文长度为3  
    $anLenth = floor(strlen($giveStr) / $bit); # 答案长度,在UTF编码中，  
    # 这些汉字在18个汉字中的位置  
    $i = 0;
    while ($i < $anLenth) {
        $rd = rand(0, $num - 1);
        if (in_array($rd, $anLo))
            continue;# 保证了不重复。  
        $anLo[] = $rd;
        $i++;
    }

    for ($j = 0; $j < $num; $j++) {
        if (in_array($j, $anLo)) {
            $k = array_search($j, $anLo);
            $newStr .= mb_substr($giveStr, $k * $bit, $bit); #echo $newStr."<br>";  
        } else {
            $rd = rand(0, (strlen($str) - 1) / $bit);
            $wd = mb_substr($str, $rd * $bit, $bit);
            $str = str_replace($wd, '', $str);
            $newStr .= $wd;
        }
    }
    return $newStr;
}
