const fs = require('fs');
const csv = require('fast-csv');
const { getRandBool, randomNumGenerator, totalNumOfStudents } = require('./utils');

const csvStreamEnrollments = csv.format({ headers: true }).transform(row => ({
  course_id: row.courseId,
  student_id: row.studentId,
  rating: row.rating,
}));

csvStreamEnrollments.pipe(fs.createWriteStream('../../../enrollments1.csv'));

const createFakeEnrollments = function createFakeEnrollments(courseId, enrolledStudents) {
  for (let i = 0; i < enrolledStudents; i += 1) {
    const randomStudentId = randomNumGenerator(1, totalNumOfStudents);
    const set = new Set();
    const hasRated = getRandBool();
    if (!set.has(randomStudentId)) {
      const courseStudent = {
        courseId,
        studentId: randomStudentId,
        rating: hasRated ? randomNumGenerator(1, 5, 'userRating') : '',
      };
      csvStreamEnrollments.write(courseStudent);
    }
    if (i <= enrolledStudents) {
      csvStreamEnrollments.once('drain', createFakeEnrollments);
    }
  }
  csvStreamEnrollments.end();
};

module.exports = createFakeEnrollments;
