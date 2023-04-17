var sql = require("../utils/db");

const countActors = (req, res) => {
    sql.query("SELECT COUNT(id) FROM actor", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
};

const retrieveActors = (req, res) => {
  sql.query("SELECT * FROM actor", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};

const createActor = (req, res) => {
  sql.query(
    "INSERT INTO actor (name) VALUES (?)",
    [
      req.body.name
    ],
    function (err, result) {
      if (err) throw err;
      res.send(req.body);
    }
  );
};

const retrieveActor = (req, res) => {
    sql.query(
    "SELECT * FROM actor WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
};

const deleteActor = (req, res) => {
    sql.query(
    "DELETE FROM actor WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send("Actor " + req.params.id + " successfully deleted");
    }
  );
};

const updateActor = (req, res) => {
  sql.query(
    "UPDATE actor SET name = ? WHERE id = ?",
    [
      req.body.name,
      req.params.id
    ],
    function (err, result) {
      if (err) throw err;
      res.send(req.body);
    }
  );
};

module.exports = {countActors, retrieveActors, createActor, retrieveActor, updateActor, deleteActor};