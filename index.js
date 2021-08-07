let PORT = process.env.PORT || 8800;

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const userRoute = require('./routes/users');
const pinRoute = require('./routes/pins');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{ 
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
    })
    .then(() => {
    console.log("MongoDB Connected!")
}).catch(err => console.log(err))

app.use("/users",userRoute);
app.use("/pins", pinRoute);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'/client/build')))
    app.get('*',(req,res) => {
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}
else {
    app.get('/',(req,res) => {
        res.send('App Load Successful!');
    })
}

app.listen(PORT,() => {
    console.log("Server Started");
})