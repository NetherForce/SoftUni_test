let express = require("express");
let app = express();

var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://ruslan:hkl53dpf*q@77.77.151.91:5432/Softuni')

exports.express = express;
exports.app = app;

exports.pgp = pgp;
exports.db = db;