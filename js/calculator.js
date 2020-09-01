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
			evaluate();
			break;
		}
		case 'action': {
			printAction(value);
			break;
		}
		case 'reset': {
			onResetClick();
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
};

function printNum(num) {
	myCalculator.$expression.textContent += num;
};

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
};