import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/client/song.controller";

router.get("/:slugTopic", controller.list);

router.get("/detail/:slugSong", controller.detail);

router.get("/like/")

export const songRoutes: Router = router;
