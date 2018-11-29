function generateRandomData(userContext, events, done) {
  const courseId = Math.floor(Math.random() * 10000000) + 1;
  userContext.vars.courseId = courseId;
  return done();
}

module.exports = {
  generateRandomData,
};
