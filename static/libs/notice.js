require('bootstrap');
var modalTplFn = __inline('./_notice.tmpl');
var $ = require('jquery');


var notice = module.exports = function(opts) {
    var dom = $(modalTplFn({
        content: opts.content,
        errorLevel: opts.errorLevel || 'success',
        size: opts.size || 'modal-sm'
    }));

    dom
        .appendTo('body')
        .modal({
            backdrop: 'static'
        });
    setTimeout(function(){
        dom.remove();
        $('.modal-backdrop').remove();

        opts.cb && opts.cb();
    },1500)
};

