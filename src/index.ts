import express, {Request, RequestHandler} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { usersController } from "./controllers/user_controller";
import { tokenController } from "./controllers/token_controller";
import { reptileController } from "./controllers/reptile_controller";
import { husbandryRecordController } from "./controllers/husbandry_record_controller";
import { feedingController } from "./controllers/feeding_controller";
import { scheduleController } from "./controllers/schedule_controller";

dotenv.config();
const client = new PrismaClient();
const app = express();
app.use(express.json());


usersController(app,client);
tokenController(app,client);
reptileController(app,client);
feedingController(app, client);
husbandryRecordController(app, client);
scheduleController(app,client);

const port = parseInt(process.env.PORT??'3000')
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});