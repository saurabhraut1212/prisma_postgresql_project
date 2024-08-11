import express from "express";
import dotenv from "dotenv";
import UserRoute from "./routes/userRoute.js"

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    return res.send("Server started");
})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/api", UserRoute)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})