/*
Module for basic charts for Bangle.js
var bc = new bangleChart();
bc.drawPie(centerX,centerY,radius,data);  // up to 4 pies, for more add colors(16bit) to bc.cols
*/
function bangleChart(){
  var radarIv;
  function init(){
    require("Font8x12").add(Graphics);
    g.setFont8x12();
  }
  function getArcXY(centerX,centerY,radius,angle){
    var s,r = [];
    s = 2 * Math.PI * angle / 360;
    r.push(centerX + Math.round(Math.cos(s) * radius));
    r.push(centerY + Math.round(Math.sin(s) * radius));
    return r;
  }
  function getArc(centerX,centerY,radius,startAngle,endAngle){
    var xy,r = [], actAngle = startAngle;
    var stepAngle = (radius + radius) * Math.PI / 60;
    stepAngle = 6;
    while(actAngle < endAngle){
      r = r.concat(getArcXY(centerX,centerY,radius,actAngle));
      actAngle += stepAngle;
      actAngle = Math.min(actAngle,endAngle);
    }
    return r.concat(getArcXY(centerX,centerY,radius,endAngle));
  }
  function drawPiece(centerX,centerY,radius,startAngle,endAngle){
    var polyData = [centerX,centerY];
    polyData = polyData.concat(getArc(centerX,centerY,radius,startAngle,endAngle));
    g.fillPoly(polyData,true);
  }
  function dataToAngles(data){
    var sum = 0;
    data.map(function(num){return sum += num[0];});
    return data.map(function(num){return num[0] * 360 / sum;});
  }
  this.cols = [2016,63489,65504,31];

  this.drawLabel = function(x,y,data){
    var localY = y;
    for(var i = 0; i < data.length; i++){
      g.setColor(this.cols[i]);
      g.fillRect(x,localY,x + 12,localY + 12);
      g.setColor(65535);
      g.drawString(data[i][1],x + 15,localY );
      localY += 12;
    }
  };
  this.drawPie = function(centerX,centerY,radius,data){
    var dataAngle = dataToAngles(data);
    var startAngle = 0;
    g.setColor(0);
    g.fillCircle(centerX,centerY,radius);
    for(var i = 0; i < data.length; i++){
      g.setColor(this.cols[i]);
      drawPiece(centerX,centerY,radius,startAngle,startAngle + dataAngle[i]);
      startAngle += dataAngle[i];
    }
    g.setColor(65535);
    g.drawCircle(centerX,centerY,radius);
  };
  this.drawSlices = function(centerX,centerY,radius,data){
    var rad = radius;
    g.setColor(0);
    g.fillCircle(centerX,centerY,radius);
    var sliceSize = parseInt(radius / data.length) * 0.8;
    for(var i = 0; i < data.length;i++){
      g.setColor(this.cols[i]);
      drawPiece(centerX,centerY,rad,0,data[i][0] * 3.6);
      g.setColor(0);
      rad -= sliceSize;
      g.fillCircle(centerX,centerY,rad);
    }
    g.setColor(65535);
    g.drawCircle(centerX,centerY,radius);  
  };
  this.drawSizedPie = function(centerX,centerY,radius,data){
    g.setColor(0);
    g.fillCircle(centerX,centerY,radius);
    var pieSize = parseInt(360 / data.length);
    for(var i = 0; i < data.length; i++){
      g.setColor(this.cols[i]);
      drawPiece(centerX,centerY,radius * data[i][0] / 100,i * pieSize, (i + 1) * pieSize);
    }
    g.setColor(65535);
    g.drawCircle(centerX,centerY,radius);
  };
  this.drawRadar = function(centerX,centerY,radius,data){
    function findRadar(angle){
      g.setColor(65504);
      for(var i = 0; i < data.length; i++){
        if(data[i][0] > (angle + 2)){
           if(data[i][0] < (angle + 10)){
             pos = getArcXY(centerX,centerY,radius * data[i][1] / 100,data[i][0]);
             g.fillCircle(pos[0],pos[1],3);
           }
        }
      }
    }
    var p = 0;
    g.setColor(65535);
    g.drawCircle(centerX,centerY,radius);
    g.setColor(990);
    radarIv = setInterval(function(){
      g.setColor(0);
      drawPiece(centerX,centerY,radius - 4,p - 2,p + 14);
      g.setColor(992);
      p += 3;
      if(p > 359) p = p - 357;
      drawPiece(centerX,centerY,radius - 5,p,p+12);
      findRadar(p);
    },50);
  };
  this.drawBar = function(x,y,w,h,dir,value,c){
    g.setColor(65535);
    g.drawRect(x,y,x + w, y + h);
    g.setColor(this.cols[c]);
    if(dir == "h") g.fillRect(x + 1, y + h - 1,x + w - 1, y + h - (h - 2) * value / 100);
    else g.fillRect(x + 1,y + 1,x + (w - 2) * value / 100,y + h - 1);
  };
  this.drawLines = function(x,y,w,h,dt){
    g.setColor(65535);
    g.drawRect(x,y,x + w, y + h);
    var xw = (w - 2) / dt[0].length,xx,y0 = y + h - 1,yy;
    for(var i = 0; i < dt.length;i++){
      xx = xw / 2 + x;
      yy = y0 - (h - 1) * dt[i][0] / 100;
      g.moveTo(xx,yy);
      g.setColor(this.cols[i]);
      g.drawCircle(xx,yy,2);
      for(var j = 1; j < dt[i].length; j++){
        xx += xw;
        yy = y0 - (h -1) * dt[i][j] / 100;
        g.lineTo(xx,yy);
        g.drawCircle(xx,yy,2); 
      }
    }
  };
  this.clear = function(){
    if(radarIv){
      clearInterval(radarIv);
      radarIv = undefined;
    }
    g.clear();
  };
  init();
}
exports.init = function(){
  return new bangleChart();
}