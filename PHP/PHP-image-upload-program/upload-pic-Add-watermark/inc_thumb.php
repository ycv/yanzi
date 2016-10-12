<?php

/* 构造函数-生成缩略图+水印,参数说明:
  $srcFile-图片文件名,
  $dstFile-另存文件名,
  $markwords-水印文字,
  $markimage-水印图片,
  $dstW-图片保存宽度,
  $dstH-图片保存高度,
  $rate-图片保存品质
  makethumb("a.jpg","b.jpg","50","50");
 */

function makethumb($srcFile, $dstFile, $dstW, $dstH, $rate = 100, $markwords = null, $markimage = null) {
    //查看当前编码
    $encode = mb_detect_encoding($markwords, array("ASCII", "UTF-8", "GB2312", "GBK", "BIG5"));
    $data = GetImageSize($srcFile);
    switch ($data[2]) {
        case 1:
            $im = @imageCreateFromGIF($srcFile);
            break;
        case 2:
            $im = @imageCreateFromJPEG($srcFile);
            break;
        case 3:
            $im = @imageCreateFromPNG($srcFile);
            break;
    }
    if (!$im) {
        return False;
    }

    $srcW = ImageSX($im);
    $srcH = ImageSY($im);
    $dstX = 0;
    $dstY = 0;
    if ($srcW * $dstH > $srcH * $dstW) {
        $fdstH = round($srcH * $dstW / $srcW);
        $dstY = floor(($dstH - $fdstH) / 2);
        $fdstW = $dstW;
    } else {
        $fdstW = round($srcW * $dstH / $srcH);
        $dstX = floor(($dstW - $fdstW) / 2);
        $fdstH = $dstH;
    }
    $ni = ImageCreateTrueColor($dstW, $dstH);
    $dstX = ($dstX < 0) ? 0 : $dstX;
    $dstY = ($dstX < 0) ? 0 : $dstY;
    $dstX = ($dstX > ($dstW / 2)) ? floor($dstW / 2) : $dstX;
    $dstY = ($dstY > ($dstH / 2)) ? floor($dstH / s) : $dstY;
    $white = ImageColorAllocate($ni, 255, 255, 255);
    $black = ImageColorAllocate($ni, 0, 255, 0);
    // echo $black;die;
    imagefilledrectangle($ni, 0, 0, $dstW, $dstH, $white); // 填充背景色 
    ImageCopyResized($ni, $im, $dstX, $dstY, 0, 0, $fdstW, $fdstH, $srcW, $srcH);
    if ($markwords != null) {
        //转换文字编码 
        if ("UTF-8" != $encode) {
            $markwords = iconv('GB2312', 'UTF-8', $markwords);
        }
        //写入文字水印 
        //参数依次为，文字大小|偏转度|横坐标|纵坐标|文字颜色|文字类型|文字内容 
        //ImageTTFText($ni, 20, 30, 450, 560, $black, "simhei.ttf", $markwords);  
        ImageTTFText($ni, 20, 30, 150, 260, $black, "simhei.ttf", $markwords);
    } elseif ($markimage != null) {
        $wimage_data = GetImageSize($markimage);
        switch ($wimage_data[2]) {
            case 1:
                $wimage = @ImageCreateFromGIF($markimage);
                break;
            case 2:
                $wimage = @ImageCreateFromJPEG($markimage);
                break;
            case 3:
                $wimage = @ImageCreateFromPNG($markimage);
                break;
        }
        imagecopy($ni, $wimage, 500, 560, 0, 0, 88, 31); //写入图片水印,水印图片大小默认为88*31 
        imagedestroy($wimage);
    }
    ImageJpeg($ni, $dstFile, $rate);
    ImageJpeg($ni, $srcFile, $rate);
    imagedestroy($im);
    imagedestroy($ni);
}

?>