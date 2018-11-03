// var mysql = require('mysql');
var load = require('./index.js');
var faker = require('faker');
var courses = require('./courseData.js');

// upload course, student and purchase data to the DB

var loadCourseDatatoDB = function() {
  for (var i = 0; i < 100; i++) {
    var randName = courses[i];
    var rand_average_rating = faker.random.number({min: 1.0, max: 5.0});
    var rand_regular_price = faker.random.number({min: 50.00, max: 200.00});
    var rand_sales_price = faker.random.number({min: 10.00, max: 20.00});
    var rand_image_url = faker.image.imageUrl();
    load.inputCourseInfo(randName, rand_average_rating, rand_regular_price, rand_sales_price, rand_image_url, (error, results) => { console.log(error, results); });
  }
};

var loadStudentDatatoDB = function() {
  for (var i = 0; i < 500; i++) {
    var rand_courses_count = faker.random.number({min: 1, max: 9});
    var rand_reviews_count = faker.random.number({min: 1, max: 9});
    load.inputStudentInfo(rand_courses_count, rand_reviews_count, (error, results) => { console.log(error, results); });
  }
};

var loadPurchaseDatatoDB = function() {
  for (var i = 0; i < 2500; i++) {
    var rand_course_id = faker.random.number({min: 1, max: 100});
    var rand_student_id = faker.random.number({min: 1, max: 500});
    load.inputPurchaseInfo(rand_course_id, rand_student_id, (error, results) => { console.log(error, results); });
  }
};

// data generation functions (comment back in to invoke the funcs above)
loadStudentDatatoDB();
loadCourseDatatoDB();
loadPurchaseDatatoDB();