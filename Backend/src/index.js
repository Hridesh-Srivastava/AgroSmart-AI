import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
});

app.on("error" , (error) => {
    console.error("ERROR: ", error);
    throw error
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port ${process.env.PORT}`); 
    });
})
.catch((err) => {
    console.error("MongoDB connection failed!",err);
})