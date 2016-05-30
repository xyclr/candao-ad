var $ = require('jquery');
var validator = module.exports = require('jquery-validation');

require('jquery-validation/localization/messages_zh');

$.validator.setDefaults({
    ignore: 'input[type=hidden]:not(.form-item)',
    errorElement: 'span',
    errorClass: 'help-block-errow'
});
