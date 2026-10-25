import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";


const registerDevice = asyncHandler(async (req, res) => {
  const { username, fullName, email, emergencyContact, deviceId } = req.body;
  if (
    [fullName, email, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }, {deviceId}],
  });

  if (existedUser) {
    throw new ApiError(409, "user already exists with username or email");
  }


  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    emergencyContacts: [emergencyContact],
    deviceId,
  });

  if (!user) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, user, "user created successfully"));
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

const updateDeviceDetails = asyncHandler(async (req, res) => {
  const { fullName, email, deviceId } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "all fields are required");
  }

  const user = await User.findOneAndUpdate(
    { deviceId: deviceId },
    { fullName, email },
    {
      returnDocument: "after",
    }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const addEmergencyContact = asyncHandler(async (req, res) => {
const { deviceId, emergencyContact } = req.body;
if (!deviceId || !emergencyContact) {
  throw new ApiError(400, "deviceId and emergencyContact are required");
}
const alreadyExists = await User.findOne({ deviceId: deviceId, emergencyContacts: emergencyContact });
if (alreadyExists) {
  throw new ApiError(409, "Emergency contact already exists");
}

const user = await User.findOneAndUpdate(
  { deviceId: deviceId },
  { $addToSet: { emergencyContacts: emergencyContact } },
  {
      returnDocument: "after",
    }
);

if (!user) {
  throw new ApiError(404, "User not found");
}

return res
  .status(200)
  .json(new ApiResponse(200, user, "Emergency contact added successfully"));
});

const removeEmergencyContact = asyncHandler(async (req, res) => {
  const { deviceId, emergencyContact } = req.body;
  if (!deviceId || !emergencyContact) {
    throw new ApiError(400, "deviceId and emergencyContact are required");
  }

  const user = await User.findOneAndUpdate(
    { deviceId: deviceId },
    { $pull: { emergencyContacts: emergencyContact } },
    {
      returnDocument: "after",
    }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Emergency contact removed successfully"));

});

export {
  registerDevice,
  getEmergencyContacts,
  updateDeviceDetails,
  addEmergencyContact,
  removeEmergencyContact,
};
