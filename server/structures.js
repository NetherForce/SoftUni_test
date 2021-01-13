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
    }
}
exports.Message = Message;

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
exports.UserInfo = UserInfo;

class User{
    constructor(id_, username_){
        this.id = id_;
        this.username = username_;
        this.roomIds = [];
        this.info;
    }
}
exports.User = User;