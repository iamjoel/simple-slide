(function($, undef) {
    var emptyFn = function() {};
    window.console = window.console || {
        log: emptyFn,
        error: emptyFn
    };
    var defaultParam = {
        $items: false, //中间幻灯的border的宽度
        $itemWrap: false,
        navType: 'dot', // 点状的。设置false则没有导航
        circle: false, // 循环播放
        interval: false,
        $prevBtn: false,
        $nextBtn: false,
        scrollNum: 1, //滚动条目数
        scrollType: 'scroll', // 还支持fade
        scrollDir: 'horizontal' //水平，垂直 vertical

    };

    function Plugin($el, option) {
        var self = this;
        this.param = $.extend({}, defaultParam, option);
        this.$el = $el;
        var param = this.param;
        if ($el.length === 0) {
            console.error('can not find $el');
            return;
        }
        if (!this.validParam(param)) {
            return;
        }
        $el.addClass('simple-slide');

        var $items;
        if (param.$items) {
            $items = $el.find(param.$items);
        } else {
            $items = $el.find('li');
        }

        $items.addClass('slide-item');
        this.$items = $items;
        this.itemSize = {
            height: $items.height(),
            width: $items.width()
        };

        this.locArr = this.getLocArr();
        this.currIndex = 0;// 下标从0开始

        var $itemWrap = param.$itemWrap || $items.parent();
        if (param.scrollType === 'scroll' && param.circle) {
            $itemWrap.after($itemWrap.clone());
        }
        this.$itemWrap = $itemWrap;

        this.initNav();
        if (param.interval && !isNaN(param.interval, 10)) {
            this.runId = this.start();
        }

        $items.hover(function() {
            if (self.runId) {
                self.stop();
            }
        }, function() {
            if (param.interval && !isNaN(param.interval, 10)) {
                self.runId = self.start();
            }
        })
    }

    $.extend(Plugin.prototype, {
        getLocArr: function() {
            var arr = [];
            var param = this.param;
            var len = this.$items.length;
            var step;
            switch (param.scrollDir) {
                case 'horizontal':
                case 'hor':
                    step = -this.itemSize.width;
                    break;
                case 'vertical':
                case 'ver':
                    step = -this.itemSize.height;
                    break;
                default:
                    throw 'invalid scrollDir';
            }
            for (var i = 0; i < len; i++) {
                arr.push(i * step);
            }
            return arr;
        },
        // 第一张是0
        turnTo: function(index) {
            var self = this;
            var param = this.param;
            index = this.getValidIndex(index);
            var currIndex = this.currIndex;
            if (param.circle && param.scrollType === 'scroll') {

            } else {
                if (param.scrollType === 'scroll') {
                    var animOpt = {};
                    if (param.scrollDir === 'horizontal' || param.scrollDir === 'hor') {
                        animOpt.left = this.locArr[index];
                    } else {
                        animOpt.top = this.locArr[index];
                    }
                    this.$itemWrap.animate(animOpt, {
                        done: function() {
                            self.currIndex = index;
                        }
                    });
                }
            }
        },
        turnPrev: function() {
            this.turnTo(this.currIndex - this.param.scrollNum);
        },
        turnNext: function() {
            this.turnTo(this.currIndex + this.param.scrollNum);
        },
        getValidIndex: function(index) {
            var preIndex = index;
            var len = this.$items.length;
            if (index < 0) {
                index = len + index;
            } else if (index >= len) {
                index = index - len;
            }
            // console.log(preIndex, index);
            return index;
        },
        validParam: function(param) {
            // if (!param) {
            //     console.error('param needed!');
            //     return false;
            // }
            return true;
        },
        initNav: function() {
            var self = this;
            var param = this.param;
            if (param.$prevBtn) {
                param.$prevBtn.click(function() {
                    self.turnPrev();
                });
            }
            if (param.$nextBtn) {
                param.$nextBtn.click(function() {
                    self.turnNext();
                });
            }
        },
        start: function() {
            var self = this;
            return setInterval(function() {
                self.turnNext();
            }, this.param.interval);
        },
        stop: function() {
            clearInterval(this.runId);
        }
    });

    $.fn.simpleSlide = function(option) {
        new Plugin(this, option);
        return this;
    };
})(jQuery, undefined);
