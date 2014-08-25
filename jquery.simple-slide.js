(function($, undef) {
    var emptyFn = function() {};
    window.console = window.console || {
        log: emptyFn,
        error: emptyFn
    };
    var defaultParam = {
        $item: false, //中间幻灯的border的宽度
        navType: 'dot',// 点状的。设置false则没有导航
        circle: true, // 循环播放
        interval: false,
        $prevBtn: false,
        $nextBtn: false,
        scrollType: 'scroll'// 还支持fade
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
        $el.addClass('slide');

        var $items;
        if (param.itemSel) {
            $items = $el.find(param.itemSel);
        } else {
            $items = $el.find('li');
        }
        if ($items.length < 4) { // 至少4张图
            console.error('too little $item');
            return;
        }
        $items.addClass('slide-item');
        this.$items = $items;
        this.itemSize = {
            height: $items.height(),
            width: $items.width()
        };
        this.locMap = this.getLocMap(this.itemSize);
        this.initItemLoc();
        this.initNav();
        if(param.interval && !isNaN(param.interval, 10)){
        	this.runId = this.start();
        }

        $items.hover(function(){
        	if(self.runId){
        		self.stop();
        	}
        }, function(){
        	if(param.interval && !isNaN(param.interval, 10)){
        		self.runId = self.start();
        	}
        })
    }

    $.extend(Plugin.prototype, {
        getLocMap: function(itemSize) {
            var param = this.param;
            var $el = this.$el;
            var middleTop = param.top;
            var middleLeft = param.left;
            if (!middleTop) {
                middleTop = $el.height() - itemSize.height - param.borderWidth * 2;
            }
            if (!middleLeft) {
                middleLeft = ($el.width() - itemSize.width - param.borderWidth * 2) / 2;
            }
            return [{
                top: 0,
                left: 0
            }, {
                top: middleTop,
                left: middleLeft
            }, {
                top: 0,
                left: $el.width() - param.subWidth
            }]
        },
        initItemLoc: function() {
            var param = this.param;
            this.currMiddleIndex = 1;
            var locMap = this.locMap;
            var $showItems = this.$items.filter(function(index) {
                return index < 3;
            });
            $showItems.addClass('slide-show');
            $showItems.eq(0).css(locMap[0]).css({
                width: param.subWidth
            });
            $showItems.eq(1).css(locMap[1]).css({
                width: this.itemSize.width
            }).addClass('slide-current');
            $showItems.eq(2).css(locMap[2]).css({
                width: param.subWidth
            });
        },
        // 第一张是0
        scrollTo: function(index, dir) {
            var currMiddleIndex = this.currMiddleIndex;

        },
        scroll: function($elemArr, dir) {
            var param = this.param;
            var locMap = this.locMap;
            var self = this;
            dir = dir || 'left';
            // 从左往右
            if (dir === 'left') {
                $elemArr[0].animate({
                    left: -param.subWidth
                }, {
                    done: function() {
                        $(this).removeClass('slide-show');
                    }
                });
                $elemArr[1].animate($.extend(locMap[0], {
                    width: param.subWidth
                }), {
                    done: function() {
                        $(this).removeClass('slide-current');
                    }
                });
                $elemArr[2].animate($.extend(locMap[1], {
                    width: self.itemSize.width
                }), {
                    done: function() {
                        $(this).addClass('slide-current');
                    }
                });
                $elemArr[3].width(0).addClass('slide-show').animate($.extend(locMap[2], {
                    width: param.subWidth
                }), {
                    done: function() {
                    }
                });
            } else {
            	$elemArr[0].animate($.extend(locMap[1], {
                    width: self.itemSize.width
                }), {
                    done: function() {
                        $(this).addClass('slide-current');
                    }
                });
                $elemArr[1].animate($.extend(locMap[2], {
                    width: param.subWidth
                }), {
                    done: function() {
                        $(this).removeClass('slide-current');
                    }
                });
                $elemArr[2].animate({
                    left: locMap[2].left + param.subWidth
                }, {
                    done: function() {
                        $(this).removeClass('slide-show');
                    }
                });
                $elemArr[3].width(0).addClass('slide-show').animate($.extend(locMap[0], {
                    width: param.subWidth
                }), {
                    done: function() {
                    }
                });
            }
        },
        scrollLeft: function() {
            var param = this.param;
            var currMiddleIndex = this.currMiddleIndex;
            if (!param.circle && currMiddleIndex >= this.$items.length-2) {
                return;
            }
            currMiddleIndex++;
            var $items = this.$items;
            currMiddleIndex = this.getValidIndex(currMiddleIndex);
            this.currMiddleIndex = currMiddleIndex;
            var $elemArr = [];
            $elemArr.push(
                $items.eq(this.getValidIndex(currMiddleIndex - 2)),
                $items.eq(this.getValidIndex(currMiddleIndex - 1)),
                $items.eq(this.getValidIndex(currMiddleIndex)),
                $items.eq(this.getValidIndex(currMiddleIndex + 1))
            );
            this.scroll($elemArr, 'left');
        },
        scrollRight: function() {
        	var param = this.param;
            var currMiddleIndex = this.currMiddleIndex;
            if (!param.circle && currMiddleIndex <= 1) {
                return;
            }
            currMiddleIndex--;
            var $items = this.$items;
            currMiddleIndex = this.getValidIndex(currMiddleIndex);
            this.currMiddleIndex = currMiddleIndex;
            var $elemArr = [];
            $elemArr.push(
                $items.eq(this.getValidIndex(currMiddleIndex)),
                $items.eq(this.getValidIndex(currMiddleIndex + 1)),
                $items.eq(this.getValidIndex(currMiddleIndex + 2)),
                $items.eq(this.getValidIndex(currMiddleIndex + 3))
            );
            console.log('------------');
            // console.log([this.getValidIndex(currMiddleIndex),
            //     this.getValidIndex(currMiddleIndex + 1),
            //     this.getValidIndex(currMiddleIndex + 2),
            //     this.getValidIndex(currMiddleIndex + 3)]);
            this.scroll($elemArr, 'right');
        },
        getValidIndex: function(index){
        	var preIndex = index;
        	var len = this.$items.length;
        	if(index < 0){
    			index = len + index;
        	} else if(index >= len) {
        		index = index - len;
        	}
        	console.log(preIndex, index);
        	return index;
        },
        validParam: function(param) {
            // if (!param) {
            //     console.error('param needed!');
            //     return false;
            // }
            return true;
        },
        initNav: function(){
        	var self = this;
        	var $items = this.$items;
        	var param = this.param;
        	$items.click(function(){
        		var $this = $(this);
        		if($this.hasClass('slide-show') && !$this.hasClass('slide-current')){
        			var index = $this.index();
        			var middleIndex = $items.filter('.slide-current').index();
        			var dir;
        			if (!param.circle && (index === 0 || index === $items.length - 1)) {
        				return;
        			};
        			if(middleIndex == 0 && index == $items.length - 1){
        				dir = 'Right';
        			} else if(index == 0 && middleIndex == $items.length - 1){
        				dir = 'Left'
        			} else if(index < middleIndex){
        				dir = 'Right';
        			} else {
        				dir = 'Left'
        			}
    				console.log(index, middleIndex, dir);
        			self['scroll' + dir]();
        			// if(circle){
        			// }
        		}
        	});
        },
        start: function(){
        	var self = this;
        	return setInterval(function(){
        		if(self.param.dir === 'left'){
        			self.scrollLeft();
        		}else{
        			self.scrollLeft();
        		}
        	} , this.param.interval);
        },
        stop: function(){
        	clearInterval(this.runId);
        }
    });

    $.fn.slide = function(option) {
        new Plugin(this, option);
        return this;
    };
})(jQuery, undefined);
