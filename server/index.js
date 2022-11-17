const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(cookieParser());
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, () => console.log("Connected to DB"));

const companyRoutes = require("./routes/company.routes");
const personRoutes = require("./routes/person.routes");
const s3Routes = require("./routes/s3.routes");
const jobRoutes = require("./routes/job.routes");

app.use("/company", companyRoutes);
app.use("/person", personRoutes);
app.use("/", s3Routes);
app.use("/job", jobRoutes);

app.listen(3000, () => console.log("Server is Running"));
