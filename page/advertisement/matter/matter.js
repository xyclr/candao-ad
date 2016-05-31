require('bootstrap');
var $ = require('jquery');
var confirm = require('libs/confirm');
var _ = require('lodash');
var alert = require('libs/alert');
var modal = require('libs/modal');
var conf = require('libs/conf');
var utils = require('libs/utils');
var twbsPagination = require('libs/twbsPagination');
var matterViews = require('libs/matterViews/matterViews');

var $adMatterList = $('.J-ad-matter-list');
var $itemImgBox = $('.item-img-box');
var $itemVideoBox = $('.item-video-box');
var $itemUrlBox = $('.item-go-url-box');
var $formGroupMeida = $('.form-group-media');

var tplPositionList = __inline('../tpl/matterList.tmpl');

var AdPosObj = {
    init : function(){
        var that = this;
        if($adMatterList.length > 0) {
            that.initAdMatterList();
        }

        this.bindEvent();

        if (utils.getQueryString('op') === 'add' ){
            $('.J-btn-add-adMatter').click();
        }

        $('.ico-qs').popover({
            html : true,
            title: '',
            placement: 'bottom',
            trigger: 'hover',
            content: function() {
                return 'content';
            }
        });

    },

    bindEvent: function() {
        var that = this;

        $('.J-search-matter').click(function(){
            that.initAdMatterList();
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

        //展示 自定义素材切换
        $('input[type=radio][name=status]').change(function(){
            var me = $(this);

            if(me.val() === '1') {//展示素材
                $formGroupMeida.show();
                $itemUrlBox.hide();
            } else {//自定义链接
                $formGroupMeida.hide();
                $itemUrlBox.show();
            }
        });

        //图片 视频切换
        $('input[type=radio][name=status2]').change(function(){
            var me = $(this);
            $('.ico-qs').css({"visibility": "hidden"});
            me.parent().next().css({"visibility": "visible"});
            if(me.val() === '1') {//图片
                $itemImgBox.show();
                $itemVideoBox.hide();

            } else {
                $itemImgBox.hide();
                $itemVideoBox.show();

            }
        });

    },

    //初始化素材列表
    initAdMatterList: function(){

        utils.initList(
            conf.interFaceUrl.material,
            {current: 1},
            $adMatterList,
            tplPositionList
        );
    }
};

AdPosObj.init();

module.exports  = AdPosObj;


