// var mysql = require('mysql');
const faker = require('faker');
const load = require('./index.js');
const courses = require('./courseData.js');
const photos = require('./photoData.js');

const randomNumGenerator = function randomNumGenerator(min, max, decimalPlaces) {
  const rand = Math.random() * (max - min) + min;
  // const power = Math.pow(10, decimalPlaces);
  const power = 10 ** decimalPlaces;
  return Math.floor(rand * power) / power;
};

// upload course, student and purchase data to the DB

const loadCourseDatatoDB = function loadCourseDatatoDB() {
  for (let i = 0; i < courses.length; i += 1) {
    const courseTitle = courses[i];
    const averageRating = randomNumGenerator(1, 5, 1);
    const regularPrice = faker.random.number({ min: 50, max: 200 });
    const salesPrice = faker.random.number({ min: 10, max: 20 });
    const purchaseCount = faker.random.number({ min: 30, max: 500 });
    const lectureLength = randomNumGenerator(5, 30, 1);
    const updatedMonth = faker.random.number({ min: 1, max: 12 });
    const updatedYear = faker.random.number({ min: 2016, max: 2018 });
    const imageUrl = photos[randomNumGenerator(0, photos.length, 0)];
    load.inputCourseInfo(
      courseTitle,
      averageRating,
      regularPrice,
      salesPrice,
      purchaseCount,
      lectureLength,
      updatedMonth,
      updatedYear,
      imageUrl,
      (error, results) => {
        console.log(error, results);
      },
    );
  }
};

const loadStudentDatatoDB = function loadStudentDatatoDB() {
  for (let i = 0; i < courses.length * 3; i += 1) {
    const coursesCount = faker.random.number({ min: 1, max: 4 });
    // const rand_reviews_count = faker.random.number({ min: 1, max: 4 });
    load.inputStudentInfo(coursesCount, (error, results) => {
      console.log(error, results);
    });
  }
};

const loadPurchaseDatatoDB = function loadPurchaseDatatoDB() {
  for (let i = 0; i < courses.length * 8; i += 1) {
    const courseId = faker.random.number({ min: 1, max: 100 });
    const studentId = faker.random.number({ min: 1, max: 200 });
    load.inputPurchaseInfo(courseId, studentId, (error, results) => {
      console.log(error, results);
    });
  }
};

// data generation functions (comment back in to invoke the funcs above)
loadStudentDatatoDB();
loadCourseDatatoDB();
loadPurchaseDatatoDB();
