import mongoose, {Schema, models} from 'mongoose';

const facultySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    required: true
  },
  department: {
    type: String,
    required: true
  },
  qualification: {
    type: [String],
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  research: {
    type: [String],
    required: true
  },
  photo: {
    type: String,
    required: true
  }
}, {timestamps: true});

 const Faculty = models.Faculty || mongoose.model('Faculty', facultySchema);

export default Faculty;