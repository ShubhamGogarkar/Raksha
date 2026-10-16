import { Router } from "express";
import {
    registerDevice,
  getEmergencyContacts,
  updateDeviceDetails,
  addEmergencyContact,
  removeEmergencyContact,
} from "../controllers/user.controller.js";
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.route("/register").post(authLimiter,  registerDevice);
router.route("/emergency-contacts/:deviceId").get(getEmergencyContacts);
router.route("/update-device-details").patch(updateDeviceDetails);
router.route("/add-emergency-contact").post(addEmergencyContact);
router.route("/remove-emergency-contact").delete(removeEmergencyContact);


export default router;
