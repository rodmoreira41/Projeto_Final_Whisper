var sql = require("../utils/db");

const retrieveGenreOnMovies = (req, res) => {
  sql.query("Select * from genre where genre.id in (select genre_id from movie_genre where movie_id = ?)", [req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = {retrieveGenreOnMovies};