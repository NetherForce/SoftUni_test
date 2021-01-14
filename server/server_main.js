let express = require("express");
let app = express();

var pgp = require('pg-promise')(/* options */);
var db = pgp('postgres://ruslan:hkl53dpf*q@77.77.151.91:5432/sample');
let session = require('express-session');

var http = require('http').createServer(app);
var io = require('socket.io')(http);
//var CryptoJS = require('crypto-js'); //librari for encryption

exports.express = express;
exports.app = app;

exports.pgp = pgp;
exports.db = db;

exports.sessino = session;