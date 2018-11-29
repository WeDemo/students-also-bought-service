const http = require('k6/http');

function random() {
  const num = Math.floor(Math.random() * 10000000);
  return num;
}

export default function () {
  http.get(`http://localhost:3008/courses/${random()}/`);
}

// command option
// k6 run--vus 20 --duration 30s - < k6.js
