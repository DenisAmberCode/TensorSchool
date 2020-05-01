/**
 * ДЗ-03 
 */

/**
 * 0. Исправь ошибки
 */
function initVal(str) {
    let s = "String";
    let a = 10;
    let b = true;
    const c = 'const';
}

/**
 * 1. Напиши функцию которая принимает на вход строку и преобразует ее в строку
 * @param {string} str 
 * 
 * @returns (number)
 */
function stringToNumber(str) {
	return parseInt(str, 10);
}

/**
 * 2. Функции возвращают значение val, если оно существует, иначе def
 * @param {*} val
 * @param {*} def
 * 
 * @returns val или def
 */
function checkVal1 (val, def) {
    // 2.1. if ... else
    if (val) {
    	return val;
    } else {
    	return def;
    }


}

function checkVal2 (val, def) {
    // 2.2. тернарный оператор
    let rez = (val) ? val : def;
    return rez;
}

function checkVal3 (val, def) {
    // 2.3. логическое или
    return (val || def);
}

/**
 * 3. Фунция рендера
 * @param {string} title
 * @param {number} width
 * @param {number} height
 * @param {bool} isBox
 * 
 * @returns {string} строка формата 'Товар title, шириной width, высотой height, коробка' или '... не коробка'
 */
function renderItem (title, width, height, isBox) {
	let t = (title) ? title : '';
	let w = (width) ? width.toString(10) : '0';
	let h = (height) ? height.toString(10) : '0';
	let Box = (isBox == true) ? 'коробка' : 'не коробка';
  	return 'Товар ' + t + ', шириной ' + w + ', высотой ' + h + ', ' + Box;
}

/**
 * 4. Напиши функцию oddNum с помощью цикла for
 * @param {number} max максимальное число
 * 
 * @returns {string} только не четные 1 3 5 7 9 ...max 
 */
function oddNum (max) {
	if (max <= 0) {
		return ''
	}

	let rez = '1';

	for (let i = 3; i <= max; i = i + 2) {
		rez  = rez + ' ' + i.toString(10);
 	}
  	return rez;
}

/**
 * 5. Напиши функцию factorial рекурсивно
 * @param {number} n максимальное число для вычисления
 * 
 * @returns {number} факториал 
 */
function factorial(n) {
	if (n == 1) {
		return 1
	}
    return n * factorial(n-1);
}

module.exports = {
    initVal,
    stringToNumber,
    renderItem,
    checkVal1,
    checkVal2,
    checkVal3,
    oddNum,
    factorial
};
