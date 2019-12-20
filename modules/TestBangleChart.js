var bc = require("https://www.jumware.com/Bangle/modules/BangleChart.js").init();

var dt = [10,15,55,20];
var lbl = ["Apple","Beef","Beer","Pills"];
var dr = [[40,40],[160,92],[200,80],[320,60]];
var dl = [[10,30,50,70,50,30],[80,40,20,40,80,40],[50,60,50,40,50,60],[95,80,65,50,35,20]];
var db = [[[10,10,5],[30,30,10]],[[90,20,9],[70,40,15],[30,60,8]],[[50,70,8]]];
var pnt = 0;
setWatch(function(){
  bc.clear();
  if(++pnt > 8) pnt = 0;
  switch(pnt){
    case 0: bc.Pie(90,90,80,dt); bc.Label(170,20,lbl); break;
    case 1: bc.Slices(90,90,80,dt); bc.Label(170,20,lbl); break;
    case 2: bc.SizedPie(90,90,80,dt); bc.Label(170,20,lbl); break;
    case 3: bc.Radar(90,90,80,dr); break;
    case 4: bc.Bar(10,150,120,10,"v",60,3); break;
    case 5: bc.Bar(10,10,10,120,"h",65,0); break;
    case 6: bc.Lines(10,110,200,100,dl); bc.Label(10,20,lbl); break;
    case 7: bc.Rects(10,120,180,100,dt); break;
    case 8: bc.Bubbles(40,40,160,160,db); break;
  }
},BTN1,{repeat:true});
bc.clear();
bc.Pie(90,90,80,dt);
bc.Label(170,20,lbl);
g.drawString("click BTN1 for next chart",10,210);
