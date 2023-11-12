import mongoose, {Schema, models} from 'mongoose';

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      desc: {
        type: String,
        required: true
      },
      photo: {
        type: String,
        required: true
      }
}, {timestamps: true});

 const Event = models.Event || mongoose.model('Event', eventSchema);

export default Event;