var sql = require("../utils/db");

const retrieveMoviesOnGenre = (req, res) => {
  sql.query("Select genre.genre, genre.id , GROUP_CONCAT(movies.original_title) original_title from movies.genre join movie_genre on genre.id = movie_genre.genre_id  join movies on movie_genre.movie_id = movies.id WHERE genre.id = ? Group by genre.genre, genre.id", [req.params.id], function (err, result) {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = {retrieveMoviesOnGenre};