


let div3 = document.createElement('div');
document.getElementsByTagName('body')[0].appendChild(div3);
let Lable = document.createElement('lable');
Lable.innerHTML = "hii" +" "+ JSON.parse(sessionStorage.getItem('oldUser')).FirstName;
div3.appendChild(Lable);


function openDetails() {
    let div2 = document.createElement('div');
    document.getElementsByTagName('body')[0].appendChild(div2);
    let flable = document.createElement('lable');
    flable.innerHTML = ' שם פרטי';
    let fname = document.createElement('input');
    fname.setAttribute("type", "text");
    fname.id = "fname";
    let lNameLable = document.createElement('lable');
    lNameLable.innerHTML = 'שם משפחה';
    let lname = document.createElement('input');
    lname.id = "lname";
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
   
   

    let btn = document.createElement('button');
    btn.innerHTML = 'עידכון';

    btn.addEventListener('click', update)

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
    div2.appendChild(flable );
    div2.appendChild(document.createElement('br'));
    div2.appendChild(document.createElement('br'));
    div2.appendChild(lname);
    div2.appendChild(lNameLable);
    div2.appendChild(document.createElement('br'));
    div2.appendChild(document.createElement('br'));

    div2.appendChild(btn);
}

function update() {
    let user = {      
        FirstName: document.getElementById('fname').value,
        LastName: document.getElementById('lname').value,
        Email: document.getElementById("email2").value,
        Password: document.getElementById('pass2').value,
    };
    var oldId = JSON.parse(sessionStorage.getItem('oldUser'));
    fetch("/api/user/" + oldId._id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user),
    })
        .then(response => {
            if (response.ok) { alert("הפרטים התעדכנו בהצלחה!") }
            else {throw new Error(response.status) } })
          
        .catch(error => console.log(error))
}
function startBuy() {
    window.location.href = "Products.html";

}