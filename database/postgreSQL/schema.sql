CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  course_title VARCHAR (300) NOT NULL,
  average_rating DECIMAL (10, 1),
  regular_price INT NOT NULL, 
  sales_price INT,
  number_of_students_enrolled INT,
  lecture_length VARCHAR (300) NOT NULL,
  last_updated_month VARCHAR (200),
  last_updated_year VARCHAR (200),
  image_urls VARCHAR (300) NOT NULL
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL 
);

CREATE TABLE enrollments (
  course_id INT NOT NULL,
  student_id INT
);

ALTER TABLE enrollments ADD FOREIGN KEY (course_id) REFERENCES courses(id);
ALTER TABLE enrollments ADD FOREIGN KEY (student_id) REFERENCES students(id);







