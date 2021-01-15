var socket = io();

function updateObj(obj1, obj2){
    //this function makes the values of obj1 equal to the values of onj2
    for (const [key, value] of Object.entries(obj2)) {
        obj1[key] = value;
    }
}


//classes that describe the rooms and users

class Room{
    constructor(){
        this.id;
        this.name = null; //The name of the group. If null, then use the name of the first member, who is not the currently logged one.
        this.brMembers;
        this.memberIds = [];
        this.brMessages;
        this.messageIds = [];
        this.hasNewMessages = false;
        //this.notLoadedMessageIds = [];
    }
}

class Message{
    constructor(){
        this.id;
        this.sentById;
        this.sendByName;
        this.content;
        this.date;
        this.time;
    }
}

class UserInfo{
    constructor(){
        this.firstName;
        this.lastName;
        this.registrDate;
        this.loginCount;
        this.lastLogin;
        this.friendIds = [];
        //this.profilePicture = new Image();
        //this.profilePictureSrc;
    }
}

class User{
    constructor(){
        this.id;
        this.username;
        this.roomIds = [];
        this.info;
    }
}

var user; //the current logged user
var loadedUsers = {}; //object of users that have already been loaded | access a user: loadedUsers[the user id]
var loadedRooms = {}; //the same as the users, but for the rooms
var loadedMessages = {}; //the same as the users, but for the messages

var sessionId; //id of the seesion we connect to



//functions for comunication with the server
function register(username, password){
	$.ajax("/createUser", {
		data: JSON.stringify({sessionId: sessionId, username: username, password: password}),
		method: "POST",
		contentType: "application/json",
		success: function(response, textStatus, jqXHR) {			
			console.log(response);
			if(response.success) {
                user = new User();
                updateObj(user, response.object);
                loadedUsers[user.id] = user;
                sessionId = response.sessionId;
                socket.emit('allthenticate', {sessionId: sessionId});
                console.log(sessionId);
        
            } else {
                alert(response.error);
                //Error
            }
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}		
	});
}

function login(username, password){
	$.ajax("/login", {
		data: JSON.stringify({sessionId: sessionId, username: username, password: password}),
		method: "POST",
		contentType: "application/json",
		success: function(response, textStatus, jqXHR) {			
			console.log(response);
			if(response.success) {
                user = new User();
                updateObj(user, response.object);
                loadedUsers[user.id] = user;
                user.password = password;
                sessionId = response.sessionId;
                socket.emit('allthenticate', {sessionId: sessionId});
                console.log(sessionId);
            } else {
                alert(response.error);
                //Error
                //not finished
            }
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}		
	});
}


function getUser(userId){
	$.ajax("/getUser", {
		data: JSON.stringify({sessionId: sessionId, userId: userId}),
		method: "POST",
		contentType: "application/json",
		success: function(response, textStatus, jqXHR) {			
			console.log(response);
			if(response.success) {
                let newUser = new User();
                updateObj(newUser, response.object);
                loadedUsers[userId] = newUser;
			}
			else {
				alert(response.error);
                //Error
                //not finished
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}		
	});
}

function getUserInfo(userId){
	$.ajax("/getUserInfo", {
		data: JSON.stringify({sessionId: sessionId, userId: userId}),
		method: "POST",
		contentType: "application/json",
		success: function(response, textStatus, jqXHR) {			
			console.log(response);
			if(response.success) {
                if(!loadedUsers[userId]){
                    getComputedStyle(userId);
                }
                let newUserInfo = new UserInfo();
                updateObj(newUserInfo, response.object);
                loadedUsers[userId].info = newUserInfo;
			}
			else {
				alert(response.error);
                //Error
                //not finished
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}		
	});
}



//functions for comunication with sockets
function getRoom(roomId){
    socket.emit('getRoom', {sessionId: sessionId, roomId: roomId});
}

function getMessage(messageId){
    socket.emit('getMessage', {sessionId: sessionId, messageId: messageId});
}

function createRoom(memberIds){
    socket.emit('createRoom', {sessionId: sessionId, memberIds: memberIds});
}

function addMemberToRoom(memberId, roomId){
    socket.emit('addMemberToRoom', {sessionId: sessionId, memberId: memberId, roomId: roomId});
}

function removeMemberFromRoom(memberId, roomId){
    socket.emit('removeMemberFromRoom', {sessionId: sessionId, memberId: memberId, roomId: roomId});
}

function changeRoomName(roomId, newName){
    socket.emit('changeRoomName', {sessionId: sessionId, roomId: roomId, newName: newName});
}

function newMessage(messageContent, roomId){
    socket.emit('newMessage', {sessionId: sessionId, messageContent: messageContent, roomId: roomId});
}

function removeMessage(messageId){
    socket.emit('removeMessage', {sessionId: sessionId, messageId: messageId, roomId: roomId});
}

function editMessage(messageId, newMessage){
    socket.emit('editMessage', {sessionId: sessionId, messageId: messageId, roomId: roomId, newMessage: newMessage});
}

function changeMyUsername(newUsername){
    socket.emit('changeUsername', {sessionId: sessionId, newUsername: newUsername});
}

function changeMyPassword(oldPassword, newUsername){
    socket.emit('changePassword', {sessionId: sessionId, oldPassword: oldPassword, newUsername: newUsername});
}

function changeMyInfo(infoParameter, newInfo){
    socket.emit('changeInfo', {sessionId: sessionId, infoParameter: infoParameter, newInfo: newInfo});
}



//listen with sockets for server
socket.on('error', (msg) => {
    let response = JSON.parse(msg);

    alert(response);
});


socket.on('receivedRoom', (msg) => {
    let response = JSON.parse(msg);

    let newRoom = new Room();
    updateObj(newRoom, response.object);
    loadedRooms[roomId] = newRoom;
});

socket.on('receivedMessage', (msg) => {
    let response = JSON.parse(msg);

    let newMessage = new Message();
    updateObj(newMessage, response);
    loadedMessages[newMessage.id] = newMessage;
    if(!loadedRooms[newMessage.roomId]){
        getRoom(newMessage.roomId);
    }else{
        loadedRooms[newMessage.roomId].messageIds[loadedRooms[newMessage.roomId].brMessages] = newMessage.id;
        loadedRooms[newMessage.roomId].brMessages++;
    }
});

socket.on('addedMemberToRoom', (msg) => {
    let response = JSON.parse(msg);

    if(!loadedRooms[response.roomId]){
        getRoom(roomId);
    }else{
        loadedRooms[response.roomId].memberIds[loadedRooms[response.roomId].brMembers] = response.userId;
        loadedRooms[response.roomId].brMembers++;
    }

});

socket.on('removedMemberFromRoom', (msg) => {
    let response = JSON.parse(msg);
    let userId = response.userId;
    let roomId = response.roomId;

    if(!loadedRooms[roomId]){
        getRoom(roomId);
    }else{
        for(let i = 0; i < loadedRooms[roomId].brMembers; i++){
            if(loadedRooms[roomId].memberIds[i] == userId){
                loadedRooms[roomId].memberIds[i] = loadedRooms[roomId].memberIds[loadedRooms[roomId].brMembers-1];
                loadedRooms[roomId].brMembers--;
            }
        }
    }
});

socket.on('changedRoomName', (msg) => {
    let response = JSON.parse(msg);\
    let roomId = response.roomId;
    let newName = response.newName;

    if(!loadedRooms[roomId]){
        getRoom(roomId);
    }else{
        loadedRooms[roomId].name = newName;
    }
});

socket.on('removedMessage', (msg) => {
    let response = JSON.parse(msg);
    let roomId = response.roomId;
    let messageId = response.messageId;

    if(!loadedRooms[roomId]){
        getRoom(roomId);
    }else{
        for(let i = 0; i < loadedRooms[roomId].brMessages; i++){
            if(loadedRooms[roomId].messageIds[i] == messageId){
                loadedRooms[roomId].messageIds[i] = loadedRooms[roomId].messageIds[loadedRooms[roomId].brMessages-1];
                loadedRooms[roomId].brMessages--;
            }
        }
        if(loadedMessages[messageId]){
            loadedMessages[messageId] = null;
        }
    }
});

socket.on('editedMessage', (msg) => {
    let response = JSON.parse(msg);
    let messageId = response.messageId;
    let newMessage = response.newMessage;

    if(loadedMessages[messageId]){
        loadedMessages[messageId].content = newMessage;
    }else{
        getMessage(messageId);
    }
});

socket.on('changedUsername', (msg) => {
    let response = JSON.parse(msg);

    user.username = response.newusername;
});

socket.on('changedPassword', (msg) => {
    let response = JSON.parse(msg);

    alert(response.message);
});

socket.on('changedInfo', (msg) => {
    let response = JSON.parse(msg);

    if(user.info){
        user.info[response.infoParameter] = response.newInfo;
    }else{
        getUserInfo(user.id);
    }
});

register("asdf", "asdf");