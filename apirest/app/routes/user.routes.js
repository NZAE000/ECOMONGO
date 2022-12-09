import { Router } from "express";
import { create, findAll, findId, update, deleteOne, deleteAll } from "../controllers/user.controller.js"

const router = Router();

router.route("/add").post(create);
router.route("/all").get(findAll);
router.route("/:rut").get(findId);
router.route("/:rut").put(update);
router.route("/:rut").delete(deleteOne);
router.route("/").delete(deleteAll);

export default router;
