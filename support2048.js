// support2048.js
documentWidth      = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength     = 0.16 * documentWidth;
cellSpace          = 0.04 * documentWidth;
// 获得位置
function getPosTop(i, j) {
	return cellSpace + i * (cellSideLength + cellSpace);
}

function getPosLeft(i, j) {
	return cellSpace + j * (cellSideLength + cellSpace);
}
// 颜色样式
function getNumberColor(number) {
	if (number <= 4) {
		return "#776e65";
	} else {
		return "#fff";
	}
}
// 颜色样式
function getBackgroundColor(number) {
	switch (number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		default:
			return "black";
			break;
	}
}
// 是否有空余格子
function nospace(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				return false;

			}
		}
	}
	return true;
}
// 是否可以向左移动
// 1 左边的格子为0
// 2 和左边的值相等
// 满足一条 可以移动
function canMoveLeft(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(board) {
	for (var i = 1; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(board) {
	for (var i = 2; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
// 之间是否有障碍物
function noBlockHorizontal(row, col1, col2, board) {
	for (var i = col1 + 1; i < col2; i++) {
		if (board[row][i] != 0) { // 之间存在障碍物
			return false;
		}
	}
	return true;
}

function noBlockVertical(col, row1, row2, board) {
	for (var i = row1 + 1; i < row2; i++) {
		if (board[i][col] != 0) { // 之间存在障碍物
			return false;
		}
	}
	return true;
}
// 没有可移动的
function noMove() {
	if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) { // 尚可移动
		return false; // 可移动
	}
	// 不可移动
	return true;
}