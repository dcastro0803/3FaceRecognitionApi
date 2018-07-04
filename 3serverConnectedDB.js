/*
After server StandAlone connect with Database 
	Use knex or other

req.body is user input send from FrontEnd in JSON

*/ 

const express = require('express');
const app = express(); 
const bodyParser = require('body-parser'); // translate JSON in middleware
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//Middleware transform data to JSON before processing
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});

db.select('*').from('users') 



// RESTFUL Functions
app.get('/', (req, res) =>{
	res.send('it is working');
})

// CLEANER WAY 
//POST send data verify logIn
// requires insert user and grab password
// req.body.password = user input sent from FrontEnd
app.post('/signIn', signIn.handleSignIn(db,bcrypt)) 

// POST: Add new user to DB
// Get hash to add also in login table with transaction use trx instead db
// Pass function from Controllers 
app.post('/register', (req, res) => {register.handleRegister(req,res,db,bcrypt)})

// GET: retrieve information user
// params get the url 
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

// PUT: update # of images 
// body get JSON 
app.put('/image', (req,res) => {image.handleImagePut(req,res, db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running on ${process.env.PORT}`);
})

/*
DESIGN 
/ --> res = this is working 
/signIn --> POST "send password hidden https" = success / failure 
/register --> POST = user object
/profile/:userId --> GET = user 
/image --> PUT --> user 

*/

