import { Router } from "express";
import {
    registerDevice,
  updateDeviceDetails,
  addEmergencyContact,
  removeEmergencyContact,
} from "../controllers/user.controller.js";
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

router.route("/register").post(authLimiter,  registerDevice);
router.route("/update-device-details").patch(updateDeviceDetails);
router.route("/add-emergency-contact").post(addEmergencyContact);
router.route("/remove-emergency-contact").delete(removeEmergencyContact);


export default router;
