const {app, express, pgp, db} = require("./server_main.js");
const port = 3000
const path = require("path");

//get the structures
let structures = require("./structures.js");

//get the database comunication functions
let dbFunctions = require("./databaseFunctions.js");

let user = new structures.User();
dbFunctions.Log(user);

app.use(express.static('public'));
app.use(express.json());

//makes folder "client" accesable by client
app.use(express.static(path.join(__dirname, '/../client')));


//process the requests that the client sends

app.post('/createUser', (req, res) => {
	//console.log(req.body);
	if(!req.body.username || (req.body.username.length > 16)) {
		res.json({success:false, error:"Too long username!"});
		return;
	}
    
    //not finished
 
});

app.post('/login', (req, res) => {
	//console.log(req.body);
	if(!req.body.username || (req.body.username.length > 16)) {
		res.json({success:false, error:"Too long username!"});
		return;
	}
    
    //not finished
 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})