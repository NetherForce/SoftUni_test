const express = require('express')
const app = express()
const port = 3000

var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://ruslan:hkl53dpf*q@77.77.151.91:5432/sample')

app.use(express.static('public'));
app.use(express.json());

app.get('/', function(req, res){
    res.sendfile('index.html', { root: __dirname + "../client" } );
});

/*app.get('/', (req, res) => {
	db.any('SELECT username, password FROM sys_user')
		.then(function (data) {
			var html = "<html><body>";
			for(var i = 0; i < data.length; i++) {
				var item = data[i];
				html += "<b>" + item.username + "</b> : " + item.password + "<br />";
			}
			html += "</body></html>";
		res.send(html);
	})
	.catch(function (error) {
		console.log('ERROR:', error);
	})
 
})*/

app.post('/createUser', (req, res) => {
	console.log(req.body);
	if(!req.body.username || (req.body.username.length > 16)) {
		res.json({success:false, error:"Too long username!"});
		return;
	}
	db.none('INSERT INTO sys_user (username, password, registration_date, login_count) VALUES ($1, $2, date \'2020-12-05\', 1)', [req.body.username, req.body.password])
	.then(function (data) {
		console.log(data);
		res.json({success:true});
	})
	.catch(function (error) {
		console.log(error);
		res.json({success:false});
	})
 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})