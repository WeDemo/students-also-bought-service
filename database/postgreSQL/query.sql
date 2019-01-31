-- Benchmark PostgreSQL READ query
SELECT c.*, COUNT(c.id) AS most_taken_courses
FROM enrollments e1
  JOIN students s ON s.id = e1.student_id
  JOIN enrollments e2 ON e2.student_id = s1.id
  JOIN courses c ON c.id = e2.courses_id
WHERE e1.course_id = 600 AND e1.course_id != e2.course_id
GROUP BY c.id
ORDER BY most_taken_courses DESC
LIMIT 10;

