// connect mysql to DB
// formulate get and post query

const mysql = require('mysql');
const faker = require('faker');
const _ = require('underscore');

const knex = require('knex');

// const db = knex({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     user: '',
//     password: '',
//     database: '',
//   },
// });

// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1',
//   database: 'udemy_similar_component',
// });

// module.exports = {
//   getConnection: function () {
//     var con = mysql.createConnection({
//       host: 'localhost',
//       user: 'student',
//       password: 'student',
//       database: 'chat'
//     });

//     con.connect(function (err) {
//       if (err) { throw err; }
//       console.log('Connected!');
//     });
//     return con;
//   }

// };

connection = require('bluebird').promisifyAll(connection);

// not necessary if query is used;
// connection.connect();

// constructor creates new mySQL connection with the given configuration

const getStudentsPurchasesByCourseId = function getStudentsPurchasesByCourseId(courseId) {
  return connection.queryAsync('SELECT student_id from Purchases where course_id = ?', [courseId]);
};

// const getSimilarCourseInfoFromCourseID = function(courseId) {
//   return connection.queryAsync('SELECT * from Courses where id = ?', [courseId]);
// }

const getPurchasesForStudent = function getPurchasesForStudent(studentId) {
  return connection.queryAsync(
    'SELECT Courses.id, Courses.name, Courses.average_rating, Courses.regular_price, Courses.sales_price, Courses.purchase_count, Courses.lecture_time, Courses.last_update_month, Courses.last_update_year, Courses.image_url from Purchases INNER JOIN Courses ON Purchases.course_id = Courses.id where student_id = ?',
    [studentId],
  );
};

const arrayOfPurchasesForStudents = function arrayOfPurchasesForStudents(courseId, callback) {
  return getStudentsPurchasesByCourseId(courseId)
    .then(courseId => courseId.map(studentObj => getPurchasesForStudent(studentObj.student_id)))
    .then((val) => {
      // console.log('this is the promises ', val);
      // return val;
      const results = {};
      // console.log("HERE", val)
      Promise.all(val)
        .then((rows) => {
          // console.log(rows);
          // console.log('this is the array of course_id objects ', rows);
          results.rows = rows;
          // console.log('this is results ', rows);
          // console.log({ rows })
          return rows.map((courseObj) => {
            const output = [];
            // console.log(courseObj[0].course_id);
            for (let i = 0; i < courseObj.length; i++) {
              output.push(courseObj[i]);
              // console.log('check if interpreter reads this line')
            }
            return output;
          });
        })
        .then((data) => {
          const flattenData = _.flatten(data);
          // console.log('this is the flattened data', flattenData);
          const uniqCourses = _.uniq(flattenData, x => x.id);
          // console.log('this is the list of uniq courses ', uniqCourses);
          callback(null, uniqCourses);
        })
        .catch((err) => {
          callback(err);
        });
    })
    .catch((error) => {
      callback(error);
    });
};

// arrayOfPurchasesForStudents();

const inputCourseInfo = function inputCourseInfo(
  name,
  average_rating,
  regular_price,
  sales_price,
  purchase_count,
  lecture_time,
  last_update_month,
  last_update_year,
  image_url,
  callback,
) {
  const query = 'INSERT into Courses (name, average_rating, regular_price, sales_price, purchase_count, lecture_time, last_update_month, last_update_year, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(
    query,
    [
      name,
      average_rating,
      regular_price,
      sales_price,
      purchase_count,
      lecture_time,
      last_update_month,
      last_update_year,
      image_url,
    ],
    (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    },
  );
};

const inputStudentInfo = function inputStudentInfo(courses_count, reviews_count, callback) {
  const query = 'INSERT into Students (courses_count, reviews_count) VALUES (?, ?)';
  connection.query(query, [courses_count, reviews_count], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

const inputPurchaseInfo = function inputPurchaseInfo(course_id, student_id, callback) {
  const query = 'INSERT into Purchases (course_id, student_id) VALUES (?, ?)';
  connection.query(query, [course_id, student_id], (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  inputCourseInfo,
  inputStudentInfo,
  inputPurchaseInfo,
  arrayOfPurchasesForStudents,
};
