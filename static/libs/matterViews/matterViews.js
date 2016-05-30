/**
 * @require matterViews.scss
 * @require
 */

require('bootstrap');
var matterTplFn = __inline('./_matterViews.tmpl');
var $ = require('jquery');

var matterViews = module.exports = function(opt) {

    var dom = $(matterTplFn(opt));

    dom.appendTo('body');

    if(opt.type === '1') {//图片
        dom.carousel({
            interval:100000000
        })
    }

    //点击目标区域外 关闭dom
    $('body').click(function(g) {
        var d = g.srcElement || g.target,
            connectDom = [$('#matterViewsImg').get(0),$("#matterViewsVideo").get(0)];
        while (d) {
            for (var f = 0; f < connectDom.length; f++) {
                if (d == connectDom[f]) {
                    return
                }
            }
            if (d === $('.matter-view-box')[0]) {
                dom.remove();
                return
            }
            d = d.parentNode;
        }
    })

};
