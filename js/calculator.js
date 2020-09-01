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