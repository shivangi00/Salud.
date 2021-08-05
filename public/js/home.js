var user = localStorage.getItem("userRecord");
var id = localStorage.getItem("ID");
/*=================================== ON WINDOW LOAD ======================================*/
    function init(){
        if(user != null){
            userData = JSON.parse(user);
        }
        var mode = localStorage.getItem("Theme");
        if(mode == "light"){
            lightMode();
        } else{
            darkMode();
        }
        
        var secret = localStorage.getItem("code");
        if(secret == "secret"){
            localStorage.setItem("code", "secret");
        } else{
            // alert("You have been logged out! Please Login again!");
            localStorage.setItem("code", "");
            window.location.href = "sign.html";
        }
    }
/*==================================== LOGOUT ============================================*/
    function logout(){            
        window.location.href = "index.html";
        localStorage.setItem("code","logout");
        localStorage.removeItem("Username", "");
        localStorage.removeItem("Email", "");
        localStorage.removeItem("ID", "");
    }
/*===================================== THEMES ========================================*/
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

/*=============================== ASIDE NAVBAR ========================================*/
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

/*============================ PROFILE SECTION =========================================*/
    var username = localStorage.getItem("Username");
    const email = localStorage.getItem("Email");
    const p_name = document.getElementById('pname');
    const Name = document.getElementById('Jname');
    const a_name = document.getElementById('name');
    a_name.innerHTML = username;
    a_name.style.color = '#82c';
    p_name.innerHTML = username;
    Name.innerHTML = username;

    var u_name = document.getElementById('uname');
    u_name.innerHTML = username;

    const mail = document.getElementById('email');
    mail.innerHTML = email;

    function findUname(userData){
        var uname = document.getElementById('uname').innerHTML;
    
        //find if email is registered
        if(userData.Username === uname){
            return true;
        }
        return false;
    }

    function updateProfile(){
        if(userData.find(findUname)){
            alert("Oops... this Username is taken.");
        } else{
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
    }

    function deleteAccount(){
        let confirmDel = confirm("Are you sure you want to delete this?");
        if(confirmDel == true){
            userData.some((obj, index) =>{
                //find pos using email entered
                if(obj.Email === email){
                    pos = index;
                    //splice -> delete the current entry
                    userData.splice(pos, 1);
                    //save changes in javascript
                    localStorage.userRecord = JSON.stringify(userData);
                    localStorage.setItem("code", "");
                    localStorage.setItem("Email", "");
                    localStorage.setItem("Username", "");
                    localStorage.setItem("ID", "");
                    localStorage.removeItem("Notes"+id);
                    
                    alert("Your account has been successfully deleted!");
                    window.location.href = "index.html";
                    return true;
                } return false;       
            })
        }
    }

/*================================== JOURNAL SECTION =====================================*/
    function newNote(){
        document.getElementById("addNote").style.display = "block";
        document.getElementById("note-div").style.display = "none";
        document.getElementById("newNote").style.display = "none";
    }

    function toggleJ(){
        document.getElementById("addNote").style.display = "none";
        document.getElementById("newNote").style.display = "block";
        document.getElementById("note-div").style.display = "grid";
    }

    function discard(){
        addText.value = "";
    }

    let addText = document.getElementById('output');

    function save(){
        if(addText.value == ""){
            return alert("Can't Save empty note");
        }
        
        var _date = new Date();
        var today = _date.toDateString();
        var curr_time = _date.toLocaleTimeString();
        
        let notes = localStorage.getItem("Notes"+id);
        //if notes in localstorage is empty declare one
        if(notes == null){
            notesObj = [];
        } else{
            notesObj = JSON.parse(notes);
        }

        let myObj = {
            date: today,
            time: curr_time,
            text: addText.value
        }
        notesObj.push(myObj);
        localStorage.setItem("Notes"+id, JSON.stringify(notesObj));
        addText.value = "";
        showNotes();
    }

    //SHOW NOTES
    function showNotes(){
        let notes = localStorage.getItem("Notes"+id);
        //if notes in localstorage is empty declare one
        if(notes == null){
            notesObj = [];
        } else{
            notesObj = JSON.parse(notes);
        }

        let html = " ";
        notesObj.forEach(function(element, index){
            var content = html;
            html = `<div id="notes" class="item borderW" contenteditable="false">
            <p class="counter" style="display:none;">${index + 1}</p>
            <span id="date" class="bold">${element.date}</span>
            <button id="${index}" class="btn-icon right medium" onclick="editNote(this.id);"><i class="bi bi-pencil-fill"></i></button>&nbsp;&nbsp;
            <button id="${index}" class="btn-icon right medium" onclick="deleteNote(this.id);"><i class="bi bi-trash-fill"></i></button><br>
            <span id="time" class="small fade">${element.time}</span><br><br>
            <p class="notes">${element.text}</p>
        </div>`;
            html += content;
        });
        let noteEle = document.getElementById("note-div");
        if(notesObj.length != 0){
            noteEle.innerHTML = html;
        } else{
            noteEle.innerHTML = '</br>No Journals saved yet! Write one now </br>';
        }
    }

    //Function to delete notes
    function deleteNote(index){
        let confirmDel = confirm("Are you sure you want to delete this?");
        if(confirmDel == true){
            let notes = localStorage.getItem("Notes"+id);
            //if notes in localstorage is empty declare one
            if(notes == null){
                notesObj = [];
            } else{
                notesObj = JSON.parse(notes);
            }

            notesObj.splice(index, 1);
            localStorage.setItem("Notes"+id, JSON.stringify(notesObj));
            showNotes();
        }
    }

    function editNote(index){
        let notes = localStorage.getItem("Notes"+id);
        console.log("Editing note at index: " + index);
        document.getElementById("addNote").style.display = "block";
        document.getElementById("newNote").style.display = "none";
        document.getElementById("note-div").style.display = "none";
        //if notes in localstorage is empty declare one
        if(notes == null){
            notesObj = [];
        } else{
            notesObj = JSON.parse(notes);
        }
        // console.log("Array: " + JSON.stringify(notesObj));

        //Get the notesObj entries in an array named entries
        let entries = Object.entries((notesObj));
        // console.log(entries);

        //Access the entries array's parameter index location-> sub index 1-> text value
        addText.value = entries[index][1].text;
        // console.log(entries[index][1].text);
        
        notesObj.splice(index, 1);
        localStorage.setItem("Notes"+id, JSON.stringify(notesObj));
        showNotes();
    }

    showNotes();

    /*=================================================================*/