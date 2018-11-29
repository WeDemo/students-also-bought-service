const { Client } = require('pg');
const path = require('path');
const log = require('../../server/logger');

const studentsCSV = path.join(__dirname, '../../../students.csv');
const coursesCSV = path.join(__dirname, '../../../courses.csv');
const enrollmentsCSV = path.join(__dirname, '../../../enrollments.csv');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/also_bought';

const client = new Client(connectionString);
client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack));

client
  .connect()
  .then(() => {
    log.info(`Connected To ${client.database} at ${client.host}:${client.port}`);
  })
  .catch(log.error);

client.query('DROP TABLE IF EXISTS students');
client.query(`
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR (100) NOT NULL,
  last_name VARCHAR (100) NOT NULL
)`);

client.query('DROP TABLE IF EXISTS courses');
client.query(`
CREATE TABLE courses(
  id SERIAL PRIMARY KEY,
  course_title VARCHAR(300) NOT NULL,
  average_rating DECIMAL(10, 1),
  regular_price INT NOT NULL,
  sales_price INT,
  number_of_students_enrolled INT,
  lecture_length VARCHAR(300) NOT NULL,
  last_updated_month VARCHAR(200),
  last_updated_year VARCHAR(200),
  image_urls VARCHAR(300) NOT NULL
)`);

client.query('DROP TABLE IF EXISTS enrollments');
client.query(`
  CREATE TABLE enrollments(
  course_id INT NOT NULL ADD FOREIGN KEY(course_id) REFERENCES courses(id),
  student_id INT ADD FOREIGN KEY(student_id) REFERENCES students(id)
  )
`);

client
  .query(`COPY students(id, first_name, last_name) FROM '${studentsCSV}' DELIMITER ',' CSV HEADER;`)
  .then(data => log.info(data))
  .catch(err => log.error(err));

client
  .query(
    `COPY courses(id, course_title, average_rating, regular_price, sales_price, number_of_students_enrolled, lecture_length, last_updated_month, last_updated_year, image_urls) FROM '${coursesCSV}' DELIMITER ',' CSV HEADER;`,
  )
  .then(data => log.info(data))
  .catch(err => log.error(err));

client
  .query(
    `COPY enrollments(course_id, student_id) FROM '${enrollmentsCSV}' DELIMITER ',' CSV HEADER;`,
  )
  .then(data => log.info(data))
  .catch(err => log.error(err));
