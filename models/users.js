const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = require('bluebird');


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: { type: String, required: true },
  albums: [{type: mongoose.Schema.ObjectId, ref: 'Album'}]
});

userSchema.methods.validatePassword = function validatePassword(password){
  return bcrypt.compareSync(password, this.password);
};


userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation;
  });

//before saving/moving forward check the password matches
userSchema.pre('validate', function checkPassword(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

//before saving  hash the password with bsync
userSchema.pre('save', function HashPassword(next) {
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

//export for use in other files
module.exports = mongoose.model('User', userSchema);
