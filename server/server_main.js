let express = require("express");
let app = express();

var pgp = require('pg-promise')(/* options */);
var db = pgp('postgres://ruslan:hkl53dpf*q@77.77.151.91:5432/Softuni');
let session = require('express-session');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

let aws_crypto = require('@aws-crypto/client-node');
let CryptoJS = require('crypto-js');

exports.express = express;
exports.app = app;

exports.pgp = pgp;
exports.db = db;

exports.session = session;
exports.io = io;
exports.aws_crypto = aws_crypto;
exports.CryptoJS = CryptoJS;