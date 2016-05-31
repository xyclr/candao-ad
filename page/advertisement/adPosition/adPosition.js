require('bootstrap');
var $ = require('jquery');
var confirm = require('libs/confirm');
var _ = require('lodash');
var alert = require('libs/alert');
var modal = require('libs/modal');
var conf = require('libs/conf');
var utils = require('libs/utils');
var twbsPagination = require('libs/twbsPagination');

var $adPosList = $('.J-ad-pos-list');

var tplPositionList = __inline('../tpl/positionList.tmpl');

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

        $('.J-search-position').click(function(){
            that.initAdPosList();
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

        utils.initList(
            conf.interFaceUrl.adPosList,
            {current:1},
            $('.J-ad-pos-list'),
            tplPositionList
        );
    }
};

AdPosObj.init();

module.exports  = AdPosObj;


