const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');
const path = require('path');
const images = require('./imageData');
const {
  randomNumGenerator,
  toHHMMSS,
  getRandomCategory,
  totalNumOfCourses,
  totalNumOfInstructors,
} = require('./utils');

const { createFakeStudents } = require('./students');
const { createFakeInstructors } = require('./instructors');
const { createFakeEnrollments } = require('./enrollments');
const { createFakeCategories } = require('./categories');

const courseTitles = [];

const csvStreamCourses = csv.format({ headers: true }).transform(row => ({
  id: row.id,
  course_title: row.courseTitle,
  average_rating: row.averageRating,
  regular_price: row.regularPrice,
  sales_price: row.salesPrice,
  number_of_students_enrolled: row.numberOfStudentsEnrolled,
  lecture_length: row.lectureLength,
  last_updated_month: row.lastUpdatedMonth,
  last_updated_year: row.lastUpdatedYear,
  instructor_id: row.instructorId,
  category_id: row.categoryId,
  image_url: row.imageUrl,
}));

const writableStreamCourses = fs.createWriteStream('../../../courses.csv');

csvStreamCourses.pipe(writableStreamCourses);

const createFakeCourses = function createFakeCourses() {
  let numStudents;
  for (let i = 1; i <= totalNumOfCourses; i += 1) {
    numStudents = faker.random.number({ min: 0, max: 12000 });
    const course = {
      id: i,
      courseTitle: courseTitles[i],
      averageRating: randomNumGenerator(1, 5, 'courseRating'),
      regularPrice: `${faker.random.number({ min: 50, max: 200 })}.99`,
      salesPrice: `${faker.random.number({ min: 8, max: 20 })}.99`,
      numberOfStudentsEnrolled: numStudents,
      lectureLength: toHHMMSS(),
      lastUpdatedMonth: faker.random.number({ min: 1, max: 12 }),
      lastUpdatedYear: faker.random.number({ min: 2016, max: 2018 }),
      instructorId: randomNumGenerator(1, totalNumOfInstructors),
      categoryId: getRandomCategory(),
      imageUrl: images[randomNumGenerator(0, images.length - 1)],
    };
    for (let j = 0; j < numStudents; j += 1) {
      createFakeEnrollments(i, numStudents);
    }
    if (i <= totalNumOfCourses) {
      csvStreamCourses.once('drain', createFakeCourses);
    }
    csvStreamCourses.write(course);
  }
  csvStreamCourses.end();
};

csv
  .fromPath(path.join(__dirname, '../../courseData.csv'))
  .on('data', (data) => {
    const title = data[1];
    courseTitles.push(title);
  })
  .on('end', () => {
    createFakeCategories();
    createFakeStudents();
    createFakeInstructors();
    createFakeCourses();
  });
