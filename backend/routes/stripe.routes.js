import Express from "express";
const stripeRoute = Express.Router()
import { payement } from "../controllers/stripe.js";

stripeRoute.post("/" , payement)

export default stripeRoute  