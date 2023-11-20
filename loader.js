document.getElementById("loginButton").addEventListener("click", function() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".login-container").style.display = "none";
});

var loginButton = document.getElementById("loginButton");
var textElement = document.querySelector(".text");


loginButton.addEventListener("click", function() {
    textElement.classList.remove("hidden");
    textElement.style.display = "none";
});

var loaderContainer = document.querySelector('.loader-container');

function showLoader() {
    loaderContainer.classList.remove('hidden');
}

function hideLoader() {
    loaderContainer.classList.add('hidden');
}


showLoader();
setTimeout(function() {
    hideLoader();
}, 3000);
