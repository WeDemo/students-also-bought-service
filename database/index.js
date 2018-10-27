// connect mysql to DB
// formulate get and post query


var mysql = require('mysql');
var faker = require('faker');
var courses = require('./courseData.js')


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'udemy_similar_component'
});
 
// not necessary if query is used;
// connection.connect();

let getAllCourses = function(callback) {

	connection.query('Select * from Courses', function (error, results) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results)
		}
	})
}

// query functions

let inputCourseInfo = function(name, average_rating, regular_price, sales_price, image_url, callback) {

	var query = `INSERT into Courses (name, average_rating, regular_price, sales_price, image_url) VALUES (?, ?, ?, ?, ?)`
	connection.query(query, [name, average_rating, regular_price, sales_price, image_url], function (error, results) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results)
		}
	})
}

let inputStudentInfo = function(courses_count, reviews_count, callback) {

	var query = `INSERT into Students (courses_count, reviews_count) VALUES (?, ?)`
	connection.query(query, [courses_count, reviews_count], function (error, results) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results)
		}
	})
}

let inputPurchaseInfo = function(course_id, student_id, callback) {

	var query = `INSERT into Purchases (course_id, student_id) VALUES (?, ?)`
	connection.query(query, [course_id, student_id], function (error, results) {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results)
		}
	})
}

var loadCourseDatatoDB = function() {
	for (var i = 0; i < courses.length; i++) {
		var randName = courses[i];
		var rand_average_rating = faker.random.number({min:1.0, max:5.0});
		var rand_regular_price = faker.random.number({min: 50.00, max: 200.00});
		var rand_sales_price = faker.random.number({min:10.00, max: 20.00});
		var rand_image_url = faker.image.imageUrl();
		inputCourseInfo(randName, rand_average_rating, rand_regular_price, rand_sales_price, rand_image_url, (error, results) => {console.log(error, results)});
	}
};

var loadStudentDatatoDB = function() {
	for (var i = 0; i < courses.length * 5; i++) {
		var rand_courses_count = faker.random.number({min:1, max:9});
		var rand_reviews_count = faker.random.number({min:1, max:9});
		inputStudentInfo(rand_courses_count, rand_reviews_count, (error, results) => {console.log(error, results)});
	}
};

var loadPurchaseDatatoDB = function() {
	for (var i = 0; i < courses.length * 25; i++) {
		var rand_course_id = faker.random.number({min:1, max:100});
		var rand_student_id = faker.random.number({min:1, max:500});
		inputPurchaseInfo(rand_course_id, rand_student_id, (error, results) => {console.log(error, results)});
	}
};

// data generation functions (comment back in to invoke the funcs above)
// loadStudentDatatoDB();
// loadCourseDatatoDB();
// loadPurchaseDatatoDB();

module.exports = {
	inputCourseInfo: inputCourseInfo,
	inputStudentInfo: inputStudentInfo
}
