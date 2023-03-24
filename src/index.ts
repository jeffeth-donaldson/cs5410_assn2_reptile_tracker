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
import { engine } from "express-handlebars";
import path from "path";

dotenv.config();
const client = new PrismaClient();
const app = express();
app.use(express.json());
app.engine("hbs", engine({extname: ".hbs"}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/views"));

if (process.env.NODE_ENV !== 'production') {
	app.use((req, res, next) => {
		if (req.path.match(/\.\w+$/)) { // does the path end with a file extension
			fetch(`${process.env.assetUrl}/${req.path}`).then((response) => {
				if (response.ok) {
					res.redirect(response.url) // Check to see if what we want is at the asset url, then redirect if it is.
				} else {
					// Handle Dev problems here
				}
			})
		} else {
			next();
		}
	})
} else {
	// Do prod things
}

usersController(app,client);
tokenController(app,client);
reptileController(app,client);
feedingController(app, client);
husbandryRecordController(app, client);
scheduleController(app,client);

app.get("/*", (req,res) => {
	console.log("root");
	res.render("app", {
	  development: process.env.debug?.toLowerCase() === "true",
	  assetUrl: process.env.assetUrl
	});
  })

const port = parseInt(process.env.PORT??'3000')
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});