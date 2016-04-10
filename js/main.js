var board=new Array();
var score=0;

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function(){

    prepareForMobile();//自适应
   setTimeout("newgame()",100);
});

function prepareForMobile(){
    if(documentWidth>500){
        ContainerWidth=500;
        cellSpace=20;
        cellSideLength=100;
    }
    $("#container").css("width",ContainerWidth-2*cellSpace);
    $("#container").css("height",ContainerWidth-2*cellSpace);
    $("#container").css("padding",cellSpace);
    $("#container").css("border-radius",0.02*ContainerWidth);

    $(".cell").css("width",cellSideLength);
    $(".cell").css("height",cellSideLength);
    $(".cell").css("border-radius",0.02*cellSideLength);
}

$(function () {
   $("#newgamebutton").click(function () {
       newgame();
   }) ;
});


function newgame(){
    /*初始化棋盘格*/
    init();
    /*创建两个随机块*/
    generateOneNumber();
    generateOneNumber();

}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            var cell = $("#cell-" + i + "-" + j);
            cell.css("top", getPosTop(i, j));
            cell.css("left", getPosLeft(i, j));

        }
    }
    for (var i = 0; i < 4; i++) {
        board[i]=new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j]=0;
        }
    }
    updateBoardView();
    score=0;
    updateScore(score);
}


function updateBoardView(){
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
                    var theNumberCell=$("#number-cell-"+i+"-"+j);

            if(board[i][j]==0){
                theNumberCell.css("width",0);
                theNumberCell.css("height",0);
                theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css("width",cellSideLength);
                theNumberCell.css("height",cellSideLength);
                theNumberCell.css("top",getPosTop(i,j));
                theNumberCell.css("left",getPosLeft(i,j));
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
    $(".number-cell").css("line-height",cellSideLength+"px");
    $(".number-cell").css("font-size",0.6*cellSideLength+"px")
}

function generateOneNumber(){
    if(nospace(board)){
        return false;
    }else{
        //随机一个位置
        var randx=parseInt(Math.floor(Math.random() *4));
        var randy=parseInt(Math.floor(Math.random() *4));
        var times=0;//优化算法
        while(times<50){
            if(board[randx][randy]==0){
                break;
            }else{
                 randx=parseInt(Math.floor(Math.random() *4));
                 randy=parseInt(Math.floor(Math.random() *4));
            }
            times++;
        }
        if(times==50){
            for(var i= 0;i<4;i++){
                for(var j=0;j<4;j++){
                    if(board[i][j]==0){
                        randx=i;
                        randy=j;
                    }
                }
            }
        }
        //随机一个数字
        var randNumber=Math.random()<0.5?2:4;
        //随机显示
        board[randx][randy]=randNumber;
        showNumberWithAnimation(randx,randy,randNumber);
        return true;
    }
}

$(document).keydown(function (event) {



   switch (event.keyCode){
       case 37://left
           if(moveLeft()){
             setTimeout("generateOneNumber()",210);
              setTimeout("isgameover()",300);
           }

           event.preventDefault();//取消按键默认作用
           break;
       case 38://up
           if(moveUp()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
           }

           event.preventDefault();//取消按键默认作用
           break;
       case 39://right
           if(moveRight()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
           }
           event.preventDefault();//取消按键默认作用
           break;
       case 40://down
           if(moveDown()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
           }
           event.preventDefault();//取消按键默认作用
           break;
       default:
           break;
   }
});

//支持触控
document.addEventListener("touchstart",function(event){
    startx= event.touches[0].pageX;
    starty= event.touches[0].pageY;
});

document.addEventListener("touchmove",function(event){
    event.preventDefault();//避免BUG
});


document.addEventListener("touchend",function(event){
    endx= event.changedTouches[0].pageX;
    endy= event.changedTouches[0].pageY;

    var deltax=endx-startx;
    var deltay=endy-starty;

    if(Math.abs(deltax)<0.1*documentWidth&&Math.abs(deltay)<0.1*documentWidth)
        return false;
    //x
    if(Math.abs(deltax)>=Math.abs(deltay)){
       if(deltax>0){
           //right
           if(moveRight()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
           }
       } else{
           //left
           if(moveLeft()){
               setTimeout("generateOneNumber()",210);
               setTimeout("isgameover()",300);
           }
       }
    }
    //y
    else{
        if(deltay>0){
            //down
            if(moveDown()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
        else{
            //up
            if(moveUp()){
                setTimeout("generateOneNumber()",210);
                setTimeout("isgameover()",300);
            }
        }
    }
});





function isgameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}

function gameover(){
    swal({
        title: "GameOver!",
        timer: 2500,
        showConfirmButton: true
    });
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }else{
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {

                if(board[i][j]!=0){

                    for(var k= 0;k<j;k++){
                        if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
                            //move
                            showMoveAnimation(i,j,i,k);
                            board[i][k]=board[i][j];
                            board[i][j]=0;
                            continue;
                        }
                        else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
                            //move
                            showMoveAnimation(i,j,i,k);
                            //add
                            board[i][k]+=board[i][j];
                            board[i][j]=0;
                            //add score
                            score+=board[i][k];
                            updateScore(score);
                            continue;
                        }
                    }

                }

            }
        }
        setTimeout("updateBoardView()",200);
        return true;
    }
}
function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }else{
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 4; j++) {

                if(board[i][j]!=0){

                    for(var k= 0;k<i;k++){
                        if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            board[k][j]=board[i][j];
                            board[i][j]=0;
                            continue;
                        }
                        else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            //add
                            board[k][j]+=board[i][j];
                            board[i][j]=0;
                            //add score
                            score+=board[k][j];
                            updateScore(score);
                            continue;
                        }
                    }

                }

            }
        }
        setTimeout("updateBoardView()",200);
        return true;
    }
}
function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }else{
        for (var i = 0; i < 4; i++) {
            for (var j = 2; j >=0; j--) {

                if(board[i][j]!=0){

                    for(var k= 3;k>j;k--){
                        if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
                            //move
                            showMoveAnimation(i,j,i,k);
                            board[i][k]=board[i][j];
                            board[i][j]=0;
                            continue;
                        }
                        else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)){
                            //move
                            showMoveAnimation(i,j,i,k);
                            //add
                            board[i][k]+=board[i][j];
                            board[i][j]=0;
                            //add score
                            score+=board[i][k];
                            updateScore(score);

                            continue;
                        }
                    }

                }

            }
        }
        setTimeout("updateBoardView()",200);
        return true;
    }
}
function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }else{
        for (var i = 2; i >=0; i--) {
            for (var j = 0; j < 4; j++) {

                if(board[i][j]!=0){

                    for(var k= 3;k>i;k--){
                        if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            board[k][j]=board[i][j];
                            board[i][j]=0;
                            continue;
                        }
                        else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            //add
                            board[k][j]+=board[i][j];
                            board[i][j]=0;
                            //add score
                            score+=board[k][j];
                            updateScore(score);

                            continue;
                        }
                    }

                }

            }
        }
        setTimeout("updateBoardView()",200);
        return true;
    }
}