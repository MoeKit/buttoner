// support hide delay
var $ = require('jquery');
require('loader.css');
module.exports = Buttoner = function (option) {
    this.$target = $(option.target);
    this._prepare();
};

var Events = require('events');
Events.mixTo(Buttoner);

Buttoner.prototype._prepare = function () {
    this.$loader = $('<span id="mk-loading"><i class="mk-loading-active"></i><i></i><i></i><i></i></span>').hide().appendTo('body');
    this.originalHtml = this.$target.html();
    this.targetWidth = this.$target.outerWidth();
    this.targetHeight = this.$target.outerHeight();
};

Buttoner.prototype.show = function () {
    this.$target.css({
        width: this.targetWidth,
        height: this.targetHeight
    });
    this.$target.empty().html(this.$loader.show().css({
        display: 'inline-block'
    }));
    this.play();
};

Buttoner.prototype.play = function () {
    var _this = this;
    _this.isLoading = true;
    this.disable();
    var $loading = _this.$loader;
    var $items = $loading.find('i');
    var length = $items.length;
    this.playInterval = setInterval(function () {
        var $active = $loading.find('.mk-loading-active');
        var thisone = $active.index() + 1;
        var lastone = thisone - 1;
        if (thisone === 0) {
            thisone = 0;
            lastone = length - 1;
        }
        $items.eq(lastone).removeClass('mk-loading-active').end().eq(thisone).addClass('mk-loading-active');
    }, 100);
};

Buttoner.prototype.disable = function () {
    if (this.$target.is('button')) {
        this.$target.prop('disabled', true);
    }
};

Buttoner.prototype.enable = function () {
    if (this.$target.is('button')) {
        this.$target.prop('disabled', false);
    }
};

Buttoner.prototype.hide = function (delay) {
    this.$target.html(this.originalHtml);
    clearInterval(this.playInterval);
    this.isLoading = false;
    this.$loader.hide();
    this.enable();
};



