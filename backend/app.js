const express = require('express');
const path = require('path');// its used 
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Query = require('./models/query');
const queriesRoutes = require('./routes/queries');
const commentsRoutes = require('./routes/comments');
const userRoutes = require('./routes/user');

const app = express();


//VimrnjIgV24k7zv5
mongoose.connect("mongodb+srv://nitin:VimrnjIgV24k7zv5@cluster0-3nmhc.mongodb.net/askanything?retryWrites=true", { useCreateIndex: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected to the Database");
    })
    .catch(() => {
        console.log("Failed to connect with the database");
    });


app.set('port', 15000);//set is use to set the environment for express 

app.use(bodyParser.json());// bodyParser.json() return a fucntion which to app.use which acts as a middleware.


app.use((req, res, next) => {
    res.setHeader("Access-Control-ALlow-Origin", "*");//this will any domain to access the resource
    res.setHeader("Access-Control-ALlow-Headers", "Acess-Control-*,Origin,X-Requested-With,Content-Type,Accept,Authorization");//which header can request to the server

    res.setHeader("Access-Control-ALlow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS,HEAD");

    res.setHeader("Access-Control-Allow-Credentials", "true");


    res.setHeader("Access-Control-Expose-Headers", "Access-Control-*")

    res.setHeader('Allow', 'GET, POST,PATCH, PUT, DELETE, OPTIONS, HEAD');
    next();
});

app.use("/api/questions", queriesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comments", commentsRoutes);


module.exports = app; 