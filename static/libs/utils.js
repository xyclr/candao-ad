var $ = require('jquery');

module.exports = {
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    getData: function(url,params,cb){
        $.ajax({
            type : "get",
            async : false,
            url:url,
            dataType : "json",
            data :params,
            success : function(result) {
                if(result.code === '0') {
                    cb(result);
                    console.info(result);
                } else {
                    alert('获取数据失败');
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
    genPager: function(opt,cb){
        var $dom = $('<div class="pagination-box"><div class="pagination"><!-- 这里显示分页 --></div></div>');
        var defaultOptions = {
            totalPages:1,
            visiblePages: 10,
            has_btn_box:true,
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
    initList: function(url,params,target,tpl,cb,opt){
        var that = this;
        var $taregt = target;

        $taregt.empty();

        that.getData(url,params,function(result){
            //有数据返回
            if(parseInt(result.data.pageCount) > 1) {
                $taregt.append(
                    that.genPager({
                        totalPages:parseInt(result.data.pageCount),
                        startPage:parseInt(params.current),
                        has_btn_box: opt || false
                    },function (event, page){
                        that.initList(url, {current:page}, $taregt, tpl,cb,opt);
                    })
                );
            }
            $taregt.prepend(tpl({list:result.data.list}));
            cb && cb();
        });
    }
}