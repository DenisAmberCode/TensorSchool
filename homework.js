/* 
1. Создать массив arr1 из 100 элементов и заполнить его числами от 1 до 100 в случайном порядке. Каждое число должно встречаться в массиве ровно один раз.
2. Создать массив arr2, который формируется из массива arr1 следующим образом:
первым элементом нового массива становится последний элемент массива arr1, вторым элементом - предпоследний, и т.д.
3. Создать третий  массив arr3, который формируется как разность соответствующих элементов массива arr1 и arr2.
4. Для третьего массива посчитать среднее арифметическое значение всех элементов.*/

let arr1 = Array.from({length:100},(v,k)=>k+1);
arr1.sort(function(a, b){return 0.5 - Math.random()});
console.log(arr1);

let arr2 = arr1.map(function(currentValue, index) {
	return arr1[99 - index]; 
});
console.log(arr2);

let arr3 = arr1.map(function(currentValue, index) {
	return currentValue - arr2[index]; 
});
console.log(arr3);

let sum = arr3.reduce(function(accumulator, currentValue) {
	return accumulator + currentValue; 
});
console.log(sum / arr3.length); // Среднее значение всегда будет равно 0.


