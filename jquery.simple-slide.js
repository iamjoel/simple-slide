/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright 漏 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright 漏 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
(function($, undef) {
    var emptyFn = function() {};
    window.console = window.console || {
        log: emptyFn,
        error: emptyFn
    };
    var defaultParam = {
        $items: false, //中间幻灯的border的宽度
        $itemWrap: false,
        navType: false, // dot 点状的。设置false则没有导航
        navAlign: 'right', // 对齐方式
        circle: false, // 循环播放
        interval: false,
        $prevBtn: false,
        $nextBtn: false,
        scrollNum: 1, //滚动条目数
        scrollType: 'scroll', // 还支持fade
        scrollDir: 'horizontal', //水平，垂直 vertical
        easing: 'easeOutSine', //动画缓动效果
        duration: 500, //动画持续时间
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
        },
        number: {
            getWrap: function() {
                var $wrap = $('<div>');
                $wrap.addClass('simple-slide-nav number-nav').append('<ul class="clearfix"></ul>');
                return $wrap;
            },
            makeItem: function(num) {
                return '<li><a href="javascript:void(0);">{num}</a></li>'.replace('{num}', num);
            }
        }
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

        // 做完一次动画后，做最近的一次
        this.isAnim = false;

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

        if(param.scrollType === 'fade'){
            $items.eq(0).siblings().hide();
        }

        this.locArr = this.getLocArr();
        this.isHor = param.scrollDir === 'horizontal' || param.scrollDir === 'hor';


        this.$itemWrap = param.$itemWrap || $items.parent();

        this.initNavBtn();
        if (param.navType) {
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
            self.stop();
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
        animDone: function() {
            // console.log('anim done');
            this.isAnim = false;
            if (this.nextAnimParam) {
                this.turnTo.apply(this, this.nextAnimParam);
                this.nextAnimParam = false;
            }
        },
        // 第一张是0
        turnTo: function(index, dir) {
            var self = this;
            if (this.isAnim) {
                this.nextAnimParam = [].slice.call(arguments, 0);
                return;
            }

            var param = this.param;
            index = this.getValidIndex(index);
            var currIndex = this.currIndex;
            if (index === currIndex) {
                return;
            }

            this.isAnim = true;
            dir = dir || 'next'; // 转动方向

            var animOpt = {};
            var isHor = this.isHor;
            // console.log('go to ' + index + ' prev ' + currIndex);
            if (param.circle && param.scrollType === 'scroll') { // 循环
                this.$items = this.$el.find('.slide-item');
                var scrollToIndex = this.$items.index(this.$items.filter('[data-id=' + index + ']'));
                // console.log('scrollTo %s,before has : %s',index, scrollToIndex);
                if (dir === 'next') {
                    var $scroll = this.$items.filter(':lt(' + scrollToIndex + ')');
                    this.$itemWrap.append($scroll.clone(true));
                    if (isHor) {
                        animOpt.left = this.locArr[scrollToIndex];
                    } else {
                        animOpt.top = this.locArr[scrollToIndex];
                    }
                    this.$itemWrap.animate(animOpt, {
                        easing: param.easing,
                        duration: param.duration,
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
                        always: function() {
                            $scroll.remove();
                            self.animDone();
                        }
                    });
                } else { // 反方向滚动
                    var $scroll = this.$items.filter(':gt(' + (scrollToIndex - 1) + ')');
                    var tempPos = {};
                    this.$itemWrap.prepend($scroll);
                    if (isHor) {
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
                        easing: param.easing,
                        duration: param.duration,
                        done: function() {
                            self.setCurrentIndex(index);
                        },
                        always: function() {
                            self.animDone();
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
                    this.$itemWrap.animate(animOpt, {
                        easing: param.easing,
                        duration: param.duration,
                        done: function() {
                            self.setCurrentIndex(index);
                        },
                        always: function() {
                            self.animDone();
                        }
                    });
                } else if(param.scrollType === 'fade'){
                    this.$items = this.$el.find('.slide-item');
                    self.$items.filter('[data-id=' + this.currIndex + ']').fadeOut(300, function(){
                        self.setCurrentIndex(index);
                        self.$items.filter('[data-id=' + index + ']').fadeIn(1200, function(){
                            self.animDone();
                        });
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
            if (this.param.navType) {
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
            var type = param.navType;
            var template = navTemplate[type];
            var $wrap = template.getWrap();
            var makeItem = template.makeItem;
            var itemHtml = [];
            for (var i = 0; i < this.$items.length / param.scrollNum; i++) {
                itemHtml.push(makeItem(i + 1));
            }
            $wrap.find('ul').html(itemHtml.join(''));
            this.$itemWrap.after($wrap);
            $wrap.addClass('simple-slide-nav-' + param.navAlign);
            $wrap.find('li').hover(function() {
                self.turnTo($(this).index() * param.scrollNum);
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
                    runPrevId = setTimeout(function() {
                        self.turnPrev();
                    }, 200);
                });
            }
            if (param.$nextBtn) {
                param.$nextBtn.click(function() {
                    clearTimeout(runNextId);
                    runNextId = setTimeout(function() {
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
