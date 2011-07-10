/*
---
description: Scroll a 'film' of 'slides' trought a 'window'

license: MIT-style

authors: babs

requires:
  - core/1.2.4: '*'
  - more/1.2.4: 'Fx.Scroll'

provides: Scroller
...

    Class Scroller

    <div id="scroll1" style="overflow: hidden; width: 215px; height: 100px; padding: 5px;"> <!-- The window div (the one thought you see strip sliding) -->
		<div> <!-- the 'film' containing slides -->
			<div> <!-- Slide #1 -->
				aaa
			</div>

			<div> <!-- Slide #2 -->
				bbb
			</div>

			<div> <!-- Slide #3 -->
				ccc
			</div>

			<div> <!-- Slide #4 -->
				ddd
			</div>
		</div>
    </div>
    

    new Scroller(<'window'>, {options}):
		window: the div thought you see strip sliding
		
		options:
			duration: effect duration (ms)
			
			selectBy: child | class
				selecting by child, the scroller will use each child tags of the film as a slide
				selecting by class, it will use as slide only child tags which classes contains 'slide'
			
			autostart: makes the slide start on init
			
			autostart_dir: forward | back
				forward: step though slide as usual
				back: step though slide backward
			
			sleep: sleep time in ms beetween autoslide
			
			transition: animation algorythm for transition (http://mootools.net/docs/core/Fx/Fx and http://www.robertpenner.com/easing/easing_demo.html)
			
			leftm:
			topm: margins for micro adjustement (ex making window larger than a slide and centering it)
	
	example:
		new Scroller($('scrollHor'), {duration: 2000, autostart: true, selectBy: 'class', autostart_dir:"back"});
			This will create a scroll whch will start automatically backwards, selecting slides by class and with transition of 2s
		
		
	Methods:
		stop:
			Stop the autoscroll

		start(backward):
			Start the autoscroll
			if backward = false: it goes forward
				ex start() goes forward
			if true: it goes backward

		next(stop):
			go to the next slide
			if stop is true, stops the autoscroll
			
		prev(stop):
			go to the previous slide
			if stop is true, stops the autoscroll
	
		updateTransition({options}):
			Propagate options changes to transistion and apply them (duration and transition algorythm)
*/


Scroller = new Class({
	Implements: Options,
	options: {
		duration: 500,
		selectBy: "child",
		autostart: false,
		autostart_dir: "forward",
		sleep: 1000,
		transition: "sine:in:out",
		leftm: 0,
		topm: 0
	},
	length: 0,
	initialize: function (windowElement, options) {
		this.setOptions(options);
		this.windowElement = windowElement;
		this.slideStrip = windowElement.getChildren()[0];
		this.cChildIdx = 0;
		this.fx = new Fx.Scroll(windowElement,{duration: this.options.duration, link: 'cancel', transition: this.options.transition});
		if (this.options.selectBy == "class") {
			this.childs = this.slideStrip.getElements(".slide");
		} else {
			this.childs = this.slideStrip.getChildren();
		}
		this.childCoords = Array();
		for ( i = 0; i < this.childs.length; i++ ) {
			this.childCoords.push({
					left: this.childs[i].getCoordinates(this.windowElement)['left'],
					top: this.childs[i].getCoordinates(this.windowElement)['top']
				});
		}
		this.length = this.childs.length;
		this.periodicalID = 0;
		this.startdir = false;
		if (this.options.autostart == true) {
			if (this.options.autostart_dir != "back") {
				this.periodicalID = this.next.periodical(this.options.sleep+this.options.duration, this);
			} else {
				this.startdir = true;
				this.periodicalID = this.prev.periodical(this.options.sleep+this.options.duration, this);
			}
		}
	},
	updateTransition: function(opts) {
		this.setOptions(opts);
		this.fx.options.duration = this.options.duration;
		this.fx.options.transition = this.options.transision;
		if (this.periodicalID)
			this.restart();
	},
	stop: function() {
		if (this.periodicalID) {
			$clear(this.periodicalID);
			this.periodicalID = 0;
		}
	},
	start: function(back) {
		if (this.periodicalID) {
			$clear(this.periodicalID);
		}
		if (back) {
			this.startdir = true;
			this.periodicalID = this.prev.periodical(this.options.sleep+this.options.duration, this);
		} else {
			this.startdir = false;
			this.periodicalID = this.next.periodical(this.options.sleep+this.options.duration, this);
		}
	},
	next: function(stop){
		if (stop) this.stop();
		this.cChildIdx++;
		if (this.cChildIdx >= this.childs.length) {
			this.cChildIdx = 0;
		}
		this.gotoIdx();
	},
	restart: function() {
		this.stop();
		this.start(this.startdir);
	},
	prev: function(stop){
		if (stop) this.stop();
		this.cChildIdx--;
		if (this.cChildIdx < 0) {
			this.cChildIdx = this.childs.length-1;
		}
		this.gotoIdx();
	},
	gotoIdx: function () {
		var s = this.childs[this.cChildIdx];
		var bl = s.getStyle('border-left').toInt();
		if (isNaN(bl)) bl=0;
		var bt = s.getStyle('border-top').toInt();
		if (isNaN(bt)) bt=0;

		var ccrds = this.childCoords[this.cChildIdx];
		this.curTrans = this.fx.start(
			ccrds.left-bl-this.options.leftm,
			ccrds.top-bl-this.options.topm
		);
	}
});
