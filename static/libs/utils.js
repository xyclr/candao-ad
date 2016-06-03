
var $ = require('jquery');
var alert = require('libs/alert');

module.exports = {
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
            r = window.location.search.substr(1).match(reg);
        if (r !== null)  {
            return unescape(r[2]);
        }
        return null;
    },

    /**
     * @description 通过接口获取数据
     * @param {String} url 请求地址
     * @param {Object} params 请求参数
     * @return {Function} cb callback
     */
    getData: function (url, params, cb) {
        console.info(params);
        $.ajax({
            type : "get",
            async : false,
            url: url,
            dataType : "json",
            data : params,
            success : function (result) {
                console.dir(result);
                if (result.code === 0) {
                    cb && cb(result);
                } else {
                    alert(result.msg);
                }
            }
        });
    },

    /**
     * @description 生成分页
     * @param {Object} opt 分页参数
     * @param {Function} cb 回调函数
     * @return {Object} $dom 返回分页dom
     */
    genPager: function (opt, cb) {
        var $dom = $('<div class="pagination-box"><div class="pagination"><!-- 这里显示分页 --></div></div>'),
            defaultOptions = {
                totalPages: 1,
                visiblePages: 10,
                has_btn_box: true,
                startPage : 1,
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
     * @param {Object} opt 分页组件参数
     * @param {Function} tpl 基于lodash的模板文件
     * @param {Function} cb callback
     */
    initList: function (url, params, target, tpl, cb, opt) {
        var that = this;
        var $taregt = target;

        $taregt.empty();

        that.getData(url, params, function (result) {
            //有数据返回
            if(parseInt(result.data.pageCount) > 1) {
                $taregt.append(
                    that.genPager({
                        totalPages: parseInt(result.data.pageCount, 10),
                        startPage: parseInt(params.current, 10),
                        has_btn_box: opt || false
                    }, function (event, page) {
                        that.initList(url, {current: page}, $taregt, tpl, cb, opt);
                    })
                );
            }
            $taregt.prepend(tpl({list: result.data.list}));
            cb && cb();
        });
    }
};