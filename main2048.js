// main2048.js
var board         = new Array(); // 存储16格子的number
var score         = 0; // 存储分数
var hasConflicted = new Array(); // 是否 add过 避免同一行多次add
var startX        = 0; //移动端触控数据
var startY        = 0;
var endX          = 0;
var endY          = 0;
// 
$(function() {
		prepareForMobile(); // 移动端
		newgame();
	})
	// 检测移动端
function prepareForMobile() {
	// 检测屏幕
		if (documentWidth > 500) {
		// PC屏幕
		gridContainerWidth = 500;
		cellSideLength     = 100;
		cellSpace          = 20;
	} else {
		// 移动端
		$("#grid-container").css("width", gridContainerWidth - 2 * cellSpace);
		$("#grid-container").css("height", gridContainerWidth - 2 * cellSpace);
		$("#grid-container").css("padding", cellSpace);
		$("#grid-container").css("border-radius", 0.02 * gridContainerWidth);

		$(".grid-cell").css("width", cellSideLength);
		$(".grid-cell").css("height", cellSideLength);
		$(".grid-cell").css("border-radius", 0.02 * cellSideLength);
	}
}
// 新游戏 初始化
function newgame() {
	// 初始化棋盘格
	init();
	// 随机生成两个数字
	generateOneNumber();
	generateOneNumber();
}
// 初始化
function init() {

	// 棋盘小格子位置 初始化
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {

			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css("top", getPosTop(i, j));
			gridCell.css("left", getPosLeft(i, j));
		}
	}
	// 初始值为零
	for (var i = 0; i < 4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	// 初始化分数
	score = 0;
	updateScore(score);
	updateBoardView();
}
// 刷新数据
function updateBoardView() {

	$(".number-cell").remove();

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append("<div class=\"number-cell\" id=\"number-cell-" + i + "-" + j + "\"></div>")

			var theNumberCell = $("#number-cell-" + i + "-" + j);
			// number-cell 样式

			if (board[i][j] == 0) { // 这个格子没有数字时
				theNumberCell.css("top", getPosTop(i, j) + cellSideLength / 2);
				theNumberCell.css("left", getPosLeft(i, j) + cellSideLength / 2);
				theNumberCell.css("width", "0px");
				theNumberCell.css("height", "0px");
			} else { // 这个格子有数字时
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
// 随机生成数字
function generateOneNumber() {
	// 如果没有空余格子了
	if (nospace(board)) {
		return false;
	}
	// 如果有
	// 生成随机格子
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
