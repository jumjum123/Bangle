function mondrinator(w,h){
  cols = new Uint16Array([0,31,2016,2047,63488,63519,65504,65535]);
  var rndCol = function(){ return cols[parseInt(Math.random() * 6) + 1];};
  var rndBorder = function(){ return 5 + Math.random() * 30;};
  var rndRect = function(){ return Math.random() * 4;};
  var d = new Date();
  g.setFontVector(18);
  clearInterval();
  g.setBgColor(65535);g.clear();
  function showNext(){
    var right,left,top,bottom;
    function outerRect(){
      var rectId;
      rectId = parseInt(rndRect());g.setColor(rndCol());
      switch(rectId){
        case 0: g.fillRect(0,0,left - 1,top - 1);break;
        case 1: g.fillRect(w-right,0,w-1,top - 1);break;
        case 2: g.fillRect(0,h - bottom,left-1,h-1);break;
        case 3: g.fillRect(w-right,h-1,w-1,h - bottom);break;
      }
    }
    function showTime(){
      g.setColor(0);
      g.fillRect(36,36,204,204);
      g.setColor(65535);
      d = new Date();
      g.drawString(d.getHours() + ":" + d.getMinutes(),36 + d.getSeconds() * 2,36 + d.getSeconds() * 2);
    }
    if((d.getSeconds() % 5)  == 0){
      g.setColor(0);g.fillRect(0,0,w,h);
      g.setColor(rndCol());left = rndBorder();g.drawLine(left,0,left,h-1);
      g.setColor(rndCol());right = rndBorder();g.drawLine(w-1-right,0,w-1-right,h-1);
      g.setColor(rndCol());top = rndBorder();g.drawLine(0,top,w-1,top);
      g.setColor(rndCol());bottom = rndBorder();g.drawLine(0,h-1-bottom,w-1,h-1-bottom);
      outerRect();
    }
    showTime();
    setTimeout(function(){showNext();},1000);
  }
  showNext();
}
mondrinator(240,240);