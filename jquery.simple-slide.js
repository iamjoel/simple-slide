(function($, undef) {
    var emptyFn = function() {};
    window.console = window.console || {
        log: emptyFn,
        error: emptyFn
    };
    var defaultParam = {
        $items: false, //中间幻灯的border的宽度
        $itemWrap: false,
        nav: false, // dot 点状的。设置false则没有导航
        circle: false, // 循环播放
        interval: false,
        $prevBtn: false,
        $nextBtn: false,
        scrollNum: 1, //滚动条目数
        scrollType: 'scroll', // 还支持fade
        scrollDir: 'horizontal', //水平，垂直 vertical
        prevDisabledFn: emptyFn, // 向前到底时 circle为false时有效
        nextDisabledFn: emptyFn //向后到底时
    };

    var navTemplate = {
        dot: {
            getWrap: function() {
                var $wrap = $('<div>');
                $wrap.addClass('simple-slide-nav dot-nav').append('<ul class="clearfix"></ul>');
                return $wrap;
            },
            makeItem: function() {
                return '<li><a href="javascript:void(0);"></a></li>';
            }
        }
    }

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
        $items.each(function() {
            var $this = $(this);
            $this.attr('data-id', $this.index());
        });
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
        this.isHor = param.scrollDir === 'horizontal' || param.scrollDir === 'hor';


        this.$itemWrap = param.$itemWrap || $items.parent();

        this.initNavBtn();
        if (param.nav) {
            this.makeNav();
        }
        this.setCurrentIndex(0); // 下标从0开始

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
        if (param.nav) {
            $stopOnElem = $stopOnElem.add($el.find('.simple-slide-nav li'));
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
        turnTo: function(index, dir) {
            dir = dir || 'next'; // 转动方向
            var self = this;
            var param = this.param;
            index = this.getValidIndex(index);
            var currIndex = this.currIndex;
            if (index === currIndex) {
                return;
            }
            // this.$itemWrap.clearQueue();
            var animOpt = {};
            var isHor = this.isHor;
            // console.log('go to ' + index + ' prev ' + currIndex);
            if (param.circle && param.scrollType === 'scroll') {
                var scrollToIndex = parseInt(this.$items.filter('[data-id=' + index + ']').index(), 10);
                this.$items = this.$el.find('.slide-item');
                if (dir === 'next') {
                    var $scroll = this.$items.filter(':lt(' + scrollToIndex + ')');
                    this.$itemWrap.append($scroll.clone(true));
                    if (isHor) {
                        animOpt.left = this.locArr[scrollToIndex];
                    } else {
                        animOpt.top = this.locArr[scrollToIndex];
                    }
                    // this.$itemWrap.clearQueue();
                    this.$itemWrap.animate(animOpt, {
                        done: function() {
                            var endPos = {};
                            if (isHor) {
                                endPos.left = 0;
                            } else {
                                endPos.top = 0;
                            }
                            self.$itemWrap.css(endPos);
                            self.setCurrentIndex(index);
                        },
                        always: function(){
                            $scroll.remove();
                        }
                    });
                } else {
                    var $scroll = this.$items.filter(':gt(' + (scrollToIndex - 1) + ')');
                    var tempPos= {};
                    this.$itemWrap.prepend($scroll);
                    if(isHor){
                        tempPos.left = this.locArr[$scroll.length];
                    } else {
                        tempPos.top = this.locArr[$scroll.length];
                    }
                    this.$itemWrap.css(tempPos);
                    if (isHor) {
                        animOpt.left = 0;
                    } else {
                        animOpt.top = 0;
                    }
                    // this.$itemWrap.clearQueue();
                    this.$itemWrap.animate(animOpt, {
                        done: function() {
                            // $scroll.remove();
                            self.setCurrentIndex(index);
                        }
                    });
                }
            } else {
                if (param.scrollType === 'scroll') {
                    if (param.scrollDir === 'horizontal' || param.scrollDir === 'hor') {
                        animOpt.left = this.locArr[index];
                    } else {
                        animOpt.top = this.locArr[index];
                    }
                    // this.$itemWrap.clearQueue();
                    this.$itemWrap.animate(animOpt, {
                        done: function() {
                            self.setCurrentIndex(index);
                        }
                    });
                }
            }
        },
        turnPrev: function() {
            this.turn('prev');
        },
        turnNext: function() {
            this.turn('next');
        },
        setCurrentIndex: function(currIndex) {
            this.currIndex = currIndex;
            if (this.param.nav) {
                var $navs = this.$el.find('.simple-slide-nav li');
                $navs.removeClass('current');
                // console.log(currIndex / this.param.scrollNum);
                $navs.eq(currIndex / this.param.scrollNum).addClass('current');
            }
        },
        turn: function(dir) {
            var fix = dir === 'prev' ? -1 : 1;
            var turnToIndex = this.currIndex + fix * this.param.scrollNum;
            if (!this.param.circle) {
                var canTurn = turnToIndex === this.getValidIndex(turnToIndex);
                if (canTurn) {
                    this.turnTo(turnToIndex, dir);
                } else {
                    if (dir === -1) {
                        this.param.prevDisabledFn();
                    } else {
                        this.param.nextDisabledFn();
                    }
                }
            } else {
                this.turnTo(turnToIndex, dir);
            }
        },
        makeNav: function() {
            var self = this;
            var param = this.param;
            var type = param.nav;
            var template = navTemplate[type];
            var $wrap = template.getWrap();
            var makeItem = template.makeItem;
            var itemHtml = [];
            for (var i = 0; i < this.$items.length / param.scrollNum; i++) {
                itemHtml.push(makeItem(i));
            }
            $wrap.find('ul').html(itemHtml.join(''));
            this.$itemWrap.after($wrap);
            var hoverRunId;
            $wrap.find('li').hover(function() {
                clearTimeout(hoverRunId);
                // hoverRunId = setTimeout(function(){
                    self.turnTo($(this).index() * param.scrollNum);
                // }, 100);
            });
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
        initNavBtn: function() {
            var self = this;
            var param = this.param;
            var runPrevId;
            var runNextId;
            if (param.$prevBtn) {
                param.$prevBtn.click(function() {
                    clearTimeout(runPrevId);
                    runPrevId = setTimeout(function(){
                        self.turnPrev();
                    }, 200);
                });
            }
            if (param.$nextBtn) {
                param.$nextBtn.click(function() {
                    clearTimeout(runNextId);
                    runNextId = setTimeout(function(){
                        self.turnNext();
                    }, 200);
                });
            }
        },
        start: function() {
            var self = this;
            var param = this.param;
            return setInterval(function() {
                if (param.circle) {
                    self.turnNext();
                } else {
                    var nextIndex = self.currIndex + param.scrollNum;
                    if (nextIndex === self.getValidIndex(nextIndex)) {
                        self.turnNext();
                    } else {
                        self.turnTo(0);
                    }
                }
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
