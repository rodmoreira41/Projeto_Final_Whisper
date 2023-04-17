'use strict';
var sql = require('../utils/db.js');

/**
 * Retrieve Livro based on Autor ID
 *
 * id Long 
 * returns List
 **/
exports.retrieveLivroOnAutor = function(id) {
  return new Promise(function(resolve, reject) {
    sql.query("SELECT * FROM livro WHERE id_autor = ?", [id], function (err, res) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(res);
        resolve(res);
      }
    });
  });
}

