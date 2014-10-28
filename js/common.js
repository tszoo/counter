/*2014.10.28 zt count animate test ver*/

$(document).ready(function() {
    "use strict";
    var rndNum1 = Math.floor((Math.random() * 9) + 1);
    var rndNum2 = Math.floor((Math.random() * 9) + 1);
    var rndNum3 = Math.floor((Math.random() * 9) + 1);
    
    var a = new countAnimate($(".cc3 img"), rndNum1);
    var b = new countAnimate($(".cc4 img"), rndNum2, 1500);
    var c = new countAnimate($(".cc5 img"), rndNum3, 1800);
    a.start();
    b.start();
    c.start();
    
    var rndNum = Math.floor((Math.random() * 99999) + 1);
    animateCount(rndNum);
    function animateCount(endNum) {
        //console.log(endNum);
        var startNum = 0, duration = 2000, minTimer = 50;
        var obj = $("#count");
        var range = endNum - startNum;
        var interDelay = Math.max(Math.abs(Math.floor(duration / range)), minTimer);
        var startTime = new Date().getTime();
        var endNumTime = startTime + duration;
        var timer;
      
        function animate() {
            var now = new Date().getTime();
            var remaining = Math.max((endNumTime - now) / duration, 0);
            var value = Math.round(endNum - (remaining * range));
            var str = value+"";
            var arr = str.split("");
            obj.html(value);
            setPos(arr);
            if (value == endNum) {
                clearInterval(timer);
            }
        }
        timer = setInterval(animate, interDelay);
        animate();
        
        function setPos(arr){
            $.fn.reverse = [].reverse;
            arr.reverse();
            var len  = arr.length;
            for(var i = 0; i< len ;i++){
                var backgroundY = arr[i]*-21;
                var speed = (arr[i] == 0) ? 0 : 30 ;
                $(".bb").reverse().eq(i).find("img").animate({"top":backgroundY}, speed, "easeOutQuint");
                //$(".cc").reverse().eq(i).html(arr[i]);
                //$(".cc").reverse().eq(i).css('backgroundPosition', '0px '+backgroundY+"px");
            }
        }
    }
});


 function countAnimate(obj, endNum, duration){
    this.obj = obj;
    this.startNum = 0;
    this.endNum = endNum;
    this.duration = duration || 1000;
    this.interVal;
    this.interDelay  = 30;
    this.currentNum = 0;
    this.init();    
 };
 
 countAnimate.prototype={
     init:function(){
         var self = this;
         //console.log("init");
     },
     start:function(){
         var self = this;
         var startTime = new Date().getTime();
         var endTime = startTime + self.duration;
         self.interVal = setInterval(function(){
              self.currentNum++;
              if(self.currentNum > 9){
                  self.currentNum = 0;
              }
              var currentTime = new Date().getTime();
              var objY = self.currentNum * -21;
              self.obj.animate({"top":objY}, self.interDelay);
              if(currentTime > endTime && self.currentNum == 0){
                  clearInterval(self.interVal);
                  self.obj.animate({"top":0}, 0);
                  self.stop();
              }
         }, self.interDelay);
     },
     stop:function(){
         var self = this;
         var objY = self.endNum * -21;
          if(self.interVal){
              clearInterval(self.interVal);
         }
         self.obj.stop().animate({"top":objY}, self.duration, "easeOutQuint", function(){
             self.endMotion();
         });
     },
     endMotion:function(){
         //console.log("end");
     }
 }
