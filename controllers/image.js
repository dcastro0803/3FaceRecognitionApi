const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.API_CLARIFAI
});

const handleApiCall = (req, res) => {
	app.models.predict( "a403429f2ddf4b49b307e318f00e528b", req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('Unable to Work with API'))
}

// PUT: update # of images 
// body get JSON 
const handleImagePut = (req,res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Error Get Entries'))
}

module.exports = {
	handleImagePut: handleImagePut,
	handleApiCall: handleApiCall
}
