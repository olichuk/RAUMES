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

var box = document.querySelector('#box');

function showBox(){
    box.classList.remove('hidden');
    box.classList.add('visible')
}

setTimeout(function(){
    showBox();
}, 2000)