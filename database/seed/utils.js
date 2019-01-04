const totalNumOfInstructors = 500000;
const totalNumOfCourses = 10000000;
const totalNumOfStudents = 1000000;
const categories = [
  [
    'Development',
    [
      'Web Development',
      'Mobile Apps',
      'Game Development',
      'Databases',
      'Software Testing',
      'Software Engineering',
    ],
  ],
  [
    'Business',
    ['Finance', 'Entrepreneurship', 'Management', 'Sales', 'Business Law', 'Real Estate'],
  ],

  ['IT & Software', ['IT Certification', 'Network & Security', 'Hardware', 'Operating Systems']],

  [
    'Personal Development',
    [
      'Personal Transformation',
      'Productivity',
      'Personal Finance',
      'Career Development',
      'Happiness',
      'Stress Management',
      'Motivation',
    ],
  ],

  ['Design', ['Web Design', 'Graphic Design', 'Design Tools', 'Game Design', '3D & Animation']],
  [
    'Health & Fitness',
    ['Fitness', 'General Health', 'Sports', 'Nutrition', 'Yoga', 'Meditation', 'Dance'],
  ],
];

const getRandBool = () => Math.random() >= 0.5;

const getRandomInclusive = (min, max, interval = 1) => {
  const rand = Math.floor((Math.random() * (max - min + interval)) / interval);
  return rand * interval + min;
};

const randomIdGenerator = () => getRandomInclusive(1, 10000000);

const randomNumGenerator = function randomNumGenerator(min, max, type) {
  const rand = getRandomInclusive(min, max);
  if (type === 'userRating') {
    if (rand === 5) return 5;
    return getRandBool() ? Number(`${rand}.5`) : rand;
  }
  if (type === 'courseRating') {
    return getRandomInclusive(min, max, 0.1).toFixed(1);
  }
  return rand;
};

const toHHMMSS = function toHHMMSS() {
  const totalSeconds = randomNumGenerator(1500, 216000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;
  let res = '';

  seconds = Math.round(seconds * 100) / 100;
  if (hours !== 0) {
    res += hours < 10 ? `0${hours}:` : `${hours}:`;
  }
  res += `${minutes < 10 ? `0${minutes}` : minutes}:`;
  res += seconds < 10 ? `0${seconds}` : seconds;

  return res;
};

const getRandomCategory = () => {
  const len = categories.length;
  const randCateIdx = randomNumGenerator(0, len - 1);
  const randCategories = categories[randCateIdx];
  const subCategories = randCategories[1];
  const subCateIdx = randomNumGenerator(0, subCategories.length - 1);

  return `${randCateIdx + 1}${subCateIdx + 1}`;
};

module.exports = {
  totalNumOfCourses,
  totalNumOfInstructors,
  totalNumOfStudents,
  getRandBool,
  randomNumGenerator,
  randomIdGenerator,
  toHHMMSS,
  categories,
  getRandomCategory,
};
