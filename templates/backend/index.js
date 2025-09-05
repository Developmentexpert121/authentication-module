const express=require("express")
const mongoose=require("mongoose")
const dotenv =require("dotenv")
const authRoutes =require("./routers/authrouter")
const cors=require("cors")
dotenv.config(); 
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true,               
}));
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); 
  }
};

connectDB().then(() => {
  app.use(express.json());

    app.use("/api/auth", authRoutes);
    

  app.get("/", (req, res) => {
    res.send("Hello brother");
  });

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
