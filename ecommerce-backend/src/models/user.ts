import { genSalt, hash, compare } from 'bcryptjs';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [/[\w.]+@\w{1,10}\.\w{1,3}/, "Please provide a valid email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    trim: true,
  }
});

userSchema.pre('save', async function() {
  const salt = await genSalt(14);
  this.password = await hash(this.password, salt);
})