CREATE DATABASE similar_courses

CREATE TABLE IF NOT EXISTS similar_courses (
  average_rating = randomNumGenerator(1, 5, 1);
  regular_price = faker.random.number({ min: 50, max: 200 });
  sales_price = faker.random.number({ min: 10, max: 20 });
  purchase_count = faker.random.number({ min: 30, max: 500 });
  lecture_length = randomNumGenerator(5, 30, 1);
  updated_month = faker.random.number({ min: 1, max: 12 });
  updated_year = faker.random.number({ min: 2016, max: 2018 });
  image_url = photos[randomNumGenerator(0, photos.length, 0)];