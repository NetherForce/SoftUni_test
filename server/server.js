const {app} = require("./server-main.js");
const port = 3000
const path = require("path");

var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://ruslan:hkl53dpf*q@77.77.151.91:5432/sample')

//get the structures
let structures = require("./structures.js");

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