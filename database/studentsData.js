// const faker = require('faker');

// const students = [];

// const createFakeStudents = function createFakeStudents() {
//   for (let i = 0; i < 500000; i += 1) {
//     students.push(`${faker.name.firstName()} ${faker.name.lastName()}`);
//   }
// };

// createFakeStudents();
const data = require('./courseData');

console.log(data.length);
console.log(data);
