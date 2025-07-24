require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6000
const db = require("./Config/database")
const cookieParser = require("cookie-parser")
const router = require("./Router/UserRoutes")
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://your-frontend.vercel.app"   // ✅ Production frontend domain
    : "http://localhost:5173",             // ✅ Local frontend domain (Vite or 3000 for CRA)
  credentials: true                        // ✅ Allow cookies and credentials
}));
app.use(cookieParser());
app.use("/api/v1",router);



db();
app.get("/",(req,res)=>res.send(`<h1>API Working</h1>`));


app.listen(port,()=>console.log(`Server is Running live at Port - ${port}`))