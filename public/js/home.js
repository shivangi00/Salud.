var secret = localStorage.getItem("code");

if(secret == "secret"){
           
} else{
    // alert("You have been logged out! Please Login again!");
    window.location.href = "sign.html";
}

function logout(){            
    window.location.href = "index.html";
    localStorage.setItem("code","logout");
    localStorage.setItem("Username", "");
    localStorage.setItem("Email", "");
}

var userData = [];

function init(){
    if(localStorage.userRecord){
        userData = JSON.parse(localStorage.userRecord);
    }
    var mode = localStorage.getItem("Theme");
    if(mode == "light"){
        lightMode();
    } else{
        darkMode();
    }
}

function toggleTheme(){
    if(localStorage.getItem("Theme") == "light"){
        darkMode();
    }else{
        lightMode();
    }
}

function darkMode(){
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    document.getElementById("aside").classList.remove("lightA");
    document.getElementById("aside").classList.add("darkA");
    localStorage.setItem("Theme", "dark");
}

function lightMode(){
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    document.getElementById("aside").classList.add('lightA');
    document.getElementById("aside").classList.remove('darkA');
    localStorage.setItem("Theme", "light");
}

/*==========================UPDATE PROFILE TAB========================================*/
var username = localStorage.getItem("Username");
const email = localStorage.getItem("Email");
/*Aside*/
const a_name = document.getElementById('name');
a_name.innerHTML = username;
a_name.style.color = '#82c';

/*Profile Section*/
const p_name = document.getElementById('pname');
p_name.innerHTML = username;

var u_name = document.getElementById('uname');
u_name.innerHTML = username;

const mail = document.getElementById('email');
mail.innerHTML = email;

function update(){
    userData.some((obj, index) =>{
        //find pos using email entered
        if(obj.Email === email){
            pos = index;
            //access the password field at pos and update
            userData[pos].Username = u_name.textContent;
            localStorage.setItem("Username", u_name.textContent);
            a_name.innerHTML = u_name.textContent;
            p_name.innerHTML = u_name.textContent;
            //save the new userData entry in user
            var user = userData[pos];
            //splice -> replace the current entry by user entry
            userData.splice(pos, 1, user);
            //save changes in javascript
            localStorage.userRecord = JSON.stringify(userData);
            alert("Updated!");
            // console.log(userData[pos].Password);
            // console.log(pos);
            return true;
        } return false;       
    })
}

function show(evt, sectName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(sectName).style.display = "block";
    evt.currentTarget.className += " active";
}
/*=======================================================================================*/

let output = document.getElementById('output');
let buttons = document.getElementsByClassName('tool--btn');
for (let btn of buttons) {
    btn.addEventListener('click', () => {
        let cmd = btn.dataset['command'];
        if(cmd === 'createlink') {
            let url = prompt("Enter the link here: ", "http:\/\/");
            document.execCommand(cmd, false, url);
        } else {
            document.execCommand(cmd, false, null);
        }
    })
}
