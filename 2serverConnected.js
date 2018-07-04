/*
First try with POSTMAN and internal Database "Variable"
Second = Connect with Front-END,
	Changes are generally in FrontEnd, not here
	REST roots can change 

*/

const express = require('express');
const app = express(); 
const bodyParser = require('body-parser'); // translate JSON in middleware
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); 

//Middleware
app.use(bodyParser.json());
app.use(cors());

// Now use var as DB to test 
const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0, 
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0, 
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req, res) =>{
	res.send(database.users);
})

//POST send data verify logIn  
app.post('/signIn', (req, res) => {
	if(req.body.email === database.users[0].email 
		&& req.body.password === database.users[0].password){
		res.json(database.users[0]);
	} else {
		res.status(400).json('Error Logging In')
	}
})

// POST: Add new user to DB 
app.post('/register', (req, res) => {
	const {email, password, name} = req.body
	console.log(req.body)
	database.users.push({
		id: '125',
		name: name,
		email: email,
		entries: 0, 
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})
// params get the url 
app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false; 
	console.log(req.params.id);
	database.users.forEach(user => { 
		if (user.id === id){
			found = true
			return res.json(user)
		}
	});
	if(!found){
		 res.status(404).json('no such user');
	}
});

// body get JSON 
app.put('/image', (req,res) => {
	const { id } = req.body;
	let found = false; 
	console.log(req.body.id);
	database.users.forEach(user => { 
		if (user.id === id){
			found = true
			user.entries++;
			return res.json(user.entries)
		}
	});
	if(!found){
		 res.status(404).json('no found');
	}
})

app.listen(3000, () => {
	console.log('App is running on 3000');
})

/*
DESIGN 
/ --> res = this is working 
/signIn --> POST "send password hidden https" = success / failure 
/register --> POST = user object
/profile/:userId --> GET = user 
/image --> PUT --> user 

*/

