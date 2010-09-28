// jQuery PNG Animation
// by Josh Pyles (Pixelmatrix Design LLC)
// 
// Licensed under MIT License - http://www.opensource.org/licenses/mit-license.php
//
// Usage:
// $("#container").animatePNG("/images/animation.png", 32, 32, 10, {fps: 10, horizontal: false});
// Creates a div that is animated inside of #container and returns the animating div
//
// $(…).animatePNG(imageURL, w, h, frames, options);
// ---------------------------------------------------------
// imageURL (string): URL to the image to be animated (can be relative)
// w (integer): width (in pixels) of the image frame
// h (integer): height (in pixels) of the image frame
// frames (integer): number of frames in the animation
// options (object):
// - fps (integer): number of frames per second to render
// - horizontal (boolean): true if the frames go horizontal (left to right), or false if they go vertical (top to bottom)
//

(function($) {
  //
  // plugin definition
  //
  $.fn.animatePNG = function(imageURL, w, h, frames, options) {
    
    var opts = $.extend({}, $.fn.animatePNG.defaults, options);
    var $this = $(this);
    
    // setup local variables
    var animation = {
      o: $.meta ? $.extend({}, opts, $this.data()) : opts,
      container: $("<div class='animation'></div>"),
      imgW: null,
      imgH: null,
      fpms: null,
      t: null,
      x: 0,
      y: 0,
      h: h,
      w: w,
      imageURL: imageURL,
      frames: frames
    };
    
    //calculations
    animation.imgW = animation.o.horizontal ? 0 - (animation.frames * animation.w) : 0;
    animation.imgH = animation.o.horizontal ? 0 : 0 - (animation.frames * animation.h);
    animation.fpms = Math.round(1000 / animation.o.fps);
    
    //preload
    var img = new Image;
    img.src = animation.imageURL;
    
    function nextX() {
      if (animation.o.horizontal) {
        animation.x = ((animation.x - animation.w) >= animation.imgW) ? (animation.x - animation.w) : 0;
        return animation.x;
      } else {
        return 0;
      }
    }
    
    function nextY() {
      if (animation.o.horizontal) {
        return 0;
      } else {
        animation.y = ((animation.y - animation.h) >= animation.imgH) ? (animation.y - animation.h) : 0;
        return animation.y;
      }
    }
    
    function iterate() {
      animation.container.css("background-position", nextX() + "px " + nextY() + "px");
    }
    
    function start() {
      animation.t = setInterval(iterate, animation.fpms);
      animation.container.data("animation", animation);
    }
    
    animation.container.css({
      "background-color": "#eee",
      "background-image": "url('" + animation.imageURL + "')",
      "background-position": "0px 0px",
      "background-repeat": "no-repeat",
      "width": animation.w,
      "height": animation.h
    });
    
    $this.append(animation.container);
    
    start();
    
    return animation.container;
  };
  
  $.fn.animatePNG.stop = function($el) {
    var a = $el.data("animation");
    window.clearInterval(a.t);
  };
  
  //
  // plugin defaults
  //
  $.fn.animatePNG.defaults = {
    fps: 20,
    horizontal: true
  };
})(jQuery);