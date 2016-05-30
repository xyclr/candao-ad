var $ = require('jquery');

//设置当前页导航active
var curMenPath = window.location.pathname;
$(".ky-menu-primary").each(function(){
    var me = $(this);
    if(window.location.pathname.indexOf(me.attr('href').split('/')[2]) !== -1) {
        me.addClass('active');
    }
});