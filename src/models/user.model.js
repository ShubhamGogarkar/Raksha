import mongoose , {ObjectId} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    fullName: {
        type: String,
        index: true,
        trim: true,
        required: true,
        
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    emergencyContacts:[
      {
        type: Number,
        required: true,
        trim: true
      }
    ],

    devicesId:[{
      type: String,
      required: true,
      trim: true,
      unique: true
    }]
    

}, {timestamps: true});




export const User = mongoose.model('User', UserSchema);