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
    $btnMatterSelect = $('.J-btn-matter-select'),
    $adList = $('.J-ad-list'),
    $adForm = $('.J-ad-form'),
    $adFormSubmit = $adForm.find('input[type=submit]'),
    isAdModify = false;


var tplAdList = __inline('../tpl/adList.tmpl');
var tplPositionList = __inline('../tpl/positionList.tmpl');
var tplMatterList = __inline('../tpl/matterList.tmpl');

var AdObj = {
    init : function(){
        var that = this;

        //如果为广告列表页
        if($adList.length > 0) {
            that.initList(
                conf.interFaceUrl.adList,
                {current:1},
                $adList,
                tplAdList
            );
        }

        //如果为修改广告
        if(utils.getQueryString('id') !== null && utils.getQueryString('id') !== '') {

            isAdModify = true;

            utils.getData(conf.interFaceUrl.getAdById,{id:utils.getQueryString('id')},function(result){
                var result = result.data[0];
                $('input[name=name]').val(result.name);
                $('input[name=positionName]').val(result.positionName);
                $('input[name=sequence]').val(result.sequence);
                $('input[name=tenants]').val(result.tenants[0].tenantName);
                $('input[name=status]').val(result.status);
                $('input[name=status][value=' + result.status + ']').attr({"checked":"checked"})
            });

        }

        //如果为详情页 提交验证逻辑
        //广告名重复验证
        if($adForm.length>0) {
            $adForm.validate({
                submitHandler: function() {
                    $adFormSubmit.button('loading');
                    $
                        .ajax(conf.interFaceUrl.adListItemDel, {
                            method: 'POST',
                            data: $adForm.serialize()
                        })
                        .then(function(response) {
                            notice(response.message);
                            $adFormSubmit.button('reset');
                        });
                    return false;
                },
                rules:{
                    name:{
                        required:true,
                        maxlength:30
                    },
                    positionName:{
                        required:true,
                    },
                    materialName:{
                        required:true
                    },
                    sequence:{
                        required:true
                    },
                    tenants:{
                        required:true
                    }
                },
                messages:{
                    name:{
                        required:jQuery.validator.format("请输入广告名称"),
                        maxlength:jQuery.validator.format("不能超过30个字符")
                    },
                    positionName:{
                        required:jQuery.validator.format("请选择广告位置")
                    },
                    sequence:{
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

    bindEvent: function(){
        var that = this;

        //广告搜索
        $('.J-search-ad').find('.search-submit').click(function(){

            that.initList(
                conf.interFaceUrl.adList,
                {
                    search:'xx',
                    current:1
                },
                $adList,
                tplAdList
            );
        });

        //广告删除
        $adList.on('click','.J-btn-ad-del',function(){
            var me = $(this),
                itemAdName = me.parents('tr').find('.item-ad-name').text();

            confirm('确认删除"' + itemAdName + '"吗?',{
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
                                me.parents('tr').remove();
                                notice({
                                    content: '删除成功',
                                    errorLevel: 'success',
                                    cb:that.initList(
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
            })
        });

        //广告位选择
        $btnAdPSelect.click(function(){
            var me = $(this);
            var tplConfirm = _.template('' +
                '<div style="position: relative; top: -66px;left:0;width:100%; padding-left: 85px;">' +
                '<a href="../adPosition?op=add" class="btn btn-primary f-fl mr20">新建广告位</a>'+
                '<div class="search-box-mini f-fr J-search-box-position mr15" data-url="http://www.baidu.com"><span class="fa fa-search"></span> <input type="text" class="search-ipt" placeholder="广告位ID/广告位名称"> <a href="javascript:void(0)" class="search-submit"> 查询 </a> </div>' +
                '</div><div class="J-ad-pos-list"></div>'+
                '');

            confirm(tplConfirm(),{
                title: '选择广告位',
                confirmed: function(){
                    me.val($('.J-ad-pos-list').find('input[type=radio]:checked').parents('tr').find('.ad-pos-name').text())
                },
                ready: function(){
                    $('.modal-header').css({
                        "margin": "25px 15px 15px 15px"
                    });

                    that.initList(
                        conf.interFaceUrl.adPosList,
                        {current:1},
                        $('.J-ad-pos-list'),
                        tplPositionList
                    );
                }
            });
        });

        //广告位搜索
        $('body').on('click','.J-search-box-position .search-submit',function(){
            that.initList(
                conf.interFaceUrl.adPosList,
                {current:1},
                $('.J-ad-pos-list'),
                tplPositionList
            );
        });

        //素材选择
        $btnMatterSelect.click(function(){
            var me = $(this);
            var tplConfirm = _.template('' +
                '<div style="position: relative; top: -66px;left:0;width:100%; padding-left: 85px;">' +
                '<a href="../adPosition?op=add" class="btn btn-primary f-fl mr20">新建素材</a>'+
                '<div class="search-box-mini f-fr J-search-box-matter mr15" data-url="http://www.baidu.com"><span class="fa fa-search"></span> <input type="text" class="search-ipt" placeholder="素材ID/素材名称"> <a href="javascript:void(0)" class="search-submit"> 查询 </a> </div>' +
                '</div><div class="J-ad-mater-list"></div>'+
                '');

            confirm(tplConfirm(),{
                title: '选择素材',
                confirmed: function(){
                    me.val($('.J-ad-mater-list').find('input[type=radio]:checked').parents('tr').find('.ad-matter-name').text())
                },
                ready: function(){
                    $('.modal-header').css({
                        "margin": "25px 15px 15px 15px"
                    });

                    that.initList(conf.interFaceUrl.material, {current:1}, $('.J-ad-mater-list'), tplMatterList);
                }
            });
        });

        //素材搜索
        $('body').on('click','.J-search-box-matter .search-submit',function(){
            that.initList(
                conf.interFaceUrl.material,
                {current:1},
                $('.J-ad-mater-list'),
                tplMatterList
            );
        });

        //素材预览
        $('body').on('click','.J-btn-matter-view',function(){
            matterViews({
                content: [
                    { name: 'jerry',horizontalImg:'http://pic30.nipic.com/20130605/12728654_083846920000_2.jpg' },
                    { name: 'john',horizontalImg:'http://pic32.nipic.com/20130829/12906030_124355855000_2.png'}
                ],
                type:'2' //1图片;2视频; 3链接(不处理)
            });
        });

        //租户选择
        $btnRentSelect.click(function(){
            var me = $(this);
            var ret = [];
            utils.getData(conf.interFaceUrl.allTenant,{current:1},function(result){
                if(result !== null) {
                    ret.push('<div class="J-ad-rent-list rent-list">');

                    if(result.data.length > 0) {
                        result.data.forEach(function(v){
                            ret.push('<label style="width: 25%;float:left;display:inline-block;margin-bottom:15px;"><input type="radio" class="mr5" name="tenantName" value="'+ v.tenantId + '">' + v.tenantName + '</label>');
                        });
                    } else {
                        ret.push('暂无数据');
                    }

                    ret.push('</div><div class="f-cb"></div>');

                    confirm(ret.join(''),{
                        title: '选择租户',
                        confirmed: function(){
                            me.val($(".J-ad-rent-list").find('input[type=radio]:checked').parent().text())
                        }
                    });
                }
            });
        });
    },

    /**
     * @description 生成分页
     * @param {Object} opt 分页参数
     * @param {Function} cb 回调函数
     * @return {Object} $dom 返回分页dom
     */
    genPager: function(opt,cb){
        var $dom = $('<div class="pagination-box"><div class="pagination"><!-- 这里显示分页 --></div></div>');
        var defaultOptions = {
            totalPages:1,
            visiblePages: 10,
            startPage :1,
            first: '...',
            prev : '<',
            next : '>',
            last: '...',
            onPageClick: cb || _.noop()
        };

        opt = $.extend({}, defaultOptions, opt);

        $dom.find('.pagination').twbsPagination(opt);

        return $dom;
    },

    /**
     * @description 通过接口获取数据并渲染模板
     * @param {String} url 接口地址
     * @param {Object} params 请求参数
     * @param {Object} target 需要填充的容器
     * @return {Function} tpl 基于lodash的模板文件
     */
    initList: function(url,params,target,tpl){
        var that = this;
        var $taregt = target;

        $taregt.empty();

        utils.getData(url,params,function(result){
            //有数据返回
            if(parseInt(result.data.pageCount) > 1) {
                $taregt.append(
                    that.genPager({
                        totalPages:parseInt(result.data.pageCount),
                        startPage:parseInt(params.current),
                    },function (event, page){
                        that.initList(url, {current:page}, $taregt, tpl);
                    })
                );
            }
            $taregt.prepend(tpl({list:result.data.list}));
        });
    }
};

AdObj.init();