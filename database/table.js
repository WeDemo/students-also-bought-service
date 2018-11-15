const fs = require('fs');



var a = JSON.parse(fs.readFileSync('../../untitled folder/courseData.json', "utf8"));

console.log(a.toString());

// (err, data) => {
//   console.log(data);
// });


// console.log(a)
// // var read = new Buffer(a)
// // console.log(read)