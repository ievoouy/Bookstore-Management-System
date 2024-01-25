import express, { response } from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling cors(cross origin resourse sharing)
app.use(cors());
/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET','POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)*/

app.get('/', (req,res) => {
    res.status(200).send('Mern Project Bookstore');
});


app.use('/books',booksRoute);

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`server listening to port ${PORT}`);
    });
})
.catch((err) => {
    console.log(err);
})
