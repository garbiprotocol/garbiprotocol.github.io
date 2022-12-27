window.onscroll = function() { myFunction() };

var header = document.getElementById("header");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky-header");
    } else {
        header.classList.remove("sticky-header");
    }
}
// swap-page
var transactionSettingClicked = document.querySelector("#transaction__setting-icon");
var transactionSettingShow = document.querySelector("#transaction__setting-description");

if (transactionSettingClicked) {
    transactionSettingClicked.addEventListener("click", () => {
        transactionSettingShow.classList.toggle("active");
    });
}