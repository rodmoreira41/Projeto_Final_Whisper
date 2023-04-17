var sql = require("../utils/db");

const retrieveGenres = (req, res) => {
  sql.query("SELECT * FROM genre", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};

const countGenres = (req, res) => {
  sql.query("SELECT COUNT(id) FROM genre", function (err, result) {
      if (err) throw err;
      res.send(result);
  });
};

const createGenre = (req, res) => {
  sql.query(
    "INSERT INTO genre (genre) VALUES (?)",
    [
      req.body.genre,
    ],
    function (err, result) {
      if (err) throw err;
      res.send(req.body);
    }
  );
};

const retrieveGenre = (req, res) => {
    sql.query(
    "SELECT * FROM genre WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
};

const deleteGenre = (req, res) => {
    sql.query(
    "DELETE FROM genre WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send("Genre " + req.params.id + " successfully deleted");
    }
  );
};

const updateGenre = (req, res) => {
  sql.query(
    "UPDATE genre SET genre = ? WHERE id = ?",
    [
      req.body.genre,
      req.params.id
    ],
    function (err, result) {
      if (err) throw err;
      res.send(req.body);
    }
  );
};

module.exports = {countGenres, retrieveGenres, retrieveGenre, deleteGenre, updateGenre, createGenre};