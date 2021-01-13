const {app} = require("./server-main.js");

//get the structures
let structures = require("./structures.js");

//function for comunication between server and data base

//========================= Nikola - Всчка функция ще връща или user, message, room etc. или грешка (ще трябва да обсъдим как да направим грешката). Всички функции ще трябва и да викат validateUser.

function validateUser(username, password){
    //validates that the username and the password match

    //========================= Nikola

    //връща true или false например (или грешка)
}

function newUser(username, password){
    //creates new user with set username and password if username is not already in use
    let user = new User();

    //========================= Nikola

    return user; //or error
}

function login(username, password){
    //returns the user whose usename and password were set as parameters if there is one
    let user = new User();

    //========================= Nikola

    return user; //or error
}

function loadUser(username, password, userId){
    //username and the password are the username and the password of the person that requests the change
    //userId - id of the user that you want to load (this function doesnt load the info of the user)

    let user = new User();

    //========================= Nikola

    return user; //or error
}

function loadUserInfo(username, password, userId){
    //username and the password are the username and the password of the person that requests the change
    //userId - id of the user whose info we want to load

    let userInfo = new UserInfo();

    //========================= Nikola

    return userInfo; //or error
}

function createRoom(username, password, memberIds){
    //username and the password are the username and the password of the person that requests the change
    //memberIds - ids of the members

    let room = new Room();

    //========================= Nikola

    return room; //or error
}

function loadRoom(username, password, roomId){
    //username and the password are the username and the password of the person that requests the change
    //roomId - id of the room that you want to load (This function doesnt load the messages or the members. Only their ids)

    let user = new User();

    //========================= Nikola

    return user; //or error
}

function addMemberToRoom(username, password, userId, roomId){
    //username and the password are the username and the password of the person that requests the change
    //userId - id of the user which we want to add to the room
    //roomId - id of the room we want to add the user to

    //========================= Nikola

    //връща true или false например (или грешка)
}

function removeMemberFromRoom(username, password, userId, roomId){
    //username and the password are the username and the password of the person that requests the change
    //userId - id of the user which we want to remove from the room
    //roomId - id of the room we want to add the user to

    //========================= Nikola

    //връща true или false например (или грешка)
}

function changeRoomName(username, password, newName, roomId){
    //username and the password are the username and the password of the person that requests the change
    //newName - the new name of the room
    //roomId - id of the room we want to add the user to

    //========================= Nikola

    //връща true или false например (или грешка)
}

function newMessage(username, password, roomId, message){
    //username and the password are the username and the password of the person that requests the change
    //messageId - id of the message we want to remove
    //roomId - id of the room we want the message to be added to
    //message - the content of the message we want to add

    //========================= Nikola

    //връща true или false например (или грешка)
}

function removeMessage(username, password, messageId, roomId){
    //username and the password are the username and the password of the person that requests the change
    //messageId - id of the message we want to remove
    //roomId - id of the room we want to add the user to

    //========================= Nikola

    //връща true или false например (или грешка)
}

function editMessage(username, password, messageId, newMessage){
    //username and the password are the username and the password of the person that requests the change
    //messageId - id of the message we want to remove
    //messageId - id of the message we want to edit
    //newMessage - the message we want the old message to become

    //========================= Nikola

    //връща true или false например (или грешка)
}