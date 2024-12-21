import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoutes from '../routes/AuthRoutes'
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import createError from 'http-errors'
import morgan from 'morgan'
import path from 'path';
import certificateroutes from '../routes/certificateroutes';

dotenv.config({})

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use('/certificates', express.static(path.join(__dirname, '../../assets/certificates')));
app.use('/api/certificates', certificateroutes);

app.get('/', (req: Request, res: Response) => {
  console.log(req.headers['authorization'])
  res.send('Hello, World! I am');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api/auth", AuthRoutes)

app.use(async (req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound())
})

app.use((err: Error & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500)
  res.send({
    error:{
      status: err.status || 500,
      message: err.message,
    },
  })
})


// const prisma = new PrismaClient()

// async function main() {
//     const newUser = await prisma.user.create({
//         data: {
//             email: "aarya@gmail.com",
//             password: "aarya1",
//             role: "TEACHER"
//         }
//     })

//     console.log("New user created: ", newUser)
// }

// main()
//     .catch((e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })
