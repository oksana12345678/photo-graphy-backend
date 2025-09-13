import { model, Schema } from 'mongoose';

const ScheduleSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    time_from: { type: String, default: '' },
    time_to: { type: String, default: '' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ScheduleModel = model('schedule', ScheduleSchema);
export default ScheduleModel;
