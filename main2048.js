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
	generateOneNumb
