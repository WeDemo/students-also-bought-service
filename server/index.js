// require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Joi = require('joi');
const log = require('./logger');

const courses = require('./routes/api/courses');

const app = express();
const port = process.env.PORT || 3008;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/courses/:courseId', express.static(path.join(__dirname, '../public')));

app.use('/courses/', courses);

app.listen(port, () => {
  log.info(`Server listening at : http://localhost:${port}`);
});
