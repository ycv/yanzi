function isNumeric(value) {
    if (value == null || !value.toString().match(/^[-]?\d*\.?\d*$/)) {
        return false;
    }
    return true;
}
// Initial call
$(document).ready(function () {
    var jquery_paging_html = '<div id="jquery_div_paging_lzb" ><nav id="test1_m_left"></nav><nav id="test1_o_left"></nav><div class="paginator_p_wrap"><div class="paginator_p_bloc"></div></div><nav id="test1_o_right"></nav><nav id="test1_m_right"></nav><div class="paginator_slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"><a class="ui-slider-handle ui-state-default ui-corner-all" href="#"></a></div></div>';
    $("#suobainq").html(jquery_paging_html);
    $("#jquery_div_paging_lzb").jPaginator({
        nbPages: 235, //页总数
        selectedPage: 12, //当前页
        overBtnLeft: '#test1_o_left', //元素ID的按钮（鼠标悬停在左前进）
        overBtnRight: '#test1_o_right', //在右键的元素ID（向后移动鼠标悬停）
        maxBtnLeft: '#test1_m_left', //元素的最大左键的元素（去第一个幻灯片点击）
        maxBtnRight: '#test1_m_right', //元素的最大按钮右键（去最后一个幻灯片点击）
        minSlidesForSlider: 5, //显示滑块的最小数量的幻灯片。例如：如果nbpages = 32和nbvisible = 10，32 / 10 = 4幻灯片，所以如果minslidesforslider = 5然后滑块不会显示。
        //函数调用时，页码点击（其中a的页面根元素）      
        onPageClicked: function (a, num) {
            console.log(a);
            console.log(num);
            console.log("---------");
        }
    });

    /**
     $("#resetdemo1").click(function () {
     if (!isNumeric($("#nbpages1").val()))
     return;
     $("#jquery_div_paging_lzb").trigger("reset", {
     selectedPage: null,
     nbVisible: 6, //幻灯片的页面数
     nbPages: $("#nbpages1").val(), //页总数
     marginPx: 8, //页号边缘（像素）
     speed: 1//动画速度(1 to 5)
     });
     $("#page1").html("demo1");
     });
     */


});





         