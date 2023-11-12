import mongoose, {Schema, models} from 'mongoose';

const coverSchema = new Schema({
    desktopLink: {
        type: String,
        required: true
      },
      mobileLink: {
        type: String,
        required: true
      }
}, {timestamps: true});

 const Cover = models.Cover || mongoose.model('Cover', coverSchema);

export default Cover;