//a=require('fs/promises');
a=require("fs").promises;
d=require('./Dates');

function User(first, last, mail, password, date) {  
    this.firstName = first;
    this.lastName = last;
    this.mail=mail;
    this.password=password;
    this.dateOfEnter=date;
}
    
function creatArray(){
    var users=[];
    var user1 = new User("Chaim", "Cohen", "c@gmail", 111111,new Date());
    var user2 = new User("Meir", "Levi", "m@gmail", 222222,new Date());
    var user3 = new User("Dan", "Fridman", "d@gmail", 333333,new Date());
    var user4 = new User("Moshe", "Tzadok", "mt@gmail", 444444,new Date());
    var user5 = new User("Aharon", "Turchin", "a@gmail", 5555555,new Date());
    users.push(user1);
    users.push(user2);
    users.push(user3);
    users.push(user4);
    users.push(user5);
    return users;
}

function writeToFile(array){
    a.writeFile('./Users.json', array, 'utf8', (err)=>{
        if (err) throw err;
    });
}

function login(mail, pass){
    return new Promise((res, rej)=>{
        var arrOfusers=[];
        a.readFile('./Users.json', (err)=>{
            if (err) throw err;
            
        }).then(val=>{
            arrOfusers=JSON.parse(val);
            arrOfusers.forEach(u=>{
                if(u.mail==mail && u.password==pass){
                    console.log(u);
                    let dd=new d.ConvertionDate(u.dateOfEnter);
                    console.log("last Date: "+dd.shortDate());
                    u.dateOfEnter=new Date(2000,12,17);
                    writeToFile(JSON.stringify(arrOfusers));
                    res(u);   
                }
                else{
                    rej(u);
                }
            });
        })
        // .catch(error=>rej(':(',error))
    })
}
function postUser(User){
    //lesson 5
    //יש מצב שכדאי לשנות את זה שיכתוב רק את המשתמש ולא את כל המערך
    return new Promise((res, rej)=>{
        var arrOfusers=[];
        a.readFile('./Users.json', (err)=>{
            if (err) throw err;
            
        }).then(val=>{
            arrOfusers=JSON.parse(val);
            arrOfusers.push(User)
            writeToFile(JSON.stringify(arrOfusers));
            res(u);   
        })
        .catch(error=>rej(':(',error))
    })
}



usersList=creatArray();
usersList=JSON.stringify(usersList);
writeToFile(usersList);
login("c@gmail",111111);

exports.login=login;
exports.postUser=postUser;
