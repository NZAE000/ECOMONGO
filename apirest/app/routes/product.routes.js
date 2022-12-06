import { Router } from "express";
import { create, findAll, findId, update, deleteOne, deleteAll,findAllByStock } from "../controllers/product.controller.js"

const router = Router();

router.route("/add").post(create);
router.route("/all").get(findAll);
router.route("/all-byStock/:stock").get(findAll);
router.route("/:id").get(findId);
router.route("/:id").put(update);
router.route("/:id").delete(deleteOne);
router.route("/").delete(deleteAll);
export default router;
