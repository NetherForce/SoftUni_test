const {app, express, pgp, db} = require("./server_main.js");
const port = 3000
const path = require("path");

//get the structures
let structures = require("./structures.js");

//get the database comunication functions
let dbFunctions = require("./databaseFunctions.js");

let user = new structures.User();
//dbFunctions.Log(user);

app.use(express.static('public'));
app.use(express.json());

//makes folder "client" accesable by client
app.use(express.static(path.join(__dirname, '/../client')));

let aws_crypto = require('@aws-crypto/client-node');
let CryptoJS = require('crypto-js');

const generatorKeyId = 'arn:aws:kms:eu-central-1:234133237098:alias/messages_key';
const keyIds = ['arn:aws:kms:eu-central-1:234133237098:key/81bbb404-3ce1-4d5c-92e8-81b5970a3219'];

//na survura trqbva da se kachat credentiali ~/.aws/credentials
const keyring = new aws_crypto.KmsKeyringNode({ generatorKeyId, keyIds });

const { encrypt, decrypt } = aws_crypto.buildClient(
  aws_crypto.CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
)
const context = {
  purpose: 'database encryption',
  origin: 'eu-central-1'
}

let key;

async function decryptKey(encryptedText) {
    try {
        const { plaintext, messageHeader } = await decrypt(keyring, encryptedText);
        return plaintext;
    } catch (err){
        console.log(err);
    }
};
function fromBytesToString(bytes) {
    let string = "";
    for (let i = 0; i < bytes.length; i++) {
        string+= String.fromCharCode(bytes[i]);
    }
    return string;
};
function encryptText(text) {
    return CryptoJS.AES.encrypt(text, key).toString();
};
function decryptText(text) {
    return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
};
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

    // receive and decrypt key
    db.any('SELECT * FROM encrypted_key')
    .then (function (result){
        key = result[0].key;
        decryptKey(key)
        .then (function (result) {
            key = fromBytesToString(result);
            console.log(encryptText("Obicham banani"));
            console.log(decryptText(encryptText("Obicham banani")));
        })
    });
})