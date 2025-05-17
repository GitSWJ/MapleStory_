import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  role: { type: Number, required: true },
  user_id: { type: String, required: true , unique: true, index: true },
  user_password: { type: String, required: true },
  user_name: { type: String, required: false },
  user_email: { type: String, required: false },
  user_phone: { type: String, required: false },
  user_address: { type: String, required: false },
  user_birth: { type: String, required: false },
  create_at: { type: Date, required: true, default: Date.now },
},
{ 
  timestamps: true 
}
);
