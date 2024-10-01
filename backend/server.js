const express = require('express');
const bodyParsser = require('body-parser');
const cors = require('cors');
const connectDB = require("./config/db");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(bodyParsser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

//routes
app.use('/', productRoute);
app.use('/', userRoute);

//connect database
connectDB().then (() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});