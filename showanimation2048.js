// showanimation2048.js
// ��ʾ ������ʽ
function showNumberWithAnimation(i, j, number) {
	// ����ĸ���
	var numberCell = $("#number-cell-" + i + "-" + j);
	// ���ô�����ӵ���ʽ
	numberCell.css("background-color", getBackgroundColor(number));
	numberCell.css("color", getNumberColor(number));
	numberCell.text(number);
	// ����Ч��
	numberCell.animate({
		width: cellSideLength,
		height: cellSideLength,
		top: getPosTop(i, j),
		left: getPosLeft(i, j)
	}, 50)
}

// �ƶ�����
function showMoveAnimation(fromX, fromY, toX, toY) {
	var numberCell = $("#number-cell-" + fromX + "-" + fromY);
	numberCell.animate({
		top: getPosTop(toX, toY),
		left: getPosLeft(toX, toY)
	}, 100);
}
// ���·���
function updateScore(score) {
	$("#score").text(score);
}