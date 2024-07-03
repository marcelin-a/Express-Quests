require("dotenv").config();

const mysql = require("mysql2/promise");

const database = mysql.createPool({
    host: process.env.DB_HOST, // address of the server
    port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
    console.log("------------------");
  })
  .catch((err) => {
    console.error(err);
  });

/*
database
  .query("select * from movies")
  .then((result) => {
    console.log(result);
    console.log("------------------");
  })
  .catch((err) => {
    console.error(err);
  });


database
  .query("select * from movies")
  .then((result) => {
    const movies = result[0];

    console.log(movies);
    console.log("------------------");
  })
  .catch((err) => {
    console.error(err);
  });


database
  .query("select * from movies")
  .then((result) => {
    const [movies] = result;


    console.log(movies);
    console.log("------------------");
    console.log(result);
    console.log("------------------");
  })
  .catch((err) => {
    console.error(err);
  });


  database
  .query("select * from movies")
  .then(([movies]) => {
    console.log(movies);
  })
  .catch((err) => {
    console.error(err);
  });
*/

  module.exports = database;
