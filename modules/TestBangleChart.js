var bc = require("https://github.com/jumjum123/Bangle/blob/master/modules/BangleChart.js").init();
var dt = [[10,"Apple"],[15,"Beef"],[55,"Beer"],[20,"Pills"]];
var dr = [[40,40],[160,92],[200,80],[320,60]];
var dl= [[10,30,50,70,50,30],[80,40,20,40,80,40],[50,60,50,40,50,60],[95,80,65,50,35,20]];
var pnt = 0;
setWatch(function(){
  bc.clear();
  if(++pnt > 6) pnt = 0;
  switch(pnt){
    case 0: bc.drawPie(90,90,80,dt); bc.drawLabel(170,20,dt); break;
    case 1: bc.drawSlices(90,90,80,dt); bc.drawLabel(170,20,dt); break;
    case 2: bc.drawSizedPie(90,90,80,dt); bc.drawLabel(170,20,dt); break;
    case 3: bc.drawRadar(90,90,80,dr); break;
    case 4: bc.drawBar(10,150,120,10,"v",60,3); break;
    case 5: bc.drawBar(10,10,10,120,"h",65,0); break;
    case 6: bc.drawLines(10,110,200,100,dl); bc.drawLabel(10,20,dt); break;
  }
},BTN1,{repeat:true});
bc.clear();
bc.drawPie(90,90,80,dt);
bc.drawLabel(170,20,dt);
g.drawString("click BTN1 for next chart",10,210);
