var $ = require('jquery');

var $searchBox = $('.J-search-box'),
    $searchCatMt = $('.search-cat-mt'),
    $searchCatUl = $('.search-cat-cnt ul');

$searchBox.on('mouseenter','.search-cat',function(){
    $searchBox.addClass('active');
});
$searchBox.on('mouseleave','.search-cat',function(){
    $searchBox.removeClass('active');
});
$searchBox.on('click','li',function(){
    var me = $(this),
        idx = me.index();
    $searchCatUl.append('<li>' + $searchCatMt.text() + '</li>');
    $searchCatMt.text(me.text());
    me.remove();
    $searchBox.removeClass('active');
});