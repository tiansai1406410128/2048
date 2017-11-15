// showanimation2048.js
// 显示 格子样式
function showNumberWithAnimation(i, j, number) {
	// 传入的格子
	var numberCell = $("#number-cell-" + i + "-" + j);
	// 设置传入格子的样式
	numberCell.css("background-color", getBackgroundColor(number));
	numberCell.css("color", getNumberColor(number));
	numberCell.text(number);
	// 动画效果
	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	}, 50)
}

// 移动动画
function showMoveAnimation(fromX, fromY, toX, toY) {
	var numberCell = $("#number-cell-" + fromX + "-" + fromY);
	numberCell.animate({
		top: getPosTop(toX, toY),
		left: getPosLeft(toX, toY)
	}, 100);
}
// 更新分数
function updateScore(score) {
	$("#score").text(score);
}