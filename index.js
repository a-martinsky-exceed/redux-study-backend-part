const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/router');
const app = express();
const mongoose = require('mongoose');
let todo_db = 'mongodb://127.0.0.1:27017/articles_test';
mongoose.connect(todo_db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/articles', router);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
