const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name user is required'],
    },
    email: {
      type: String,
      required: [true, 'Email user is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone user is required'],
    },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.plugin(mongoosePaginate);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
