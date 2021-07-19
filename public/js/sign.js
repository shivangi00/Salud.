let tabPanes = document.getElementsByClassName("tab-header")[0].getElementsByTagName("div");
 
for(let i=0;i<tabPanes.length;i++){
  tabPanes[i].addEventListener("click",function(){
    document.getElementsByClassName("tab-header")[0].getElementsByClassName("active")[0].classList.remove("active");
    tabPanes[i].classList.add("active");
    
    document.getElementsByClassName("tab-content")[0].getElementsByClassName("active")[0].classList.remove("active");
    document.getElementsByClassName("tab-content")[0].getElementsByClassName("tab-body")[i].classList.add("active");
  });
}

var myInput = document.getElementById("pswd");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var myInput_label = document.getElementById("pswd-label");
    
// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

var numbers = /[0-9]/g;
var upperCaseLetters = /[A-Z]/g;
var lowerCaseLetters = /[a-z]/g;

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
    // Validate lowercase letters
    if(myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    if(myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    if(myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}
    
// When the user clicks outside of the password field, hide the message box
myInput.onblur = function(){
    if(myInput.value === ""){    
        myInput.style.borderBottom = "1px solid #999";
        myInput_label.style.top = "0px";
        myInput_label.style.fontSize = "small";
        myInput_label.style.color = "#999";
        myInput_label.style.left = "0";
        document.getElementById("message").style.display = "none";
    } else{
        validPass(); 
    }
}

//Password validation function
function validPass() {
    // document.getElementById("message").style.display = "none";
    if(myInput.value.length < 8 || !(myInput.value.match(lowerCaseLetters)) || !(myInput.value.match(upperCaseLetters)) || !(myInput.value.match(numbers))){
        myInput.style.borderBottom = "1px solid rgb(255, 84, 16)";
        myInput_label.style.top = "-12px";
        myInput_label.style.fontSize = "12px";
        myInput_label.style.color = "rgb(255, 84, 16)";
        myInput_label.style.left = "0";
        return false;
    } else{
        myInput.style.borderBottom = "1px solid #8c2ff7";
        myInput_label.style.top = "-12px";
        myInput_label.style.fontSize = "12px";
        myInput_label.style.color = "#8c2ff7";
        myInput_label.style.left = "0";
        return true;
    }
}

    
//Email validation function
function validateEmail() {
    var emailID = document.myForm.email.value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
        document.myForm.email.focus() ;
        return false;
    }
    return( true );
}
    
//declare user data array
var userData = [];

//check whther userData array already exists or not, get the previously stored values 
//and add the new ones to the array and store both of them
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

function signup(){
    var uname = document.getElementById("uname").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pswd").value;

    //create JSON objects
    var user = {Username: uname, Email: email, Password: pass};

    if(uname == "" || !validateEmail() || !validPass()){
        alert("Please fill the fields correctly!");
    } else if(userData.find(findEmail)){
        alert("Oops... this Email is already registered!");
    } else{
        //push data to array
        userData.push(user);
        //store data in localstorage
        localStorage.userRecord = JSON.stringify(userData);
        // console.log(userData);
        alert("Registeration Successful!");
        localStorage.setItem("code", "");
        document.getElementById("uname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("pswd").value = "";
    }
}

function findEmail(userData){
    var email = document.getElementById("email").value;

    //find if email is registered
    if(userData.Email === email){
        return true;
    }
    return false;
}

function findUser(){
    var pos = -1;
    var flag = 0;
    //some() returns the position of an object: ref video - https://www.youtube.com/watch?v=w84qY9peByk
    userData.some((obj, index) =>{
        var pass = document.getElementById("password").value;
        var uname = document.getElementById("username").value;
        //find pos using email entered
        if(obj.Password === pass && obj.Username === uname){
            pos = index;
            //access the password field at pos and update
            localStorage.setItem("Username", userData[pos].Username);
            localStorage.setItem("Email", userData[pos].Email);
            flag = 1;
        }
    })
    if(flag == 1)
        return true;
    else
        return false;
}

function login(){
    if(findUser()){
        alert("Login successful");
        localStorage.setItem("code", "secret");
        window.location.href = "home.html";
    } else{
        alert("Username or Password is incorrect");
    }
}