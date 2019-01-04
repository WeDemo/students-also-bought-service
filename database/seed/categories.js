const fs = require('fs');
const csv = require('fast-csv');
const { categories } = require('./utils');

/* Stream for Category */
const csvStreamCategory = csv.format({ headers: true }).transform(row => ({
  id: row.id,
  category: row.cate,
  parent_category: row.parentCategory,
}));

const writableStreamCategory = fs.createWriteStream('../../../categories.csv');

csvStreamCategory.pipe(writableStreamCategory);

/* Stream for Parent Category */
const csvStreamParenCategory = csv.format({ headers: true }).transform(row => ({
  id: row.id,
  parent_category: row.parentCategory,
}));

const writableStreamParenCategory = fs.createWriteStream('../../../parent_categories.csv');

csvStreamParenCategory.pipe(writableStreamParenCategory);

const createFakeCategories = () => {
  for (let i = 0; i < categories.length; i += 1) {
    const paren = categories[i][0];
    const parenCategory = {
      id: i + 1,
      parentCategory: paren,
    };
    csvStreamParenCategory.write(parenCategory);
    for (let j = 0; j < categories[i][1].length; j += 1) {
      const category = {
        id: `${i + 1}${j + 1}`,
        cate: categories[i][1][j],
        parentCategory: paren,
      };
      csvStreamCategory.write(category);
    }
  }

  csvStreamCategory.end();
  csvStreamParenCategory.end();
};

module.exports = createFakeCategories;
