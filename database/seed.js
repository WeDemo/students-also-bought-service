// var mysql = require('mysql');
const faker = require('faker');
const load = require('./index.js');
const courses = require('./courseData.js');
const photos = require('./photoData.js');














const randomNumGenerator = function (min, max, decimalPlaces) {
  const rand = Math.random() * (max - min) + min;
  const power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
};

// upload course, student and purchase data to the DB

const loadCourseDatatoDB = function loadCourseDatatoDB() {
  for (let i = 0; i < courses.length; i++) {
    const randName = courses[i];
    const rand_average_rating = randomNumGenerator(1, 5, 1);
    const rand_regular_price = faker.random.number({ min: 50, max: 200 });
    const rand_sales_price = faker.random.number({ min: 10, max: 20 });
    const rand_purchase_count = faker.random.number({ min: 30, max: 500 });
    const rand_lecture_time = randomNumGenerator(5, 30, 1);
    const rand_update_month = faker.random.number({ min: 1, max: 12 });
    const rand_update_year = faker.random.number({ min: 2016, max: 2018 });
    const rand_image_url = photos[randomNumGenerator(0, photos.length, 0)];
    load.inputCourseInfo(
      randName,
      rand_average_rating,
      rand_regular_price,
      rand_sales_price,
      rand_purchase_count,
      rand_lecture_time,
      rand_update_month,
      rand_update_year,
      rand_image_url,
      (error, results) => {
        console.log(error, results);
      },
    );
  }
};

const loadStudentDatatoDB = function loadStudentDatatoDB() {
  for (let i = 0; i < courses.length * 3; i++) {
    const rand_courses_count = faker.random.number({ min: 1, max: 4 });
    const rand_reviews_count = faker.random.number({ min: 1, max: 4 });
    load.inputStudentInfo(rand_courses_count, rand_reviews_count, (error, results) => {
      console.log(error, results);
    });
  }
};

const loadPurchaseDatatoDB = function loadPurchaseDatatoDB () {
  for (let i = 0; i < courses.length * 8; i++) {
    const rand_course_id = faker.random.number({ min: 1, max: 100 });
    const rand_student_id = faker.random.number({ min: 1, max: 200 });
    load.inputPurchaseInfo(rand_course_id, rand_student_id, (error, results) => {
      console.log(error, results);
    });
  }
};

// data generation functions (comment back in to invoke the funcs above)
loadStudentDatatoDB();
loadCourseDatatoDB();
loadPurchaseDatatoDB();
