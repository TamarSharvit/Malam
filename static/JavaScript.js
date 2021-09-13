

function fetchEx() {
    fetch("/api/user")
        .then(response => response.text())
        .then(result => console.log("hello " + result))
}       


   

function getUser() {
    let email = document.getElementById("ee").value;
    let password = document.getElementById("pp").value;
    fetch("/api/user/" + email + "/" + password)
        .then(response => {
            if (response.ok)
                return response.json();
        })
        .then((data) => {
            if (data == null) alert("שם משתמש לא מוכר")
            else {

                sessionStorage.setItem('oldUser', JSON.stringify(data));
               window.open("htmlpage.html");
                //window.location.href = "htmlpage.html";
                //alert(data.firstName + " " + data.lastName + " " + "התחברת בהצלחה");
            }
        });     
     }

function newUser() {
    if (document.getElementById("mydiv") != null)
        document.getElementById("mydiv").remove();

    openDetails();
}      
    
       

function openDetails(){
    let div2 = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(div2);
    div2.setAttribute("id", "mydiv");
    let nameLable = document.createElement('lable');
    nameLable.innerHTML = ' מייל';
    let name = document.createElement('input');
    name.setAttribute("type", "Email");
    name.id = 'email2';
    let passLable = document.createElement('lable');
    passLable.innerHTML = ' סיסמא';
    let pass = document.createElement('input');
    pass.setAttribute("type", "password");
    pass.id = 'pass2';

    let fNameLable = document.createElement('lable');
    fNameLable.innerHTML = ' שם פרטי';
    let fname = document.createElement('input');
    fname.id = "ffname";
    let lNameLable = document.createElement('lable');
    lNameLable.innerHTML = 'שם משפחה';
    let lname = document.createElement('input');
    lname.id = "llname";

    let btn = document.createElement('button');
    btn.innerHTML = 'רישום';

     btn.addEventListener('click', addUser);

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
    div2.appendChild(fname);
    div2.appendChild(fNameLable);
    div2.appendChild(document.createElement('br'));
    div2.appendChild(document.createElement('br'));
    div2.appendChild(lname);
    div2.appendChild(lNameLable);
    div2.appendChild(document.createElement('br'));
    div2.appendChild(document.createElement('br'));

  
    div2.appendChild(btn);
    }
function addUser() {

    let user = {
        firstName: document.getElementById('ffname').value,
        lastName: document.getElementById('llname').value,
        email: document.getElementById("email2").value,
        password: document.getElementById('pass2').value  
    };

    fetch("/api/user", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user),
    })
        .then(response => { if (response.ok) { return response.json() } else { response.json().then(error1 => { alert(JSON.stringify(error1.errors)); }) } })
        .then(data => { alert(data.FirstName +" "+data.LastName+" "+ "שלום!") })
        .catch(error => console.log(error))
};


