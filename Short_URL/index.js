
const express = require('express');
const app = express();
const PORT = 8000;
const URL = require('./models/url');
const { connectMongoDB } = require('./connection');
const path = require('path');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/static');
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser')
const {restrictedToLoggedInUserOnly,checkAuth} = require('./middlewares/auth')
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectMongoDB()
  .then(() => {
    console.log("MongoDB connected, starting server...");
   
    app.use('/url',restrictedToLoggedInUserOnly, urlRoute);

    app.listen(PORT, () => {
      console.log("Server started at port", PORT);
    });
  })
  .catch(err => console.log("MongoDB connection failed:", err));

  app.set('view engine','ejs');
  app.set("views",path.resolve("./views"));


  app.get("/test",async(req,res)=>{
    const allUrls = await URL.find({});
    res.render("home",{
      urls:allUrls
    });
  })
  app.use('/',checkAuth,staticRoute);
  app.use('/user',userRoute);

  app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{$push:{
      visitHistory:{
        timestamp:Date.now()
      }
    }});
    res.redirect(entry.redirectURL);
  })


