<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getdata($n) {
    $dataarr = array();
    for ($i = 0; $i < 5; $i++) {
        $dataarr[] = $i . "shuju";
    }
    return $dataarr;
}

$d = getdata(1);
//echo "<pre>";
//var_dump($d);
//die;
