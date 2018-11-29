const express = require('express');
const courseController = require('../../controllers/courses.controller');
// const cache = require('../../cache');

const router = express.Router();

router.get('/:courseId/recommendedCourses', (req, res) => {
  courseController.getMostEnrolledCourses(req.params, res);
});

// router.post('/:courseId', (req, res) => {
//   courseController
//     .createEnrolledRels(req.params)
//     .then((course) => {
//       res.status(201).send(course);
//     })
//     .catch(e => res.json({ message: 'error', ...e }));
// });

// router.patch('/:course', (req, res) => {
//   courseController.deleteCourse(req.params).then(() => {});
// });
// router.delete('/:courseId', (req, res) => {});

module.exports = router;
