import express from "express";
import { cancelDelivery, completeDelivery, getDeliveryDetail, getMyDeliveries, loginDeliveryPartner, updateDeliveryStatus, updateLocation, }
    from "../controllers/deliveryPartnerControllers.js";
import deliveryPartnerAuth from "../middleware/deliveryPartnerAuth.js";

const deliveryPartnerRouter = express.Router();

deliveryPartnerRouter.post("/login", loginDeliveryPartner);
deliveryPartnerRouter.get("/my-delivery", deliveryPartnerAuth, getMyDeliveries);
deliveryPartnerRouter.get("/my-delivery/:id", deliveryPartnerAuth, getDeliveryDetail);
deliveryPartnerRouter.put("/my-delivery/:id/complete", deliveryPartnerAuth, completeDelivery);
deliveryPartnerRouter.put("/my-delivery/:id/cancel", deliveryPartnerAuth, cancelDelivery);
deliveryPartnerRouter.put("/my-delivery/:id/status", deliveryPartnerAuth, updateDeliveryStatus);
deliveryPartnerRouter.put("/my-delivery/:id/location", deliveryPartnerAuth, updateLocation);

export default deliveryPartnerRouter;
