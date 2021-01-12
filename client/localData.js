class Room{
    constructor(){
        this.id;
        this.name = null; //името на първият човек, който не си ти
        this.memberIds = [];
        this.messageIds = [];
    }
}

class Message{
    constructor(){
        this.sentBy;
        this.content;
        this.date;
        this.time;
    }
}

class User(){
    constructor(){
        this.id;
        this.name;
        this.roomIds = [];
    }
}