var models = require ('../models/models.js');

// Creamos el MW que atendera las peticioens a la ruta
// GET /quizes/:quizId/comments/new

exports.new = function (req,res) {
    res.render ('comments/new.ejs', {quizid: req.params.quizId, errors: []});

};

// Creamos el MW que atendera las peticioens a la ruta
// POST /quizes/:quizId/comments

exports.create = function (req,res) {
  var comment = models.Comment.build(
    { texto: req.body.comment.texto,
      QuizId: req.params.quizId
    });
  comment.validate().then(
    function(err) {
      if (err) {
        res.render('comments/new.ejs',
          {comment: comment, quizid: req.params.quizId, errors: err.errors});
      } else {
        comment //save guarda en la tabla Comment el campo de texto de comment
        .save().then(function() {res.redirect('/quizes/'+req.params.quizId)})
      }   //res.redirect: Redireccion HTTP a lista de preguntas
    }
  ).catch (function(error){next(error)});
};
