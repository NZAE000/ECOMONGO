import { Router } from "express";
import { create, findAll, findId, update, deleteOne, deleteAll } from "../controllers/user.controller.js"

const router = Router();

router.route("/").post(create);
router.route("/").get(findAll);
router.route("/:id").get(findId);
router.route("/:id").put(update);
router.route("/:id").delete(deleteOne);
router.route("/").delete(deleteAll);

export default router;
