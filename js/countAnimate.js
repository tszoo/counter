/*
 * count animate test ver
 *
 * Copyright 2014, zt
 * Released under the MIT License
*/

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
