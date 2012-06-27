var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/blacktea');
mongoose.connection.db.serverConfig.options.auto_reconnect = true;

var User = new Schema({
  name: {type: String},
  password: {type: String},
  city: {type: String},
  contact: {type:String}
});

var UserModel = mongoose.connection.model('User', User);

/* MD5 */
var MD5 = function(str){
  var hash = require('crypto').createHash('md5');
  return hash.update(str + '').digest('hex');
}



exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.show_signup = function(req, res){
  res.render('show_signup', {title: 'Signup'});
};

exports.signup = function(req, res){
  var name = req.body['name'];
  var city = req.body['city'];
  var contact = req.body['contact'];
  p1 = req.body['password_one'];
  p2 = req.body['password_two'];
  if (p1 != p2) {
    res.render('signup_error', {title: 'Signup Error', error: 'Passwords not the same'});
    return ;
  }
  var password = p1;

  var user = new UserModel();
  user.name = name;
  user.city = city;
  user.contact = contact;
  user.password = MD5(password);
  user.save();
  res.render('signup_succ',{title: 'Sigup success!'});
};


