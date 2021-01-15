const {app, express, pgp, db, session, io} = require("./server_main.js");
const port = 3000
const path = require("path");

//get the structures
let structures = require("./structures.js");

//get the database comunication functions
let dbFunctions = require("./databaseFunctions.js");

app.use(express.static('public'));
app.use(express.json());

//makes folder "client" accesable by client
app.use(express.static(path.join(__dirname, '/../client')));

//add sessions
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false } // сложи го на true когато пуснем https-а
}))


//variables
let userIdToSockets = {}; //from user id to socket array

//process the requests that the client sends

app.post('/createUser', (req, res) => {
	//console.log(req.body);
	if(!req.body.username || (req.body.username.length > 16)) {
		res.json({success:false, error:"Too long username!"});
		return;
	}
    
	let dbReturn = dbFunctions.newUser(req.username, req.password);
	if(dbReturn.success){
		req.session.userId = dbReturn.object.id;
		dbReturn.sessionId = req.session.id;
	}
	res.json(dbReturn);
 
});

app.post('/login', (req, res) => {
	//console.log(req.body);
	if(!req.body.username || (req.body.username.length > 16)) {
		res.json({success:false, error:"Too long username!"});
		return;
	}
    
    //not finished
 
});

//socket comunication

io.on('connection', (socket) => {
	socket.on('allthenticate', (msg) => {
		msg = JSON.parse(msg);

		store.get(msg.sessionId, (error, session) => {
			if(session.userId){
				if(userIdToSockets[session.userId]){
					userIdToSockets[session.userId].push(socket);
				}else{
					userIdToSockets[session.userId] = [];
					userIdToSockets[session.userId].push(socket);
				}
			}
		});
	});
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})