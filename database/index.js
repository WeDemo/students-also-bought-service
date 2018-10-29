// connect mysql to DB
// formulate get and post query

var mysql = require('mysql');
var faker = require('faker');
// var courses = require('./courseData.js')


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


module.exports = {
	inputCourseInfo: inputCourseInfo,
	inputStudentInfo: inputStudentInfo,
	inputPurchaseInfo: inputPurchaseInfo
}
