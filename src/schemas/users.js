const mongoose = require('mongoose');
const { Schema } = mongoose;
const bCrypt = require('bcryptjs');
const SALT_FACTOR = 6;
const { Subscr } = require('../helpers/constants');

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 3,
      default: 'Guest',
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
    subscription: {
      type: String,
      enum: [Subscr.FREE, Subscr.PRO, Subscr.PREMIUM],
      default: Subscr.FREE,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bCrypt.hash(
    this.password,
    bCrypt.genSaltSync(SALT_FACTOR),
  );
  next();
});

// userSchema.methods.setPassword = async function (password) {
//   this.password = await bCrypt.hash(password, bCrypt.genSaltSync(SALT_FACTOR));
// };

userSchema.methods.validPassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
