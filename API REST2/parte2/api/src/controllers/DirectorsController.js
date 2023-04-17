var sql = require("../utils/db");

const countDirectors = (req, res) => {
    sql.query("SELECT COUNT(id) FROM director", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
};

const retrieveDirectors = (req, res) => {
  sql.query("SELECT * FROM director", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};

const createDirector = (req, res) => {
  sql.query(
    "INSERT INTO director (name) values (?)",
    [req.body.name],
    function (err, result) {
      if (err) throw err;
      res.send(req.body);
    }
  );
};

const retrieveDirector = (req, res) => {
  sql.query(
    "SELECT * FROM director WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
};

const deleteDirector = (req, res) => {
  sql.query(
    "DELETE FROM director WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send("Director " + req.params.id + " successfully deleted");
    }
  );
};

const updateDirector = (req, res) => {
  sql.query(
    "UPDATE director SET name = ? WHERE id = ?",
    [req.body.name, req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send(req.body);
    }
  );
};

module.exports = {countDirectors, retrieveDirectors, createDirector, retrieveDirector, updateDirector, deleteDirector};