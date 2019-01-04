const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');

const { totalNumOfInstructors } = require('./utils');

const instructors = [];

/* Stream for Instructor */
const csvStreamInstructor = csv.format({ headers: true }).transform(row => ({
  id: row.id,
  full_name: row.fullName,
}));

const writableStreamInstructor = fs.createWriteStream('../../../instructors.csv');

csvStreamInstructor.pipe(writableStreamInstructor);

const createFakeInstructors = () => {
  for (let i = 0; i < totalNumOfInstructors; i += 1) {
    const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const instructor = {
      id: i + 1,
      fullName,
    };
    instructors.push(fullName);
    csvStreamInstructor.write(instructor);
  }
  csvStreamInstructor.end();
};

module.exports = {
  totalNumOfInstructors,
  instructors,
  createFakeInstructors,
};
