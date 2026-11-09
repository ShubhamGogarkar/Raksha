import { Router } from "express";
import {
  postEmergencyEmailAlert  ,
  getEmergencyContacts,
} from "../controllers/emergency.controller.js";

const router = Router();

router.route("/send-emergency-email-alert").post(postEmergencyEmailAlert);
router.route("/emergency-contacts/:deviceId").get(getEmergencyContacts);


export default router;