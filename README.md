Scroller plugin for mootools
============================

The purpose of this [Mootools][mootools] plugin is to easily scroll a 'film' containg slide throught a 'window'.

[mootools]: http://mootools.net

How to use
----------

### JS
    <script type="text/javascript">
    Demo = {};
    window.addEvent('domready', function() {
        Demo.sc1 = new Scroller($('scroll1'), {duration: 500, autostart: true, autostart_dir:"back", sleep: 1000});
    });
    </script>

### HTML
You will need a window div, a film div and some slides (without comments :D):

    <!-- The window div (the one thought you see strip sliding) -->
    <div id="scroll1" style="overflow: hidden; width: 215px; height: 100px; padding: 5px;">
        <!-- the 'film' containing slides -->
        <div>
	    <!-- Slide #1 -->
            <div>
                aaa
            </div>

            <!-- Slide #2 -->
            <div>
                bbb
            </div>
	    
	    ...
        </div>
    </div>

Class elements
--------------

### Creation
    new Scroller(WindowObject, {options})
    
 * WindowObject: (html object) the scrolling viewport object (div element)

### Options
  * duration: (integer) effect duration (ms)
  * selectBy: (string) child | class (def: child)
    * selecting by child, the scroller will use each child tags of the film as a slide
    *  selecting by class, it will use as slide only child tags which classes contains 'slide'    
  * autostart: (boolean) makes the slide start on init
  * autostart_dir: (string) forward | back (def: forward)
  * sleep: (integer) sleep time in ms beetween slide (in auto mode)
  * transistion: (string|transition object) animation algorythm for transition (see [Fx.Fx documentation][fx.fx] and [Easing demo][easing_demo])
  * leftm: (interger) letf margin for micro adjustements
  * topm: (interger) top margin for micro adjustements

[fx.fx]: http://mootools.net/docs/core/Fx/Fx
[easing_demo]: http://www.robertpenner.com/easing/easing_demo.html

### Methods
  * stop: stops the autoscroll
  * start(backward): starts the autoscroll
    * backward (opt boolean): if true, the slide goes backwards
  * next(stop): go to the next slide
    * stop (opt boolean): if true, it also stops the autoslide
  * prev(stop): go to the previous slide
    * stop (opt boolean): if true, it also stops the autoslide
  * updateTransition(options): Updates transition options and aply them
    * options (array): array conteining new values for options (duration and transition algorythm)

Requirements
------------

Mootools core 1.2.4:

 - Core : [Core, Browser]
 - Native : [Array, Function, Number, String, Hash, Event]
 - Class : [Class, Class.Extras]
 - Element : [Element, Element.Style, Element.Dimensions]
 - Utilities: [Selectors]
 - Fx : [Fx]

Mootools more 1.2.4:

 - Fx.Scroll


