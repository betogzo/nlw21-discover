const passField = document.querySelector("#room-pass");
const eyeEl = document.querySelector(".eye");

function passReveal () {
   if (passField.getAttribute("type") === "password") {
       passField.setAttribute("type", "text");
       eyeEl.setAttribute("style", "color: #3485FF;");
   } else {
       passField.setAttribute("type", "password");
       eyeEl.setAttribute("style", "color: #A1B2CD;");
   }
}