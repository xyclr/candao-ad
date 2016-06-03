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
var WebUploader = require('webuploader');

var tplPositionList = __inline('../tpl/matterList.tmpl');

var AdPosObj = {
    init : function (){
        var that = this;
        if ($adMatterList.length > 0) {
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


        // 初始化Web Uploader
        var uploader = WebUploader.create({

            // 选完文件后，是否自动上传。
            auto: true,

            // swf文件路径
            swf: '/js/Uploader.swf',

            // 文件接收服务端。
            server: 'http://webuploader.duapp.com/server/fileupload.php',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker',

            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
    },

    bindEvent: function() {
        var that = this;

        $('.J-search-matter').click(function(){
            that.initAdMatterList();
        });


        //素材预览
        $('body').on('click', '.J-btn-matter-view', function () {
            var me = $(this),
                $target = me.parents('tr'),
                opt = {};

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

        //展示 自定义素材切换
        $('input[type=radio][name=status]').change(function(){
            var me = $(this);

            if (me.val() === '1') {//展示素材
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


