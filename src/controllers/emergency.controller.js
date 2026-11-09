import { Resend } from 'resend';
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

  const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: 'Raksha',
  to: process.env.MY_EMAIL,
    subject: `Alert for ${user.fullName}`,
    text: `Emergency Alert from ${user.fullName} (Device ID: ${deviceId})\n\nIntensity: ${intensity}\n\nPlease take immediate action. the location of the user is ${location}`,
});

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