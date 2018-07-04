

// GET: retrieve information user
// params get the url 
const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	db.select('*').from('users').where({id: id})
	.then(user => {
		// catch doesn't work with empty array 
		(user.length) ? res.json(user[0]) : res.status(400).json('Not found')
	}).catch( err => res.status(400).json('Error Getting User'))
};

module.exports = {
	handleProfileGet: handleProfileGet
}
