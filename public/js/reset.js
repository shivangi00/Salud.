var idx = -1;
var attempt = 3;
    var status = localStorage.getItem("Timeout");

    if(status == "unset"){

    } else{
        start();
        attempt = 3;
    }

var userData = [];

function init(){
    if(localStorage.userRecord){
        userData = JSON.parse(localStorage.userRecord);
    }
    // console.log(userData[0].Password);
    var mode = localStorage.getItem("Theme");
    if(mode == "light"){
    lightMode();
    } else{
    darkMode();
    }
}
//=========================MODAL POP UP==================================================
function start() {
    let modal = document.querySelector('.modal-wrap');
    let timer = document.getElementsByTagName('span');
    let timerCount = 30;

    modal.style.display = 'block';
    timer.innerHTML = timerCount;

    let hideToTimer = setInterval(function(){
        if (!timerCount){
        clearInterval(hideToTimer);
        modal.style.display = 'none';
        localStorage.setItem("Timeout", "unset");
        }
        timerCount--;
        timer.innerHTML = timerCount;
    }, 1000);
}

//=============================Email validation function==================================
function validateEmail() {
    var emailID = document.myForm.email.value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
        // alert("Please enter correct email ID")
        document.myForm.email.focus() ;
        return false;
    }
    return( true );
}

function findEmail(userData){
    var email = document.getElementById("email").value;
    //find if email is registered
    if(userData.Email === email){
        return true;
    }
    return false;
}
var user_name;
function findUsername(){
    var pos = -1;
            //some() returns the position of an object: ref video - https://www.youtube.com/watch?v=w84qY9peByk
    userData.some((obj, index) =>{
        var email = document.getElementById("email").value;
        //find pos using email entered
        if(obj.Email === email){
            pos = index;
            //access the username field at pos
            user_name = userData[pos].Username;
            return true;
        } return false;
    })
}

//===========================SEND OTP VIA EMAIL============================================
function sendMail(){
    const btn = document.getElementById('sendOTP');
    var emailID = document.getElementById("email").value;
    // var email = localStorage.getItem("Email");
    var num = '1234567890';
    var OTP = '';

    for(var i = 0; i < 6; i++){
        OTP += num[Math.floor(Math.random() * 10)];
    }
    
    if(validateEmail() && userData.find(findEmail)){
        btn.innerHTML = 'Sending...';
        btn.style.backgroundColor = 'rgb(255, 84, 16)';
        userData.find(findUsername);
        var tempParams = {
            //   from_name: document.getElementById("fromName").value,
            to_name: user_name,
            to_mail: emailID,
            message: OTP,
        };
        emailjs.send('gmail', 'template_bgxmhac', tempParams).then(function(res){
            console.log("success", res.status);
            alert("Email sent");
            localStorage.setItem("OTP", OTP);
            document.getElementById("verifyOTP").style.display = 'block';
            document.getElementById("getOTP").style.display = 'none';
        })
    } else{
        attempt -= 1;
        alert("Email not registered! You have "+attempt+" attempts left!");
    }

    if(attempt == 0){
        start();
        attempt = 3;
        localStorage.setItem("Timeout", "set");
        return;
    }
}

/*=====================================OTP VERIFICATION================================*/

function verification(){
    var otp = document.getElementById("OTP").value;
    var otp_sent = localStorage.getItem("OTP");
    if(otp==otp_sent){
        localStorage.setItem("OTP", "");
        document.getElementById("resetPswd").style.display = 'block';
        document.getElementById("verifyOTP").style.display = 'none';
    } else{
        alert("Invalid OTP!");
    }
}

/*===========================RESET PASSWORD======================================*/

function resetPassword(){
    if(myInput.value == ""){
        alert("Please enter a new password!");
        return;
    } 
    if(myInput.value.length >= 8 && (myInput.value.match(lowerCaseLetters)) && (myInput.value.match(upperCaseLetters)) && (myInput.value.match(numbers))){
            // localStorage.setItem("Password", myInput.value);
            //store data in localstorage
            var pos = -1;
            //some() returns the position of an object: ref video - https://www.youtube.com/watch?v=w84qY9peByk

            userData.some((obj, index) =>{
            var email = document.getElementById("email").value;
                //find pos using email entered
                if(obj.Email === email){
                    pos = index;
                    //access the password field at pos and update
                    userData[pos].Password = myInput.value;
                    //save the new userData entry in user
                    var user = userData[pos];
                    //splice -> replace the current entry by user entry
                    userData.splice(pos, 1, user);
                    //save changes in javascript
                    localStorage.userRecord = JSON.stringify(userData);
                    // console.log(userData[pos].Password);
                    // console.log(pos);
                    return true;
                } return false;
            })
            // console.log(userData[pos]);
            alert("Password Changed Succesfully!");
            myInput.value = "";
            window.location.href = 'sign.html';
    }
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
myInput.onblur = function() {
    // document.getElementById("message").style.display = "none";
    if(myInput.value.length < 8 || !(myInput.value.match(lowerCaseLetters)) || !(myInput.value.match(upperCaseLetters)) || !(myInput.value.match(numbers))){
        myInput.style.borderBottom = "1px solid rgb(255, 84, 16)";
        myInput_label.style.top = "-12px";
        myInput_label.style.fontSize = "12px";
        myInput_label.style.color = "rgb(255, 84, 16)";
        myInput_label.style.left = "0";
    } else{
        myInput.style.borderBottom = "1px solid #8c2ff7";
        myInput_label.style.top = "-12px";
        myInput_label.style.fontSize = "12px";
        myInput_label.style.color = "#8c2ff7";
        myInput_label.style.left = "0";
    }
}