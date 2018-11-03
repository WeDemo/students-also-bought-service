DROP DATABASE if exists udemy_similar_component;
CREATE DATABASE udemy_similar_component;

USE udemy_similar_component;

CREATE TABLE Courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(75),
  average_rating DECIMAL(2,1),
  regular_price DECIMAL(10,2),
  sales_price DECIMAL(10,2),
  purchase_count INT(70),
  lecture_time DECIMAL(10,1),
  last_update_month INT(70),
  last_update_year INT(70),
  image_url VARCHAR(100)
);

CREATE TABLE Students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  courses_count INT(70),
  reviews_count INT(70)
);

CREATE TABLE Purchases (
  course_id INTEGER(8),
  student_id INTEGER(9)
);

ALTER TABLE Purchases ADD FOREIGN KEY (course_id) REFERENCES Courses (id);
ALTER TABLE Purchases ADD FOREIGN KEY (student_id) REFERENCES Students (id);