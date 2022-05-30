/*
Фильтрация списка курсов, чтобы выдались только подходящие по цене, реализуется
по средствам поиска пересечений ценовых диапазонов. Диапазоны пересекаются при
одновременном выполнении двух условий: 
	1) минимальное значение цены в фильтре меньше или равно максимальному 
	значению цены курса и, 
	2) минимальное значение цены курса меньше или равно максимальному значению 
	цены в фильтре. 
Для корректности сравнения null заменяется на 0 для минимальной цены и на
максимальное безопасное целочисленное значение для максимальной цены.
*/

// Список курсов
let courses = [
	{ name: "Courses in England", prices: [0, 100] },
	{ name: "Courses in Germany", prices: [500, null] },
	{ name: "Courses in Italy", prices: [100, 200] },
	{ name: "Courses in Russia", prices: [null, 400] },
	{ name: "Courses in China", prices: [50, 250] },
	{ name: "Courses in USA", prices: [200, null] },
	{ name: "Courses in Kazakhstan", prices: [56, 324] },
	{ name: "Courses in France", prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
let requiredRange1 = [null, 200];
let requiredRange2 = [100, 350];
let requiredRange3 = [200, null];

function nullToZero(num) {
	if (num == null) {
		num = 0;
	}
	return num;
}

function nullToMaxNumber(num) {
	if (num == null) {
		num = Number.MAX_SAFE_INTEGER;
	}
	return num;
}

function filterCourses(coursesList, requiredRange) {
	let suitableCourses = [];

	for (let i = 0; i < coursesList.length; i++) {
		let filterPriceMin = nullToZero(requiredRange[0]);
		let filterPriceMax = nullToMaxNumber(requiredRange[1]);
		let coursePriceMin = nullToZero(coursesList[i].prices[0]);
		let coursePriceMax = nullToMaxNumber(coursesList[i].prices[1]);

		if (filterPriceMin <= coursePriceMax && coursePriceMin <= filterPriceMax) {
			suitableCourses.push(coursesList[i].name);
		}
	};

	return suitableCourses;
}

// [подходящие курсы для каждого варианта фильтра]

// console.log(filterCourses(courses, requiredRange1));
// console.log(filterCourses(courses, requiredRange2));
// console.log(filterCourses(courses, requiredRange3));

// Сортировка по минимальной цене курса

function sortCoursesByPrice(coursesList) {

	let coursesSorted = coursesList.slice();

	for (let i = 0; i < coursesSorted.length; i++) {
		coursesSorted[i].prices[0] = nullToZero(coursesSorted[i].prices[0])
	}

	coursesSorted.sort(function (a, b) {
		return a.prices[0] - b.prices[0];
	}
	);
	return coursesSorted;
}

// console.log(sortCoursesByPrice(courses));

// Тесты

function test(value) {
	return {
		toBe: expectation => {
			if (value == expectation) {
				console.log("Testing passed");
			} else {
				console.error(`Testing failed. Ecpected ${value} to equal ${expectation}`);
			}
		}
	}
}


test(JSON.stringify(filterCourses(courses, requiredRange1))).toBe(JSON.stringify([
	'Courses in England',
	'Courses in Italy',
	'Courses in Russia',
	'Courses in China',
	'Courses in USA',
	'Courses in Kazakhstan',
	'Courses in France'
]));

test(JSON.stringify(filterCourses(courses, requiredRange2))).toBe(JSON.stringify([
	'Courses in England',
	'Courses in Italy',
	'Courses in Russia',
	'Courses in China',
	'Courses in USA',
	'Courses in Kazakhstan',
	'Courses in France'
]));

test(JSON.stringify(filterCourses(courses, requiredRange3))).toBe(JSON.stringify([
	'Courses in Germany',
	'Courses in Italy',
	'Courses in Russia',
	'Courses in China',
	'Courses in USA',
	'Courses in Kazakhstan',
	'Courses in France'
]));

test(JSON.stringify(sortCoursesByPrice(courses))).toBe(JSON.stringify([
	{ name: 'Courses in England', prices: [0, 100] },
	{ name: 'Courses in Russia', prices: [0, 400] },
	{ name: 'Courses in France', prices: [0, null] },
	{ name: 'Courses in China', prices: [50, 250] },
	{ name: 'Courses in Kazakhstan', prices: [56, 324] },
	{ name: 'Courses in Italy', prices: [100, 200] },
	{ name: 'Courses in USA', prices: [200, null] },
	{ name: 'Courses in Germany', prices: [500, null] }
]));
