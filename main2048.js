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
