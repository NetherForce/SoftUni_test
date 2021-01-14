const {app, express, pgp, db} = require("./server_main.js");

//get the structures
let structures = require("./structures.js");

//function for comunication between server and data base

function newUser(username, password){
    //creates new user with set username and password if username is not already in use
    let user = new User();

    //========================= Nikola

    return user; //or error
}
exports.newUser = newUser;

function login(username, password){
    //returns the user whose usename and password were set as parameters if there is one
    let user = new User();

    //========================= Nikola

    return user; //or error
}
exports.login = login;

function loadUser(userId){
    //userId - id of the user that you want to load (this function doesnt load the info of the user)

    let user = new User();

    //========================= Nikola

    return user; //or error
}
exports.loadUser = loadUser;

function loadUserInfo(userId){
    //userId - id of the user whose info we want to load

    let userInfo = new UserInfo();

    //========================= Nikola

    return userInfo; //or error
}
exports.loadUserInfo = loadUserInfo;

function createRoom(userId, memberIds){
    //userId - id of the user whose creates the room
    //memberIds - ids of the members

    let room = new Room();

    //========================= Nikola

    return room; //or error
}
exports.createRoom = createRoom;

function loadRoom(roomId){
    //roomId - id of the room that you want to load (This function doesnt load the messages or the members. Only their ids)

    let user = new User();

    //========================= Nikola

    return user; //or error
}
exports.loadRoom = loadRoom;

function addMemberToRoom(userId, memberId, roomId){
    //userId - id of the user who requests the change
    //memberId - id of the user which we want to add to the room
    //roomId - id of the room we want to add the user to

    //========================= Nikola

    //връща true или false например (или грешка)
}
exports.addMemberToRoom = addMemberToRoom;

function removeMemberFromRoom(userId, memberId, roomId){
    //userId - id of the user who requests the change
    //memberId - id of the user which we want to remove from the room
    //roomId - id of the room we want to add the user to

    //========================= Nikola

    //връща true или false например (или грешка)
}
exports.removeMemberFromRoom = removeMemberFromRoom;

function changeRoomName(userId, newName, roomId){
    //userId - id of the user who requests the change
    //newName - the new name of the room
    //roomId - id of the room we want to add the user to

    //========================= Nikola

    //връща true или false например (или грешка)
}
exports.changeRoomName = changeRoomName;

function newMessage(userId, roomId, message){
    //userId - id of the user who wants to send the message
    //messageId - id of the message we want to remove
    //roomId - id of the room we want the message to be added to
    //message - the content of the message we want to add

    //========================= Nikola

    //връща true или false например (или грешка)
}
exports.newMessage = newMessage;

function removeMessage(userId, messageId, roomId){
    //userId - id of the user who wants to delete the message
    //messageId - id of the message we want to remove
    //roomId - id of the room we want to add the user to

    //========================= Nikola

    //връща true или false например (или грешка)
}
exports.removeMessage = removeMessage;

function editMessage(userId, messageId, newMessage){
    //userId - id of the user who wants to edit the message
    //messageId - id of the message we want to remove
    //messageId - id of the message we want to edit
    //newMessage - the message we want the old message to become

    //========================= Nikola

    //връща true или false например (или грешка)
}
exports.editMessage = editMessage;