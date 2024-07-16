  const database = require("../../database");
  
  const getUsers = (req, res) => {
    let sql = "select * from users";
    const sqlValues = [];

    if (req.query.language != null) {
      sql += " where language = ?";
      sqlValues.push(req.query.language);
    
      if (req.query.city != null) {
        sql += " and city = ?";
        sqlValues.push(req.query.city);
      }
    } else if (req.query.city != null) {
      sql += " where city = ?";
      sqlValues.push(req.query.city);
    }

  console.log(sql);
  console.log(sqlValues);
  
    database
      .query(sql, sqlValues)
      .then(([users
        
      ]) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  
  };

  
  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("select * from users where id = ?", [id])
  
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
  
  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
        [firstname, lastname, email, city, language]
      )
      .then(([result]) => {
        res.status(201).send({ id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  
  module.exports = {
    getUsers,
    getUserById,
    postUser,
  };
