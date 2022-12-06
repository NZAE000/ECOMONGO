import { Router } from "express";
import { create, findAll, findId, update, deleteOne, deleteAll } from "../controllers/user.controller.js"

const router = Router();

router.route("/create").post(create);
router.route("/get-all").get(findAll);
router.route("/get/:id").get(findId);
router.route("/update/:id").put(update);
router.route("/delete/:id").delete(deleteOne);
router.route("/delete-all").delete(deleteAll);

export default router;
