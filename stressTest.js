function generateRandomData(userContext, events, done) {
  const courseId = Math.floor(Math.random() * 100) + 1;
  userContext.vars.courseId = courseId;
  return done();
}

module.exports = {
  generateRandomData,
};
