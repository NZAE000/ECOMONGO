import { Router } from "express";
import { create, findAll, findId, update, deleteOne, deleteAll } from "../controllers/purchasedProduct.controller.js"

const router = Router();

router.route("/add").post(create);
router.route("/all").get(findAll);
router.route("/:id_purchased").get(findId);
router.route("/:id_purchasde").put(update);
router.route("/:id_purchased").delete(deleteOne);
router.route("/").delete(deleteAll);

export default router;