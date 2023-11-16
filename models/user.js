import mongoose, {Schema, models} from 'mongoose';

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,

  },
  phone: {
    type: String
  }
}, {timestamps: true});

 const User = models.User|| mongoose.model('User', userSchema);

export default User;