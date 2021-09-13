

function fetchEx() {
    fetch("api/values")
        .then(response => response.text())
        .then(result => console.log("hello " + result))
}       

let name= document.getElementById("ee").value;
let pass=document.getElementById("pp").value;

function func1(name, pass) {
    fetch("api/values"+"/"+name+"/"+pass)
        .then(response => response.text())
        .then((user) => {
            if (user == "")
                alert("המשתמש אינו נמצא")
            else
                alert( name+" שלום!")
        });
}

function func2(){
    let div2 = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(div2);

    let nameLable = document.createElement('lable');
    nameLable.innerHTML = ' שם משתמש';
    let name = document.createElement('input');
    name.setAttribute("type", "Email");
    name.id = 'email2';
    let passLable = document.createElement('lable');
    passLable.innerHTML = ' סיסמא';
    let pass = document.createElement('input');
    pass.setAttribute("type", "password");
    pass.id = 'pass2';
    let btn = document.createElement('button');
    btn.innerHTML = 'רישום';

    btn.addEventListener('click', func3)

    div2.appendChild(document.createElement('br'));
    div2.appendChild(document.createElement('br'));
    div2.appendChild(name);
    div2.appendChild(nameLable);
    div2.appendChild(document.createElement('br'));
    div2.appendChild(document.createElement('br'));
    div2.appendChild(pass);
    div2.appendChild(passLable);
    div2.appendChild(document.createElement('br'));
    div2.appendChild(document.createElement('br'));
    div2.appendChild(btn);
    }
    function func3(){
        let newname = document.getElementById("email2").value;
        let newpass = document.getElementById("pass2").value;
    let user={
        Email:newname,
        Password:newpass
};
    fetch("api/values", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }).then(response => response.json()).
        then(data => {
            alert("שלום לך" + data.Email)
        }).catch(error => { console.log(error); });


}
