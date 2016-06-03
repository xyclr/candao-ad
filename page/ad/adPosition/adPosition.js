require('bootstrap');
var $ = require('jquery');
var confirm = require('libs/confirm');
var _ = require('lodash');
var alert = require('libs/alert');
var modal = require('libs/modal');
var notice = require('libs/notice');
var conf = require('libs/conf');
var utils = require('libs/utils');
var twbsPagination = require('libs/twbsPagination');

var $adPosList = $('.J-ad-pos-list');

var tplPositionList = __inline('../tpl/positionList.tmpl');

var AdPosObj = {
    init : function () {
        var that = this;

        that.initAdPosList();

        this.bindEvent();

        if (utils.getQueryString('op') === 'add' ) {
            $('.J-btn-add-adPos').click();
        }
    },

    bindEvent: function () {
        var that = this;

        //编辑广告位
        $('body').on('click', '.J-btn-add-adPos,.J-btn-adPos-modify', function () {
            var me = $(this),
                ret = [],
                title = '';
            //如果为修改
            if(me.attr('data-op') === 'modify') {
                title = '修改广告位';
                ret.push('<div class="form-group"> <label class="form-item-label control-label" style="padding-left:15px;"><span class="required-span">*</span>广告位ID：</label> <div class="form-item-info"> <input type="text" maxlength="25"  value="' + me.parents('tr').attr('data-id') + '" class="form-control required"> </div> </div>');
                ret.push('<div class="form-group"> <label class="form-item-label control-label"><span class="required-span">*</span>广告位名称：</label> <div class="form-item-info"> <input type="text" maxlength="25"  value="' + me.parents('tr').find('.ad-pos-name').text() + '" class="form-control required"> </div> </div>');
            } else {
                title = '新增广告位';
                ret.push('<div class="form-group"> <label class="form-item-label control-label" style="padding-left:15px;"><span class="required-span">*</span>广告位ID：</label> <div class="form-item-info"> <input type="text" maxlength="25" value="" placeholder="请输入广告位名称" class="form-control required"> </div> </div>');
                ret.push('<div class="form-group"> <label class="form-item-label control-label "><span class="required-span">*</span>广告位名称：</label> <div class="form-item-info"> <input type="text" maxlength="25" value="" placeholder="广告位名称" class="form-control required"> </div> </div>');
            }

            confirm(ret.join(''), {
                title: title,
                width: 410,
                confirmed: function (){
                    $.ajax({
                        type : "post",
                        async : false,
                        data : { 'id': '12121'},
                        url: conf.interFaceUrl.adListItemDel,
                        dataType : "json",
                        success : function(result) {
                            if (result.code === '0') {
                                alert('删除成功');
                            } else {
                                alert('删除失败');
                            }
                        }});
                }
            })
        });

        $('.J-search-position').click(function () {
            that.initAdPosList();
        });

        //删除广告位
        $adPosList.on('click', '.J-btn-adPos-del', function () {
            var me = $(this),
                $parent = me.parents('tr'),
                itemPositionName = $parent.find('.ad-pos-name').text();
            confirm('确认删除:"' + itemPositionName + '"吗?', {
                title: '删除广告',
                width: 310,
                confirmed: function () {
                    $.ajax({
                        type : "post",
                        async : false,
                        data : { 'id': $parent.attr('data-id')},
                        url: conf.interFaceUrl.positionDelete,
                        dataType : "json",
                        success : function (result) {
                            if (result.code === 0) {
                                me.parents('tr').remove();
                                notice({
                                    content: '删除成功',
                                    errorLevel: 'success',
                                    cb: that.initAdPosList
                                });
                            } else {
                                notice({
                                    content: '删除失败',
                                    errorLevel: 'fail'
                                });
                            }
                        }});
                }
            })
        })
    },

    //初始化广告位列表
    initAdPosList: function () {

        utils.initList(
            conf.interFaceUrl.adPosList,
            {current: 1, size: 10},
            $('.J-ad-pos-list'),
            tplPositionList
        );
    }
};

AdPosObj.init();

module.exports  = AdPosObj;


