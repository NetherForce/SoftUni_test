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
}
exports.Room = Room;

class Message{
    constructor(){
        this.sentById;
        this.sendByName;
        this.content;
        this.date;
        this.time;
        this.roomId;
    }
}
exports.Message = Message;

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
exports.UserInfo = UserInfo;

class User{
    constructor(){
        this.id;
        this.username;
        this.roomIds = [];
        this.info; //userInfo
    }
}
exports.User = User;

class dbReturn{
    constructor(){
        this.success; //boolean if the database operation was a success
        this.error; //this is a string that shows the client what he did wrong
        this.object; //a class of the wanted information (User, Message/s, Room)
    }
}
exports.dbReturn = dbReturn;