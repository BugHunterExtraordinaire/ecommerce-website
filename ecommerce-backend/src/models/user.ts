import { genSalt, hash, compare } from 'bcryptjs';
import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [/[\w.]+@\w+\.\w+/, "Please provide a valid email"],
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
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

userSchema.method('verifyPassword', async function(password) {
  return await compare(password, this.password);
});

userSchema.method('generateJwt', function() {
  return jwt.sign(
    {
      userId: this._id
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_LIFETIME as string
    } as jwt.SignOptions 
  )
})

export default model<IUser>('User', userSchema);