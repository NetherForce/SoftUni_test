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
        //this.notLoadedMessageIds = [];
    }
    addMember(memberId){
        //not finished
    }
    removeMember(memberId){
        //not finished
    }
    changeName(newName){
        //not finished
    }
    removeMessage(messageId){
        //not finished
    }
}

class Message{
    constructor(){
        this.sentById;
        this.sendByName;
        this.content;
        this.date;
        this.time;
    }
    edit(newMessage){
        //not finished
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
    changeUsername(newUsername){
        //not finished
    }
    changePassword(newPassword){
        //not finished
    }
    changeInfo(infoParameter, newValue){
        //not finished
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
		data: JSON.stringify({username: username, password: password}),
		method: "POST",
		contentType: "application/json",
		success: function(response, textStatus, jqXHR) {			
			console.log(response);
			if(response.success) {
                user = new User();
                updateObj(user, response.object);
                user.password = password;
                sessionId = response.sessionId;
                socket.emit('allthenticate', {sessionId: sessionId});
                console.log(sessionId);

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

function login(username, password){
	$.ajax("/login", {
		data: JSON.stringify({username: username, password: password}),
		method: "POST",
		contentType: "application/json",
		success: function(response, textStatus, jqXHR) {			
			console.log(response);
			if(response.success) {
                user = new User();
                updateObj(user, response.object);
                user.password = password;
                sessionId = response.sessionId;
                socket.emit('allthenticate', {sessionId: sessionId});
                console.log(sessionId);
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

createUser("asdf", "asdf1");