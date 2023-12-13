import { Router } from "express";

const router: Router = Router();
import multer from "multer";

import * as controller from "../../controllers/admin/song.controller";

import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware";

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

export const songRoutes: Router = router;
