import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling cors policy
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors())

// //Option 2: Allow custom origins
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
// }))

app.use("/books", booksRoute)

app.get('/', (request, response)=> {
    console.log(request)
    return response.status(234).send("Voila with Active Reloading")
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database")
        app.listen(PORT, () => {
            console.log('Connected')
        });  
    }) 
    .catch((error) => {
        console.error(error)
    })
