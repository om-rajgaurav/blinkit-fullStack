import mongoose, { Schema, model } from 'mongoose';


//Base User Schema
const userSchema = new Schema({
  name: {
    type: String,
  },
  role: {
    type: String,
    enum: ['Customer', 'Admin', "DeliveryPartner"],
    required: true
  },
  isActivated: {
    type: Boolean,
    default: false
  }
});


//Customer Schema
const customerSchema = new Schema({
  ...userSchema.obj,
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['Customer'],
    default: 'Customer',
  },
  liveLocation: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  address: {
    type: String
  }
});

//DeliveryPartner Schema
const deliveryPartnerSchema = new Schema({
  ...userSchema.obj,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ['DeliveryPartner'],
    default: 'DeliveryPartner',
  },
  liveLocation: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  address: {
    type: String
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch'
  }
});


//Admin Schema
const adminSchema = new Schema({
  ...userSchema.obj,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin'],
    default: 'Admin',
  },
}); 


export const Customer = model('Customer', customerSchema);
export const DeliveryPartner = model('DeliveryPartner', deliveryPartnerSchema);
export const Admin = model('Admin', adminSchema);