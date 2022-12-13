import { Router } from "express";
import { create, findAll, findId, update, deleteOne, deleteAll } from "../controllers/buy.controller.js"

const router = Router();

router.route("/add").post(create);
router.route("/all").get(findAll);
router.route("/:id_buy").get(findId);
router.route("/:id_buy").put(update);
router.route("/:id_buy").delete(deleteOne);
router.route("/").delete(deleteAll);

export default router;
