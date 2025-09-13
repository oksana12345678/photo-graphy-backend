import { model, Schema } from 'mongoose';

const ServicesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    time: { type: String, default: '1' },
    value: { type: String, default: '' },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

const ServicesModel = model('photo_service', ServicesSchema);
export default ServicesModel;
