const fs = require('fs');
const csv = require('fast-csv');
const faker = require('faker');

const { totalNumOfStudents } = require('./utils');

const csvStreamStudents = csv.format({ headers: true }).transform(row => ({
  id: row.id,
  first_name: row.firstName,
  last_name: row.lastName,
}));

const writableStreamStudents = fs.createWriteStream('../../../students.csv');

csvStreamStudents.pipe(writableStreamStudents);

const createFakeStudents = function createFakeStudents() {
  for (let i = 1; i <= totalNumOfStudents; i += 1) {
    const student = {
      id: i,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
    csvStreamStudents.write(student);
  }
  csvStreamStudents.end();
};

module.exports = {
  totalNumOfStudents,
  createFakeStudents,
};
