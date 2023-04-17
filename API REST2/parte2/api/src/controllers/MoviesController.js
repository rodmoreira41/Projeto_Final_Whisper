var sql = require("../utils/db");

const countMovies = (req, res) => {
    sql.query("SELECT COUNT(id) FROM movies", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
};

const retrieveMovies = (req, res) => {
  sql.query("SELECT * FROM movies", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};

const createMovie = (req, res) => {
  sql.query(
    "INSERT INTO movies (language, original_title, release_date, runtime, actor_id, director_id) VALUES (?,?,?,?,?,?)",
    [
      req.body.language,
      req.body.original_title,
      req.body.release_date,
      req.body.runtime, 
      req.body.actor_id, 
      req.body.director_id
    ],
    function (err, result) {
      if (err) throw err;
      res.send(req.body);
    }
  );
};

const retrieveMovie = (req, res) => {
    sql.query(
    "SELECT * FROM movies WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
};

const deleteMovie = (req, res) => {
    sql.query(
    "DELETE FROM movies WHERE id = ?",
    [req.params.id],
    function (err, result) {
      if (err) throw err;
      res.send("Movie " + req.params.id + " successfully deleted");
    }
  );
};

const updateMovie = (req, res) => {
  sql.query(
    "UPDATE movies SET language = ?, original_title = ? , release_date = ?, runtime = ?, actor_id = ?, director_id = ? WHERE id = ?",
    [
      req.body.language,
      req.body.original_title,
      req.body.release_date,
      req.body.runtime, 
      req.body.actor_id, 
      req.body.director_id,
      req.params.id
    ],
    function (err, result) {
      if (err) throw err;
      res.send(req.body);
    }
  );
};

module.exports = {countMovies, retrieveMovies, retrieveMovie, deleteMovie, updateMovie, createMovie};