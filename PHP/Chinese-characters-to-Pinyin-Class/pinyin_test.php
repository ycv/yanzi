<?php

/**
 * Created by PhpStorm.
 * User: jifei
 * Date: 15/6/25
 */
include_once 'Pinyin.php';
echo Pinyin::getPinyin("腾讯网QQ");
echo "<hr>";
echo Pinyin::getShortPinyin("腾讯网QQ");
echo "<hr>";
