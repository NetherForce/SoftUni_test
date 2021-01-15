const {app, express, pgp, db} = require("./server_main.js");

//get the structures
let structures = require("./structures.js");

//function for comunication between server and data base

async function newUser(username, password){
    let returnV = new structures.dbReturn()
    let user = new structures.User();
    let userInfo = new structures.UserInfo();
    let date = new Date()
    let id

    try {
        if((await db.any('Select username FROM \"user\" WHERE username = $1', [username])).length>0){
            returnV.success = false
            returnV.error = "This username is already taken"
            //console.log("This username is already taken")
        }else {
            var rows = await db.any("INSERT INTO \"user\" (id, username, password) VALUES (nextval('ids'), $1, $2) RETURNING id", [username,password])
            id = rows[0].id
            await db.any('INSERT INTO user_info (id, login_count, registration_date) VALUES($1, $2, $3)',  [id, '0', date])
            returnV.success = true
            user.username = username
            user.id = id
            returnV.object = user
        }
    } 
    catch (error) {
        returnV.success = false
        returnV.error = error
        console.log(error)
    }
    
    return returnV;
}
exports.newUser = newUser;

async function loadUser(userId){
    //userId - id of the user that you want to load (this function doesnt load the info of the user)
    let returnV = new structures.dbReturn()
    let user = new structures.User();

    try {
        var rows = await db.any('Select * FROM \"user\" WHERE id = $1', [userId])
        user = rows[0]
        returnV.success = true
        returnV.object = user
    } 
    catch (error) {
        returnV.success = false
        returnV.error = error
        console.log(error)
    }
    
    return returnV; //use loadUser(userId).object to get user
}
exports.loadUser = loadUser;

async function loadUserInfo(userId){
    //userId - id of the user whose info we want to load
    let returnV = new structures.dbReturn()
    let userInfo = new structures.UserInfo();

    try {
        var rows = await db.any('Select * FROM user_info WHERE id = $1', [userId])
        userInfo = rows[0]
        returnV.success = true
        returnV.object = userInfo
    } 
    catch (error) {
        returnV.success = false
        returnV.error = error
        console.log(error)
    }
    
    console.log(returnV)
    return returnV; //use loadUserInfo(userId).object to get userInfo
}
exports.loadUserInfo = loadUserInfo;

async function login(username, password){
    let returnV = new structures.dbReturn()
    let checkUsername
    let checkPassword
    let id
    let last_login = new Date();
    let login_count

    try {
        var rows = await db.any('Select id, username, password FROM \"user\" WHERE username = $1', [username])
        var login_count_rows
        checkUsername = rows[0].username
        checkPassword = rows[0].password
        if(username == checkUsername && password == checkPassword){
            returnV.success = true
            id = rows[0].id
            login_count_rows = await db.any('Select login_count FROM user_info WHERE id = $1', [id])
            login_count = login_count_rows[0].login_count + 1
            await db.any('UPDATE user_info SET last_login=$1, login_count=$2 WHERE id=$3', [last_login, login_count, id])
            loadUser(id)
            .then(function(result){
                returnV.object = result.object
                return returnV;
            })
        }else{
            returnV.success = false
            returnV.object = "Incorrect username or password"
            //console.log("Incorrect username or password")
        }
    } 
    catch (error) {
        returnV.success = false
        returnV.error = error
        console.log(error)
    }
}
exports.login = login;

async function createRoom(userId, memberIds){
    //userId - id of the user whose creates the room
    //memberIds - ids of the members

    let room = new structures.Room();

    

    return room; //or error
}
exports.createRoom = createRoom;

async function loadRoom(roomId){
    //roomId - id of the room that you want to load (This function doesnt load the messages or the members. Only their ids)

    let user = new structures.User();

    

    return user; //or error
}
exports.loadRoom = loadRoom;

async function addMemberToRoom(userId, memberId, roomId){
    //userId - id of the user who requests the change
    //memberId - id of the user which we want to add to the room
    //roomId - id of the room we want to add the user to

    

    //връща true или false например (или грешка)
}
exports.addMemberToRoom = addMemberToRoom;

async function removeMemberFromRoom(userId, memberId, roomId){
    //userId - id of the user who requests the change
    //memberId - id of the user which we want to remove from the room
    //roomId - id of the room we want to add the user to


    //връща true или false например (или грешка)
}
exports.removeMemberFromRoom = removeMemberFromRoom;

async function changeRoomName(userId, newName, roomId){
    //userId - id of the user who requests the change
    //newName - the new name of the room
    //roomId - id of the room we want to add the user to


    //връща true или false например (или грешка)
}
exports.changeRoomName = changeRoomName;

async function newMessage(userId, roomId, message){
    //userId - id of the user who wants to send the message
    //messageId - id of the message we want to remove
    //roomId - id of the room we want the message to be added to
    //message - the content of the message we want to add


    //връща true или false например (или грешка)
}
exports.newMessage = newMessage;

async function removeMessage(userId, messageId, roomId){
    //userId - id of the user who wants to delete the message
    //messageId - id of the message we want to remove
    //roomId - id of the room we want to add the user to


    //връща true или false например (или грешка)
}
exports.removeMessage = removeMessage;

async function editMessage(userId, messageId, newMessage){
    //userId - id of the user who wants to edit the message
    //messageId - id of the message we want to remove
    //messageId - id of the message we want to edit
    //newMessage - the message we want the old message to become


    //връща true или false например (или грешка)
}
exports.editMessage = editMessage;