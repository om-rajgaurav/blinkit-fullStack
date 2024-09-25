import { Schema, model } from "mongoose";

const branchSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  address: { type: String },
  deliveryPartners: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DeliveryPartner'
    }
  ]

});

const Branch = model('Branch', branchSchema);
export default Branch