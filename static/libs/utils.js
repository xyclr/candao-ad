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
                } else {
                    alert('获取数据失败');
                }
            }
        });
    }
}