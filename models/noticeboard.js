import mongoose, {Schema, models} from 'mongoose';

const noticeSchema = new Schema({
    notice: {
        type: String,
        required: true
      }
}, {timestamps: true});

 const Notice = models.Notice || mongoose.model('Notice', noticeSchema);

export default Notice;