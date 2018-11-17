const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const faker = require('faker');
const images = require('./imageData');

const arr = [];

const randomNumGenerator = function randomNumGenerator(min, max, decimalPlaces) {
  const rand = Math.random() * (max - min) + min;
  const power = 10 ** decimalPlaces;
  return Math.floor(rand * power) / power;
};

const csvStreamCourses = csv.format({ headers: true }).transform(row => ({
  id: row.id,
  course_name: row.courseName,
  average_rating: row.averageRating,
  regular_price: row.regularPrice,
  sales_price: row.salesPrice,
  purchase_count: row.purchaseCount,
  lecture_length: row.lectureLength,
  last_updated_month: row.lastUpdatedMonth,
  last_updated_year: row.lastUpdatedYear,
  image_url: row.imageUrl,
}));

const writableStreamCourses = fs.createWriteStream('courses.csv');

csvStreamCourses.pipe(writableStreamCourses);

const createFakeCourses = function createFakeCourses() {
  for (let i = 1; i <= 10000000; i += 1) {
    const course = {
      id: i,
      title: arr[i],
      averageRating: randomNumGenerator(1, 5, 1),
      regularPrice: faker.random.number({ min: 50, max: 200 }),
      salesPrice: faker.random.number({ min: 10, max: 20 }),
      purchaseCount: faker.random.number({ min: 30, max: 500 }),
      lectureLength: randomNumGenerator(5, 30, 1),
      lastUpdatedMonth: faker.random.number({ min: 1, max: 12 }),
      lastUpdatedYear: faker.random.number({ min: 2016, max: 2018 }),
      imageUrl: images[randomNumGenerator(0, images.length, 0)],
    };
    csvStreamCourses.write(course);
  }
  csvStreamCourses.end();
};

const csvStreamStudents = csv.format({ headers: true }).transform(row => ({
  id: row.id,
  first_name: row.firstName,
  last_name: row.lastName,
}));

const writableStreamStudents = fs.createWriteStream('students.csv');

csvStreamStudents.pipe(writableStreamStudents);

const createFakeStudents = function createFakeStudents() {
  for (let i = 1; i <= 10000000; i += 1) {
    const student = {
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
    csvStreamStudents.write(student);
  }
  csvStreamStudents.end();
};

csv
  .fromPath(path.join(__dirname, '../courseData.csv'))
  .on('data', (data) => {
    arr.push(data[1]);
  })
  .on('end', () => {
    createFakeCourses();
    createFakeStudents();
  });
