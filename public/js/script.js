/*If user is logged out or hasn't logged in yet*/
var status = localStorage.getItem("code");
if(status == "logout" || status == ""){
    localStorage.setItem("code", "");
} else{
    alert("Please Logout First!");
    window.location.href = "home.html";
}

/*Random Quotes Generator Quotes*/
var quotes = [
    '<h2>"Action is the foundational key to all success"</h2>',
    '<h2>“Go the extra mile. It’s never crowded.”</h2>',
    '<h2>"Take care of your body. It’s the only place you have to live."</h2>',
    '<h2>"A sad soul can be just as lethal as a germ."</h2>',
    '<h2>"It always seems impossible until it is done."</h2>',
    '<h2>"Good things come to those who sweat."</h2>',
    '<h2>"Wherever you are, be there totally."</h2>',
];

/*For Moods tabs*/
let tabHeader = document.getElementsByClassName("tab-header")[0];
let tabInd = document.getElementsByClassName("tab-indicator")[0];
let tabBody = document.getElementsByClassName("tab-body")[0];

let tabsPane = tabHeader.getElementsByTagName("div");

for(let i = 0; i < tabsPane.length; i++){
    tabsPane[i].addEventListener("click", function(){
        tabHeader.getElementsByClassName("active")[0].classList.remove("active");
        tabsPane[i].classList.add("active");
        tabBody.getElementsByClassName("active")[0].classList.remove("active");
        tabBody.getElementsByTagName("div")[i].classList.add("active");

        tabInd.style.left =  `calc(calc(100% / 4) * ${i})`;
    });
}

/*Responsive hamburger menu*/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelector(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu(){
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

navLink.forEach(n => n.addEvenetListener("click", closeMenu));

function closeMenu(){
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

/*Random code generator function*/
function genQuote() {
    var randNum = Math.floor(Math.random() * quotes.length);
    var text = document.getElementById('display'); 
    var quote = quotes[randNum];
     text.innerHTML = quote;

    var tweetButton=document.getElementById("tweet");
    tweetButton.href="https://twitter.com/intent/tweet?text="+quotes[randNum];
}


