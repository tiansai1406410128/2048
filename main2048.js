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
	generateOneNumb
