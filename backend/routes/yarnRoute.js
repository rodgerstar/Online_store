import express from "express";

import {addYarn} from "../controllers/yarnController.js";
import multer from "multer"


const yarnRouter = express.Router();

//image storage engine
const storage =multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})


yarnRouter.post("/add",upload.single("image"),addYarn)






export default yarnRouter;
