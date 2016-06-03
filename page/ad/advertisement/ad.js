require('bootstrap');
var $ = require('jquery');
var _ = require('lodash');
var confirm = require('libs/confirm');
var alert = require('libs/alert');
var modal = require('libs/modal');
var notice = require('libs/notice');
var conf = require('libs/conf');
var utils = require('libs/utils');
var twbsPagination = require('libs/twbsPagination');
var validator = require('libs/validator');
var matterViews = require('libs/matterViews/matterViews');

var $btnAdPSelect = $('.J-btn-adP-select'),
    $btnRentSelect = $('.J-btn-rent-select'),
    $adList = $('.J-ad-list'),
    $adForm = $('.J-ad-form'),
    $adFormSubmit = $adForm.find('input[type=submit]'),
    $advertisementId = $("#advertisementId"),
    isAdModify = false;

//lodash 模板
var tplAdList = __inline('../tpl/adList.tmpl'),
    tplPositionList = __inline('../tpl/positionListModal.tmpl'),
    tplMatterList = __inline('../tpl/matterListModal.tmpl'),
    tplMatterItem = __inline('../tpl/matterItem.tmpl');

//页面数据
var matterObj = {},
    positionObj = {},
    tenantObj = {};

var AdObj = {
    init : function () {
        var that = this;

        //如果为广告列表页
        if($adList.length > 0) {
            utils.initList(
                conf.interFaceUrl.adList,
                {current: 1, size: 10},
                $adList,
                tplAdList
            );
        }

        //如果为修改广告
        if(utils.getQueryString('id') !== null && utils.getQueryString('id') !== '') {
            var $mediaContent = $('.media-content');

            isAdModify = true;

            $advertisementId.val(utils.getQueryString('id'));

            utils.getData(conf.interFaceUrl.getAdById, {id: utils.getQueryString('id')}, function (result) {

                var result = result.data[0];

                $('input[name=name]').val(result.name);


                positionObj = result.position[0];
                $('input[name=position]').val(positionObj.name);
                $('input[name=position]').attr({'data-id': positionObj.id});

                $('input[name=sequence]').val(result.sequence);

                tenantObj = result.tenant[0];
                $('input[name=tenant]').val(tenantObj.tenantName);
                $('input[name=tenant]').attr({'data-id': tenantObj.id, "tenant-id": tenantObj.tenantId});



                matterObj = result.material[0];
                $('input[name=material]').val(matterObj.name);

                $mediaContent.html(tplMatterItem(matterObj));

                $('input[name=status][value=' + result.status + ']').attr({"checked": "checked"});
            });

        }

        //如果为详情页 提交验证逻辑
        //广告名重复验证
        if ($adForm.length > 0) {
            $adForm.validate({
                submitHandler: function () {

                    var params = {
                        id: parseInt($adForm.find('input[name=name]').attr('data-id'), 10) || '',
                        name: $adForm.find('input[name=name]').val(),
                        position_id: parseInt($adForm.find('input[name=positionName]').attr("data-id"), 10),
                        material_id: parseInt($adForm.find('input[name=material]').attr("data-id"), 10),
                        sequence: parseInt($adForm.find('input[name=sequence]').val(), 10),
                        status: parseInt($adForm.find('input[name=status]:checked').val(), 10),
                        tenant: {
                            id: parseInt($adForm.find('input[name=tenants]').attr('data-id'), 10),
                            tenantId: $adForm.find('input[name=tenants]').attr('tenant-id'),
                            tenantName: $adForm.find('input[name=tenants]').val()
                        }
                    };

                    console.info(params);

                    $adFormSubmit.button('loading');

                    $
                        .ajax(conf.interFaceUrl.adEdit, {
                            method: 'POST',
                            data: params
                        })
                        .then(function (response) {
                            notice(response.message);
                            $adFormSubmit.button('reset');
                        });
                    return false;
                },
                rules: {
                    name: {
                        required: true,
                        maxlength: 30
                    },
                    positionName: {
                        required: true,
                    },
                    material: {
                        required: true
                    },
                    sequence: {
                        required: true
                    },
                    tenants: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: jQuery.validator.format("请输入广告名称"),
                        maxlength: jQuery.validator.format("不能超过30个字符")
                    },
                    positionName: {
                        required: jQuery.validator.format("请选择广告位置")
                    },
                    material: {
                        required: jQuery.validator.format("请选择广告素材")
                    },
                    sequence: {
                        required: jQuery.validator.format("请输入广告顺序")
                    },
                    tenants:{
                        required: jQuery.validator.format("请选择租户")
                    }
                }
            });
        }

        //绑定事件
        this.bindEvent();
    },

    bindEvent: function () {
        var that = this;

        //广告搜索
        $('.J-search-ad').find('.search-submit').click(function(){
            var me = $(this),
                val = parseInt(me.parents('.search-box').find('.search-cat-mt').attr('data-val'), 10),
                searchStr = me.prev().val();

            if(searchStr === '') return false;
            utils.initList(
                conf.interFaceUrl.adList,
                {
                    search: me.prev().val(),
                    searchType: val,
                    current: 1,
                    size: 10
                },
                $adList,
                tplAdList
            );
        });

        //广告删除
        $adList.on('click','.J-btn-ad-del',function(){
            var me = $(this),
                $parent = me.parents('tr'),
                itemAdName = $parent.find('.item-ad-name').text();

            confirm('确认确认广告:"' + itemAdName + '"吗?',{
                title: '删除广告',
                width: 310,
                confirmed: function(){
                    $.ajax({
                        type : "post",
                        async : false,
                        data : { 'id': parseInt($parent.prop('data-id'), 10), status: 3 },
                        url:conf.interFaceUrl.adListItemUpdate,
                        dataType : "json",
                        success : function(result) {
                            if(result.code === 0) {
                                me.parents('tr').remove();
                                notice({
                                    content: '删除成功',
                                    errorLevel: 'success',
                                    cb:utils.initList(
                                        conf.interFaceUrl.adList,
                                        {current:1},
                                        $adList,
                                        tplAdList
                                    )
                                });
                            } else {
                                notice({
                                    content: '删除失败',
                                    errorLevel: 'fail'
                                });
                            }
                        }
                    });
                }
            });
        });

        //广告启用禁用
        $adList.on('click','.J-btn-status',function(){
            var me = $(this),
                $parent = me.parents('tr');

            $.ajax({
                type : "post",
                async : false,
                data : { id: parseInt($parent.prop('data-id'), 10), status: $parent.find('.switch input').prop('checked') === true ? 1 : 0 },
                url:conf.interFaceUrl.adListItemUpdate,
                dataType : "json",
                success : function(result) {
                    if(result.code === 0) {
                        notice({
                            content: '修改成功',
                            errorLevel: 'success'
                        });
                    } else {
                        notice({
                            content: '修改失败',
                            errorLevel: 'fail'
                        });
                    }
                }
            });
        });

        //广告位选择
        $btnAdPSelect.click(function(){
            var me = $(this);
            var tplConfirm = _.template('' +
                '<div style="position: relative; top: -66px;left:0;width:100%; padding-left: 85px;">' +
                '<a href="../adPosition?op=add" class="btn btn-primary f-fl mr20">新建广告位</a>'+
                '<div class="search-box-mini f-fr J-search-box-position mr15" ><span class="fa fa-search"></span> <input type="text" class="search-ipt"  placeholder="广告位ID/广告位名称"> <a href="javascript:void(0)" class="search-submit"> 查询 </a> </div>' +
                '</div><div class="J-ad-pos-list f-tac"><i class="fa fa-spinner fa-spin"></i></div>'+
                '');

            confirm(tplConfirm(),{
                title: '选择广告位',
                confirmed: function(){
                    var $target = $('.J-ad-pos-list').find('input[type=radio]:checked').parents('tr');
                    me.val($target.find('.ad-pos-name').text());
                    me.attr({'data-id': $target.attr('data-id')});
                },
                ready: function(){
                    $('.modal-header').css({
                        "margin": "25px 15px 15px 15px"
                    });

                    utils.initList(
                        conf.interFaceUrl.adPosList,
                        {current:1, size: 5},
                        $('.J-ad-pos-list'),
                        tplPositionList,
                        function(){
                            $('.modal-body').find('.table-list').addClass('table-list-nobg').css({"margin-top":"-55px","float":"left"});
                        },
                        {has_btn_box:true}
                    );
                }
            });
        });

        //广告位搜索
        $('body').on('click','.J-search-box-position .search-submit',function(){

            var me = $(this),
                searchStr = me.prev().val();

            if(searchStr == '') return;

            utils.initList(
                conf.interFaceUrl.adPosList,
                {
                    search: me.prev().val(),
                    current: 1,
                    size: 5
                },
                $('.J-ad-pos-list'),
                tplPositionList,
                function(){
                    $('.modal-body').find('.table-list').addClass('table-list-nobg').css({"margin-top":"-55px","float":"left"});
                },
                {has_btn_box:true}
            );
        });

        //素材选择modal
        $('body').on('click','.J-btn-matter-select',function(){
            var me = $(this),
                $parents = me.parents('.media-content'),
                $selects = null,

                materHtml = '',//素材item html

                tplConfirm = _.template('' +
                '<div style="position: relative; top: -66px;left:0;width:100%; padding-left: 85px;">' +
                    '<a href="../matter/detail" class="btn btn-primary f-fl mr20">新建素材</a>'+
                    '<div class="search-box-mini f-fr J-search-box-matter mr15"><span class="fa fa-search"></span> <input type="text" class="search-ipt"   placeholder="素材ID/素材名称"> <a href="javascript:void(0)" class="search-submit"> 查询 </a> </div>' +
                '</div>' +
                '<div class="J-ad-mater-list f-tac"><i class="fa fa-spinner fa-spin"></i></div>'+
                '');

            confirm(tplConfirm(),{
                title: '选择素材',
                confirmed: function(){
                    $selects = $('.J-ad-mater-list').find('input[type=radio]:checked');

                    if($selects.length === 0 ) return;

                    /*
                    * 多选逻辑:循环生成素材item,并加入素材id到input[name=material],供以后扩展使用
                    * 目前使用的单选
                    */
                    $.each($selects, function(){
                        var me = $(this),
                            $target = me.parents('tr');

                        materHtml += tplMatterItem({
                            name: $target.find('.ad-matter-name').text(),
                            thumbnail: $target.find('.img-thumb img').attr('src'),
                            horizontalImg: $target.attr('data-horizontalImg'),
                            verticalImg: $target.attr('data-verticalImg'),
                            id: $target.attr('data-id'),
                            videoUrl: $target.attr('data-videoUrl'),
                            type: $target.attr('data-type'),
                            webUrl: $target.attr('data-webUrl')
                        });

                        $target.val(me.val() + ',' + me.parents('tr').attr('data-id'));

                    });

                    if($selects.length === 1) {//单选
                        $parents.html(materHtml);
                    } else  {//多选
                        $parents.find('.media-box-upload').before(materHtml);
                    }

                },
                ready: function(){
                    $('.modal-header').css({
                        "margin": "25px 15px 15px 15px"
                    });

                    utils.initList(conf.interFaceUrl.material, {current:1}, $('.J-ad-mater-list'), tplMatterList,function(){
                        $('.modal-body').find('.table-list').addClass('table-list-nobg').css({"margin-top":"-55px","float":"left"});
                    },{has_btn_box:true});
                }
            });
        });

        //素材删除    单选时候,去掉
        //$('body').on('click','.J-btn-matter-del',function(){
        //
        //    var me = $(this);
        //
        //    $('input[name=material]').val().split(',');
        //
        //    me.parents('.media-box').remove();
        //});

        //素材搜索
        $('body').on('click','.J-search-box-matter .search-submit',function(){

            var me = $(this),
                searchStr = me.prev().val();

            if(searchStr == '') return;

            utils.initList(
                conf.interFaceUrl.material,
                {
                    search: me.prev().val(),
                    current: 1,
                    size: 5
                },
                $('.J-ad-mater-list'),
                tplMatterList,
                function(){
                    $('.modal-body').find('.table-list').addClass('table-list-nobg').css({"margin-top":"-55px","float":"left"});
                },
                {has_btn_box:true}
            );
        });

        //素材预览
        $('body').on('click','.J-btn-matter-view',function(){
            var me = $(this),
                $target = null,
                opt = {};

            //详情页预览
            if(me.parents('.media-op').length === 1) {
                $target = me.parents('.media-box');
            } else {//列表页预览
                $target = me.parents('tr');
            }


            opt.type = parseInt($target.attr('data-type'), 10);
            opt.webUrl = $target.attr('data-webUrl');

            if(opt.type === 1) {//图片
                opt.content = [
                    {
                        img: $target.attr('data-horizontalImg')
                    },
                    {
                        img: $target.attr('data-verticalImg')
                    }
                ];
            } else if(opt.type === 2) {//视频
                opt.img = $target.attr('data-horizontalImg');
                opt.videoUrl = $target.attr('data-videoUrl');
            } else {//3:自定义链接
                window.open($target.attr('data-webUrl'));
                return ;
            }

            //调用预览插件
            matterViews(opt);
        });

        //租户选择
        $btnRentSelect.click(function(){
            var me = $(this);
            var ret = [];
            utils.getData(conf.interFaceUrl.allTenant,null,function(result){
                if(result !== null) {
                    ret.push('<div class="J-ad-rent-list rent-list">');

                    if(result.data.list.length > 0) {
                        result.data.list.forEach(function(v){
                            ret.push('<label style="width: 25%;float:left;display:inline-block;margin-bottom:15px;" data-id="' + v.id + '"><input type="radio" class="mr5" name="tenantName" value="'+ v.tenantId + '">' + v.tenantName + '</label>');
                        });
                    } else {
                        ret.push('暂无数据');
                    }

                    ret.push('</div><div class="f-cb"></div>');

                    confirm(ret.join(''),{
                        title: '选择租户',
                        confirmed: function(){
                            var $target = $('.J-ad-rent-list').find('input[type=radio]:checked').parent();
                            me.val($target.text());
                            me.attr({'data-id': $target.attr('data-id'), "tenant-id": $target.find('input').val()});
                        }
                    });
                }
            });
        });
    }
};

AdObj.init();