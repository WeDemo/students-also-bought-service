DROP DATABASE IF EXISTS similar_courses; 

CREATE DATABASE similar_courses; 

USE similar_courses; 

CREATE TABLE courses 
  ( 
     id                INT auto_increment PRIMARY KEY, 
     name              VARCHAR (75), 
     average_rating    DECIMAL (2, 1), 
     regular_price     DECIMAL (10, 2), 
     sales_price       DECIMAL (10, 2), 
     purchase_count    INT (70), 
     lecture_time      DECIMAL (10, 1), 
     last_update_month INT (70), 
     last_update_year  INT (70), 
     image_url         VARCHAR (100) 
  ); 

CREATE TABLE students 
  ( 
     id            INT auto_increment PRIMARY KEY, 
     courses_count INT (70), 
     reviews_count INT (70) 
  ); 

CREATE TABLE purchases 
  ( 
     course_id  INTEGER(8), 
     student_id INTEGER(9) 
  ); 

ALTER TABLE purchases 
  ADD FOREIGN KEY (course_id) REFERENCES courses (id); 

ALTER TABLE purchases 
  ADD FOREIGN KEY (student_id) REFERENCES students (id);
