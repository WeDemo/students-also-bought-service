// const db = require('./index');
const neo4j = require('neo4j-driver').v1;
const log = require('../../server/logger');

const db = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', '1234'),
);
const session = db.session();

module.exports = function createTables() {
  const insertStudents = `
  USING PERIODIC COMMIT 
  LOAD CSV WITH HEADERS 
  FROM "file:///students.csv" 
  AS row 
  CREATE(s:Student { 
    id: toINT(row.id), 
    firstName: row.first_name, 
    lastName: row.last_name 
  })
  `;

  const insertCourses = `
  USING PERIODIC COMMIT 
  LOAD CSV WITH HEADERS 
  FROM "file:///courses.csv" 
  AS row 
  CREATE(c:Course {
    id: toINT(row.id),
    courseTitle: row.course_title,
    averageRating: toFloat(row.average_rating),
    regularPrice: row.regular_price,
    salesPrice: row.sales_price,
    numberOfStudentsEnrolled: toInt(row.number_of_students_enrolled),
    lectureLength: row.lecture_length,
    lastUpdatedMonth: toInt(row.last_updated_month),
    lastUpdatedYear: toInt(row.last_updated_year),
    imageUrl: row.image_url
  })
  WITH c, row
  MATCH(category: Category { id: toInt(row.category_id) })
  MERGE(c) - [: IN_CATEGORY] -> (category)
  WITH c, row
  MATCH(i: Instructor { id: toInt(row.instructor_id) })
  MERGE(c) - [: CREATED_BY] -> (i)
  `;

  const insertInstructors = `
  USING PERIODIC COMMIT 
  LOAD CSV WITH HEADERS 
  FROM "file:///instructors.csv" 
  AS row 
  CREATE(i:Instructor {
    id: toInt(row.id),
    name: row.full_name
  })
  `;

  const insertCategories = `
  USING PERIODIC COMMIT 
  LOAD CSV WITH HEADERS 
  FROM "file:///categories.csv" 
  AS row 
  CREATE(category:Category {
    id: toInt(row.id),
    name: row.category
  WITH category, row
  MATCH(parent_category: ParentCategory { name: row.parent_category })
  MERGE(category) - [: PARENT_CATEGORY] -> (parent_category)
  })
  `;

  const insertParentCategory = `
  USING PERIODIC COMMIT
  LOAD CSV WITH HEADERS 
  FROM "file:///parent_categories.csv" 
  AS row 
  CREATE(parent_category:ParentCategory {
    id: toInt(row.id),
    name: row.parent_category
  })
  `;

  const insertEnrolledRels = `
  USING PERIODIC COMMIT 
  LOAD CSV WITH HEADERS 
  FROM "file:///enrollments.csv"
  AS row
  MATCH(c:Course { id: toInt(row.course_id) })
  MATCH(s:Student { id: toInt(row.student_id) })
  MERGE(s) - [e: ENROLLED] -> (c)
  WHERE row.rating <> ""
  MERGE(s) - [r: RATED] -> (c)
  SET r.rating = toFloat(row.rating)
 
  `;

  Promise.all([
    session.run('CREATE INDEX ON :Instructor(name)'),
    session.run('CREATE INDEX ON :Course(courseTitle)'),

    session.run('CREATE CONSTRAINT ON (category:Category) ASSERT category.id IS UNIQUE'),
    session.run('CREATE CONSTRAINT ON (category:Category) ASSERT category.name IS UNIQUE'),
    session.run('CREATE CONSTRAINT ON (i:Instructor) ASSERT i.id IS UNIQUE'),
    session.run(
      'CREATE CONSTRAINT ON (parent_category: ParentCategory) ASSERT parent_category.name IS UNIQUE',
    ),

    session.run('CREATE CONSTRAINT ON (s:Student) ASSERT s.id IS UNIQUE'),
    session.run('CREATE CONSTRAINT ON (c:Course) ASSERT c.id IS UNIQUE'),

    session.run(insertParentCategory),
    session.run(insertCategories),
    session.run(insertInstructors),
    session.run(insertCourses),
    session.run(insertStudents),
    session.run(insertEnrolledRels),
  ])
    .then(() => {
      log.info('Neo4j seeded');
      session.close();
      db.close();
    })
    .catch((err) => {
      log.error(err);
      session.close();
    });
};
