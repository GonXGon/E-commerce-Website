const express = require('express');
const bodyParsser = require('body-parser');
const cors = require('cors');
const connectDB = require("./config/db");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(bodyParsser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://e-commerce-website-gamma-henna.vercel.app/'], // Add both your local and deployed frontend origins
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
app.use('/', productRoute);
app.use('/', userRoute);
app.use('/', cartRoute);

//connect database
if (process.env.NODE_ENV !== 'production') {  // Only listen locally, not in Vercel
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
}

module.exports = app;