var mode = localStorage.getItem("Theme");
if(mode == "light"){
  lightMode();
} else{
  darkMode();
}
//   var mode = localStorage.getItem("Theme");
//   mode == "light" ? darkMode() : lightMode();

//=============================Theme toggle==============================================
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
  document.getElementById('nav').classList.remove('light');
  document.getElementById('nav').classList.add('dark');
  localStorage.setItem("Theme", "dark");
}

function lightMode(){
  document.body.classList.add("light");
  document.body.classList.remove("dark");
  document.getElementById('nav').classList.add('light');
  document.getElementById('nav').classList.remove('dark');
  localStorage.setItem("Theme", "light");
}

//=============================Email validation function==================================
function validateEmail() {
    var emailID = document.myForm.from_mail.value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");
    
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
        alert("Please enter correct email ID");
        document.myForm.email.focus();
        return false;
    }
    return( true );
}
const btn = document.getElementById('button');
document.getElementById('form').addEventListener('submit', function(event) {
   event.preventDefault();

   const serviceID = 'default_service';
   const templateID = 'template_uigtzob';

   if(validateEmail() && document.getElementById("message").value != ""){
    btn.value = 'Sending...';
   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
    }
});

/*If user is logged out or hasn't logged in yet*/
var status = localStorage.getItem("code");
if(status == "logout" || status == ""){
    localStorage.setItem("code", "");
} else{
    // alert("Please Logout First!");
    window.location.href = "home.html";
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    slidesPerGroup: 1,
    breakpoints: {
     768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
    },
    loop: true,
    navigation:{
      nextEl:".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
});

var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 10000); // Change image every 2 seconds
}

function currentSlide(n) {
  showSlidesDot(slideIndex = n);
}

function showSlidesDot(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
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
// let tabHeader = document.getElementsByClassName("tab-header")[0];
// let tabInd = document.getElementsByClassName("tab-indicator")[0];
// let tabBody = document.getElementsByClassName("tab-body")[0];

// let tabsPane = tabHeader.getElementsByTagName("div");

// for(let i = 0; i < tabsPane.length; i++){
//     tabsPane[i].addEventListener("click", function(){
//         tabHeader.getElementsByClassName("active")[0].classList.remove("active");
//         tabsPane[i].classList.add("active");
//         tabBody.getElementsByClassName("active")[0].classList.remove("active");
//         tabBody.getElementsByTagName("div")[i].classList.add("active");

//         tabInd.style.left =  `calc(calc(100% / 4) * ${i})`;
//     });
// }

/*Responsive hamburger menu*/
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelector(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu(){
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

navLink.forEach((n) => n.addEvenetListener("click", closeMenu));

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
