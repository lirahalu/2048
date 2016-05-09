function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $("#number-cell-" + i + "-" + j);

    numberCell.css("background-color", getNumberBackgroundColor(randNumber))
        .css("color", getNumberColor(randNumber))
        .text(randNumber)
        .animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}
function showMoveAnimation(formx, formy, tox, toy) {
    var numberCell = $("#number-cell-" + formx + "-" + formy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}


function updateScore(score) {
    $("#score").text(score);

    if(!localStorage.sc){
        localStorage.sc=0;
    }
    else{
        $("#top-score").text(localStorage.sc);
    }
    if(score>localStorage.sc) {
        localStorage.sc = score;
        $("#top-score").text(localStorage.sc);
    }


}