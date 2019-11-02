$(function () {
    var dt_r = /(\d\d\d\d)\/(\d\d)\/(\d\d)\/(\d\d)(\d\d)(\d\d)/;
    var dt_a = location.pathname.match(dt_r);
    if(dt_a && dt_a.length == 7){
        var dt_s = `令和${dt_a[1] - 2018 == 1 ? "元" : dt_a[1] - 2018}年${dt_a[2]}月${dt_a[3]}日 ${dt_a[4]}時${dt_a[5]}分${dt_a[6]}秒`
        $("article").prepend(`<div class="article_time_box"><time class="article_time">${dt_s}</time> 投稿</div>`);
    }
});