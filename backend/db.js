const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_management",
}); 

//const mysql = require("mysql2");

//const db = mysql.createConnection({
 // host: "mysql",
 // user: "root",
  //password: "root",
 // database: "employee_management",
//});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("MySQL database connected successfully");
});

module.exports = db; 

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("MySQL database connected successfully");
});

module.exports = db;