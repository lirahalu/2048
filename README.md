# 2048
这是根据慕课网的教程来编写的2048小游戏，随着教程，一步步跟着思路编写的。

在教程基础上，我做了以下一些优化：

1.优化了New Game 按钮，将原来的a标签改写成button，使其变成click事件样式发生变化而不是hover；

2.优化弹出框显示，
![](https://raw.githubusercontent.com/lirahalu/2048/master/image/20160411233547.jpg)

3.优化随机位置算法：

    var count = 0;
        var gather = [];
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    gather[count] = i * 10 + j;//将可生成的位置的坐标变成一个两个数，十位数为i，个位数为j;
                    count++;
                }
            }
        var pos = parseInt(Math.floor(Math.random() * count));
     randx = Math.floor(gather[pos] / 10);
     randy = Math.floor(gather[pos] % 10);
      
      
 //原算法如下：
 
    var times = 0;
        while( times < 50 ){
            if( board[randx][randy] ==-1 )
    break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );
      times ++;
      }
  
      if( times == 50 ){
      
        for( var i = 0 ; i < 4 ; i ++ )
        
           for( var j = 0 ; j < 4 ; j ++ ){
           
        if( board[i][j] == -1 ){
        
         randx = i;
         
        randy = j;
       }

相比原算法，速度更快，不会陷入死循环，且更具随机性

4.修复超过4位数显示超出格子的BUG

    //原代码
    theNumberCell.css("line-height", cellSideLength + "px");
    theNumberCell.css("font-size", 0.6 * cellSideLength + "px")
     
    //增加判断，修改字体大小 
     if (board[i][j] >= 1024) {
                  theNumberCell.css("font-size", 0.4 * cellSideLength + "px")
                    .css("line-height", cellSideLength + "px");
            } else {
                theNumberCell.css("font-size", 0.6 * cellSideLength + "px")
                    .css("line-height", cellSideLength + "px");
            }
       
