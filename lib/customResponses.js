function customResponses(req, res, next){

  res.badRequest = function(url, error){
    req.flash('danger', error);
    return res.redirect(url);
  };
  next();
}

module.exports = customResponses;
