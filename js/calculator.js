"use strict";

//Calculator Object
const myCalculator = {};

//Add DOM elements
myCalculator.$el = document.querySelector('.calculator');
myCalculator.$btns = myCalculator.$el.querySelector('.calculator__buttons');
myCalculator.$expression = myCalculator.$el.querySelector('.calculator__expression');
myCalculator.$result = myCalculator.$el.querySelector('.calculator__result');
myCalculator.$nums = myCalculator.$el.querySelectorAll('[data-type="num"]');
myCalculator.$actions = myCalculator.$el.querySelectorAll('[data-type="action"]');
myCalculator.$resetBtn = myCalculator.$el.querySelector('[data-type="reset"]');
myCalculator.$evalBtn = myCalculator.$el.querySelector('[data-type="eval"]');
myCalculator.$dotBtn = myCalculator.$el.querySelector('[data-type="dot"]');

//Events
myCalculator.$btns.addEventListener('click', (e) => onCalcBtnClick(e));

//Functions
function onCalcBtnClick(e) {
	const btn = e.target;
	const btnType = btn.dataset.type;
	const value = e.target.textContent;

	switch (btnType) {
		case 'num': {
			printNum(value);
			break;
		}
		case 'action': {
			printAction(value);
			break;
		}
		case 'reset': {
			onResetClick(btn, onSingleResetClick, onDoubleResetClick);
			break;
		}
		case 'eval': {
			evalExpression();
			break;
		}
		case 'dot': {
			printDot();
			break;
		}
	}

	evaluate();
}

function printNum(num) {
	myCalculator.$expression.textContent += num;
}

function printAction(act) {
	let val = myCalculator.$expression.textContent
	if (val.length === 0) {
		return;
	} else if (!Number.isFinite(+val[val.length - 1])) {
		return;
	} else {
		switch (act) {
			case 'x': {
				myCalculator.$expression.textContent += '*';
				break;
			}
			case '÷': {
				myCalculator.$expression.textContent += '/';
				break;
			}
			default: {
				myCalculator.$expression.textContent += act;
				break;
			}
		}
	}
}

const setResetClicksToZero = () => {
	myCalculator.$resetBtn.dataset.clicks = 0;
};
setResetClicksToZero();

function onResetClick(btn, onSingle, onDouble) {
	btn.dataset.clicks++

	setTimeout(() => {
		if (btn.dataset.clicks == 1) {
			onSingle();
			btn.dataset.clicks = 0;
		}
	}, 200);

	if (btn.dataset.clicks == 2) {
		btn.dataset.clicks = 0;
		onDouble();
	}
}

function onSingleResetClick() {
	let exp = myCalculator.$expression.textContent
	exp = exp.substr(0, exp.length - 1);
	if (exp.length === 0) {
		myCalculator.$result.textContent = '0';
	}
	myCalculator.$expression.textContent = exp;

	evaluate();
}

function onDoubleResetClick() {
	myCalculator.$expression.textContent = '';
	myCalculator.$result.textContent = '0';
}

function evaluate() {
	try {
		const result = eval(myCalculator.$expression.textContent);
		myCalculator.$result.textContent = +result.toFixed(5);
	} catch (e) { // if expression is incorrect by ended with action char(+,-,*,/) or expression is empty
		const res = myCalculator.$expression.textContent;

		if (res === '') {
			return;
		}
		try {
			myCalculator.$result.textContent = eval(res.substring(0, res.length - 1));
		} catch (e) { // if expression is incorrect by other way, like "00000000"
			return;
		}
	}
}

function evalExpression() {
	myCalculator.$expression.textContent = myCalculator.$result.textContent;
	myCalculator.$result.textContent = '0';
}

function printDot() {
	let val = myCalculator.$expression.textContent;

	if (val === 0) {
		return;
	} else if (!Number.isFinite(+val[val.length - 1])) {
		return;
	} else {
		//Find the last num in expression and check includes "."
		const chars = val.split('').reverse();
		const a = 0;
		const b = chars.findIndex(char => isAction(char));
		const lastNum = (chars.slice(a, b)).reverse().join('');
		if (!lastNum.includes('.')) {
			myCalculator.$expression.textContent += '.';
		}
	}
}

function isAction(str) {
	if (str === '+' || str === '/' || str === '*' || str === '-') {
		return true;
	} else {
		return false;
	}
}