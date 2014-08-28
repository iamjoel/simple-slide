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
        circle: true, // 循环播放
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
            width: $items.width() + parseInt($items.css('padding-right')),
            height: $items.height() + parseInt($items.css('padding-bottom'))
        };
        this.nextItemWrapPos = {
            left: $items.length * this.itemSize.width,
            top: $items.length * this.itemSize.height
        };
        this.itemWrapSize = {
            width: ($items.length + param.scrollNum) * this.itemSize.width,
            height: ($items.length + param.scrollNum) * this.itemSize.height
        };

        this.locArr = this.getLocArr();
        this.currIndex = 0; // 下标从0开始
        this.isHor = param.scrollDir === 'horizontal' || param.scrollDir === 'hor';

        var $itemWrap1 = param.$itemWrap || $items.parent();
        var $itemWrap2;
        if (param.scrollType === 'scroll' && param.circle) {
            $itemWrap1.css('z-index', 100);
            $itemWrap1.append($items.not(':gt('+ (param.scrollNum - 1) +')').clone());
            if (this.isHor) {
                $itemWrap1.width(this.itemWrapSize.width);
            } else {
                $itemWrap1.height($items.length * this.itemSize.height);
            }
            $itemWrap2 = $itemWrap1.clone();
            if (this.isHor) {
                $itemWrap2.css({
                    'left': this.nextItemWrapPos.left,
                    'z-index': 99
                });
            } else {
                $itemWrap2.css({
                    'top': this.nextItemWrapPos.top,
                    'z-index': 99
                });
            }
            $itemWrap1.after($itemWrap2);
            this.$itemWrap1 = $itemWrap1;
            this.$itemWrap2 = $itemWrap2;
        }

        this.$itemWrap = $itemWrap1;

        this.initNav();
        if (param.interval && !isNaN(param.interval, 10)) {
            this.runId = this.start();
        }
        var $stopOnElem = $('#not-exit-elem-123');
        $stopOnElem = $stopOnElem.add($items);
        if (param.$prevBtn) {
            $stopOnElem = $stopOnElem.add(param.$prevBtn);
        }
        if (param.$nextBtn) {
            $stopOnElem = $stopOnElem.add(param.$nextBtn);
        }
        $stopOnElem.hover(function() {
            if (self.runId) {
                self.stop();
            }
        }, function() {
            if (param.interval && !isNaN(param.interval, 10)) {
                self.runId = self.start();
            }
        });
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
            for (var i = 0; i < len + 1; i++) { // 最后一格是这一组幻灯的结尾
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
            var animOpt = {};
            var isHor = this.isHor;
            // console.log('go to ' + index + ' prev ' + currIndex);
            if (param.circle && param.scrollType === 'scroll' && index < currIndex) {
                var $itemWrap1 = this.$itemWrap1;
                var $itemWrap2 = this.$itemWrap2;
                // if ($itemWrap1.index() > $itemWrap2.index()) {
                //     var $temp = $itemWrap1;
                //     $itemWrap1 = $itemWrap2;
                //     $itemWrap2 = $itemWrap1;
                //     console.log('error');
                // }
                var locLength = this.locArr.length;
                if (isHor) {
                    animOpt.left = this.locArr[locLength - 1];
                } else {
                    animOpt.top = this.locArr[locLength - 1];
                }
                if (isHor) {
                    $itemWrap2.css('left', 0);
                } else {
                    $itemWrap2.css('top', 0);
                }
                // 上一组幻灯滚动到底
                $itemWrap1.animate(animOpt, {
                    done: function() {
                        var $itemWrap3 = $itemWrap1.clone();
                        $itemWrap1.remove();
                        if (isHor) {
                            $itemWrap3.css('left', self.nextItemWrapPos.left);
                        } else {
                            $itemWrap3.css('top', self.nextItemWrapPos.top);
                        }
                        $itemWrap2.css('z-index', 100);
                        $itemWrap3.css('z-index', 99);

                        $itemWrap2.after($itemWrap3);
                        self.$itemWrap = $itemWrap2;
                        self.$itemWrap1 = $itemWrap2;
                        self.$itemWrap2 = $itemWrap3;
                        animOpt = {};
                        if (param.scrollType === 'scroll') {
                            if (isHor) {
                                animOpt.left = self.locArr[index];
                            } else {
                                animOpt.top = self.locArr[index];
                            }
                            // console.log(animOpt);
                            // 继续滚到指定位置
                            self.$itemWrap1.animate(animOpt, {
                                done: function() {
                                    self.currIndex = index;
                                }
                            });
                        }
                    }
                });
            } else {
                if (param.scrollType === 'scroll') {
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
