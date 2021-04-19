const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
const communities = require('./routes/communities');
const home = require('./routes/home');
const register = require('./routes/register');
const therapy = require('./routes/therapy');
const post = require('./routes/posts');
const auth = require('./routes/auth');

dotenv.config();

app.set('view engine', 'pug');  
app.set('views', './views');

app.use(express.json());
app.use(cors());

app.use('/register', register);
app.use('/', home);
app.use('/communities', communities);
app.use('/therapy', therapy);
app.use('/post', post);
app.use('/auth', auth);

mongoose.connect('mongodb://localhost/mysite', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Not connected to mongodb', err));

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}...`);
});