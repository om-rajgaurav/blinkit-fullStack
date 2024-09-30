import { Schema, model } from 'mongoose'

const counterSchema = new Schema({
  name: { type: String, rewuired: true, unique: true },
  sequence_value: { type: Number, default: 0 }
})


const Counter = model("Counter", counterSchema)

export default Counter