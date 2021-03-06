define(['jquery','baseclass'],function($,Class){
	var Renderer = Class.extend({
		init:function(){
			var _this = this;
			this.fps = 0;
			this.afps = 0;
			this.dt = 600;
			var fpses = [];
			var d = new Date();
			this.lastm = this.curm = d.getTime();
			this.render = function(_ent){
				var d = new Date();
				this.lastm = this.curm;
				this.curm = d.getTime();
				this.fps = Math.round(1000/(this.curm - this.lastm));
				this.dt = (this.curm - this.lastm) / 10;
				if(fpses.length===30)fpses.shift();
				fpses.push(this.fps);
				var fpssum = 0;
				_.each(fpses,function(fps){fpssum += fps;});
				this.afps = Math.round(fpssum/fpses.length);
				_this.loopChild(_ent);
			};
			this.loopChild = function(_ent){
				_ent.element.html("");
				_.each(_ent.children,function(child){_this.loopChild(child);});
				if(_ent.parent)_ent.parent.element.append(_ent.element);
			};
		}
	});
	return Renderer;
});