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

            localStorage.setItem("name", )
        }
        
        //Email validation function
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
        
        function signup(){
            var uname = document.getElementById("uname").value;
            var email = document.getElementById("email").value;
            var pass = document.getElementById("pswd").value;
            let flag = 0;
            if(uname != ""){
                localStorage.setItem("Username", uname);
                flag++;
            }

            if(validateEmail()){
                localStorage.setItem("Email", email);
                flag++;
            }
            if(myInput.value.length >= 8 && (myInput.value.match(lowerCaseLetters)) && (myInput.value.match(upperCaseLetters)) && (myInput.value.match(numbers))){
                localStorage.setItem("Password", pass);
                flag++;
            }

            if(flag < 3 || !validateEmail()){
                alert("Please fill the fields correctly!");
            } else {
                console.log(flag);
                alert("Registeration Successful!");
                localStorage.setItem("code", "");
                // window.location.href = "sign-in.html";
                document.getElementById("uname").value = "";
                document.getElementById("email").value = "";
                document.getElementById("pswd").value = "";
                // document.getElementById("reg").style.display = 'none';
                // document.getElementById("log").style.display = 'block';
            }

        }

        function login(){
            // console.log(uname1);
            // console.log(pass1);
            // console.log(uname);
            // console.log(pass);
            var uname = document.getElementById("username").value;
            var pass = document.getElementById("password").value;
            var uname1 = localStorage.getItem("Username");
            var pass1 = localStorage.getItem("Password");

            if(uname==uname1 && pass==pass1){
                alert("Login successful");
                localStorage.setItem("code", "secret");
                window.location.href = "home.html";
            } else{
                alert("Username or Password is incorrect");
            }
        }