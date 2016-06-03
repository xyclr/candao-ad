var $ = require('jquery');

var $searchBox = $('.J-search-box'),

    $searchCatUl = $('.search-cat-cnt ul');

$searchBox.on('mouseenter','.search-cat',function(){
    $searchBox.addClass('active');
});
$searchBox.on('mouseleave','.search-cat',function(){
    $searchBox.removeClass('active');
});
$searchBox.on('click','li',function(){
    var me = $(this),
        $searchCatMt = $('.search-cat-mt');
    $searchCatUl.append('<li data-val="' + $searchCatMt.attr("data-val") + '">' + $searchCatMt.text() + '</li>');
    $searchCatMt.text(me.text());
    $searchCatMt.attr({"data-val": parseInt(me.data('val'), 10)});
    me.remove();
    $searchBox.removeClass('active');
});