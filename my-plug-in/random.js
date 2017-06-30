// 范围随机数

function selectNums(lowerValue,upperValue) {
	var choices = upperValue - lowerValue + 1;

	return Math.floor(Math.random() * choices + lowerValue);
}

selectNums(2,10);