import express, {Request, RequestHandler} from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const client = new PrismaClient();
const app = express();
app.use(express.json());

type JWTBody = {
  userId: number,
}

type RequestWithJWTBody = Request & {
  jwtBody?: JWTBody
}
const authenticationMiddleware: RequestHandler = async (req: RequestWithJWTBody, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const jwtBody = jwt.verify(token || '', process.env.ENCRYPTION_KEY!!) as JWTBody;
    req.jwtBody = jwtBody;
  } catch (error) {
    console.log("token failed validation")
  } finally {
    next();
  }
}

type CreateUserBody = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}
app.post('/users', async (req, res) => {
  const {email, password, firstName, lastName} = req.body as CreateUserBody;
  const passwordHash = await bcrypt.hash(req.body.password, 10)
  const user = await client.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash
    }
  });
  res.json({ user });
});

type LoginBody = {
  email: string,
  password: string
}
app.post('/token', async (req, res) => {
  const {email, password} = req.body as LoginBody;
  const user = await client.user.findFirst({
    where: {
      email,
    }
  })
  if (!user) {
    res.status(404).json({message: "invalid email or password"})
    return;
  }
  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    res.status(404).json({message: "invalid email or password"})
    return;
  }
  const token = jwt.sign({
    userId: user.id
  },
  process.env.ENCRYPTION_KEY!!,
  {
    expiresIn: '2m'
  })
  res.status(200).json({user, token});
});
const port = parseInt(process.env.PORT??'3000')
app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});