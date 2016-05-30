require('bootstrap');
var $ = require('jquery');
var alert = require('libs/alert');
var confirm = require('libs/confirm');
var WdatePicker = require('libs/calendar_diy/WdatePicker.js');

var $btn = $('.J-btn-confirm');
$($btn).click(function() {
    $($btn).button('loading');
    $.ajax('...')
        .then(function(response) {
            confirm('<p>返回结果为：</p><pre>' + JSON.stringify(response, null, 4) + '</pre>');
        })
        .fail(function() {
            confirm('加载失败');
        })
        .always(function() {
            $($btn).button('reset');
        });
});
$('.J-btn-alert').click(function(){
    alert('加载失败', 'danger');
});
$('.J-btn-model').click(function(){
    alert('加载失败', 'danger');
});
$("#birthday").click(function(){
    WdatePicker({dateFmt:'yyyy-MM-dd'});
})