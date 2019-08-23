const express       = require('express')
const session       = require('express-session');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser')
const cors          = require('cors');
const mongoose      = require('mongoose');
require('dotenv').config()
const app = express();

//ADD SESSION SETTINGS HERE:
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
})); 


app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect(`${process.env.DB}`, {useNewUrlParser: true})
.then((x)=>{
  console.log(`Connection to MongoDB, database name is ${x.connections[0].name}`);
})
.catch((err)=>{console.error(err)})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connection to DB successful')
});

// ROUTES MIDDLEWARE STARTS HERE:
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/auth-routes'));
app.use('/api/countries', require('./routes/country-routes'))
app.listen(process.env.LOCALPORT, ()=> console.log('Back end server running on port', process.env.LOCALPORT))