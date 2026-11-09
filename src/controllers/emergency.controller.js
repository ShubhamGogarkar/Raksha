import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const postEmergencyEmailAlert = asyncHandler(async (req, res) => {
  const {deviceId, intensity, location } = req.body;

  if (!deviceId) {
    throw new ApiError(400, "deviceId is required");
  }

  const user = await User.findOne({ deviceId: deviceId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

try {
   await transporter.sendMail({
      from: `"RAKSHA:" <${process.env.GMAIL_USER}>`,
      to: user.email,
      subject: `Emergency Alert from Device ${deviceId}`,
      text: `From: RAKSHA\n\nEmergency Alert!\n\nDevice ID: ${deviceId}\nIntensity: ${intensity}\nLocation: ${location}`,
    });}
    catch (error) {
      throw new ApiError(500, `Failed to send email alert:${error.message}`);
    }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Email alert sent successfully"));
});

const getEmergencyContacts = asyncHandler(async (req, res) => {
    const { deviceId } = req.params;
   if(!deviceId){
    throw new ApiError(400, "deviceId is required");
   }

   const EmergencyContacts = await User.findOne({ deviceId: deviceId }).select("emergencyContacts");

   if(!EmergencyContacts){
    throw new ApiError(404, "contacts not found");
   }
  return res
    .status(200)
    .json(new ApiResponse(200, EmergencyContacts, "Emergency contacts fetched successfully"));
});

export {
  postEmergencyEmailAlert,  
  getEmergencyContacts
};