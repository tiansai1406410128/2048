// main2048.js
var board         = new Array(); // �洢16���ӵ�number
var score         = 0; // �洢����
var hasConflicted = new Array(); // �Ƿ� add�� ����ͬһ�ж��add
var startX        = 0; //�ƶ��˴�������
var startY        = 0;
var endX          = 0;
var endY          = 0;
// 
$(function() {
		prepareForMobile(); // �ƶ���
		newgame();
	})
	// ����ƶ���
function prepareForMobile() {
	// �����Ļ
		if (documentWidth > 500) {
		// PC��Ļ
		gridContainerWidth = 500;
		cellSideLength     = 100;
		cellSpace          = 20;
	} else {
		// �ƶ���
		$("#grid-container").css("width", gridContainerWidth - 2 * cellSpace);
		$("#grid-container").css("height", gridContainerWidth - 2 * cellSpace);
		$("#grid-container").css("padding", cellSpace);
		$("#grid-container").css("border-radius", 0.02 * gridContainerWidth);

		$(".grid-cell").css("width", cellSideLength);
		$(".grid-cell").css("height", cellSideLength);
		$(".grid-cell").css("border-radius", 0.02 * cellSideLength);
	}
}
// ����Ϸ ��ʼ��
function newgame() {
	// ��ʼ�����̸�
	init();
	// ���������������
	generateOneNumber();
	generateOneNumber();
}
// ��ʼ��
function init() {

	// ����С����λ�� ��ʼ��
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {

			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css("top", getPosTop(i, j));
			gridCell.css("left", getPosLeft(i, j));
		}
	}
	// ��ʼֵΪ��
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	// ��ʼ������
	score = 0;
	updateScore(score);
	updateBoardView();
}
// ˢ������
function updateBoardView() {

	$(".number-cell").remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append("<div class=\"number-cell\" id=\"number-cell-" + i + "-" + j + "\"></div>")

			var theNumberCell = $("#number-cell-" + i + "-" + j);
			// number-cell ��ʽ

			if (board[i][j] == 0) { // �������û������ʱ
				theNumberCell.css("top", getPosTop(i, j) + cellSideLength / 2);
				theNumberCell.css("left", getPosLeft(i, j) + cellSideLength / 2);
				theNumberCell.css("width", "0px");
				theNumberCell.css("height", "0px");
			} else { // �������������ʱ
				theNumberCell.css("top", getPosTop(i, j));
				theNumberCell.css("left", getPosLeft(i, j));
				theNumberCell.css("width", cellSideLength);
				theNumberCell.css("height", cellSideLength);
				theNumberCell.css("color", getNumberColor(board[i][j]));
				theNumberCell.css("background-color", getBackgroundColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
	$(".number-cell").css("line-height", cellSideLength + "px")
	$(".number-cell").css("font-size", 0.4 * cellSideLength + "px")

}
// �����������
function generateOneNumber() {
	// ���û�п��������
	if (nospace(board)) {
		return false;
	}
	// �����
	// �����������
	var randx = Math.floor(Math.random() * 4);
	var randy = Math.floor(Math.random() * 4);

	var times = 0;
	while (times < 50) {
		if (board[randx][randy] == 0) {
			break;
		} else {
			randx = Math.floor(Math.random() * 4);
			randy = Math.floor(Math.random() * 4);
		}
		times++;
	}
	if (times == 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 2; j >= 0; j--) {
				if (board[i][j] == 0) {
					randx = i;
					randy = j;
				}
			}
		}
	}
	//�������� 
	var randNumber = 2;
	// ������ӵ�����
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);

}
// ���̰����¼�
$(document).keydown(function(event) {
	switch (event.keyCode) {
		case 37: //left
			event.preventDefault();
			if (moveLeft()) {
				setTimeout(generateOneNumber, 110);
				setTimeout(isgameover, 200);
			}
			break;
		case 38: //up
			event.preventDefault();
			if (moveUp()) {
				setTimeout(generateOneNumber, 110);
				setTimeout(isgameover, 200);
			}
			break;
		case 39: //right
			event.preventDefault();
			if (moveRight()) {
				setTimeout(generateOneNumber, 110);
				setTimeout(isgameover, 200);
			}
			break;
		case 40: //down
			event.preventDefault();
			if (moveDown()) {
				setTimeout(generateOneNumber, 110);
				setTimeout(isgameover, 200);
			}
			break;
		default:
			break;
	}
});
// �ƶ��˴����¼�
document.addEventListener("touchstart", function(event) {
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
}, false);
document.addEventListener("touchend", function() {
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;
	// ���㻬������
	// ����������̫С ��Ϊ��� �������¼�
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	if (Math.abs(deltaX) < 0.05 * documentWidth && Math.abs(deltaY) < 0.05 * documentWidth) {
		return;
	}
	if (Math.abs(deltaX) > Math.abs(deltaY)) {
		// x����
		if (deltaX > 0) {
			// move right
			if (moveRight()) {
				setTimeout(generateOneNumber, 110);
				setTimeout(isgameover, 200);
			}
		} else {
			// move left
			if (moveLeft()) {
				setTimeout(generateOneNumber, 110);
				setTimeout(isgameover, 200);
			}
		}
		// y����
	} else {
		if (deltaY > 0) {
			// move down
			if (moveDown()) {
				setTimeout(generateOneNumber, 110);
				setTimeout(isgameover, 200);
			}
		} else {
			// move up
			if (moveUp()) {
				setTimeout(generateOneNumber, 110);
