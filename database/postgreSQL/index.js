const pg = require('pg');
const keys = require('../keys');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/similar_courses';

const client = new pg.Client(connectionString);
client.connect();

const pgClient = new pg.Client({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on('error', () => console.log('Lost PG connection'));

const query = pgClient.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)',
);

query.on('end', () => {
  client.end();
});

pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)').catch(err => console.log(err));
