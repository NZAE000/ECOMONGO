import { Router } from "express";
import { create, findAll, findAllByStock, findAllFromProvider, findId, update, deleteOne, deleteAll } from "../controllers/product.controller.js"

const router = Router();

router.route("/add").post(create);
router.route("/all").get(findAll);
router.route("/all-byStock/:stock").get(findAllByStock);
router.route("/all-fromProv/:id_prov").get(findAllFromProvider);
router.route("/:id_prod").get(findId);
router.route("/:id_prod").put(update);
router.route("/:id_prod").delete(deleteOne);
router.route("/").delete(deleteAll);

export default router;
