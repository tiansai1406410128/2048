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
	//生成数字 
	var randNumber = 2;
	// 数字添加到格子
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);

}
// 键盘按键事件
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
// 移动端触控事件
document.addEventListener("touchstart", function(event) {
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
}, false);
document.addEventListener("touchend", function() {
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;
	// 计算滑动距离
	// 若滑动距离太小 视为点击 不触发事件
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	if (Math.abs(deltaX) < 0.05 * documentWidth && Math.abs(deltaY) < 0.05 * documentWidth) {
		return;
	}
	if (Math.abs(deltaX) > Math.abs(deltaY)) {
		// x方向
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
		// y方向
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

				setTimeout(isgameover, 200);
			}
		}

	}
}, false);

// 判断游戏结束
function isgameover() {
	if (nospace(board) && noMove(board)) {
		gameover();
	}
}

function gameover() {
	alert("GAME OVER\n"+"您的得分："+score+"\n"+(score<10000?"小笨蛋":"加油！"));
}


// 向左移动
function moveLeft() {
	// 判断能否移动
	if (!canMoveLeft(board)) {
		return false;
	}
	// moveLeft
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				// 判断移动到哪
				for (var k = 0; k < j; k++) {
					if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) { // 1 此处无数字 或者 数字相等
						// 2 中间不存在障碍物
						// move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
						// move
						showMoveAnimation(i, j, i, k);

						// add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						// add score
						score += board[i][k];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 80);
	return true;
}
// 向右移动
function moveRight() {
	// 判断能否移动
	if (!canMoveRight(board)) {
		return false;
	}
	// moveRight
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				// 判断移动到哪
				for (var k = 3; k > j; k--) {
					// i行 j到k列 	
					if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) { // 1 此处无数字 或者 数字相等
						// 2 中间不存在障碍物
						// move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
						// move
						showMoveAnimation(i, j, i, k);

						// add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						hasConflicted[i][k] = true;
						// add score
						score += board[i][k];
						updateScore(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 80);
