const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const pg = require('pg');
const winston = require('winston');

const db = require('../database/index.js');

const app = express();
const port = process.env.PORT || 3005;

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client/dist')));

// Postgres Client Setup
const { Pool } = require('pg');

const pgClient = new Pool({});

// winston.log('info,', userInput)
// winston.error('this guy is messing');

// app.use('/courses/:courseId', express.static(path.join(__dirname, '../public')));

// GET method route
app.get('/courses/:courseId/similarcourses', (req, res) => {
  console.log(req.params);
  db.arrayOfPurchasesForStudents(req.params.courseId, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send(results);
    }


    
  });
});

// POST method route
// app.post('/input', function (req, res) {

//   console.log('body', req.body);
//   db.inputNewCourses(req.body.name, req.body.average_rating, req.body.regular_price, req.body.sales_price, (err, results) => {
//     if (err) {
//       res.status(500).send(err, null);
//     } else {
//       res.status(201).send(null, results);
//     }
//   })
// })
app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`);
});

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
