require('bootstrap');
var $ = require('jquery');
var confirm = require('libs/confirm');
var alert = require('libs/alert');
var modal = require('libs/modal');
var conf = require('libs/conf');
var utils = require('libs/utils');
var twbsPagination = require('libs/twbsPagination');

var $adPosList = $('#adPosList');

var AdPosObj = {
    init : function(){
        var that = this;

        that.initAdPosList();

        this.bindEvent();

        if(utils.getQueryString('op') === 'add' ){
            $('.J-btn-add-adPos').click();
        }
    },

    bindEvent: function(){
        var that = this;

        //编辑广告位
        $('body').on('click','.J-btn-add-adPos,.J-btn-adPos-modify',function(){
            var me = $(this);
            var ret = [];
            //如果为修改
            if(me.data('op') === 'modify') {
                ret.push('<div class="form-group"> <label class="col-xs-4 control-label "><span class="required-span">*</span>广告位名称：</label> <div class="col-xs-8"> <input type="text" maxlength="25" data-id="' + me.parents('tr').find('.ad-pos-id').text() + '" value="' + me.parents('tr').find('.ad-pos-name').text() + '" class="form-control required"> </div> </div>');
            } else {
                ret.push('<div class="form-group"> <label class="col-xs-4 control-label "><span class="required-span">*</span>广告位名称：</label> <div class="col-xs-8"> <input type="text" maxlength="25" value="" class="form-control required"> </div> </div>');
            }

            confirm(ret.join(),{
                width:410,
                confirmed: function(){
                    $.ajax({
                        type : "post",
                        async : false,
                        data : { 'id':'12121'},
                        url:conf.interFaceUrl.adListItemDel,
                        dataType : "json",
                        success : function(result) {
                            if(result.code === '0') {
                                alert('删除成功');
                            } else {
                                alert('删除失败');
                            }
                        }});
                }
            })
        });

        //删除广告位
        $adPosList.on('click','.J-btn-adPos-del',function(){
            confirm('确认删除"' + 'xxx' + '"吗?',{
                size: 'modal-sm',
                confirmed: function(){
                    $.ajax({
                        type : "post",
                        async : false,
                        data : { 'id':'12121'},
                        url:conf.interFaceUrl.adListItemDel,
                        dataType : "json",
                        success : function(result) {
                            if(result.code === '0') {
                                alert('删除成功');
                            } else {
                                alert('删除失败');
                            }
                        }});
                }
            })
        })
    },

    //初始化广告位列表
    initAdPosList: function(){
        var that = this;
        var $pagination = $("#pagination");

        utils.getData(conf.interFaceUrl.adPosList,{},function(result){
            var ret = [];
            //有数据返回
            if(result.data.list.length > 0 ) {
                result.data.list.forEach(function(i,v){
                    ret.push('<tr><td>' + i.id + '</td><td class="ad-pos-name">' + i.name + '</td><td class="td-last"><div class="operate">	<a  class="J-btn-adPos-modify" data-op="modify">修改</a>	<a href="javascript:void(0)" class="J-btn-adPos-del">删除</a></div></td></tr>');
                });
                //加入分页
                if(parseInt(result.data.pageCount) > 1) {
                    $pagination.twbsPagination({
                        totalPages:parseInt(result.data.pageCount),
                        visiblePages: 7,
                        startPage : 1,
                        first: '...',
                        prev : '<',
                        next : '>',
                        last: '...',
                        onPageClick: function (event, page){
                            var ret = [];
                            utils.getData(conf.interFaceUrl.adPosList,{},function(result){
                                //有数据返回
                                if(result !== null && result.data.list.length > 0 ) {
                                    result.data.list.forEach(function(i,v){
                                        ret.push('<tr><td>' + i.id + '</td><td class="ad-pos-name">' + i.name + '</td><td class="td-last"><div class="operate">	<a  class="J-btn-adPos-modify">修改</a>	<a href="javascript:void(0)" class="J-btn-adPos-del">删除</a></div></td></tr>');
                                    });
                                    $adPosList.find('tbody').html(ret.join(''));
                                } else {
                                    $adPosList.find('tbody').html('暂无数据');
                                }

                            });
                        }
                    });
                }

                $adPosList.find('tbody').html(ret.join(''));
            } else {
                $adPosList.find('tbody').html('暂无数据');
            }
        });
    }
};

AdPosObj.init();

module.exports  = AdPosObj;


