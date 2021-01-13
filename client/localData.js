//classes that describe the rooms and users

class Room{
    constructor(){
        this.id;
        this.name = null; //името на първият човек, който не си ти
        this.memberIds = [];
        this.messages = [];
        this.notLoadedMessageIds = [];
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
}

class UserInfo{
    constructor(){
        this.name;
        this.middleName;
        this.lastName;

        this.friendIds = [];
        //this.profilePicture = new Image();
        //this.profilePictureSrc;

    }
}

class User{
    constructor(){
        this.id;
        this.roomIds = [];
        this.info;
    }
}



//functions for comunication with the server

function createUser(username, password){
	$.ajax("/createUser", {
		data: JSON.stringify({username: username, password: password}),
		method: "POST",
		contentType: "application/json",
		success: function(response, textStatus, jqXHR) {			
			console.log(response);
			if(response.success) {
				//OK
			}
			else {
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